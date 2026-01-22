import React from "react";

const educationData = [
  {
    id: 1,
    degree: "Master in Technology (M.Tech)",
    field: "Information Technology",
    school: "Netaji Subhas University of Technology",
    year: "2025 - Present",
    grade: "9.0 CGPA",
    isCurrent: true,
  },
  {
    id: 2,
    degree: "Bachelor in Technology (B.Tech)",
    field: "Computer Science & Engineering",
    school: "Kurukshetra University, Kurukshetra",
    year: "2021 - 2025",
    grade: "7.55 CGPA",
    isCurrent: false,
  },
  {
    id: 3,
    degree: "Class XII",
    field: "Non-Medical (Science)",
    school: "CBSE Board",
    year: "Completed",
    grade: "76.40%",
    isCurrent: false,
  },
  {
    id: 4,
    degree: "Class X",
    field: "Secondary Education",
    school: "CBSE Board",
    year: "Completed",
    grade: "93.60%",
    isCurrent: false,
  }
];

const Education = () => {
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
        {/* CHANGED: Removed gap: "40px" from here. 
           We now handle spacing via paddingBottom on individual items 
           so the line can bridge the gap perfectly.
        */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {educationData.map((edu, index) => {
            
            const isLast = index === educationData.length - 1;

            return (
              <div
                key={edu.id}
                style={{
                  display: "flex",
                  gap: "32px",
                  position: "relative", // Needed for the absolute line inside
                  paddingBottom: isLast ? "0" : "40px" // Spacing is now here
                }}
              >
                {/* --- CONNECTING LINE --- */}
                {/* Only render line if it's NOT the last item */}
                {!isLast && (
                  <div
                    style={{
                      position: "absolute",
                      left: "9px",  // Center of the 22px bullet (11px - 2px width = 9px)
                      top: "17px",  // Center of bullet (6px margin + 11px radius)
                      bottom: "-17px", // Extends down to meet the next bullet's center
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
                    background: edu.isCurrent ? "white" : "black",
                    flexShrink: 0,
                    marginTop: "6px", // Pushes circle down slightly to align with text
                    zIndex: 1 // Sits on top of the line
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
                    {edu.field} • {edu.school}
                  </p>

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