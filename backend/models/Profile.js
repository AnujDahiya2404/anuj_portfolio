import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    resumeLink: {
      type: String
    },
    socialLinks: {
      github: String,
      linkedin: String,
      email: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
