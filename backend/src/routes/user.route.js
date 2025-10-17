import express from "express";
import {
  getMe,
  getUserNameWithId,
  getUsers,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", authenticate, getMe);
router.get("/", authenticate, getUsers);
router.get("/username", getUserNameWithId);

export default router;
