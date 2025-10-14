
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { authApi } from "../auth.api";

export const useLogin = () => {
    const { setAuth } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        const res = await authApi.login({ email, password });
        setAuth(res.token, res.user);
        navigate("/");
    };

    return { login };
};
