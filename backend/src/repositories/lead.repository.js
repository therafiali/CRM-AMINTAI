<<<<<<< HEAD
import { prisma } from '../server.js';


export async function findLeadsPaginated({ page = 1, limit = 10 }) {
    const pageNumber = Number(page) > 0 ? Number(page) : 1;
    const pageSize = Number(limit) > 0 ? Number(limit) : 10;
    const skip = (pageNumber - 1) * pageSize;

    const [total, leads] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.findMany({
            skip,
            take: pageSize,
            orderBy: { id: 'asc' },
        }),
    ]);

    return { total, leads, page: pageNumber, limit: pageSize };
}

export async function UpdateLeadDetails(id, data) {

    const updated = await prisma.lead.update({
        where: { id: Number(id) },
        data,
    });

    return updated

}
=======
import { prisma } from "../server.js";

export async function findLeadsPaginated({ page = 1, limit = 10 }) {
  const pageNumber = Number(page) > 0 ? Number(page) : 1;
  const pageSize = Number(limit) > 0 ? Number(limit) : 10;
  const skip = (pageNumber - 1) * pageSize;

  const [total, leads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.findMany({
      skip,
      take: pageSize,
      orderBy: { id: "asc" },
      include: {
        assignedTo: true,
      },
    }),
  ]);

  return { total, leads, page: pageNumber, limit: pageSize };
}

export async function UpdateLeadDetails(id, data) {
  const updated = await prisma.lead.update({
    where: { id: Number(id) },
    data,
  });

  return updated;
}
>>>>>>> 171e6a2 (UI better)
