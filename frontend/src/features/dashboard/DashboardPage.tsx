import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { motion } from "framer-motion"
import {
  Users,
  Briefcase,
  ListChecks,
  Percent,
  TrendingUp,
  Target,
  Phone,
} from "lucide-react"

export default function DashboardPage() {
  // 🧠 Dummy summary stats
  const stats = [
    { label: "Total Leads", value: 248, icon: Users, color: "text-blue-500" },
    { label: "Active Deals", value: 76, icon: Briefcase, color: "text-green-500" },
    { label: "Completed Tasks", value: 184, icon: ListChecks, color: "text-purple-500" },
    { label: "Conversion Rate", value: "38%", icon: Percent, color: "text-orange-500" },
  ]

  // 📈 Dummy leads growth
  const leadsData = [
    { month: "Jan", leads: 40 },
    { month: "Feb", leads: 60 },
    { month: "Mar", leads: 90 },
    { month: "Apr", leads: 70 },
    { month: "May", leads: 110 },
    { month: "Jun", leads: 150 },
  ]

  // 📊 Dummy deals by stage
  const dealsData = [
    { stage: "New", value: 40 },
    { stage: "Contacted", value: 32 },
    { stage: "Negotiation", value: 20 },
    { stage: "Won", value: 15 },
    { stage: "Lost", value: 12 },
  ]

  // 🥧 Dummy lead sources
  const sourceData = [
    { name: "Website", value: 400, color: "#3b82f6" },
    { name: "Referral", value: 300, color: "#10b981" },
    { name: "LinkedIn", value: 200, color: "#8b5cf6" },
    { name: "Ads", value: 100, color: "#f59e0b" },
  ]

  return (
    <div className="p-8 space-y-10 bg-gradient-to-b from-background to-muted/40">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">
            Performance insights & activity summary for your sales pipeline.
          </p>
        </div>
     
      </div>

      {/* Animated Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="relative overflow-hidden border-border/40 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {s.label}
                </CardTitle>
                <div
                  className={`p-2 rounded-full bg-muted/60 ${s.color} bg-opacity-20`}
                >
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{s.value}</div>
              </CardContent>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Leads Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2"
        >
          <Card className="bg-gradient-to-br from-background to-muted/20 border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" /> Leads Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={leadsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="currentColor" fontSize={12} />
                    <YAxis stroke="currentColor" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#3b82f6" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deals by Stage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-background to-muted/20 border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" /> Deals by Stage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dealsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="stage" stroke="currentColor" fontSize={12} />
                    <YAxis stroke="currentColor" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lead Sources (Pie Chart) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gradient-to-br from-background to-muted/20 border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-purple-500" /> Lead Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row items-center justify-around gap-4">
            <div className="h-[250px] w-full lg:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {sourceData.map((s) => (
                <li key={s.name} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
