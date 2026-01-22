const sections = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "skills", label: "Skills", icon: "🧠" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "contact", label: "Contact", icon: "✉️" }
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
        width: "72px",
        margin: "16px",
        padding: "12px 0",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
      }}
    >
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollToSection(s.id)}
          title={s.label}
          style={{
            all: "unset",
            cursor: "pointer",
            fontSize: "20px",
            padding: "10px",
            borderRadius: "10px",
            background:
              activeSection === s.id
                ? "rgba(255,255,255,0.25)"
                : "transparent"
          }}
        >
          {s.icon}
        </button>
      ))}
    </aside>
  );
};

export default Navbar;
