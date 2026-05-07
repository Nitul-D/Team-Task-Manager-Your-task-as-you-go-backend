import express from "express";
import { createTask, getAllTasks, updateTask, deleteTask } from "../controller/task.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, requireAdmin, createTask);
router.get("/", protectRoute, getAllTasks);
router.put("/:id", protectRoute, updateTask);
router.delete("/:id", protectRoute, requireAdmin, deleteTask);

export default router;
