const BASE_URL = "http://localhost:5000/api";

export const getProfile = async () => {
  const res = await fetch(`${BASE_URL}/profile`);
  return res.json();
};

export const getSkills = async () => {
  const res = await fetch(`${BASE_URL}/skills`);
  return res.json();
};

export const getProjects = async () => {
  const res = await fetch(`${BASE_URL}/projects`);
  return res.json();
};
