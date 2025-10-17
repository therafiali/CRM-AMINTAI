// StatusBadge.tsx
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, XCircle, PhoneCall, Star, Loader2, ChevronDown } from "lucide-react"
import type { JSX } from "react"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export type LeadStatus = 
  | "new"
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
  | "token"
  | "contacted"
  | "inprogress"
  | "won"
  | "lost";

interface StatusBadgeProps {
  status: string
  onStatusChange?: (newStatus: LeadStatus) => void
  isLoading?: boolean
  disabled?: boolean
}

const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string; icon: JSX.Element }[] = [
  { 
    value: "new", 
    label: "New Lead", 
    color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200",
    icon: <Star className="w-3.5 h-3.5" />
  },
  { 
    value: "answered", 
    label: "Answered", 
    color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />
  },
  { 
    value: "power off", 
    label: "Power Off", 
    color: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200",
    icon: <XCircle className="w-3.5 h-3.5" />
  },
  { 
    value: "not answering", 
    label: "Not Answering", 
    color: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200",
    icon: <PhoneCall className="w-3.5 h-3.5" />
  },
  { 
    value: "follow up", 
    label: "Follow Up", 
    color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200",
    icon: <Clock className="w-3.5 h-3.5" />
  },
  { 
    value: "detail send whatsapp", 
    label: "Detail Send WhatsApp", 
    color: "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900 dark:text-teal-200",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />
  },
  { 
    value: "meeting aligned", 
    label: "Meeting Aligned", 
    color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-200",
    icon: <Clock className="w-3.5 h-3.5" />
  },
  { 
    value: "visited", 
    label: "Visited", 
    color: "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-200",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />
  },
  { 
    value: "closed won", 
    label: "Closed Won", 
    color: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-200",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />
  },
  { 
    value: "loss", 
    label: "Loss", 
    color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200",
    icon: <XCircle className="w-3.5 h-3.5" />
  },
  { 
    value: "interested", 
    label: "Interested", 
    color: "bg-lime-100 text-lime-800 border-lime-200 dark:bg-lime-900 dark:text-lime-200",
    icon: <Star className="w-3.5 h-3.5" />
  },
  { 
    value: "not interested", 
    label: "Not Interested", 
    color: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900 dark:text-rose-200",
    icon: <XCircle className="w-3.5 h-3.5" />
  },
  { 
    value: "token", 
    label: "Token", 
    color: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-200",
    icon: <Star className="w-3.5 h-3.5" />
  },
  { 
    value: "contacted", 
    label: "Contacted", 
    color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
    icon: <PhoneCall className="w-3.5 h-3.5" />
  },
  { 
    value: "inprogress", 
    label: "In Progress", 
    color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-200",
    icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />
  },
  { 
    value: "won", 
    label: "Won", 
    color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />
  },
  { 
    value: "lost", 
    label: "Lost", 
    color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200",
    icon: <XCircle className="w-3.5 h-3.5" />
  },
]

export function StatusBadge({ status, onStatusChange, isLoading = false, disabled = false }: StatusBadgeProps) {
  const [open, setOpen] = useState(false)
  const normalized = status.toLowerCase()

  const currentStatus = STATUS_OPTIONS.find(opt => opt.value === normalized) || 
    STATUS_OPTIONS.find(opt => opt.value === "new")!

  const handleSelect = (newStatus: LeadStatus) => {
    onStatusChange?.(newStatus)
    setOpen(false)
  }

  // If no onStatusChange provided, render as static badge
  if (!onStatusChange) {
    return (
      <Badge
        variant="outline"
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
          currentStatus.color
        )}
      >
        {currentStatus.icon}
        {currentStatus.label}
      </Badge>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={disabled || isLoading}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border h-auto hover:bg-opacity-80 transition-all",
            currentStatus.color,
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              {currentStatus.icon}
              {currentStatus.label}
              <ChevronDown className="w-3 h-3 opacity-70" />
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-2 max-h-80 overflow-y-auto" align="start">
        <div className="space-y-1">
          <h4 className="text-sm font-medium mb-2">Update Status</h4>
          {STATUS_OPTIONS.map((statusOption) => (
            <button
              key={statusOption.value}
              onClick={() => handleSelect(statusOption.value)}
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted transition",
                normalized === statusOption.value && "bg-muted",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full", statusOption.color.split(' ')[0])} />
                {statusOption.icon}
                <span>{statusOption.label}</span>
              </div>
              {normalized === statusOption.value && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}