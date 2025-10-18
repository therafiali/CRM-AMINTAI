import type { ReactNode, ElementType } from "react"

// ✅ Import your pages
import App from "@/App"
import LeadsPage from "@/features/leads/LeadsPage"
import { LeadsSales } from "@/features/leads/LeadSalesPage"
import DashboardPage from "@/features/dashboard/DashboardPage"

// ✅ Import Lucide icons (used in Sidebar)
import { Home, Users, PhoneCall, BarChart3, Contact, HousePlus } from "lucide-react"
import ContactsPage from "@/features/contacts/ContactPage"
import PropertiesPage from "@/features/property/PropertyPage"
import DealsPage from "@/features/deals/DealPage"
import CallTracker from "@/components/WhatsAppCallTracker"

/**
 * Route type used across the app.
 */
export type AppRoute = {
  path: string
  label: string
  element: ReactNode
  icon?: ElementType
  roles?: string[] // ✅ CHANGE: Now string array for role names
  hidden?: boolean // hide from sidebar navigation
}

/**
 * Main application route definitions
 */
export const appRoutes: AppRoute[] = [
  {
    path: "/",
    label: "Dashboard",
    element: <DashboardPage />,
    icon: Home,
    roles: ['admin', 'sales-manager', 'user', 'sales-agent'] // ✅ All roles can access
  },
  {
    path: "/leads",
    label: "Leads Assignment",
    element: <LeadsPage />,
    icon: PhoneCall,
    roles: ['admin', 'sales-manager'] // ✅ Only admin and manager
  },
  {
    path: "/leadSales",
    label: "Sales",
    element: <LeadsSales />,
    icon: BarChart3,
    roles: ['admin', 'sales-manager', 'user', 'sales-agent'] // ✅ All roles
  },
  {
    path: "/contact",
    label: "Contact",
    element: <ContactsPage />,
    icon: Contact,
    roles: ['admin', 'sales-manager', 'sales-agent'] // ✅ Only admin and manager
  },
  {
    path: "/property",
    label: "Property",
    element: <PropertiesPage />,
    icon: HousePlus,
    roles: ['admin', 'sales-manager', 'user', 'sales-agent'] // ✅ All roles
  },
  {
    path: "/deal",
    label: "Deals",
    element: <DealsPage />,
    icon: HousePlus,
    roles: ['admin', 'manager'] // ✅ Only admin and manager
  },
  {
    path: "/dail-demo",
    label: "CALL DEMO",
    element: <CallTracker
      customerNumber="+923190269909"
      customerName="Rafi Ali"
      agentId="agent_001"
    />,
    icon: HousePlus,
    roles: ['admin', 'sales-manager', "sales-agent"] // ✅ Only admin
  },
  {
    path: "/users",
    label: "Users",
    element: <App />,
    icon: Users,
    roles: ['admin'] // ✅ Only admin
  },
]

/**
 * Permission checker for routes
 */
export function canAccessRoute(
  route: AppRoute,
  userRole?: string | null // ✅ CHANGE: Now string role name
): boolean {
  // If no roles defined, allow everyone
  if (!route.roles || route.roles.length === 0) return true

  // If user has no role, deny access
  if (!userRole) return false

  // Admin can access everything
  if (userRole === 'admin') return true

  // Check if user's role is in allowed roles
  return route.roles.includes(userRole)
}