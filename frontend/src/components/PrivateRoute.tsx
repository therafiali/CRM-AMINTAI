import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import DashboardSkeleton from "./layout/DashboardSkeleton";

export function PrivateRoute() {
    const { isAuthenticated, isHydrating } = useAuth();
    const location = useLocation();

    // Wait for initial auth hydration before deciding
    if (isHydrating) {
        return (
            <DashboardSkeleton isLoading={isHydrating} />
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return <Outlet />;
}
