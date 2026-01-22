import { useEffect, useState } from "react";
import { getSkills } from "../services/api";
import SkillBar from "./SkillBar";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  const grouped = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div style={{ padding: "40px" }}>
      {/* ✅ UPDATED HEADING STYLE */}
      <h2 
        style={{ 
          fontSize: "48px",
          fontWeight: "700",
          marginBottom: "40px",
          color: "black",
          textAlign: "center",
          letterSpacing: "-1px"
        }}
      >
        Skills
      </h2>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} style={{ marginBottom: "28px" }}>
          <h3 style={{ marginBottom: "12px", opacity: 0.8 }}>
            {category}
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
          {items.map((skill) => (
            <SkillBar
              key={skill._id}
              name={skill.name}
              level={skill.level}
              color={skill.color}
            />
          ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;