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
        justifyContent: "center"
      }}
    >
      <h2 style={{ fontSize: "32px", marginBottom: "12px" }}>
        Contact
      </h2>

      <p style={{ opacity: 0.8, marginBottom: "32px" }}>
        Let’s connect — I’m always open to opportunities and discussions.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "320px"
        }}
      >
        {socialLinks.email && (
          <a
            href={`mailto:${socialLinks.email}`}
            style={linkStyle}
          >
            📧 {socialLinks.email}
          </a>
        )}

        {socialLinks.github && (
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            💻 GitHub
          </a>
        )}

        {socialLinks.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            🔗 LinkedIn
          </a>
        )}

        {resumeLink && (
          <a
            href={resumeLink}
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            📄 Resume
          </a>
        )}
      </div>
    </div>
  );
};

const linkStyle = {
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.25)",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(6px)",
  color: "#000",
  fontSize: "14px"
};

export default Contact;
