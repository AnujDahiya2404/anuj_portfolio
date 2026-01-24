import Project from "../models/Project.js";

// --- GET ALL PROJECTS (Public) ---
export const getProjects = async (req, res) => {
  try {
    // ✅ FIX: Sort by 'order' (Ascending: 1, 2, 3...)
    // If you want unranked items last, this works naturally as 0 < 1
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- CREATE NEW PROJECT (Dashboard) ---
export const createProject = async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --- UPDATE PROJECT (Dashboard) ---
export const updateProject = async (req, res) => {
  const { id } = req.params;
  
  // ✅ FIX: Explicitly destructure to ensure 'order' and 'image' are caught
  // (req.body usually works, but this is safer)
  const { title, description, techStack, githubLink, liveLink, image, order } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id, 
      { title, description, techStack, githubLink, liveLink, image, order: Number(order) }, 
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --- DELETE PROJECT (Dashboard) ---
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};