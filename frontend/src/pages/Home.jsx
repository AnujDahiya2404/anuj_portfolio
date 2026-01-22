import { useEffect, useState } from "react";
import { getProfile, getSkills } from "../services/api";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getProfile().then(setProfile);
    getSkills().then(setSkills);
  }, []);

  return (
    <div>
      <h1>{profile?.name}</h1>
      <h3>{profile?.role}</h3>
      <p>{profile?.bio}</p>

      <h2>Skills</h2>
      <ul>
        {skills.map(skill => (
          <li key={skill._id}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
