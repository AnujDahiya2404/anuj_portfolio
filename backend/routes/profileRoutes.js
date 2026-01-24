import express from "express";
import Project from "../models/Profile.js"; // ✅ Import Model to use sort() directly
import { createProject, updateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

// ✅ UPDATED GET ROUTE: Sorts by 'order' so Rank 1 appears first
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 }); 
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;