const ProjectCard = ({ project }) => {
  return (
    <div
      className="glass"
      style={{
        padding: "0",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden"
      }}
    >
      {/* IMAGE */}
      {project.image && (
        <div
          style={{
            width: "100%",
            height: "160px",
            overflow: "hidden"
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      )}

      {/* CONTENT */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          flex: 1
        }}
      >
        <h3 style={{ fontSize: "20px" }}>{project.title}</h3>

        <p style={{ fontSize: "14px", opacity: 0.85 }}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              style={{
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.25)"
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ marginTop: "auto", display: "flex", gap: "12px" }}>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            style={buttonStyle}
          >
            GitHub
          </a>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              style={buttonStyle}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "8px 14px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "13px",
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(4px)",
  border: "1px solid rgba(255,255,255,0.25)",
  color: "#000"
};

export default ProjectCard;
