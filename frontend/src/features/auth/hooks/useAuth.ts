// src/features/auth/hooks/useAuth.ts
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const { user, token, isAuthenticated, isHydrating } = useAuthContext();
    return { user, token, isAuthenticated, isHydrating };
};
