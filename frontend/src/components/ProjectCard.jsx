import React from "react";

const ProjectCard = ({ project, direction }) => {
  return (
    <div
      className={direction} // Applies the slide animation
      style={{
        flex: 1,
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        padding: "10px"
      }}
    >
      {/* CARD IMAGE */}
      <div
        className="project-img"
        style={{
          height: "300px",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.2)",
          backgroundImage: project.image ? `url(${project.image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "15px",
          marginBottom: "24px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      />

      {/* CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 8px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "28px", margin: 0 }}>
            {project.title}
          </h3>
          
          {/* TECH STACK */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "flex-end", maxWidth: "40%" }}>
            {project.techStack.map((tech, i) => (
              <span key={i} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <p
          className="custom-scroll"
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "24px",
            opacity: 0.85,
            whiteSpace: "pre-line",
            height: "140px",
            overflowY: "auto",
            paddingRight: "8px"
          }}
        >
          {project.description}
        </p>

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "16px", marginTop: "auto" }}>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="glass-button github"
            >
              <span>GitHub</span>
            </a>
          )}
          
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="glass-button secondary"
            >
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;