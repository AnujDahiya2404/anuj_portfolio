import express from "express";
import { getSkills, createSkill, deleteSkill, updateSkill } from "../controllers/skillController.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", createSkill);
router.delete("/:id", deleteSkill);
router.put("/:id", updateSkill);

export default router;