import { findUserByIdWithRelations, findUsersPaginated } from '../repositories/user.repository.js';

export async function getCurrentUser(userId) {
    const user = await findUserByIdWithRelations(userId);
    if (!user) throw { status: 404, message: 'User not found' };

    // sanitize user (remove password)
    const { password: _p, ...safeUser } = user;
    return safeUser;
}

export async function getUsersPaginated({ page, limit }) {
    const { total, users, page: pageNumber, limit: pageSize } = await findUsersPaginated({ page, limit });

    const safeUsers = users.map(({ password: _p, ...u }) => u);

    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
        data: safeUsers,
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


