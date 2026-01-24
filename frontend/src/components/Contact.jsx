import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const Contact = () => {
  const [profile, setProfile] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault(); // Stop the default mail app from opening
    if (profile?.socialLinks?.email) {
      navigator.clipboard.writeText(profile.socialLinks.email);
      setShowToast(true);
      
      // Hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (!profile) return null;

  const { socialLinks = {} } = profile;

  return (
    <div
      style={{
        height: "100%",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative" // Needed for absolute positioning of toast if you prefer containment
      }}
    >
      {/* INTERNAL CSS FOR TOAST ANIMATION */}
      <style>{`
        .toast-popup {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: rgba(30, 30, 30, 0.9);
          color: white;
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .toast-popup.active {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      `}</style>

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
        {/* 1. EMAIL (Click to Copy) */}
        {socialLinks.email && (
          <button
            onClick={handleCopyEmail}
            className="glass-button email"
            title="Click to Copy Email"
          >
            <svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>{socialLinks.email}</span>
          </button>
        )}

        {/* 2. GITHUB */}
        {socialLinks.github && (
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="glass-button github"
          >
            <svg width="20" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
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
            <svg width="20" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        )}
      </div>

      {/* TOAST NOTIFICATION */}
      <div className={`toast-popup ${showToast ? "active" : ""}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Email copied to clipboard!</span>
      </div>
      
      {/* Dynamic Footer with Name and Year */}
      <div style={{ marginTop: "60px", opacity: 0.5, fontSize: "14px" }}>
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </div>
  );
};

export default Contact;