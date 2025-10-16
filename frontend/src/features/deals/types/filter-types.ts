// src/features/deals/types/filter-types.ts
export interface DealFilters {
  search: string;
  minPrice: number | null;
  maxPrice: number | null;
  locations: string[];
  statuses: string[];
}