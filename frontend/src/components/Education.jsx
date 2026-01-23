import React, { useEffect, useState } from "react";
import { getEducation } from "../services/api";

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    getEducation().then((data) => {
      if (!data) return;

      // --- SORTING LOGIC ---
      const sortedData = [...data].sort((a, b) => {
        // Helper function to extract a sortable number from the year string
        const getYearValue = (yearStr) => {
          if (!yearStr) return 0;
          const str = yearStr.toLowerCase();
          
          // 1. If it contains "present", it's the latest (give it a huge number)
          if (str.includes("present")) return 9999;
          
          // 2. Extract the first 4-digit year found (e.g., "2023" from "2021-2023")
          const match = str.match(/(\d{4})/);
          return match ? parseInt(match[0]) : 0;
        };

        const yearA = getYearValue(a.year);
        const yearB = getYearValue(b.year);

        // Sort Descending (Highest year first)
        return yearB - yearA;
      });

      setEducation(sortedData);
    });
  }, []);

  if (!education.length) return null;

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "40px",
        boxSizing: "border-box"
      }}
    >
      {/* HEADER */}
      <h2
        style={{
          fontSize: "48px",
          fontWeight: "700",
          marginBottom: "40px",
          color: "black",
          textAlign: "center",
          letterSpacing: "-1px"
        }}
      >
        Education
      </h2>

      {/* TIMELINE CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          paddingLeft: "20px"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {education.map((edu, index) => {
            
            const isLast = index === education.length - 1;
            
            // Logic: If year contains "Present", treat as current (Empty Circle)
            const isCurrent = edu.year && edu.year.toLowerCase().includes("present");

            return (
              <div
                key={edu._id || index}
                style={{
                  display: "flex",
                  gap: "32px",
                  position: "relative",
                  paddingBottom: isLast ? "0" : "40px"
                }}
              >
                {/* --- CONNECTING LINE --- */}
                {!isLast && (
                  <div
                    style={{
                      position: "absolute",
                      left: "9px", 
                      top: "17px",
                      bottom: "-17px", 
                      width: "4px",
                      background: "black",
                      zIndex: 0
                    }}
                  />
                )}

                {/* CIRCLE BULLET */}
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    border: "3px solid black",
                    background: isCurrent ? "white" : "black",
                    flexShrink: 0,
                    marginTop: "6px",
                    zIndex: 1
                  }}
                />

                {/* TEXT CONTENT */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      opacity: 0.6,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "black"
                    }}
                  >
                    {edu.year}
                  </span>

                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      margin: 0,
                      color: "black"
                    }}
                  >
                    {edu.degree}
                  </h3>

                  <p style={{ margin: 0, fontSize: "16px", opacity: 0.8, color: "black" }}>
                    {edu.branch} • {edu.school}
                  </p>

                  {edu.grade && (
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "black"
                      }}
                    >
                      Grade: {edu.grade}
                    </div>
                  )}
                  
                  {edu.description && (
                    <p style={{ marginTop: "4px", fontSize: "14px", opacity: 0.7 }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Education;