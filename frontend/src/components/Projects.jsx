import { useEffect, useState } from "react";
import { getProjects } from "../services/api";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("slide-from-right");

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const nextProject = () => {
    setDirection("slide-from-right");
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection("slide-from-left");
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  if (!projects.length) return null;

  return (
    <div
      style={{
        height: "100%",
        padding: "40px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* NEW CENTERED HEADING STYLE */}
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
        Projects
      </h2>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            width: "100%",
            height: "100%"
          }}
        >
          {/* LEFT ARROW */}
          <button
            onClick={prevProject}
            className="glass arrow-btn"
            title="Previous Project"
          >
            ◀
          </button>

          {/* PROJECT CARD COMPONENT */}
          <ProjectCard
            key={currentIndex}
            project={projects[currentIndex]}
            direction={direction}
          />

          {/* RIGHT ARROW */}
          <button
            onClick={nextProject}
            className="glass arrow-btn"
            title="Next Project"
          >
            ▶
          </button>
        </div>

        {/* DOT INDICATORS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          {projects.map((_, idx) => (
            <div 
              key={idx}
              className={`carousel-dot ${idx === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;