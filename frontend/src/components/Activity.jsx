import React, { useEffect, useState } from "react";

// --- DYNAMIC CONFIGURATION ---
// ✅ Automatically gets the current year (e.g., 2026)
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

// --- HEATMAP COMPONENT ---
const Heatmap = ({ title, username, colorTheme, data, loading, error }) => {
  const getColor = (level) => {
    if (level === 0) return "rgba(0,0,0,0.1)"; 
    if (colorTheme === "green") return level === 1 ? "#9be9a8" : level === 2 ? "#40c463" : level === 3 ? "#30a14e" : "#216e39";
    if (colorTheme === "blue") return level === 1 ? "rgba(79, 140, 255, 0.4)" : level === 2 ? "rgba(79, 140, 255, 0.7)" : level === 3 ? "rgba(0, 100, 255, 0.9)" : "#0044ff";
    if (colorTheme === "orange") return level === 1 ? "rgba(255, 193, 7, 0.4)" : level === 2 ? "rgba(255, 193, 7, 0.7)" : level === 3 ? "rgba(255, 160, 0, 0.9)" : "#ff8f00";
    return "black";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        maxWidth: "900px",
        alignItems: "center",
        minHeight: "180px",
        justifyContent: "center"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: "28px", fontWeight: "700" }}>{title}</h3>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: "16px", opacity: 0.7, fontWeight: "500" }}>@{username}</span>
            <span style={{ fontSize: "12px", opacity: 0.5, fontWeight: "500" }}>{CURRENT_YEAR}</span>
        </div>
      </div>

      {loading && <div style={{opacity: 0.5}}>Loading {CURRENT_YEAR} activity...</div>}
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
                transition: "transform 0.1s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.5)"; e.currentTarget.style.zIndex = 10; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.zIndex = 1; }}
              title={`${item.date}: ${item.count}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Activity = () => {
  const [ghData, setGhData] = useState([]);
  const [cfData, setCfData] = useState([]);
  const [lcData, setLcData] = useState([]);

  const [ghLoading, setGhLoading] = useState(true);
  const [cfLoading, setCfLoading] = useState(true);
  const [lcLoading, setLcLoading] = useState(true);
  
  const [ghError, setGhError] = useState(false);
  const [cfError, setCfError] = useState(false);
  const [lcError, setLcError] = useState(false);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/AnujDahiya2404?y=${CURRENT_YEAR}`);
        const json = await res.json();
        const dataMap = {};
        if (json.contributions) json.contributions.forEach(d => dataMap[d.date] = d.count);
        setGhData(processYearData(dataMap));
        setGhLoading(false);
      } catch (err) { setGhError(true); setGhLoading(false); }
    };
    fetchGitHub();
  }, []);

  useEffect(() => {
    const fetchCodeforces = async () => {
      try {
        const handle = "anuj2404"; 
        const proxyUrl = "https://api.codetabs.com/v1/proxy?quest=";
        const targetUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
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
        setCfLoading(false);
      } catch (err) { setCfError(true); setCfLoading(false); }
    };
    fetchCodeforces();
  }, []);

  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        const username = "2404anuj"; 
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
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
        setLcLoading(false);
      } catch (err) { setLcError(true); setLcLoading(false); }
    };
    fetchLeetCode();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "80px" 
      }}
    >
      <h2 style={{ fontSize: "48px", fontWeight: "700", textAlign: "center", marginBottom: "20px" }}>
        Activity Monitor
      </h2>
      <Heatmap title="GitHub Contributions" username="AnujDahiya2404" colorTheme="green" data={ghData} loading={ghLoading} error={ghError} />
      <Heatmap title="Codeforces Submissions" username="anuj2404" colorTheme="blue" data={cfData} loading={cfLoading} error={cfError} />
      <Heatmap title="LeetCode Solutions" username="2404anuj" colorTheme="orange" data={lcData} loading={lcLoading} error={lcError} />
    </div>
  );
};

export default Activity;