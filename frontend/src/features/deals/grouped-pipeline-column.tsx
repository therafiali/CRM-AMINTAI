import type { Deal } from "./data/deals-dummy-data";
import { DealCard } from "./DealCard";
import { useState, useRef } from "react";

interface GroupedPipelineColumnProps {
  group: {
    id: string;
    name: string;
    color: string;
    stages: string[];
  };
  deals: Deal[];
  onDrop: (dealId: number, newStage: string) => void;
  onDragStart: (deal: Deal) => void;
}

export function GroupedPipelineColumn({ group, deals, onDrop, onDragStart }: GroupedPipelineColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const touchTimer = useRef<NodeJS.Timeout>();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const dealId = parseInt(e.dataTransfer.getData('text/plain'));
    onDrop(dealId, group.stages[0]);
  };

  // Touch event handlers for better mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent default to avoid scrolling issues
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Allow touch moves without interrupting
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Handle quick tap as potential drop zone activation
    e.preventDefault();
  };

  // Count deals per stage within this group
  const stageCounts = group.stages.map(stage => ({
    stage,
    count: deals.filter(deal => deal.stage === stage).length
  }));

  return (
    <div 
      className={`flex-1 min-w-80 ${group.color} rounded-lg p-4 border transition-all duration-200 min-h-[600px] ${
        isDragOver ? 'ring-2 ring-blue-500 ring-opacity-50 scale-[0.99]' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Group Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b">
        <div>
          <h3 className="font-semibold text-lg">{group.name}</h3>
          <div className="flex gap-2 mt-1 flex-wrap">
            {stageCounts.map(({ stage, count }) => (
              <span key={stage} className="text-xs bg-white px-2 py-1 rounded border">
                {stage.replace(/_/g, ' ')}: {count}
              </span>
            ))}
          </div>
        </div>
        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium border">
          {deals.length}
        </span>
      </div>
      
      {/* Deal Cards */}
      <div className="space-y-3">
        {deals.map((deal) => (
          <DealCard
            key={deal.id} 
            deal={deal} 
            onDragStart={onDragStart}
          />
        ))}
        {deals.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-8">
            No deals in this group
          </div>
        )}
      </div>
    </div>
  );
}