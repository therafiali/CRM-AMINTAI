// src/features/contacts/api/contacts-api.ts
import { http } from "@/lib/http";
import { z } from "zod";

// -------------------------------------------------------------
// 🔹 API Schema Validation (Zod)
// -------------------------------------------------------------
const apiContactAssignedUserSchema = z
    .object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
    })
    .nullable()
    .optional();

const apiContactSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    type: z.string().default("buyer"),
    budget: z.number().nullable().optional(),
    notes: z.string().nullable().optional(),
    assignedToId: z.number().nullable().optional(),
    assignedTo: apiContactAssignedUserSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
});

const apiContactEnvelopeSchema = z.object({
    success: z.boolean(),
    data: apiContactSchema,
});

const apiContactsEnvelopeWithMetaSchema = z.object({
    success: z.boolean(),
    data: z.array(apiContactSchema),
    meta: z.object({
        total: z.number(),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        hasNextPage: z.boolean(),
        hasPrevPage: z.boolean(),
    }),
});

// -------------------------------------------------------------
// 🔹 TypeScript Types
// -------------------------------------------------------------
export type Contact = {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    type: string;
    budget?: number | null;
    notes?: string | null;
    assignedToId?: number | null;
    assignedToName?: string | null;
    assignedToEmail?: string | null;
    createdAt: string;
    updatedAt: string;
};

export type CreateContactPayload = {
    name: string;
    email?: string | null;
    phone?: string | null;
    type: string;
    budget?: number | null;
    notes?: string | null;
    assignedToId?: number | null;
};

export type UpdateContactPayload = Partial<CreateContactPayload>;

export type ListContactsParams = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    q?: string;
    type?: string;
};

export type ListContactsResult = {
    items: Contact[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
};

// -------------------------------------------------------------
// 🔹 API Calls
// -------------------------------------------------------------
export const contactsApi = {
    create: async (payload: CreateContactPayload): Promise<Contact> => {
        const envelope = await http.post<unknown>("/contacts", payload);
        const parsed = apiContactEnvelopeSchema.parse(envelope);
        return parsed.data;
    },

    list: async (params: ListContactsParams = {}): Promise<ListContactsResult> => {
        const q = new URLSearchParams();
        if (params.page) q.set("page", String(params.page));
        if (params.limit) q.set("limit", String(params.limit));
        if (params.sortBy) q.set("sortBy", params.sortBy);
        if (params.sortDir) q.set("sortDir", params.sortDir);
        if (params.q) q.set("q", params.q);
        if (params.type) q.set("type", params.type);
        const query = q.toString();

        const url = query ? `/contacts?${query}` : "/contacts";
        const envelope = await http.get<unknown>(url);

        const parsed = apiContactsEnvelopeWithMetaSchema.parse(envelope);
        const items: Contact[] = parsed.data.map((contact) => ({
            id: contact.id,
            name: contact.name,
            email: contact.email ?? null,
            phone: contact.phone ?? null,
            type: contact.type,
            budget: contact.budget ?? null,
            notes: contact.notes ?? null,
            assignedToId: contact.assignedToId ?? null,
            assignedToName: contact.assignedTo?.name ?? null,
            assignedToEmail: contact.assignedTo?.email ?? null,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        }));

        return { items, meta: parsed.meta };
    },

    update: async (id: number, payload: UpdateContactPayload): Promise<Contact> => {
        const envelope = await http.patch<unknown>(`/contacts/${id}`, payload);
        const parsed = apiContactEnvelopeSchema.parse(envelope);
        return parsed.data;
    },

    delete: async (id: number): Promise<{ success: boolean }> => {
        return http.del(`/contacts/${id}`);
    },
};