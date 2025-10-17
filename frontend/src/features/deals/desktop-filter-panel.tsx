// Updated DesktopFilterPanel to use assignedTo instead of locations
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Deal } from "./simplified-deal-pipeline";

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
  const allAssignedTo = [...new Set(allDeals.map(deal => deal.assignedTo || "Unassigned"))];
  const allStatuses = [...new Set(allDeals.map(deal => deal.stage))];

  const toggleAssignedTo = (assignedTo: string) => {
    const newLocations = filters.locations.includes(assignedTo)
      ? filters.locations.filter(l => l !== assignedTo)
      : [...filters.locations, assignedTo];
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
        {/* Assigned To */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Assigned To</Label>
          <div className="flex flex-wrap gap-2">
            {allAssignedTo.map((assignedTo) => (
              <Badge
                key={assignedTo}
                variant={filters.locations.includes(assignedTo) ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => toggleAssignedTo(assignedTo)}
              >
                {assignedTo}
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