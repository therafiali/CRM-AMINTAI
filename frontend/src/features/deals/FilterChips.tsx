
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterChipsProps {
  filters: {
    minPrice?: number | null;
    maxPrice?: number | null;
    locations: string[];
    statuses: string[];
  };
  onRemoveLocation: (location: string) => void;
  onRemoveStatus: (status: string) => void;
  onClearPrice: () => void;
  onClearAll: () => void;
}

export function FilterChips({ 
  filters, 
  onRemoveLocation, 
  onRemoveStatus, 
  onClearPrice, 
  onClearAll 
}: FilterChipsProps) {
  const hasActiveFilters = 
    filters.minPrice !== null || 
    filters.maxPrice !== null || 
    filters.locations.length > 0 || 
    filters.statuses.length > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Price Filter */}
      {filters.minPrice !== null && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Min: ${filters.minPrice.toLocaleString()}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={onClearPrice}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Location Filters */}
      {filters.locations.map((location) => (
        <Badge key={location} variant="secondary" className="flex items-center gap-1">
          {location}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemoveLocation(location)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {/* Status Filters */}
      {filters.statuses.map((status) => (
        <Badge key={status} variant="secondary" className="flex items-center gap-1">
          {status}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemoveStatus(status)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {/* Clear All */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-6 text-xs"
      >
        Clear All
      </Button>
    </div>
  );
}