import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/", getProfile);
router.put("/", updateProfile); // Only need PUT to update your info

export default router;