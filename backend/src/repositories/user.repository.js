import { prisma } from '../server.js';

export async function findUserByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
}

export async function createUser(data) {
    return prisma.user.create({ data });
}

export async function findUserById(id) {
    return prisma.user.findUnique({ where: { id } });
}


export async function findUserByIdWithRelations(id) {
    return prisma.user.findUnique({
        where: { id },
        include: {
            role: true,
            department: true,
        },
    });
}

export async function findUsersPaginated({ page = 1, limit = 10 }) {
    const pageNumber = Number(page) > 0 ? Number(page) : 1;
    const pageSize = Number(limit) > 0 ? Number(limit) : 10;
    const skip = (pageNumber - 1) * pageSize;

    const [total, users] = await Promise.all([
        prisma.user.count(),
        prisma.user.findMany({
            skip,
            take: pageSize,
            orderBy: { id: 'asc' },
            include: {
                role: true,
                department: true,
            },
        }),
    ]);

    return { total, users, page: pageNumber, limit: pageSize };
}