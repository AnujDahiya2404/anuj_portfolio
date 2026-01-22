import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import profilePic from "../assets/profile.png";

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
        alignItems: "stretch"
      }}
    >
      {/* LEFT: TEXT CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "12px" }}>
          {profile.name}
        </h1>

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "400",
            marginBottom: "20px",
            opacity: 0.8
          }}
        >
          {profile.role}
        </h2>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "28px",
            maxWidth: "520px"
          }}
        >
          {profile.bio}
        </p>

        {profile.resumeLink && (
          <a
            href={profile.resumeLink}
            target="_blank"
            rel="noreferrer"
            style={{
              width: "fit-content",
              padding: "12px 22px",
              borderRadius: "10px",
              textDecoration: "none",
              color: "#000",
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(6px)"
            }}
          >
            Download Resume
          </a>
        )}
      </div>

      {/* RIGHT: IMAGE */}
        <div
        style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end"   // ⬅️ key line
        }}
        >
        <img
            src={profilePic}
            alt="Profile"
            style={{
            width: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            objectPosition: "bottom center",
            filter: "drop-shadow(6px 6px 10px rgba(0,0,0,0.6))"
            }}
        />
        </div>
    </div>
  );
};

export default Hero;
