import express from "express";
import { getProgress } from "../controller/progress.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getProgress);

export default router;
