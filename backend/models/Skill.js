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
      // ❌ REMOVED the 'enum' array so you can type whatever you want!
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
    }
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);