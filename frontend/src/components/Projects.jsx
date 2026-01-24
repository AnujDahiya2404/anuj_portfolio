import { useEffect, useState } from "react";
import { getProjects } from "../services/api";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("slide-from-right");

  useEffect(() => {
    getProjects().then((data) => {
      // ✅ FIX: Force sort by 'order' on the frontend
      // If a project has no order, it defaults to 0
      const sortedData = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
      setProjects(sortedData);
    });
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
      {/* INTERNAL CSS TO HANDLE MOBILE LAYOUT SWITCH */}
      <style>{`
        /* Default: Mobile arrows hidden */
        .mobile-controls { display: none; }
        
        /* Mobile View (Max 768px) */
        @media (max-width: 768px) {
          /* Hide Desktop Side Arrows */
          .desktop-arrow { display: none !important; }
          
          /* Show Mobile Bottom Arrows */
          .mobile-controls { 
            display: flex !important; 
            justify-content: center; 
            gap: 24px; 
            margin-top: 20px; 
            margin-bottom: 20px;
          }
          
          /* Override the inline 'space-between' to center the card on mobile */
          .projects-row { justify-content: center !important; }
        }
      `}</style>

      {/* HEADING */}
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
        {/* CARD ROW (Desktop: Arrows on sides | Mobile: Card only) */}
        <div
          className="projects-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            width: "100%",
            height: "100%"
          }}
        >
          {/* LEFT ARROW (Desktop Only) */}
          <button
            onClick={prevProject}
            className="glass arrow-btn desktop-arrow"
            title="Previous Project"
          >
            ◀
          </button>

          {/* PROJECT CARD */}
          <ProjectCard
            key={currentIndex}
            project={projects[currentIndex]}
            direction={direction}
          />

          {/* RIGHT ARROW (Desktop Only) */}
          <button
            onClick={nextProject}
            className="glass arrow-btn desktop-arrow"
            title="Next Project"
          >
            ▶
          </button>
        </div>

        {/* MOBILE CONTROLS (Bottom Arrows - Visible only on Mobile) */}
        <div className="mobile-controls">
          <button onClick={prevProject} className="glass arrow-btn">◀</button>
          <button onClick={nextProject} className="glass arrow-btn">▶</button>
        </div>

        {/* DOT INDICATORS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          {projects.map((p, idx) => (
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