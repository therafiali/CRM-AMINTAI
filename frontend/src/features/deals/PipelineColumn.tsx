import type { Deal } from "./data/deals-dummy-data";
import { DealCard } from "./DealCard";

interface PipelineColumnProps {
  stage: {
    id: string;
    name: string;
    color: string;
  };
  deals: Deal[];
  onDrop: (dealId: number, newStage: string) => void;
  onDragStart: (deal: Deal) => void;
}

export function PipelineColumn({ stage, deals, onDrop, onDragStart }: PipelineColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dealId = parseInt(e.dataTransfer.getData('text/plain'));
    onDrop(dealId, stage.id);
  };

  return (
    <div 
      className="flex-1 min-w-64 bg-gray-50 rounded-lg p-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{stage.name}</h3>
        <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
          {deals.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {deals.map((deal) => (
          <DealCard
            key={deal.id} 
            deal={deal} 
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}