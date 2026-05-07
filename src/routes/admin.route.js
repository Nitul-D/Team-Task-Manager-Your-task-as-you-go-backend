import express from "express";
import { checkAdmin } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/check", protectRoute, requireAdmin, checkAdmin);

export default router;
