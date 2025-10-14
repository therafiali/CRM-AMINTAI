// src/features/auth/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const useLogout = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    return () => {
        logout();
        navigate("/login");
    };
};
