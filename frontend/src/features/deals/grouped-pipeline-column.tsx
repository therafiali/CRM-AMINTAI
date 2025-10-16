import type { Deal } from "./data/deals-dummy-data";
import { DealCard } from "./DealCard";

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
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dealId = parseInt(e.dataTransfer.getData('text/plain'));
    // For grouped columns, we need to decide which stage to assign
    // Let's use the first stage in the group as default
    onDrop(dealId, group.stages[0]);
  };

  // Count deals per stage within this group
  const stageCounts = group.stages.map(stage => ({
    stage,
    count: deals.filter(deal => deal.stage === stage).length
  }));

  return (
    <div 
      className={`flex-1 min-w-80 ${group.color} rounded-lg p-4  border ${group.color} min-h-[600px]`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
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