import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../auth.types";
import { authStorage } from "../auth-storage";
import { userApi } from "@/features/auth/user.api";
import { isJwtExpired } from "../token";


interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isHydrating: boolean;
    setAuth: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(authStorage.getToken());
    const [user, setUser] = useState<User | null>(null);
    const [isHydrating, setIsHydrating] = useState(false);

    useEffect(() => {
        // On app load, if a token exists, hydrate the user profile
        const bootstrap = async () => {
            if (!token) return;
            setIsHydrating(true);
            try {
                // Proactively clear if token is expired
                if (isJwtExpired(token, 5)) {
                    authStorage.clear();
                    setToken(null);
                    setUser(null);
                    return;
                }

                const profile = await userApi.getMe(token);
                setUser(profile);
            } catch (err: unknown) {
                // Only clear auth on explicit auth failures
                const maybe = err as { status?: number } | undefined;
                const status = maybe?.status ?? 0;
                if (status === 401 || status === 403) {
                    authStorage.clear();
                    setToken(null);
                    setUser(null);
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
    };

    const logout = () => {
        authStorage.clear();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated: !!token, isHydrating, setAuth, logout }}
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
