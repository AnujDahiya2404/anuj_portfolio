import { useEffect, useState } from "react";
import { getSkills } from "../services/api";
import SkillBar from "./SkillBar"; // Assuming you have this component

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  // ✅ NEW LOGIC: Group while preserving category info
  const grouped = skills.reduce((acc, skill) => {
    const { category, categoryOrder } = skill;
    if (!acc[category]) {
      acc[category] = {
        order: categoryOrder || 99, // Default to end if no order set
        list: []
      };
    }
    acc[category].list.push(skill);
    return acc;
  }, {});

  // Sort categories based on the 'order' field we saved above
  const sortedCategories = Object.entries(grouped).sort(
    ([, a], [, b]) => a.order - b.order
  );

  return (
    <div style={{ padding: "40px" }}>
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

      {sortedCategories.map(([category, { list }]) => (
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
          {/* List is already sorted by backend, but we map it here */}
          {list.map((skill) => (
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