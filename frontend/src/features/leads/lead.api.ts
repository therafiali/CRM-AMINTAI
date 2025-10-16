import { http } from "@/lib/http";
import { z } from "zod";

// -------------------------------------------------------------
// 🔹 API Schema Validation (Zod)
// -------------------------------------------------------------
const apiLeadAssignedUserSchema = z
    .object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
    })
    .nullable()
    .optional();

const apiLeadSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    status: z.string(),
    source: z.string().nullable().optional(),
    notes: z.string().nullable().optional(),
    assignedToId: z.number().nullable().optional(),
    assignedTo: apiLeadAssignedUserSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
});

const apiLeadsEnvelopeWithMetaSchema = z.object({
    success: z.boolean(),
    data: z.array(apiLeadSchema),
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
export type LeadListItem = {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    status: string;
    source?: string | null;
    notes?: string | null;
    assignedToName?: string | null;
    assignedToEmail?: string | null;
    createdAt: string;
    updatedAt: string;
};

export type UpdateLeadPayload = Partial<{
    name: string;
    email: string | null;
    phone: string | null;
    status: string;
    source: string | null;
    notes: string | null;
    assignedToId: number | null;
}>;

export type ListLeadsParams = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    q?: string;
};

export type ListLeadsResult = {
    items: LeadListItem[];
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
export const leadsApi = {
    list: async (params: ListLeadsParams = {}): Promise<ListLeadsResult> => {
        const q = new URLSearchParams();
        if (params.page) q.set("page", String(params.page));
        if (params.limit) q.set("limit", String(params.limit));
        if (params.sortBy) q.set("sortBy", params.sortBy);
        if (params.sortDir) q.set("sortDir", params.sortDir);
        if (params.q) q.set("q", params.q);
        const query = q.toString();

        const url = query ? `/lead?${query}` : "/lead";
        const envelope = await http.get<unknown>(url);

        const parsed = apiLeadsEnvelopeWithMetaSchema.parse(envelope);
        const items: LeadListItem[] = parsed.data.map((l) => ({
            id: l.id,
            name: l.name,
            email: l.email ?? null,
            phone: l.phone ?? null,
            status: l.status,
            source: l.source ?? null,
            notes: l.notes ?? null,
            assignedToId: l.assignedToId ?? null,
            assignedToName: l.assignedTo?.name ?? null,
            assignedToEmail: l.assignedTo?.email ?? null,
            createdAt: l.createdAt,
            updatedAt: l.updatedAt,
        }));

        return { items, meta: parsed.meta };
    },
    update: async (id: number, payload: UpdateLeadPayload) => {
        const res = await http.patch<{ success: boolean; data: LeadListItem }>(
            `/lead/${id}`,
            payload
        );
        return res;
    },

    updateStatus: async (id: number, status: string) => {
        return leadsApi.update(id, { status });
    },
};
