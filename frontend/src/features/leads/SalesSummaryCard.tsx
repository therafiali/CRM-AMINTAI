import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Users, PhoneCall, Trophy, XCircle } from "lucide-react"

interface CardItem {
  label: string
  value: string | number
  icon: React.ElementType
  gradient: string
  iconColor: string
}

interface SalesSummaryCardsProps {
  cards?: CardItem[]
}

export default function SalesSummaryCards({ cards }: SalesSummaryCardsProps) {
  // ✅ Default dummy data (used if no props passed)
  const defaultCards: CardItem[] = [
    {
      label: "Total Leads",
      value: 248,
      icon: Users,
      gradient: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-500",
    },
    {
      label: "Contacted",
      value: 124,
      icon: PhoneCall,
      gradient: "from-yellow-500/10 to-yellow-500/5",
      iconColor: "text-yellow-500",
    },
    {
      label: "Deals Won",
      value: 58,
      icon: Trophy,
      gradient: "from-green-500/10 to-green-500/5",
      iconColor: "text-green-500",
    },
    {
      label: "Deals Lost",
      value: 32,
      icon: XCircle,
      gradient: "from-red-500/10 to-red-500/5",
      iconColor: "text-red-500",
    },
  ]

  const dataToRender = cards ?? defaultCards

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {dataToRender.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card
            className={`relative overflow-hidden border-border/50 bg-gradient-to-br ${c.gradient} hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {c.label}
              </CardTitle>
              <div className={`p-2 rounded-full bg-background/50 shadow-sm`}>
                <c.icon className={`h-4 w-4 ${c.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{c.value}</div>
            </CardContent>
            <div
              className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${c.gradient}`}
            />
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
