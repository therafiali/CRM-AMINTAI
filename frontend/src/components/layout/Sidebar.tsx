import { NavLink } from "react-router-dom";
import { appRoutes, canAccessRoute } from "@/routes/routeConfig";
import {
  Sidebar as UISidebar,
  SidebarHeader,
  SidebarNav,
} from "@/components/ui/sidebar";

import { LogoutButton } from "@/features/auth/LogoutButton";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "../../assets/logo-black.png";
import profile from "../../assets/profile.avif";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export function Sidebar() {
  const { user, userRole } = useAuthContext(); // ✅ CHANGE: Get userRole from AuthContext
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ✅ Filter routes based on user's role
  const visibleRoutes = appRoutes.filter(
    (route) => !route.hidden && canAccessRoute(route, userRole)
  );

  console.log('Sidebar debug:', {
    userRole,
    totalRoutes: appRoutes.length,
    visibleRoutes: visibleRoutes.length,
    visibleRouteLabels: visibleRoutes.map(r => r.label)
  });

  // Close sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const sidebarContent = (
    <>
      {/* --- Header with Logo --- */}
      <SidebarHeader className="flex items-center justify-between pb-4 border-b border-border/30">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-auto h-12 lg:h-20" />
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden p-1 rounded-md hover:bg-muted/50 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
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
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 ${isActive
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

      {/* --- User Info + Logout --- */}
      <div className="mt-4 pt-4 border-t border-border border-black p-2">
        {false ? (
          <p className="text-xs text-muted-foreground">Loading user...</p>
        ) : user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={profile} alt="Profile" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium leading-none truncate capitalize">
                  {user.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
                {/* ✅ Show user role */}
                <span className="text-xs text-primary font-medium capitalize">
                  {userRole}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No user found</p>
        )}
        <LogoutButton
          asChild
          className="text-muted-foreground hover:text-destructive transition m-4 w-full border-2 border-black hover:border-orange-500 hover:bg-orange-100 "
        >
          <button title="Logout" className="p-1 rounded-md hover:bg-muted text-black">
            <span className="text-black" >Logout </span>  <LogOut className="h-4 w-4 text-black" />
          </button>
        </LogoutButton>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-background border shadow-sm"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop Sidebar - Always visible on desktop */}
      <div className="hidden md:block h-full">
        <UISidebar className="flex flex-col justify-between bg-gradient-to-b from-background to-muted/30 border-r border-border/50 p-4 h-full">
          {sidebarContent}
        </UISidebar>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/90 z-40 md:hidden"
            />

            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-72 z-50 md:hidden bg-gradient-to-b from-background to-muted/30 border-r border-border/50 p-4"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}