const SkillBar = ({ name, level }) => {
  return (
    <div
      style={{
        width: "220px",
        borderRadius: "999px",
        border: "2px solid #000",
        padding: "4px",
        position: "relative",
        fontSize: "14px",
        fontWeight: "600",
        overflow: "hidden"
      }}
    >
      {/* FILL */}
      <div
        style={{
          width: `${level}%`,
          height: "100%",
          background: "#d9d9d9",
          borderRadius: "999px",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />

      {/* TEXT */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          paddingLeft: "12px",
          whiteSpace: "nowrap"
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default SkillBar;
