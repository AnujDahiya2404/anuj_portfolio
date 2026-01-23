import express from "express";
import { getEducation, createEducation, deleteEducation, updateEducation } from "../controllers/educationController.js";

const router = express.Router();

router.get("/", getEducation);
router.post("/", createEducation);
router.delete("/:id", deleteEducation);
router.put("/:id", updateEducation);

export default router;