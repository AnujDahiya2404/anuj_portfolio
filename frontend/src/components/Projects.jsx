import { useEffect, useState } from "react";
import { getProjects } from "../services/api";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getProjects().then((data) => {
      if (Array.isArray(data)) setProjects(data);
    });
  }, []);

  const visibleProjects = projects.slice(index, index + 2);

  const next = () => {
    if (index + 2 < projects.length) {
      setIndex(index + 2);
    }
  };

  const prev = () => {
    if (index - 2 >= 0) {
      setIndex(index - 2);
    }
  };

  return (
    <div style={{ padding: "40px", height: "100%" }}>
      <h2 style={{ fontSize: "32px", marginBottom: "24px" }}>
        Projects
      </h2>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "24px"
        }}
      >
        {visibleProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={prev} disabled={index === 0} style={navBtn}>
          ◀
        </button>

        <button
          onClick={next}
          disabled={index + 2 >= projects.length}
          style={navBtn}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

const navBtn = {
  padding: "8px 14px",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(4px)",
  border: "1px solid rgba(255,255,255,0.25)"
};

export default Projects;
