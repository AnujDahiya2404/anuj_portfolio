import React from "react";

const sections = [
  { 
    id: "home", 
    label: "Home", 
    renderIcon: (isActive) => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={isActive ? 2.5 : 1.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ) 
  },
  { 
    id: "skills", 
    label: "Skills", 
    renderIcon: (isActive) => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={isActive ? 2.5 : 1.2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ) 
  },
  { 
    id: "projects", 
    label: "Projects", 
    renderIcon: (isActive) => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={isActive ? 2.5 : 1.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
      </svg>
    ) 
  },
  { 
    id: "education", 
    label: "Education", 
    renderIcon: (isActive) => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={isActive ? 2.5 : 1.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ) 
  },
  { 
    // ✅ MOVED HERE: After Education
    id: "activity", 
    label: "Activity", 
    renderIcon: (isActive) => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={isActive ? 2.5 : 1.2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ) 
  },
  { 
    id: "contact", 
    label: "Contact", 
    renderIcon: (isActive) => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={isActive ? 2.5 : 1.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ) 
  }
];

const Navbar = ({ activeSection }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className="glass"
      style={{
        position: "fixed",
        left: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        height: "auto",      
        padding: "20px 0",
        width: "70px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        borderRadius: "20px",
        zIndex: 10
      }}
    >
      {sections.map((s) => {
        const isActive = activeSection === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            title={s.label}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease, background 0.2s ease",
              background: isActive
                ? "rgba(255,255,255,0.25)"
                : "transparent"
            }}
          >
            {s.renderIcon(isActive)}
          </button>
        );
      })}
    </aside>
  );
};

export default Navbar;