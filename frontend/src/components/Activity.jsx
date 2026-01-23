import React, { useEffect, useState } from "react";
import { getProfile } from "../services/api";

// --- DYNAMIC CONFIGURATION ---
const CURRENT_YEAR = new Date().getFullYear().toString();

// --- HELPER: Process Data for the Current Year ---
const processYearData = (dataMap) => {
  const values = [];
  const startOfYear = new Date(`${CURRENT_YEAR}-01-01`);
  const endOfYear = new Date(`${CURRENT_YEAR}-12-31`);
  
  let current = new Date(startOfYear);

  while (current <= endOfYear) {
    const dateString = current.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const count = dataMap[dateString] || 0;

    let level = 0;
    if (count >= 1) level = 1;
    if (count >= 3) level = 2;
    if (count >= 6) level = 3;
    if (count >= 10) level = 4;

    values.push({ date: dateString, level, count });
    current.setDate(current.getDate() + 1);
  }

  return values;
};

// --- HELPER: Extract Username from URL or String ---
const getUsernameFromLink = (link) => {
  if (!link) return null;
  const cleanLink = link.replace(/\/$/, ""); 
  return cleanLink.split("/").pop();
};

// --- LOADER COMPONENT ---
const Spinner = () => (
  <div style={{
    width: "40px",
    height: "40px",
    border: "4px solid rgba(0,0,0,0.1)",
    borderLeftColor: "#333",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "20px auto"
  }} />
);

// --- HEATMAP COMPONENT ---
const Heatmap = ({ title, username, colorTheme, data, loading, error }) => {
  const getColor = (level) => {
    if (level === 0) return "rgba(0,0,0,0.1)"; 
    if (colorTheme === "green") return level === 1 ? "#9be9a8" : level === 2 ? "#40c463" : level === 3 ? "#30a14e" : "#216e39";
    if (colorTheme === "blue") return level === 1 ? "rgba(79, 140, 255, 0.4)" : level === 2 ? "rgba(79, 140, 255, 0.7)" : level === 3 ? "rgba(0, 100, 255, 0.9)" : "#0044ff";
    if (colorTheme === "orange") return level === 1 ? "rgba(255, 193, 7, 0.4)" : level === 2 ? "rgba(255, 193, 7, 0.7)" : level === 3 ? "rgba(255, 160, 0, 0.9)" : "#ff8f00";
    return "black";
  };

  if (!username) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        maxWidth: "900px",
        alignItems: "center",
        minHeight: "140px", // Reduced min-height slightly
        justifyContent: "center"
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", padding: "0 10px" }}>
        <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}>{title}</h3>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: "14px", opacity: 0.7, fontWeight: "500" }}>@{username}</span>
            <span style={{ fontSize: "12px", opacity: 0.5, fontWeight: "500" }}>{CURRENT_YEAR}</span>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div style={{ width: "100%", minHeight: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        {loading && <Spinner />}
        
        {error && <div style={{color: "#ff6b6b", opacity: 1, fontSize: "14px"}}>Unable to load data</div>}

        {!loading && !error && (
          <div
            style={{
              display: "grid",
              gridTemplateRows: "repeat(7, 1fr)",
              gridAutoFlow: "column",
              gap: "4px",
              width: "100%",
              overflowX: "auto",
              padding: "15px", // ✅ Added padding prevents clipped zoom
              margin: "-15px", // Negative margin balances the padding layout shift
              scrollbarWidth: "none" // Optional: Hide scrollbar for cleaner look
            }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "11px",
                  height: "11px",
                  borderRadius: "3px",
                  background: getColor(item.level),
                  transition: "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Bouncy zoom
                  cursor: "pointer",
                  position: "relative" // Helps z-index work correctly
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = "scale(1.8)"; 
                  e.currentTarget.style.zIndex = "100"; 
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = "scale(1)"; 
                  e.currentTarget.style.zIndex = "1"; 
                  e.currentTarget.style.boxShadow = "none";
                }}
                title={`${item.date}: ${item.count} contributions`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Activity = () => {
  const [socials, setSocials] = useState({ github: null, codeforces: null, leetcode: null });

  const [ghData, setGhData] = useState([]);
  const [cfData, setCfData] = useState([]);
  const [lcData, setLcData] = useState([]);

  const [ghLoading, setGhLoading] = useState(true);
  const [cfLoading, setCfLoading] = useState(true);
  const [lcLoading, setLcLoading] = useState(true);
  
  const [ghError, setGhError] = useState(false);
  const [cfError, setCfError] = useState(false);
  const [lcError, setLcError] = useState(false);

  // 1. FETCH PROFILE
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        if (data && data.socialLinks) {
          setSocials({
            github: getUsernameFromLink(data.socialLinks.github),
            codeforces: getUsernameFromLink(data.socialLinks.codeforces),
            leetcode: getUsernameFromLink(data.socialLinks.leetcode),
          });
        }
      } catch (err) {
        console.error("Failed to load profile for activity monitor");
      }
    };
    loadProfile();
  }, []);

  // 2. FETCH GITHUB
  useEffect(() => {
    if (!socials.github) { setGhLoading(false); return; }

    const fetchGitHub = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${socials.github}?y=${CURRENT_YEAR}`);
        const json = await res.json();
        const dataMap = {};
        if (json.contributions) json.contributions.forEach(d => dataMap[d.date] = d.count);
        setGhData(processYearData(dataMap));
      } catch (err) { setGhError(true); } 
      finally { setGhLoading(false); }
    };
    fetchGitHub();
  }, [socials.github]);

  // 3. FETCH CODEFORCES
  useEffect(() => {
    if (!socials.codeforces) { setCfLoading(false); return; }

    const fetchCodeforces = async () => {
      try {
        const proxyUrl = "https://api.codetabs.com/v1/proxy?quest=";
        const targetUrl = `https://codeforces.com/api/user.status?handle=${socials.codeforces}`;
        const res = await fetch(proxyUrl + targetUrl);
        const json = await res.json();
        if (json.status !== "OK") throw new Error("CF API Error");
        const dataMap = {};
        json.result.forEach((sub) => {
          const date = new Date(sub.creationTimeSeconds * 1000);
          const dStr = date.toISOString().split("T")[0];
          if (dStr.startsWith(CURRENT_YEAR)) dataMap[dStr] = (dataMap[dStr] || 0) + 1;
        });
        setCfData(processYearData(dataMap));
      } catch (err) { setCfError(true); } 
      finally { setCfLoading(false); }
    };
    fetchCodeforces();
  }, [socials.codeforces]);

  // 4. FETCH LEETCODE
  useEffect(() => {
    if (!socials.leetcode) { setLcLoading(false); return; }

    const fetchLeetCode = async () => {
      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${socials.leetcode}`);
        if (!res.ok) throw new Error("LeetCode Error");
        const json = await res.json();
        const rawCalendar = json.submissionCalendar || {};
        const dataMap = {};
        Object.keys(rawCalendar).forEach((timestamp) => {
            const date = new Date(parseInt(timestamp) * 1000);
            const dStr = date.toISOString().split("T")[0];
            if (dStr.startsWith(CURRENT_YEAR)) dataMap[dStr] = rawCalendar[timestamp];
        });
        setLcData(processYearData(dataMap));
      } catch (err) { setLcError(true); } 
      finally { setLcLoading(false); }
    };
    fetchLeetCode();
  }, [socials.leetcode]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px" // ✅ Reduced Gap from 80px to 40px
      }}
    >
      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
      </style>

      <h2 style={{ fontSize: "48px", fontWeight: "700", textAlign: "center", marginBottom: "10px" }}>
        Activity Monitor
      </h2>
      
      {socials.github && (
        <Heatmap title="GitHub Contributions" username={socials.github} colorTheme="green" data={ghData} loading={ghLoading} error={ghError} />
      )}

      {socials.codeforces && (
        <Heatmap title="Codeforces Submissions" username={socials.codeforces} colorTheme="blue" data={cfData} loading={cfLoading} error={cfError} />
      )}

      {socials.leetcode && (
        <Heatmap title="LeetCode Solutions" username={socials.leetcode} colorTheme="orange" data={lcData} loading={lcLoading} error={lcError} />
      )}

      {!socials.github && !socials.codeforces && !socials.leetcode && (
        <div style={{ opacity: 0.5 }}>No activity profiles linked in dashboard.</div>
      )}
    </div>
  );
};

export default Activity;