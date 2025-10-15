import { findLeadsPaginated, UpdateLeadDetails } from "../repositories/lead.repository.js";
import { prisma } from "../server.js"







export const createLeadService = async (data) => {
    return prisma.lead.create({ data })
}


export const getAllLeads = async ({ page, limit }) => {
    const { total, leads, page: pageNumber, limit: pageSize } = await findLeadsPaginated({ page, limit });

    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
        data: leads,
        meta: {
            total,
            page: pageNumber,
            limit: pageSize,
            totalPages,
            hasNextPage: pageNumber < totalPages,
            hasPrevPage: pageNumber > 1,
        },
    };

}

export async function updateLeadService(id, data) {
    // optional: sanitize data (e.g., block changing id)
    if (!id) throw new Error("Lead ID is required");
    if (!data || Object.keys(data).length === 0)
        throw new Error("No update data provided");

    const updatedLead = await UpdateLeadDetails(id, data);
    return updatedLead;
}