import React from "react";

const sections = [
  { id: "home", label: "Home", iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { id: "skills", label: "Skills", iconPath: "M16 18 22 12 16 6 M8 6 2 12 8 18" },
  { id: "projects", label: "Projects", iconPath: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
  { id: "education", label: "Education", iconPath: "M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5" },
  { id: "activity", label: "Activity", iconPath: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { id: "contact", label: "Contact", iconPath: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6 12 13 2 6" }
];

const Navbar = ({ activeSection }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="glass navbar-container">
      {sections.map((s) => {
        const isActive = activeSection === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            
            // ✅ RESTORED: Icon Scaling on Hover
            onMouseEnter={(e) => (e.currentTarget.style.transform = isActive ? "scale(1.15)" : "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = isActive ? "scale(1.15)" : "scale(1)")}
            
            title={s.label}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease", // Added nice bounce
              
              background: "transparent",
              opacity: isActive ? 1 : 0.6,
              
              // Maintain Active Scale if not hovering
              transform: isActive ? "scale(1.15)" : "scale(1)" 
            }}
          >
            <svg 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              // Active = Bold, Inactive = Normal
              strokeWidth={isActive ? 3 : 2} 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ color: "#000" }}
            >
              {s.iconPath.includes(" M") 
                ? s.iconPath.split(" M").map((d, i) => <path key={i} d={i === 0 ? d : "M" + d} />) 
                : <path d={s.iconPath} />
              }
            </svg>
          </button>
        );
      })}
    </aside>
  );
};

export default Navbar;