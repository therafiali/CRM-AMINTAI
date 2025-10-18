import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";

interface RoleBasedRouteProps {
    allowedRoles: string[];
    children: React.ReactNode;
}

export function RoleBasedRoute({ allowedRoles, children }: RoleBasedRouteProps) {
    const { isAuthenticated, isHydrating, userRole } = useAuthContext();
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(true);

    // Add this useEffect to handle initial loading
    useEffect(() => {
        if (!isHydrating && userRole !== null) {
            setIsChecking(false);
        }
    }, [isHydrating, userRole]);

    console.log('RoleBasedRoute debug:', {
        allowedRoles,
        userRole,
        isAuthenticated,
        isHydrating,
        isChecking
    });

    // Show loading during initial check or hydration
    if (isHydrating || isChecking) {
        return (
            <div style={{ padding: 16, fontSize: 14, color: "#6b7280" }}>
                Checking permissions...
            </div>
        );

    }
    if (userRole === 'admin') {
        return <>{children}</>;
    }


    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}