import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.route.js";
import leadRoutes from "./routes/lead.routes.js";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const prisma = new PrismaClient(); // exported for use in other modules

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/lead", leadRoutes);

// Health check
app.get("/", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
// On Vercel, export the app without starting the listener
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;