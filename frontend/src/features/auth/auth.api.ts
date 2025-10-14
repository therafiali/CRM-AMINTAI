// src/features/auth/api/auth.api.ts
import { http } from "@/lib/http";
import {
    type AuthResponse,
    apiLoginEnvelopeSchema,
    adaptApiUserToUser,
    apiUserEnvelopeSchema,
} from "./auth.types";

export const authApi = {
    login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
        const envelope = await http.post<unknown>("/auth/login", data);
        const parsed = apiLoginEnvelopeSchema.parse(envelope);
        return {
            token: parsed.data.token,
            user: adaptApiUserToUser(parsed.data.user),
        };
    },
    register: async (data: {
        name: string;
        email: string;
        password: string;
        roleId: number;
        departmentId: number;
    }) => {
        const envelope = await http.post<unknown>("/auth/signup", data);
        // Signup may return either { success, data: { user, token } } or { success, data: user }
        const loginLike = apiLoginEnvelopeSchema.safeParse(envelope);
        if (loginLike.success) {
            return adaptApiUserToUser(loginLike.data.data.user);
        }
        const userOnly = apiUserEnvelopeSchema.parse(envelope);
        return adaptApiUserToUser(userOnly.data);
    },
};
