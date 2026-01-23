import express from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);      // Create
router.put("/:id", updateProject);    // Update specific project
router.delete("/:id", deleteProject); // Delete specific project

export default router;