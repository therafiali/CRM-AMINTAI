import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../auth.types";
import { authStorage } from "../auth-storage";
import { userApi } from "@/features/auth/user.api";
import { isJwtExpired, decodeJwt } from "../token"; // decodeJwt import kiya

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

    useEffect(() => {
        // Token se role extract karo
        if (token) {
            try {
                const decoded = decodeJwt(token);
                setUserRole(decoded.roleName as string); // type cast karo
            } catch (error) {
                console.error("Failed to decode token:", error);
                setUserRole(null);
            }
        }
    }, [token]);

    useEffect(() => {
        const bootstrap = async () => {
            if (!token) return;
            setIsHydrating(true);
            try {
                if (isJwtExpired(token, 5)) {
                    authStorage.clear();
                    setToken(null);
                    setUser(null);
                    setUserRole(null);
                    return;
                }

                const profile = await userApi.getMe();
                setUser(profile);
                
                // User data se role set karo (backup)
                if (profile.role?.name) {
                    setUserRole(profile.role.name);
                }
            } catch (err: unknown) {
                const maybe = err as { status?: number } | undefined;
                const status = maybe?.status ?? 0;
                if (status === 401 || status === 403) {
                    authStorage.clear();
                    setToken(null);
                    setUser(null);
                    setUserRole(null);
                }
            } finally {
                setIsHydrating(false);
            }
        };
        void bootstrap();
    }, []);

    const setAuth = (token: string, user: User) => {
        authStorage.setToken(token);
        setToken(token);
        setUser(user);
        
        // Role set karo - pehle user data se, phir JWT se fallback
        if (user.role?.name) {
            setUserRole(user.role.name);
        } else {
            try {
                const decoded = decodeJwt(token);
                setUserRole(decoded.roleName as string);
            } catch (error) {
                console.error("Failed to decode token during setAuth:", error);
            }
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