// StatusSelectPopover.tsx
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type LeadStatus = 
  | "answered"
  | "power off" 
  | "not answering"
  | "follow up"
  | "detail send whatsapp"
  | "meeting aligned"
  | "visited"
  | "closed won"
  | "loss"
  | "interested"
  | "not interested"
  | "token";

interface StatusSelectPopoverProps {
  onStatusSelect?: (status: LeadStatus) => void;
  currentStatus?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "answered", label: "Answered" },
  { value: "power off", label: "Power Off" },
  { value: "not answering", label: "Not Answering" },
  { value: "follow up", label: "Follow Up" },
  { value: "detail send whatsapp", label: "Detail Send WhatsApp" },
  { value: "meeting aligned", label: "Meeting Aligned" },
  { value: "visited", label: "Visited" },
  { value: "closed won", label: "Closed Won" },
  { value: "loss", label: "Loss" },
  { value: "interested", label: "Interested" },
  { value: "not interested", label: "Not Interested" },
  { value: "token", label: "Token" },
];

export function StatusSelectPopover({ 
  onStatusSelect, 
  currentStatus,
  isLoading = false,
  disabled = false
}: StatusSelectPopoverProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (status: LeadStatus) => {
    onStatusSelect?.(status);
    setOpen(false);
  };

  const getStatusDisplay = (status: string) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status);
    return option?.label || status;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={disabled || isLoading}
          className="min-w-[140px] justify-start"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Updating...
            </>
          ) : (
            <>
              <span className="truncate">
                {currentStatus ? getStatusDisplay(currentStatus) : "Select Status"}
              </span>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-2" align="start">
        <div className="space-y-1">
          <h4 className="text-sm font-medium mb-2">Update Status</h4>
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status.value}
              onClick={() => handleSelect(status.value)}
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted transition",
                currentStatus === status.value && "bg-muted",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              <span>{status.label}</span>
              {currentStatus === status.value && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}