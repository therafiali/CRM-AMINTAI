import { http } from "@/lib/http";
import { adaptApiUserToUser, apiUserEnvelopeSchema, type User } from "./auth.types";

export const userApi = {
    getMe: async (): Promise<User> => {
        const envelope = await http.get<unknown>("/user/me");
        const parsed = apiUserEnvelopeSchema.parse(envelope);
        return adaptApiUserToUser(parsed.data);
    },
};


