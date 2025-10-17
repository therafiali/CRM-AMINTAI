import { http } from "@/lib/http";
import { z } from "zod";

// API response: { success, data: ApiUserWithRelations[], meta }
const apiDepartmentSchema = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

const apiRoleSchema = z.object({
    id: z.number(),
    name: z.string(),
    departmentId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

const apiUserWithRelationsSchema = z.object({
    id: z.number(),
    name: z.string().nullable().optional(),
    email: z.string().email(),
    isActive: z.boolean(),
    departmentId: z.number().nullable().optional(),
    roleId: z.number().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    department: apiDepartmentSchema.optional(),
    role: apiRoleSchema.optional(),
});

const apiUsersEnvelopeWithMetaSchema = z.object({
    success: z.boolean(),
    data: z.array(apiUserWithRelationsSchema),
    meta: z.object({
        total: z.number(),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        hasNextPage: z.boolean(),
        hasPrevPage: z.boolean(),
    }),
});


const apiUsernameResponseSchema = z.object({
  success: z.boolean(),
}).catchall(
  z.object({
    id: z.number(),
    name: z.string(),
  })
);


export type UsernameItem = {
  id: number;
  name: string;
};



export type UsernameResponse = {
  users: UsernameItem[];
  success: boolean;
};


export type UserListItem = {
    id: number;
    name: string;
    email: string;
    departmentName: string;
    roleName: string;
};

export type ListUsersParams = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    q?: string;
};

export type ListUsersResult = {
    items: UserListItem[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
};

export const usersApi = {
    list: async (params: ListUsersParams = {}): Promise<ListUsersResult> => {
        const q = new URLSearchParams();
        if (params.page) q.set("page", String(params.page));
        if (params.limit) q.set("limit", String(params.limit));
        if (params.sortBy) q.set("sortBy", params.sortBy);
        if (params.sortDir) q.set("sortDir", params.sortDir);
        if (params.q) q.set("q", params.q);
        const query = q.toString();
        const url = query ? `/user?${query}` : "/user";
        const envelope = await http.get<unknown>(url);
        const parsed = apiUsersEnvelopeWithMetaSchema.parse(envelope);
        const items: UserListItem[] = parsed.data.map((u) => ({
            id: u.id,
            name: u.name ?? "",
            email: u.email,
            departmentName: u.department?.name ?? "-",
            roleName: u.role?.name ?? "-",
        }));
        return { items, meta: parsed.meta };
    },


        usernames: async (): Promise<UsernameResponse> => {
        const response = await http.get<unknown>("/user/username");
        const parsed = apiUsernameResponseSchema.parse(response);
        
        // Convert the object format to array
        const users: UsernameItem[] = Object.entries(parsed)
            .filter(([key]) => key !== "success")
            .map(([_, value]) => ({
                id: (value as any).id,
                name: (value as any).name,
            }));
console.log('user11',users)
        return {
            users,
            success: parsed.success,
        };
    },
    
};





