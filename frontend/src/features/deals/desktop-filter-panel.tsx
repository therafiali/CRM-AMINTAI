// Add this component
// src/features/deals/components/desktop-filter-panel.tsx
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { extractLocation, type Deal } from "./data/deals-dummy-data";

interface DesktopFilterPanelProps {
  filters: {
    minPrice: number | null;
    maxPrice: number | null;
    locations: string[];
    statuses: string[];
  };
  onFilterChange: (filters: any) => void;
  allDeals: Deal[];
}

export function DesktopFilterPanel({ filters, onFilterChange, allDeals }: DesktopFilterPanelProps) {
  const allLocations = [...new Set(allDeals.map(deal => extractLocation(deal.propertyAddress)))];
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

  return (
    <div className="hidden md:block bg-muted/30 p-4 rounded-lg mb-4">
      <div className="grid grid-cols-2 gap-6">
        {/* Locations */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Locations</Label>
          <div className="flex flex-wrap gap-2">
            {allLocations.map((location) => (
              <Badge
                key={location}
                variant={filters.locations.includes(location) ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => toggleLocation(location)}
              >
                {location}
              </Badge>
            ))}
          </div>
        </div>

        {/* Statuses */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Stages</Label>
          <div className="flex flex-wrap gap-2">
            {allStatuses.map((status) => (
              <Badge
                key={status}
                variant={filters.statuses.includes(status) ? "default" : "outline"}
                className="cursor-pointer text-xs capitalize"
                onClick={() => toggleStatus(status)}
              >
                {status.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}