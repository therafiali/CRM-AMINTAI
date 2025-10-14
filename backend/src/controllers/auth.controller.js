import * as authService from '../services/auth.service.js';

export async function signup(req, res) {
    try {
        const { name, email, password, roleId, departmentId } = req.body;
        const result = await authService.registerUser({ name, email, password, roleId, departmentId });
        return res.status(201).json({ success: true, data: result });
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || 'Internal server error';
        return res.status(status).json({ success: false, error: message });
    }
}


export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser({ email, password });
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || 'Internal server error';
        return res.status(status).json({ success: false, error: message });
    }
}