import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import profilePic from "../assets/logo.png";

const Hero = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px"
      }}
    >
      {/* LOGO */}
      <div style={{ marginBottom: "24px" }}>
        <img
          src={profilePic}
          alt="Profile"
          style={{
            width: "150px",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.3))"
          }}
        />
      </div>

      {/* NAME (Static) */}
      <h1 
        style={{ 
          fontSize: "64px",
          marginBottom: "8px",
          fontWeight: "700",
          letterSpacing: "-1px",
          color: "black"
        }}
      >
        {profile.name}
      </h1>

      {/* ROLE */}
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "32px",
          color: "black",
          opacity: 0.6,
          letterSpacing: "-0.5px"
        }}
      >
        {profile.role}
      </h2>

      {/* COLLEGE */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
        <span style={{ fontSize: "24px", fontWeight: "700", color: "black", opacity: 0.8 }}>
          M.Tech in Information Technology, Netaji Subhas University of Technology
        </span>
      </div>

      {/* BIO */}
      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.8",
          marginBottom: "40px",
          maxWidth: "600px",
          opacity: 0.9
        }}
      >
        {profile.bio}
      </p>

      {/* RESUME BUTTON */}
      {profile.resumeLink && (
        <a
          href={profile.resumeLink}
          target="_blank"
          rel="noreferrer"
          className="glass-button"
        >
          <span>View Resume</span>
        </a>
      )}
    </div>
  );
};

export default Hero;