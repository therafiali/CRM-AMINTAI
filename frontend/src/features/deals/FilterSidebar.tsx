// src/features/deals/components/filter-sidebar.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { extractLocation, type Deal } from "./data/deals-dummy-data";


interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    minPrice: number | null;
    maxPrice: number | null;
    locations: string[];
    statuses: string[];
  };
  onFilterChange: (filters: any) => void;
  allDeals: Deal[];
}

export function FilterSidebar({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  allDeals 
}: FilterSidebarProps) {
  if (!isOpen) return null;

  // Get unique locations using the extractLocation function
  const allLocations = [...new Set(allDeals.map(deal => extractLocation(deal.propertyAddress)))];
  
  // Get unique statuses (stage names)
  const allStatuses = [...new Set(allDeals.map(deal => deal.stage))];

  const toggleLocation = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location];
    
    onFilterChange({ ...filters, locations: newLocations });
  };

  const toggleStatus = (status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    
    onFilterChange({ ...filters, statuses: newStatuses });
  };

  const updatePriceFilter = (type: 'min' | 'max', value: string) => {
    const numValue = value ? parseInt(value) : null;
    onFilterChange({
      ...filters,
      [type === 'min' ? 'minPrice' : 'maxPrice']: numValue
    });
  };

  return (
    <div className="fixed inset-0   bg-opacity-50 z-50 ">
      <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto  border-black border-l">
        <div className="flex justify-between items-center mb-6 ">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>

        {/* Price Range */}
        <div className="space-y-4 mb-6">
          <Label>Price Range ($)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min price"
              value={filters.minPrice || ''}
              onChange={(e) => updatePriceFilter('min', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice || ''}
              onChange={(e) => updatePriceFilter('max', e.target.value)}
            />
          </div>
        </div>

        {/* Locations */}
        <div className="space-y-3 mb-6">
          <Label>Locations ({filters.locations.length})</Label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {allLocations.map((location) => (
              <Badge
                key={location}
                variant={filters.locations.includes(location) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => toggleLocation(location)}
              >
                {location}
              </Badge>
            ))}
          </div>
        </div>

        {/* Statuses */}
        <div className="space-y-3">
          <Label>Stages ({filters.statuses.length})</Label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {allStatuses.map((status) => (
              <Badge
                key={status}
                variant={filters.statuses.includes(status) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80 capitalize"
                onClick={() => toggleStatus(status)}
              >
                {status.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear All Button */}
        <Button 
          variant="outline" 
          className="w-full mt-6"
          onClick={() => onFilterChange({ minPrice: null, maxPrice: null, locations: [], statuses: [] })}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}