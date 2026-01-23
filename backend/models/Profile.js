import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String, // This is your main headline (e.g. "Full Stack Developer")
      required: true
    },
    // ✅ ADDED NEW FIELDS HERE
    currentRole: {
      type: String // e.g. "Software Engineer Intern"
    },
    currentOrg: {
      type: String // e.g. "Google" or "Freelance"
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
      email: String,
      leetcode: String,
      codeforces: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);