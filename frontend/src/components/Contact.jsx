import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const Contact = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  const { socialLinks = {}, resumeLink } = profile;

  return (
    <div
      style={{
        height: "100%",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", // Center horizontally
        textAlign: "center"   // Center text
      }}
    >
      <h2 style={{ fontSize: "48px", marginBottom: "20px", fontWeight: "bold" }}>
        Get In Touch
      </h2>

      <p style={{ opacity: 0.8, marginBottom: "40px", fontSize: "18px", maxWidth: "500px" }}>
        Let’s connect — I’m always open to opportunities and discussions.
      </p>

      {/* BUTTONS ROW */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          width: "100%"
        }}
      >
        {/* 1. EMAIL */}
        {socialLinks.email && (
          <a
            href={`mailto:${socialLinks.email}`}
            className="glass-button email"
          >
            <span>Email</span>
          </a>
        )}

        {/* 2. GITHUB */}
        {socialLinks.github && (
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="glass-button github"
          >
            <span>GitHub</span>
          </a>
        )}

        {/* 3. LINKEDIN */}
        {socialLinks.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className="glass-button linkedin"
          >
            <span>LinkedIn</span>
          </a>
        )}

        {/* 4. RESUME */}
        {resumeLink && (
          <a
            href={resumeLink}
            target="_blank"
            rel="noreferrer"
            className="glass-button resume"
          >
            <span>Resume</span>
          </a>
        )}
      </div>
      
      {/* Copyright/Footer */}
      <div style={{ marginTop: "60px", opacity: 0.5, fontSize: "14px" }}>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </div>
  );
};

export default Contact;