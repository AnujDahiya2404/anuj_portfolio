import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

// GET /api/profile
router.get("/", getProfile);

// PUT /api/profile
router.put("/", updateProfile);

export default router;