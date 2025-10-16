// src/features/deals/components/deal-card.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { PriorityBadge } from "./priority-badge";
import type { Deal } from "./data/deals-dummy-data";

interface DealCardProps {
  deal: Deal;
  onDragStart: (deal: Deal) => void;
}


const getStageColor = (stage: string) => {
  const stageColors: Record<string, string> = {
    called: "border-blue-200 bg-blue-50",
    answer: "border-green-200 bg-green-50", 
    poweroff: "border-yellow-200 bg-yellow-50",
    not_answering: "border-red-200 bg-red-50",
    followup: "border-purple-200 bg-purple-50",
    detail_send_whatsapp: "border-teal-200 bg-teal-50",
    meeting_aligned: "border-indigo-200 bg-indigo-50",
    visited: "border-pink-200 bg-pink-50",
    interested: "border-emerald-200 bg-emerald-50",
    token: "border-amber-200 bg-amber-50",
    closed_won: "border-green-200 bg-green-50",
    closed_loss: "border-red-200 bg-red-50",
    not_interested: "border-gray-200 bg-gray-50"
  };
  return stageColors[stage] || "border-gray-200 bg-gray-50";
};


export function DealCard({ deal, onDragStart }: DealCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatStageName = (stage: string) => {
    return stage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', deal.id.toString());
    onDragStart(deal);
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow border `}
      draggable
      onDragStart={handleDragStart}
    >
      <CardContent className="p-3">
        <div className="space-y-2">
          {/* Header Row */}
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{deal.title}</h3>
              <Badge variant="outline" className="text-xs mt-1">
                {formatStageName(deal.stage)}
              </Badge>
            </div>
            <PriorityBadge priority={deal.priority} />
          </div>
          
          {/* Contact Info */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">{deal.contactName}</p>
            <p className="truncate">{deal.propertyAddress}</p>
          </div>

          {/* Footer Row */}
          <div className="flex justify-between items-center pt-1">
            <Badge variant="secondary" className="text-xs font-normal">
              {formatPrice(deal.propertyPrice)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {deal.lastActivity}
            </span>
          </div>

          {/* Follow-up Date (if exists) */}
          {deal.followUpDate && (
            <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
              <span>📅</span>
              <span>Follow up: {deal.followUpDate}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}