import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String, 
      required: true, 
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    color: {
      type: String,
      required: true
    },
    // ✅ NEW FIELDS FOR SORTING
    order: { type: Number, default: 0 },         // e.g. 1 for Java, 2 for Python
    categoryOrder: { type: Number, default: 0 }  // e.g. 1 for Languages, 2 for Frontend
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);