import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    techStack: {
      type: [String],
      required: true
    },
    githubLink: {
      type: String
    },
    liveLink: {
      type: String
    },
    image: {
      type: String
    },
    // ✅ ADDED: Order field for ranking (1, 2, 3...)
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);