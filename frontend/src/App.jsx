import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./glass.css";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Navbar activeSection={activeSection} />

      <main
        style={{
          marginLeft: "120px",
          padding: "32px",
          height: "100vh",
          overflowY: "auto"
        }}
      >
        <section id="home" className="glass" style={{ height: "90vh", marginBottom: "40px" }}><Hero /></section>
        <section id="skills" className="glass" style={{ height: "90vh", marginBottom: "40px" }}><Skills /></section>
        <section id="projects" className="glass" style={{ height: "90vh", marginBottom: "40px" }}><Projects /></section>
        <section id="contact" className="glass" style={{ height: "90vh", marginBottom: "40px" }}><Contact /></section>
      </main>
    </div>
  );
}

export default App;
