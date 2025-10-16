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

/**
 * Route type used across the app.
 * You can extend this safely with `icon`, `roles`, etc.
 */
export type AppRoute = {
  path: string
  label: string
  element: ReactNode
  icon?: ElementType // 👈 optional React component for Lucide or custom icon
  roles?: number[] // restrict to specific role IDs
  hidden?: boolean // hide from sidebar navigation
}

/**
 * Main application route definitions
 * (used in router + sidebar navigation)
 */
export const appRoutes: AppRoute[] = [
  {
    path: "/",
    label: "Dashboard",
    element: <DashboardPage />,
    icon: Home,
  },
  {
    path: "/leads",
    label: "Leads Assignment",
    element: <LeadsPage />,
    icon: PhoneCall,
  },
  {
    path: "/leadSales",
    label: "Sales",
    element: <LeadsSales />,
    icon: BarChart3,
  },
  {
    path: "/contact",
    label: "Contact",
    element: <ContactsPage />,
    icon: Contact,
  },
  {
    path: "/property",
    label: "Property",
    element: < PropertiesPage />,
    icon: HousePlus,
  },
  {
    path: "/deal",
    label: "Deals",
    element: < DealsPage />,
    icon: HousePlus,
  },
  {
    path: "/users",
    label: "Users",
    element: <App />,
    icon: Users,
  },
  // Example future pages
  // {
  //   path: "/settings",
  //   label: "Settings",
  //   element: <SettingsPage />,
  //   icon: Settings,
  //   roles: [1],
  // },
]

/**
 * Permission checker
 * Only returns `true` if the route is allowed for the user's role
 */
export function canAccessRoute(
  route: AppRoute,
  userRoleId?: number | null
): boolean {
  if (!route.roles || route.roles.length === 0) return true
  return route.roles.includes(userRoleId ?? -1)
}
