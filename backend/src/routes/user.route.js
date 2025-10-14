import express from 'express';
import { getMe, getUsers } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', authenticate, getMe);
router.get('/', authenticate, getUsers);

export default router;
