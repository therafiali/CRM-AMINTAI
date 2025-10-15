import express from 'express';

import { authenticate } from '../middleware/auth.middleware.js';
import { createLead, getLeads, updateLead } from '../controllers/lead.controller.js';

const router = express.Router();


router.post("/create", authenticate, createLead);
router.get("/", authenticate, getLeads);
router.patch("/:id", updateLead)

export default router;
