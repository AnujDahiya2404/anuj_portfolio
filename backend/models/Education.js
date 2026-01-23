import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true
    },
    // ✅ NEW FIELD: Optional branch/stream
    branch: {
      type: String,
      required: false 
    },
    school: {
      type: String,
      required: true
    },
    year: {
      type: String, // e.g., "2021 - 2025"
      required: true
    },
    grade: {
      type: String // e.g., "9.0 CGPA"
    },
    description: {
      type: String // Optional details about coursework
    }
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);