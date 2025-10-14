import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
        // .regex(/[A-Z]/, "Include at least one uppercase letter")
        // .regex(/[a-z]/, "Include at least one lowercase letter")
        // .regex(/[0-9]/, "Include at least one number")
        // .regex(/[^A-Za-z0-9]/, "Include at least one symbol"),
    roleId: z.number().int().positive(),
    departmentId: z.number().int().positive(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;


