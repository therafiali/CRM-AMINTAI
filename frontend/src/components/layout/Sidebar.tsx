import { NavLink } from "react-router-dom";
import { appRoutes, canAccessRoute } from "@/routes/routeConfig";
import {
  Sidebar as UISidebar,
  SidebarHeader,
  SidebarNav,
} from "@/components/ui/sidebar";
import { useUser } from "@/features/auth/hooks/useUser";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { UserCircle2, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../../assets/logo-black.png";
import profile from "../../assets/profile.avif";
import WhatsAppCallTracker from "../WhatsAppCallTracker";
import CallTracker from "../WhatsAppCallTracker";

export function Sidebar() {
  const { user, isLoading } = useUser();
  const roleId = user?.roleId ?? null;

  const visibleRoutes = appRoutes.filter(
    (r) => !r.hidden && canAccessRoute(r, roleId)
  );

  return (
    <UISidebar className="flex flex-col justify-between bg-gradient-to-b from-background to-muted/30 border-r border-border/50 p-4">
      {/* --- Header with Logo --- */}
      <SidebarHeader className="flex items-center gap-2 pb-4 border-b border-border/30">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">CRM</span>
          </div> */}
          {/* <span className="text-base font-semibold">Amintai CRM</span> */}

          <img src={Logo} alt="logo" className="w-auto" />
        </motion.div>
      </SidebarHeader>

      {/* --- Navigation --- */}
      <SidebarNav className="flex-1 overflow-y-auto py-4 space-y-1">
        {visibleRoutes.map((route, i) => (
          <motion.div
            key={route.path}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <NavLink
              to={route.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`
              }
            >
              {route.icon && <route.icon className="h-4 w-4" />}
              <span>{route.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </SidebarNav>

       <div>
     // In your parent component
<CallTracker
  customerNumber="+923190269909"
  customerName="Sarah Johnson"
  agentId="agent_001"
/>
    </div>

      {/* --- User Info + Logout --- */}
      <div className="mt-4 pt-4 border-t border-border/30">
        {isLoading ? (
          <p className="text-xs text-muted-foreground">Loading user...</p>
        ) : user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                {/* <UserCircle2 className="h-5 w-5 text-primary" /> */}
                <img src={profile} alt="Profile" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">
                  {user.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>

            <LogoutButton
              asChild
              className="text-muted-foreground hover:text-destructive transition"
            >
              <button title="Logout" className="p-1 rounded-md hover:bg-muted">
                <LogOut className="h-4 w-4" />
              </button>
            </LogoutButton>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No user found</p>
        )}
      </div>
    </UISidebar>
  );
}
