import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

// RoleBasedRoute.tsx
export function RoleBasedRoute({ allowedRoles, children }) {
    const { isAuthenticated, isHydrating, userRole } = useAuthContext();
    
    if (isHydrating) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!allowedRoles.includes(userRole)) return <Navigate to="/unauthorized" />;
    
    return children;
}