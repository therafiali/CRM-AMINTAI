// src/features/deals/components/priority-badge.tsx
import { Badge } from "@/components/ui/badge";

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const priorityConfig = {
    high: { label: 'High', variant: 'destructive' as const },
    medium: { label: 'Medium', variant: 'secondary' as const },
    low: { label: 'Low', variant: 'outline' as const }
  };

  const config = priorityConfig[priority];

  return (
    <Badge variant={config.variant} className="text-xs">
      {config.label}
    </Badge>
  );
}