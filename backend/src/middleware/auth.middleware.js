import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export function authenticate(req, res, next) {
    console.log(req)
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, error: 'Missing authorization header' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'Malformed authorization header' });
    console.log(token)

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload; 
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }
}
