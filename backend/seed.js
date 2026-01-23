import mongoose from "mongoose";
import dotenv from "dotenv";

import Profile from "./models/Profile.js";
import Project from "./models/Project.js";
import Skill from "./models/Skill.js";
import Education from "./models/Education.js";

dotenv.config();

// --- 1. PROFILE ---
const profileData = {
  name: "Anuj Dahiya",
  role: "Java Developer & Researcher",
  bio: "Passionate software developer focusing on bio-inspired algorithms, network security, and AI-driven systems. Expert in Java and database management.",
  resumeLink: "/resume.pdf", 
  socialLinks: {
    github: "https://github.com/AnujDahiya2404",
    linkedin: "https://linkedin.com/in/yourprofile", 
    email: "anuj@example.com",
    leetcode: "https://leetcode.com/2404anuj",
    codeforces: "https://codeforces.com/profile/anuj2404"
  }
};

// --- 2. EDUCATION (Updated with Branch) ---
const educationData = [
  {
    degree: "M.Tech",
    branch: "Information Technology", // ✅ Added Branch
    school: "Netaji Subhas University of Technology (NSUT)",
    year: "2025 - Present",
    grade: "9.0 CGPA",
    description: "Specializing in advanced IT research and development."
  },
  {
    degree: "B.Tech",
    branch: "Computer Science and Engineering", // ✅ Added Branch
    school: "Kurukshetra University, Kurukshetra",
    year: "2021 - 2025",
    grade: "7.55 CGPA",
    description: "Core focus on Data Structures, Algorithms, and Operating Systems. Worked on Bio-Inspired Routing algorithms during this tenure."
  },
  {
    degree: "Class XII",
    branch: "Non-Medical", // ✅ Added Stream as Branch
    school: "Senior Secondary School", 
    year: "Completed", 
    grade: "76.40%",
    description: "Physics, Chemistry, and Mathematics."
  },
  {
    degree: "Class X",
    // branch: "", // Optional: Can be left empty for high school
    school: "High School", 
    year: "Completed", 
    grade: "93.60%",
    description: "Standard Curriculum with focus on Science and Mathematics."
  }
];

// --- 3. PROJECTS ---
const projectData = [
  {
    title: "Bio-Inspired Routing Algorithm",
    description: "Developed a new routing algorithm by comparing GPSR with bird flocking behavior to optimize network packets.",
    techStack: ["Java", "NS-3", "Algorithms", "Graph Theory"],
    githubLink: "https://github.com/AnujDahiya2404/bio-routing",
    liveLink: "",
    image: "" 
  },
  {
    title: "AI-Driven IoT Security",
    description: "Research project on anomaly detection for IoT security within 5G networks, simulated using NS-3.",
    techStack: ["Python", "AI/ML", "IoT", "5G"],
    githubLink: "https://github.com/AnujDahiya2404/iot-security",
    liveLink: "",
    image: "" 
  },
  {
    title: "SQL Joins Implementation",
    description: "A comprehensive analysis and implementation of different types of SQL joins for efficient data retrieval.",
    techStack: ["SQL", "Java", "DBMS"],
    githubLink: "",
    liveLink: "",
    image: ""
  }
];

// --- 4. SKILLS ---
const skillData = [
  { name: "React", category: "Frontend", level: 75, color: "#61DAFB" },
  { name: "HTML/CSS", category: "Frontend", level: 90, color: "#E34F26" },
  { name: "Java", category: "Backend", level: 95, color: "#007396" },
  { name: "Node.js", category: "Backend", level: 70, color: "#339933" },
  { name: "MongoDB", category: "Database", level: 80, color: "#47A248" },
  { name: "SQL", category: "Database", level: 85, color: "#003B57" },
  { name: "Git", category: "Tools", level: 85, color: "#F05032" },
  { name: "NS-3", category: "Tools", level: 70, color: "#000000" }
];

// --- SEED FUNCTION ---
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    console.log("🗑️  Old data cleared");

    await Profile.create(profileData);
    await Education.insertMany(educationData);
    await Project.insertMany(projectData);
    await Skill.insertMany(skillData);
    
    console.log("🌱 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();