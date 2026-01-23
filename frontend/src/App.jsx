import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import "./glass.css";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Education from './components/Education';
import Activity from "./components/Activity";
import Dashboard from "./pages/Dashboard"; 

// --- 1. PORTFOLIO COMPONENT (LOCKED SCROLL) ---
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const scrollRef = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add("visible");
          }
        });
      },
      { root: scrollRef.current, threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    // ✅ CHANGED: Use CSS class 'app-container'
    <div className="app-container">
      <div className="background-gradient"></div>
      <Navbar activeSection={activeSection} />

      {/* ✅ CHANGED: Use CSS class 'main-content' (Removes hardcoded margin) */}
      <main
        ref={scrollRef}
        className="main-content"
      >
        <section id="home" className="glass fade-section" style={{ height: "90vh", marginBottom: "60px" }}>
          <Hero />
        </section>
        
        <section id="skills" className="glass fade-section" style={{ minHeight: "70vh", marginBottom: "60px" }}>
          <Skills />
        </section>
        
        <section id="projects" className="glass fade-section" style={{ height: "120vh", marginBottom: "60px" }}>
          <Projects />
        </section>
        
        <section id="education" className="glass fade-section" style={{ minHeight: "100vh", marginBottom: "60px" }}>
          <Education />
        </section>
        
        <section id="activity" className="glass fade-section" style={{ minHeight: "20vh", marginBottom: "60px" }}>
          <Activity />
        </section>
        
        <section id="contact" className="glass fade-section" style={{ minHeight: "20vh", marginBottom: "60px" }}>
          <Contact />
        </section>
      </main>
    </div>
  );
};

// --- 2. MAIN APP ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;