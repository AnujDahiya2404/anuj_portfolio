import express from "express";
import Skill from "../models/Skill.js"; // ✅ Import Model to use sort()
import { createSkill, deleteSkill, updateSkill } from "../controllers/skillController.js";

const router = express.Router();

// ✅ UPDATED GET ROUTE: Returns skills sorted by Category Order, then Skill Order
router.get("/", async (req, res) => {
  try {
    // Sort by categoryOrder (asc), then by order (asc)
    const skills = await Skill.find().sort({ categoryOrder: 1, order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", createSkill);
router.delete("/:id", deleteSkill);
router.put("/:id", updateSkill);

export default router;