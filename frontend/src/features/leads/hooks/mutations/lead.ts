import { http } from "@/lib/http"

export interface LeadPayload {
    name: string;
    email?: string;
    phone?: string;
    status?: string;
    source?: string;
    notes?: string;
    assignedToId?: number;
}

export interface LeadResponse {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    status: string;
    source?: string;
    notes?: string;
    assignedToId?: number;
    createdAt: string;
    updatedAt: string;
}


export const createLead = async (payload: LeadPayload) => {


    return http.post<{ success: boolean; lead: LeadResponse }>(
        "/lead/create",
        payload
    )
}   