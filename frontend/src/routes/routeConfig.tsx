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


