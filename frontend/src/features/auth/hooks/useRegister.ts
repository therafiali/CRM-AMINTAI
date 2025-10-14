import { useMutation } from "@tanstack/react-query";
import { authApi } from "../auth.api";

export function useRegister() {
    return useMutation({
        mutationKey: ["auth", "register"],
        mutationFn: authApi.register,
    });
}


