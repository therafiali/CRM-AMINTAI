// src/features/deals/components/simplified-deal-pipeline.tsx
"use client";

import { useState, useMemo } from "react";
import { GroupedPipelineColumn } from "./grouped-pipeline-column";
import { DesktopFilterPanel } from "./desktop-filter-panel";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { FilterChips } from "./FilterChips";
import { FilterSidebar } from "./FilterSidebar";
import { useLeads } from "@/features/leads/hooks/useLeads";

import type { LeadStatus } from "@/components/ui/StatusBadge";
import { useUpdateLead } from "../leads/hooks/mutations/useUpdateLeads";

// Define the Deal type based on your lead data
export type Deal = {
  id: number;
  title: string;
  contactName: string;
  email?: string | null;
  phone?: string | null;
  propertyAddress: string;
  propertyPrice: number;
  stage: string;
  priority: 'high' | 'medium' | 'low';
  lastActivity: string;
  followUpDate?: string;
  source?: string | null;
  assignedTo?: string | null;
  createdAt: string;
};

// Group stages based on ACTUAL lead statuses from your data
export const groupedStages = [
  {
    id: "initial-contact",
    name: "Initial Contact",
    color: "border-blue-200 bg-blue-50",
    stages: ["new", "contacted", "assigned"]
  },
  {
    id: "in-progress",
    name: "In Progress",
    color: "border-yellow-200 bg-yellow-50",
    stages: ["inprogress", "follow up", "called", "answer", "poweroff", "not answering"]
  },
  {
    id: "advanced",
    name: "Advanced",
    color: "border-purple-200 bg-purple-50",
    stages: ["detail send whatsapp", "meeting_aligned", "visited", "interested"]
  },
  {
    id: "closing",
    name: "Closing",
    color: "border-green-200 bg-green-50",
    stages: ["token", "closed_won"]
  },
  {
    id: "lost",
    name: "Lost",
    color: "border-red-200 bg-red-50",
    stages: ["closed_loss", "not_interested"]
  }
];

export function SimplifiedDealPipeline() {
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minPrice: null as number | null,
    maxPrice: null as number | null,
    locations: [] as string[],
    statuses: [] as string[],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Use actual leads data
  const { data: leadsData, isLoading, error } = useLeads({
    page: 1,
    limit: 100, // Get all leads for the pipeline view
    sortBy: "createdAt",
    sortDir: "desc",
  });


  console.log("Lead data", leadsData)
  const updateMutation = useUpdateLead();

  // Transform leads data to deals format
  const deals: Deal[] = useMemo(() => {
    if (!leadsData?.items) {
      console.log("No leads data found");
      return [];
    }
    
    console.log("Raw leads data:", leadsData.items);
    
    const transformedDeals = leadsData.items.map((lead) => {
      // Normalize the status to lowercase and handle spaces
      const normalizedStatus = lead.status.toLowerCase().replace(/\s+/g, ' ');
      
      const deal: Deal = {
        id: lead.id,
        title: lead.name,
        contactName: lead.name,
        email: lead.email,
        phone: lead.phone,
        propertyAddress: lead.source || "Not specified",
        propertyPrice: lead.id * 10000,
        stage: normalizedStatus,
        priority: getPriorityFromStatus(lead.status),
        lastActivity: formatLastActivity(lead.updatedAt || lead.createdAt),
        followUpDate: undefined,
        source: lead.source,
        assignedTo: lead.assignedTo?.name || "Unassigned",
        createdAt: lead.createdAt,
      };
      
      console.log(`Transformed lead ${lead.id}:`, { 
        originalStatus: lead.status, 
        normalizedStatus: deal.stage,
        assignedTo: deal.assignedTo 
      });
      
      return deal;
    });
    
    console.log("All transformed deals:", transformedDeals);
    console.log("All stages found:", [...new Set(transformedDeals.map(d => d.stage))]);
    
    return transformedDeals;
  }, [leadsData]);

  // Filter deals based on search and filters - MOVED THIS UP
  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesSearch = searchTerm === "" || 
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (deal.email && deal.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (deal.phone && deal.phone.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesMinPrice = filters.minPrice === null || deal.propertyPrice >= filters.minPrice;
      const matchesMaxPrice = filters.maxPrice === null || deal.propertyPrice <= filters.maxPrice;

      const matchesLocation = filters.locations.length === 0 || 
        filters.locations.includes(deal.assignedTo || "");

      const matchesStatus = filters.statuses.length === 0 || 
        filters.statuses.includes(deal.stage);

      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesLocation && matchesStatus;
    });
  }, [deals, searchTerm, filters]);

  // Debug: Log which deals are in which groups - NOW THIS CAN USE filteredDeals
  const dealsByGroup = useMemo(() => {
    const grouped = groupedStages.map((group) => {
      const groupDeals = filteredDeals.filter(deal => 
        group.stages.some(stage => 
          deal.stage.toLowerCase().replace(/\s+/g, ' ') === stage.toLowerCase().replace(/\s+/g, ' ')
        )
      );
      
      console.log(`Group ${group.name}:`, {
        expectedStages: group.stages,
        actualDeals: groupDeals.map(d => ({ id: d.id, stage: d.stage }))
      });
      
      return {
        group,
        deals: groupDeals
      };
    });
    
    // Log deals that don't match any group
    const unmatchedDeals = filteredDeals.filter(deal => 
      !groupedStages.some(group => 
        group.stages.some(stage => 
          deal.stage.toLowerCase().replace(/\s+/g, ' ') === stage.toLowerCase().replace(/\s+/g, ' ')
        )
      )
    );
    
    if (unmatchedDeals.length > 0) {
      console.log("Unmatched deals:", unmatchedDeals.map(d => ({ id: d.id, stage: d.stage })));
    }
    
    return grouped;
  }, [filteredDeals]);

  const handleDragStart = (deal: Deal) => {
    setDraggedDeal(deal);
  };

  const handleDrop = async (dealId: number, newStage: string) => {
    try {
      await updateMutation.mutateAsync({
        id: dealId,
        payload: { status: newStage.toUpperCase() as LeadStatus },
      });
      // The data will be refreshed automatically via react-query
    } catch (error) {
      console.error("Failed to update lead status:", error);
    }
    setDraggedDeal(null);
  };

  // Filter handlers
  const handleRemoveLocation = (location: string) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.filter(l => l !== location)
    }));
  };

  const handleRemoveStatus = (status: string) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.filter(s => s !== status)
    }));
  };

  const handleClearPrice = () => {
    setFilters(prev => ({ ...prev, minPrice: null, maxPrice: null }));
  };

  const handleClearAll = () => {
    setFilters({ minPrice: null, maxPrice: null, locations: [], statuses: [] });
    setSearchTerm("");
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          Error loading deals: {(error as any)?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Deals Pipeline</h1>
            <p className="text-muted-foreground">
              {filteredDeals.length} of {deals.length} deals
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search deals, contacts, emails, phones..."
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(true)}
            className="hidden md:flex"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Active Filters */}
        <FilterChips
          filters={filters}
          onRemoveLocation={handleRemoveLocation}
          onRemoveStatus={handleRemoveStatus}
          onClearPrice={handleClearPrice}
          onClearAll={handleClearAll}
        />
      </div>

      {/* Desktop Filter Panel */}
      <DesktopFilterPanel
        filters={filters}
        onFilterChange={setFilters}
        allDeals={deals}
      />

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-lg">Loading deals...</div>
        </div>
      ) : (
        <>
          {/* Debug info - remove in production */}
          <div className="text-xs text-gray-500 mb-4">
            Total deals: {deals.length} | Filtered: {filteredDeals.length} | 
            Stages: {[...new Set(deals.map(d => d.stage))].join(', ')}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pb-4">
            {dealsByGroup.map(({ group, deals }) => (
              <GroupedPipelineColumn
                key={group.id}
                group={group}
                deals={deals}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        </>
      )}

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        allDeals={deals}
      />

      {/* Drag Indicator */}
      {draggedDeal && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm">
          Moving: {draggedDeal.title}
        </div>
      )}
    </div>
  );
}

// Helper functions
function getPriorityFromStatus(status: string): 'high' | 'medium' | 'low' {
  const statusLower = status.toLowerCase();
  const highPriority = ['interested', 'token', 'meeting_aligned', 'detail send whatsapp'];
  const mediumPriority = ['inprogress', 'follow up', 'visited', 'called'];
  
  if (highPriority.some(pri => statusLower.includes(pri))) return 'high';
  if (mediumPriority.some(pri => statusLower.includes(pri))) return 'medium';
  return 'low';
}

function formatLastActivity(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  } catch {
    return 'Recently';
  }
}

// Extract assigned to info
export function extractLocation(assignedTo: string): string {
  return assignedTo || "Unassigned";
}