// src/features/properties/api/properties-api.ts
import { http } from "@/lib/http";
import { z } from "zod";

// -------------------------------------------------------------
// 🔹 API Schema Validation (Zod)
// -------------------------------------------------------------
const apiPropertyOwnerSchema = z
    .object({
        id: z.number(),
        name: z.string(),
        email: z.string().email().optional(),
    })
    .nullable()
    .optional();

const apiPropertySchema = z.object({
    id: z.number(),
    title: z.string(),
    address: z.string(),
    price: z.number().nullable().optional(),
    type: z.string().default("residential"),
    bedrooms: z.number().nullable().optional(),
    bathrooms: z.number().nullable().optional(),
    area: z.number().nullable().optional(),
    status: z.string().default("available"),
    description: z.string().nullable().optional(),
    ownerId: z.number().nullable().optional(),
    owner: apiPropertyOwnerSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
});

const apiPropertyEnvelopeSchema = z.object({
    success: z.boolean(),
    data: apiPropertySchema,
});

const apiPropertiesEnvelopeWithMetaSchema = z.object({
    success: z.boolean(),
    data: z.array(apiPropertySchema),
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
export type Property = {
    id: number;
    title: string;
    address: string;
    price?: number | null;
    type: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    area?: number | null;
    status: string;
    description?: string | null;
    ownerId?: number | null;
    ownerName?: string | null;
    ownerEmail?: string | null;
    createdAt: string;
    updatedAt: string;
};

export type CreatePropertyPayload = {
    title: string;
    address: string;
    price?: number | null;
    type: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    area?: number | null;
    status: string;
    description?: string | null;
    ownerId?: number | null;
};

export type UpdatePropertyPayload = Partial<CreatePropertyPayload>;

export type ListPropertiesParams = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    q?: string;
    type?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
};

export type ListPropertiesResult = {
    items: Property[];
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
export const propertiesApi = {
    create: async (payload: CreatePropertyPayload): Promise<Property> => {
        const envelope = await http.post<unknown>("/properties", payload);
        const parsed = apiPropertyEnvelopeSchema.parse(envelope);
        return parsed.data;
    },

    list: async (params: ListPropertiesParams = {}): Promise<ListPropertiesResult> => {
        const q = new URLSearchParams();
        if (params.page) q.set("page", String(params.page));
        if (params.limit) q.set("limit", String(params.limit));
        if (params.sortBy) q.set("sortBy", params.sortBy);
        if (params.sortDir) q.set("sortDir", params.sortDir);
        if (params.q) q.set("q", params.q);
        if (params.type) q.set("type", params.type);
        if (params.status) q.set("status", params.status);
        if (params.minPrice) q.set("minPrice", String(params.minPrice));
        if (params.maxPrice) q.set("maxPrice", String(params.maxPrice));
        const query = q.toString();

        const url = query ? `/properties?${query}` : "/properties";
        const envelope = await http.get<unknown>(url);

        const parsed = apiPropertiesEnvelopeWithMetaSchema.parse(envelope);
        const items: Property[] = parsed.data.map((property) => ({
            id: property.id,
            title: property.title,
            address: property.address,
            price: property.price ?? null,
            type: property.type,
            bedrooms: property.bedrooms ?? null,
            bathrooms: property.bathrooms ?? null,
            area: property.area ?? null,
            status: property.status,
            description: property.description ?? null,
            ownerId: property.ownerId ?? null,
            ownerName: property.owner?.name ?? null,
            ownerEmail: property.owner?.email ?? null,
            createdAt: property.createdAt,
            updatedAt: property.updatedAt,
        }));

        return { items, meta: parsed.meta };
    },

    update: async (id: number, payload: UpdatePropertyPayload): Promise<Property> => {
        const envelope = await http.patch<unknown>(`/properties/${id}`, payload);
        const parsed = apiPropertyEnvelopeSchema.parse(envelope);
        return parsed.data;
    },

    delete: async (id: number): Promise<{ success: boolean }> => {
        return http.del(`/properties/${id}`);
    },
};