// src/features/auth/types/auth.types.ts
import { z } from "zod";

// API layer shapes (as returned by backend)
export const apiUserSchema = z.object({
    id: z.number(),
    name: z.string().nullable().optional(),
    email: z.string().email(),
    isActive: z.boolean(),
    departmentId: z.number().nullable().optional(),
    roleId: z.number().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type ApiUser = z.infer<typeof apiUserSchema>;

export const apiLoginEnvelopeSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user: apiUserSchema,
        token: z.string(),
    }),
});

export type ApiLoginEnvelope = z.infer<typeof apiLoginEnvelopeSchema>;

// Envelope for endpoints that return a single user under { success, data }
export const apiUserEnvelopeSchema = z.object({
    success: z.boolean(),
    // Allow extra fields (e.g., nested department/role) while ensuring required user fields
    data: apiUserSchema.passthrough(),
});

export type ApiUserEnvelope = z.infer<typeof apiUserEnvelopeSchema>;

// App-internal normalized shapes
export interface User {
    id: number;
    name?: string | null;
    email: string;
    isActive: boolean;
    departmentId?: number | null;
    roleId?: number | null;
    roleName?: string
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export function adaptApiUserToUser(api: ApiUser): User {
    return {
        id: api.id,
        name: api.name ?? null,
        email: api.email,
        isActive: api.isActive,
        departmentId: api.departmentId ?? null,
        roleId: api.roleId ?? null,
        createdAt: api.createdAt,
        updatedAt: api.updatedAt,
    };
}
