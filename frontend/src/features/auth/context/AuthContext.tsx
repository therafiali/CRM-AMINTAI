import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../auth.types";
import { authStorage } from "../auth-storage";
import { userApi } from "@/features/auth/user.api";
import { isJwtExpired, decodeJwt } from "../token";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isHydrating: boolean;
    userRole: string | null;
    setAuth: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(authStorage.getToken());
    const [user, setUser] = useState<User | null>(null);
    const [isHydrating, setIsHydrating] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    // Extract role from token whenever token changes
    useEffect(() => {
        if (token) {
            try {
                const decoded = decodeJwt(token);
                console.log("decoded", decoded);
                setUserRole(decoded?.roleName as string);
            } catch (error) {
                console.error("Failed to decode token:", error);
                setUserRole(null);
            }
        } else {
            setUserRole(null);
        }
    }, [token]);

    // Bootstrap auth on app load
    useEffect(() => {
        const bootstrap = async () => {
            if (!token) return;
            
            setIsHydrating(true);
            try {
                // Proactively clear if token is expired
                if (isJwtExpired(token, 5)) {
                    authStorage.clear();
                    setToken(null);
                    setUser(null);
                    setUserRole(null);
                    return;
                }

                const profile = await userApi.getMe();
                console.log("User profile from API:", profile);
                setUser(profile);

                // Note: We don't set userRole here anymore - it comes from JWT
                // This avoids race conditions and overriding

            } catch (err: unknown) {
                const maybe = err as { status?: number } | undefined;
                const status = maybe?.status ?? 0;
                if (status === 401 || status === 403) {
                    authStorage.clear();
                    setToken(null);
                    setUser(null);
                    setUserRole(null);
                }
                // For other errors (network/server), keep token so the app can retry later
            } finally {
                setIsHydrating(false);
            }
        };
        void bootstrap();
        // We intentionally run this only once on mount to bootstrap from stored token
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setAuth = (token: string, user: User) => {
        authStorage.setToken(token);
        setToken(token);
        setUser(user);
        
        // Set role from JWT token
        try {
            const decoded = decodeJwt(token);
            setUserRole(decoded?.roleName as string);
        } catch (error) {
            console.error("Failed to decode token during setAuth:", error);
        }
    };

    const logout = () => {
        authStorage.clear();
        setToken(null);
        setUser(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider
            value={{ 
                user, 
                token, 
                isAuthenticated: !!token, 
                isHydrating, 
                userRole,
                setAuth, 
                logout 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
};