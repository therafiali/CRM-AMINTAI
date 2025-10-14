import * as userService from '../services/user.service.js';

export async function getMe(req, res) {
    try {
        const { userId } = req.user; // comes from middleware
        const user = await userService.getCurrentUser(userId);
        return res.status(200).json({ success: true, data: user });
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || 'Internal server error';
        return res.status(status).json({ success: false, error: message });
    }
}

export async function getUsers(req, res) {
    try {
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

        const result = await userService.getUsersPaginated({ page, limit });
        return res.status(200).json({ success: true, ...result });
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || 'Internal server error';
        return res.status(status).json({ success: false, error: message });
    }
}