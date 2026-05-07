import express from "express";
import { getAllUser } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllUser);

export default router;