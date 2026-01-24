import React, { useState, useEffect } from "react";
import { 
  getProfile, updateProfile, 
  getProjects, createProject, updateProject, deleteProject, 
  getSkills, createSkill, updateSkill, deleteSkill,
  getEducation, createEducation, updateEducation, deleteEducation 
} from "../services/api";

const Dashboard = () => {
  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState("profile");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // --- DATA STATE ---
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);

  // --- EDITING STATE ---
  const [editingEduId, setEditingEduId] = useState(null);
  const [editingProjId, setEditingProjId] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);

  // --- FORM STATE ---
  const [newProject, setNewProject] = useState({ title: "", description: "", techStack: "", githubLink: "", liveLink: "" });
  
  // ✅ UPDATED STATE: Added order and categoryOrder
  const [newSkill, setNewSkill] = useState({ name: "", category: "", level: 80, color: "#000000", order: 0, categoryOrder: 0 }); 
  
  const [newEdu, setNewEdu] = useState({ degree: "", branch: "", school: "", year: "", grade: "", description: "" });

  useEffect(() => {
    document.title = "Admin Panel"; 
    return () => { document.title = "Anuj Dahiya"; };
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadAllData();
  }, [isAuthenticated]);

  const loadAllData = async () => {
    try {
      const p = await getProfile(); setProfile(p || {});
      const proj = await getProjects(); setProjects(proj || []);
      const sk = await getSkills(); setSkills(sk || []);
      const edu = await getEducation(); setEducation(edu || []);
    } catch (error) { console.error(error); }
  };

  const handleLogin = (e) => { e.preventDefault(); if (password === "anuj123") setIsAuthenticated(true); else alert("Wrong Password!"); };
  const handleProfileUpdate = async (e) => { e.preventDefault(); await updateProfile(profile); alert("Updated!"); };

  // --- HANDLERS ---
  const handleEduSubmit = async (e) => { e.preventDefault(); if (editingEduId) { await updateEducation(editingEduId, newEdu); setEditingEduId(null); } else { await createEducation(newEdu); } setNewEdu({ degree: "", branch: "", school: "", year: "", grade: "", description: "" }); loadAllData(); };
  const startEditingEdu = (edu) => { setEditingEduId(edu._id); setNewEdu(edu); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); };
  const handleDeleteEdu = async (id) => { if(window.confirm("Delete?")) { await deleteEducation(id); loadAllData(); }};

  const handleProjectSubmit = async (e) => { e.preventDefault(); const techStackArray = typeof newProject.techStack === 'string' ? newProject.techStack.split(",").map(t => t.trim()) : newProject.techStack; const payload = { ...newProject, techStack: techStackArray }; if (editingProjId) { await updateProject(editingProjId, payload); setEditingProjId(null); } else { await createProject(payload); } setNewProject({ title: "", description: "", techStack: "", githubLink: "", liveLink: "" }); loadAllData(); };
  const startEditingProject = (proj) => { setEditingProjId(proj._id); setNewProject({ ...proj, techStack: proj.techStack.join(", ") }); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); };
  const handleDeleteProject = async (id) => { if(window.confirm("Delete?")) { await deleteProject(id); loadAllData(); }};

  // ✅ UPDATED SKILL HANDLERS
  const handleSkillSubmit = async (e) => { e.preventDefault(); if (editingSkillId) { await updateSkill(editingSkillId, newSkill); setEditingSkillId(null); } else { await createSkill(newSkill); } setNewSkill({ name: "", category: "", level: 80, color: "#000000", order: 0, categoryOrder: 0 }); loadAllData(); };
  const startEditingSkill = (skill) => { setEditingSkillId(skill._id); setNewSkill(skill); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); };
  const handleDeleteSkill = async (id) => { if(window.confirm("Delete?")) { await deleteSkill(id); loadAllData(); }};


  // ================= RENDER =================
  if (!isAuthenticated) {
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form onSubmit={handleLogin} className="glass" style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "20px", minWidth: "300px" }}>
          <h2 style={{ textAlign: "center" }}>Admin Access</h2>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} />
          <button type="submit" style={{ padding: "12px", borderRadius: "8px", border: "none", background: "#333", color: "#fff" }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "40px", display: "flex", gap: "40px", alignItems: "flex-start" }}>
      
      {/* SIDEBAR */}
      <div className="glass" style={{ width: "250px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", position: "sticky", top: "50%", transform: "translateY(-50%)", maxHeight: "80vh" }}>
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Dashboard</h3>
        {["profile", "education", "projects", "skills"].map((tab) => (
          <button 
            key={tab}
            onClick={() => { setActiveTab(tab); setEditingEduId(null); setEditingProjId(null); setEditingSkillId(null); }}
            style={{ 
              textAlign: "left", padding: "12px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: activeTab === tab ? "rgba(0,0,0,0.1)" : "transparent",
              fontWeight: activeTab === tab ? "bold" : "normal"
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="glass" style={{ flex: 1, padding: "40px" }}>
        
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div>
            <h2 style={{ marginBottom: "20px" }}>Edit Profile</h2>
            <form onSubmit={handleProfileUpdate} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "800px" }}>
              <label>Name</label><input style={inputStyle} value={profile.name || ""} onChange={e => setProfile({...profile, name: e.target.value})} />
              <label>Headline Role</label><input style={inputStyle} value={profile.role || ""} onChange={e => setProfile({...profile, role: e.target.value})} />
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}><label>Current Role</label><input style={{...inputStyle, width: "100%"}} value={profile.currentRole || ""} onChange={e => setProfile({...profile, currentRole: e.target.value})} /></div>
                <div style={{ flex: 1 }}><label>Current Organisation</label><input style={{...inputStyle, width: "100%"}} value={profile.currentOrg || ""} onChange={e => setProfile({...profile, currentOrg: e.target.value})} /></div>
              </div>
              <label>Bio</label><textarea style={{...inputStyle, height: "150px"}} value={profile.bio || ""} onChange={e => setProfile({...profile, bio: e.target.value})} />
              <label>Resume Link</label><input style={inputStyle} value={profile.resumeLink || ""} onChange={e => setProfile({...profile, resumeLink: e.target.value})} />
              <h3 style={sectionDivider}>Social Links</h3>
              <label>GitHub</label><input style={inputStyle} value={profile.socialLinks?.github || ""} onChange={e => setProfile({...profile, socialLinks: {...profile.socialLinks, github: e.target.value}})} />
              <label>LinkedIn</label><input style={inputStyle} value={profile.socialLinks?.linkedin || ""} onChange={e => setProfile({...profile, socialLinks: {...profile.socialLinks, linkedin: e.target.value}})} />
              <label>LeetCode</label><input style={inputStyle} value={profile.socialLinks?.leetcode || ""} onChange={e => setProfile({...profile, socialLinks: {...profile.socialLinks, leetcode: e.target.value}})} />
              <label>Codeforces</label><input style={inputStyle} value={profile.socialLinks?.codeforces || ""} onChange={e => setProfile({...profile, socialLinks: {...profile.socialLinks, codeforces: e.target.value}})} />
              <button type="submit" style={btnPrimary}>Save Profile</button>
            </form>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === "education" && (
          <div>
            <h2 style={{ marginBottom: "20px" }}>Manage Education</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "40px" }}>
              {education.map(edu => (
                <div key={edu._id} style={listItemStyle}>
                  <div><strong style={{ fontSize: "1.2rem" }}>{edu.degree}</strong> ({edu.branch}) <br /><small>{edu.school} | {edu.year}</small></div>
                  <div style={{display:"flex", gap:"10px"}}>
                    <button onClick={() => startEditingEdu(edu)} style={btnEdit}>Edit</button>
                    <button onClick={() => handleDeleteEdu(edu._id)} style={btnDelete}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <h3 style={sectionHeader}>{editingEduId ? "Edit Education" : "Add Education"}</h3>
            <form onSubmit={handleEduSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "800px" }}>
              <input style={inputStyle} placeholder="Degree" value={newEdu.degree} onChange={e => setNewEdu({...newEdu, degree: e.target.value})} required />
              <input style={inputStyle} placeholder="Branch" value={newEdu.branch} onChange={e => setNewEdu({...newEdu, branch: e.target.value})} />
              <input style={inputStyle} placeholder="School" value={newEdu.school} onChange={e => setNewEdu({...newEdu, school: e.target.value})} required />
              <input style={inputStyle} placeholder="Year" value={newEdu.year} onChange={e => setNewEdu({...newEdu, year: e.target.value})} required />
              <input style={inputStyle} placeholder="Grade" value={newEdu.grade} onChange={e => setNewEdu({...newEdu, grade: e.target.value})} />
              <textarea style={{...inputStyle, height: "100px"}} placeholder="Description" value={newEdu.description} onChange={e => setNewEdu({...newEdu, description: e.target.value})} />
              <div style={{display:"flex", gap:"10px"}}>
                <button type="submit" style={btnPrimary}>{editingEduId ? "Update Education" : "Add Education"}</button>
                {editingEduId && <button type="button" onClick={() => { setEditingEduId(null); setNewEdu({degree:"", branch:"", school:"", year:"", grade:"", description:""}); }} style={btnCancel}>Cancel</button>}
              </div>
            </form>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div>
            <h2 style={{ marginBottom: "20px" }}>Manage Projects</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "40px" }}>
              {projects.map(p => (
                <div key={p._id} style={listItemStyle}>
                  <div><strong style={{ fontSize: "1.2rem" }}>{p.title}</strong><br/><small>{p.techStack.join(", ")}</small></div>
                  <div style={{display:"flex", gap:"10px"}}>
                    <button onClick={() => startEditingProject(p)} style={btnEdit}>Edit</button>
                    <button onClick={() => handleDeleteProject(p._id)} style={btnDelete}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <h3 style={sectionHeader}>{editingProjId ? "Edit Project" : "Add Project"}</h3>
            <form onSubmit={handleProjectSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "800px" }}>
              <input style={inputStyle} placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
              <textarea style={{...inputStyle, height: "100px"}} placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required />
              <input style={inputStyle} placeholder="Tech Stack (comma separated)" value={newProject.techStack} onChange={e => setNewProject({...newProject, techStack: e.target.value})} required />
              <input style={inputStyle} placeholder="GitHub Link" value={newProject.githubLink} onChange={e => setNewProject({...newProject, githubLink: e.target.value})} />
              <input style={inputStyle} placeholder="Live Link" value={newProject.liveLink} onChange={e => setNewProject({...newProject, liveLink: e.target.value})} />
              <div style={{display:"flex", gap:"10px"}}>
                <button type="submit" style={btnPrimary}>{editingProjId ? "Update Project" : "Add Project"}</button>
                {editingProjId && <button type="button" onClick={() => { setEditingProjId(null); setNewProject({title:"", description:"", techStack:"", githubLink:"", liveLink:""}); }} style={btnCancel}>Cancel</button>}
              </div>
            </form>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === "skills" && (
          <div>
            <h2 style={{ marginBottom: "20px" }}>Manage Skills</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
              {skills.map(s => (
                <div key={s._id} style={{ ...listItemStyle, borderRadius: "20px", padding: "8px 15px", display: "inline-flex", width: "auto" }}>
                  <span style={{ marginRight: "10px" }}>
                    {/* Display Order in UI for reference */}
                    <b style={{marginRight:"5px", color:"#555"}}>#{s.order || 0}</b>
                    {s.name} 
                    <small style={{opacity: 0.6, marginLeft:"5px"}}>({s.category})</small>
                  </span>
                  <div style={{display:"flex", alignItems:"center", marginLeft:"auto", gap:"10px"}}>
                     <span onClick={() => startEditingSkill(s)} style={{ color: "#4f8cff", cursor: "pointer", display:"flex", alignItems:"center" }} title="Edit Skill">
                       <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                     </span>
                     <span onClick={() => handleDeleteSkill(s._id)} style={{ color: "#ff4444", cursor: "pointer", fontWeight: "bold", fontSize: "1.2rem", lineHeight: "1" }} title="Delete Skill">×</span>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 style={sectionHeader}>{editingSkillId ? "Edit Skill" : "Add Skill"}</h3>
            <form onSubmit={handleSkillSubmit} style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "flex-end" }}>
              
              <div style={{ flex: 2, minWidth: "150px" }}>
                <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Name</label>
                <input style={inputStyle} placeholder="e.g. Docker" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} required />
              </div>
              
              <div style={{ flex: 1, minWidth: "120px" }}>
                 <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Category</label>
                 <input list="category-options" style={inputStyle} placeholder="Type or Select" value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})} required />
                 <datalist id="category-options">
                   <option value="Languages" /><option value="Frontend" /><option value="Backend" /><option value="Database" /><option value="Tools" />
                 </datalist>
              </div>

              {/* ✅ NEW: CATEGORY PRIORITY */}
              <div style={{ width: "90px" }}>
                <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Cat. Order</label>
                <input type="number" style={inputStyle} placeholder="1, 2..." value={newSkill.categoryOrder || 0} onChange={e => setNewSkill({...newSkill, categoryOrder: Number(e.target.value)})} />
              </div>

              {/* ✅ NEW: SKILL PRIORITY */}
              <div style={{ width: "70px" }}>
                <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Order</label>
                <input type="number" style={inputStyle} placeholder="1..." value={newSkill.order || 0} onChange={e => setNewSkill({...newSkill, order: Number(e.target.value)})} />
              </div>

              <div style={{ width: "70px" }}>
                <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Level</label>
                <input type="number" min="0" max="100" style={inputStyle} value={newSkill.level} onChange={e => setNewSkill({...newSkill, level: e.target.value})} required />
              </div>
              
              <div style={{ width: "50px" }}>
                 <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Color</label>
                 <input type="color" className="color-input-reset" value={newSkill.color} onChange={e => setNewSkill({...newSkill, color: e.target.value})} style={{ width: "100%", height: "42px", borderRadius: "8px", cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }} />
              </div>
              
              <div style={{display:"flex", gap:"10px"}}>
                 <button type="submit" style={{...btnPrimary, marginTop: 0, border: "1px solid transparent"}}>{editingSkillId ? "Update" : "Add"}</button>
                 {editingSkillId && <button type="button" onClick={() => { setEditingSkillId(null); setNewSkill({name:"", category:"", level:80, color:"#000000", order:0, categoryOrder:0}); }} style={{...btnCancel, marginTop:0, border: "1px solid transparent"}}>Cancel</button>}
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

// --- STYLES HELPER ---
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.7)", fontSize: "15px", outline: "none", boxSizing: "border-box" };
const listItemStyle = { background: "rgba(255,255,255,0.5)", padding: "12px 20px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" };
const btnPrimary = { marginTop: "10px", padding: "12px 24px", background: "#333", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };
const btnCancel = { marginTop: "10px", padding: "12px 24px", background: "#999", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };
const btnEdit = { background: "#4f8cff", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", marginRight: "5px" };
const btnDelete = { background: "#ff4444", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" };
const sectionHeader = { marginBottom: "20px", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "25px" };
const sectionDivider = { marginTop: "20px", marginBottom: "10px", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "20px" };

export default Dashboard;