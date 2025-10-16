// src/features/deals/components/simplified-deal-pipeline.tsx
"use client";

import { useState, useMemo } from "react";

import { GroupedPipelineColumn } from "./grouped-pipeline-column";

import { DesktopFilterPanel } from "./desktop-filter-panel";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { dummyDeals, groupedStages, type Deal } from "./data/deals-dummy-data";
import { SearchBar } from "./SearchBar";
import { FilterChips } from "./FilterChips";
import { FilterSidebar } from "./FilterSidebar";

export function SimplifiedDealPipeline() {
  const [deals, setDeals] = useState<Deal[]>(dummyDeals);
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

  // Filter deals based on search and filters
  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesSearch = searchTerm === "" || 
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMinPrice = filters.minPrice === null || deal.propertyPrice >= filters.minPrice;
      const matchesMaxPrice = filters.maxPrice === null || deal.propertyPrice <= filters.maxPrice;

      const dealLocation = deal.propertyAddress.split(',').slice(1, 3).join(',').trim();
      const matchesLocation = filters.locations.length === 0 || 
        filters.locations.includes(dealLocation);

      const matchesStatus = filters.statuses.length === 0 || 
        filters.statuses.includes(deal.stage);

      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesLocation && matchesStatus;
    });
  }, [deals, searchTerm, filters]);

  const handleDragStart = (deal: Deal) => {
    setDraggedDeal(deal);
  };

  const handleDrop = (dealId: number, newStage: string) => {
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      )
    );
    setDraggedDeal(null);
  };

  // Group filtered deals by stage groups
  const dealsByGroup = groupedStages.map(group => ({
    group,
    deals: filteredDeals.filter(deal => group.stages.includes(deal.stage))
  }));

  // Filter handlers (same as before)
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
              placeholder="Search deals, contacts, properties..."
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