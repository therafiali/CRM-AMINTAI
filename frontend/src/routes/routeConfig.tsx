<<<<<<< HEAD
import type { ReactNode } from "react";
import App from "@/App";
import LeadsPage from "@/features/leads/LeadsPage";

// Minimal route shape with optional roles and hidden flag
export type AppRoute = {
    path: string;
    label: string;
    element: ReactNode;
    roles?: number[]; // if set, only these roleIds can access
    hidden?: boolean; // hide from sidebar navigation
};

export const appRoutes: AppRoute[] = [
    { path: "/", label: "Users", element: <App /> },
    { path: "/leads", label: "Leads", element: <LeadsPage /> },
    // Example future pages (uncomment when pages exist)
    // { path: "/users", label: "Users", element: <UsersPage />, roles: [1] },
    // { path: "/settings", label: "Settings", element: <SettingsPage /> },
];

export function canAccessRoute(route: AppRoute, userRoleId?: number | null): boolean {
    if (!route.roles || route.roles.length === 0) return true;
    return route.roles.includes(userRoleId ?? -1);
}


=======
import type { ReactNode, ElementType } from "react"

// ✅ Import your pages
import App from "@/App"
import LeadsPage from "@/features/leads/LeadsPage"
import { LeadsSales } from "@/features/leads/LeadSalesPage"
import DashboardPage from "@/features/dashboard/DashboardPage"

// ✅ Import Lucide icons (used in Sidebar)
import { Home, Users, PhoneCall, BarChart3 } from "lucide-react"

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
>>>>>>> 171e6a2 (UI better)
