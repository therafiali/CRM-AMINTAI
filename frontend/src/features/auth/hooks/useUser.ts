import { useAuthContext } from "../context/AuthContext";

export const useUser = () => {
    const { user, isHydrating } = useAuthContext();
    return { user, isLoading: isHydrating };
};


