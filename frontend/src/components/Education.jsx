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
    year: "Completed 2025",
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          {educationData.map((edu, index) => {
            
            const isLast = index === educationData.length - 1;

            return (
              <div
                key={edu.id}
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
                    
                    // ✅ REVERTED: Standard Black Border for all
                    border: "3px solid black",
                    
                    // ✅ REVERTED: Hollow (White) if current, Filled (Black) if past
                    background: edu.isCurrent ? "white" : "black",
                    
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