import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function PrivateRoute() {
    const { isAuthenticated, isHydrating } = useAuth();
    const location = useLocation();

    // Wait for initial auth hydration before deciding
    if (isHydrating) {
        return (
            <div style={{ padding: 16, fontSize: 14, color: "#6b7280" }}>Loading...</div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return <Outlet />;
}
