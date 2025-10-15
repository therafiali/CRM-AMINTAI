import { NavLink } from "react-router-dom";
import { appRoutes, canAccessRoute } from "@/routes/routeConfig";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Sidebar as UISidebar, SidebarHeader, SidebarNav } from "@/components/ui/sidebar";

export function Sidebar() {
    const { user } = useAuth();
    const roleId = user?.roleId ?? null;

    const visibleRoutes = appRoutes.filter((r) => !r.hidden && canAccessRoute(r, roleId));

    return (
        <UISidebar>
            <SidebarHeader>
                <span className="text-base font-semibold">CRM</span>
            </SidebarHeader>
            <SidebarNav>
                {visibleRoutes.map((route) => (
                    <NavLink
                        key={route.path}
                        to={route.path}
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-2 rounded px-3 py-2 text-sm ${isActive ? "bg-gray-900 text-white" : "text-gray-800 hover:bg-gray-100"}`
                        }
                    >
                        <span>{route.label}</span>
                    </NavLink>
                ))}
            </SidebarNav>
        </UISidebar>
    );
}


