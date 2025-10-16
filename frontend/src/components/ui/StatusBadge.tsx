import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, XCircle, PhoneCall, Star, Loader2 } from "lucide-react"
import type { JSX } from "react"

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase()

  const statusMap: Record<
    string,
    { label: string; color: string; icon: JSX.mElement }
  > = {
    new: {
      label: "New Lead",
      color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200",
      icon: <Star className="w-3.5 h-3.5" />,
    },
    contacted: {
      label: "Contacted",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
      icon: <PhoneCall className="w-3.5 h-3.5" />,
    },
    inprogress: {
      label: "In Progress",
      color: "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-200",
      icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
    },
    won: {
      label: "Won",
      color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    lost: {
      label: "Lost",
      color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200",
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
    default: {
      label: status,
      color: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
  }

  const { label, color, icon } = statusMap[normalized] || statusMap.default

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        color
      )}
    >
      {icon}
      {label}
    </Badge>
  )
}
