import express from "express";
import { createProject, getAllProjects, updateProject, deleteProject } from "../controller/project.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createProject);
router.get("/", protectRoute, getAllProjects);
router.put("/:id", protectRoute, updateProject);
router.delete("/:id", protectRoute, deleteProject);

export default router;