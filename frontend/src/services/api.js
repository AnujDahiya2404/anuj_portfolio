const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000/api" 
  : "https://anuj-portfolio-api-nzue.onrender.com/"; // 👈 PASTE YOUR RENDER URL HERE

// ... rest of your code

// --- PROFILE ---
export const getProfile = async () => {
  const res = await fetch(`${BASE_URL}/profile`);
  return res.json();
};

export const updateProfile = async (data) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// --- SKILLS ---
export const getSkills = async () => {
  const res = await fetch(`${BASE_URL}/skills`);
  return res.json();
};

export const createSkill = async (data) => {
  const res = await fetch(`${BASE_URL}/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteSkill = async (id) => {
  const res = await fetch(`${BASE_URL}/skills/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const updateSkill = async (id, data) => {
  const res = await fetch(`${BASE_URL}/skills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// --- PROJECTS ---
export const getProjects = async () => {
  const res = await fetch(`${BASE_URL}/projects`);
  return res.json();
};

export const createProject = async (data) => {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const updateProject = async (id, data) => {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// --- EDUCATION (New) ---
export const getEducation = async () => {
  const res = await fetch(`${BASE_URL}/education`);
  return res.json();
};

export const createEducation = async (data) => {
  const res = await fetch(`${BASE_URL}/education`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteEducation = async (id) => {
  const res = await fetch(`${BASE_URL}/education/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const updateEducation = async (id, data) => {
  const res = await fetch(`${BASE_URL}/education/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};