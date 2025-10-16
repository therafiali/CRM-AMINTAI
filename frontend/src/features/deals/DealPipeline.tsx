// src/features/deals/components/deal-pipeline.tsx
"use client";

import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { dummyDeals, extractLocation, pipelineStages, type Deal } from "./data/deals-dummy-data";
import { SearchBar } from "./SearchBar";
import { FilterChips } from "./FilterChips";
import { PipelineColumn } from "./PipelineColumn";
import { FilterSidebar } from "./FilterSidebar";
import { DesktopFilterPanel } from "./desktop-filter-panel";

export function DealPipeline() {
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

    // In the DealPipeline component, replace the filteredDeals useMemo with this:

    const filteredDeals = useMemo(() => {
        return deals.filter(deal => {
            // Search filter
            const matchesSearch = searchTerm === "" ||
                deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                deal.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                deal.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());

            // Price filter
            const matchesMinPrice = filters.minPrice === null || deal.propertyPrice >= filters.minPrice;
            const matchesMaxPrice = filters.maxPrice === null || deal.propertyPrice <= filters.maxPrice;

            // Location filter - FIXED
            const dealLocation = extractLocation(deal.propertyAddress);
            const matchesLocation = filters.locations.length === 0 ||
                filters.locations.includes(dealLocation);

            // Status filter - FIXED
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

    // Group filtered deals by stage
    const dealsByStage = pipelineStages.map(stage => ({
        stage,
        deals: filteredDeals.filter(deal => deal.stage === stage.id)
    }));

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
                    {/* <Button
                        variant="outline"
                        onClick={() => setIsFilterOpen(true)}
                        className="hidden md:flex"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button> */}
                </div>

                {/* Active Filters */}
                <FilterChips
                    filters={filters}
                    onRemoveLocation={handleRemoveLocation}
                    onRemoveStatus={handleRemoveStatus}
                    onClearPrice={handleClearPrice}
                    onClearAll={handleClearAll}
                />

                <DesktopFilterPanel
                    filters={filters}
                    onFilterChange={setFilters}
                    allDeals={deals}
                />

            </div>

            {/* Pipeline Columns */}
            <div className="flex gap-4 overflow-x-auto pb-4">
                {dealsByStage.map(({ stage, deals }) => (
                    <PipelineColumn
                        key={stage.id}
                        stage={stage}
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