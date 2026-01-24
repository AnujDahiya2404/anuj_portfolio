import { useState } from "react";

const SkillBar = ({ name, level = 0, color = "#999" }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "6px 14px",
        borderRadius: "999px",
        border: `1.5px solid ${hovered ? color : "rgba(0,0,0,0.25)"}`,
        transition: "transform 0.25s ease, border-color 0.25s ease",
        overflow: "hidden",
        cursor: "default",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        width: "fit-content" // ✅ text-sized pill
      }}
    >
      {/* FILL */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: hovered ? "100%" : `${level}%`,
          backgroundColor: hovered ? color : "rgba(0,0,0,0.15)",
          transition: "width 0.25s ease, background-color 0.25s ease",
          zIndex: 0
        }}
      />

      {/* TEXT */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          fontSize: "14px",
          fontWeight: "500",
          whiteSpace: "nowrap",
          color: "#0e0e0e"
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default SkillBar;
