import React, { useState, useEffect, useMemo } from "react";
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
  const [categoryMode, setCategoryMode] = useState(false); // Toggle for Category Manager

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
  const [newProject, setNewProject] = useState({ 
    title: "", description: "", techStack: "", githubLink: "", liveLink: "", image: "", order: 0 
  });
  
  const [newSkill, setNewSkill] = useState({ 
    name: "", category: "", level: 80, color: "#000000", order: 0, categoryOrder: 0 
  }); 
  const [isNewCategory, setIsNewCategory] = useState(false); // Toggle for "Create New Category" input

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

  // --- SMART SKILL HELPERS ---
  // Extract unique categories and their current order
  const distinctCategories = useMemo(() => {
    const map = new Map();
    skills.forEach(s => {
      if (!map.has(s.category)) {
        map.set(s.category, { name: s.category, order: s.categoryOrder });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.order - b.order);
  }, [skills]);

  // Handle Category Selection in Dropdown
  const handleCategorySelect = (e) => {
    const val = e.target.value;
    if (val === "___NEW___") {
      setIsNewCategory(true);
      // Default to next available category rank
      const nextCatOrder = distinctCategories.length > 0 
        ? Math.max(...distinctCategories.map(c => c.order)) + 1 
        : 1;
      setNewSkill({ ...newSkill, category: "", categoryOrder: nextCatOrder, order: 1 });
    } else {
      setIsNewCategory(false);
      // Find stats for existing category
      const catStats = distinctCategories.find(c => c.name === val);
      // Find next skill order in this category
      const skillsInCat = skills.filter(s => s.category === val);
      const nextSkillOrder = skillsInCat.length > 0 
        ? Math.max(...skillsInCat.map(s => s.order)) + 1 
        : 1;
      
      setNewSkill({ 
        ...newSkill, 
        category: val, 
        categoryOrder: catStats?.order || 0,
        order: nextSkillOrder
      });
    }
  };

  // Handle Bulk Category Reorder
  const handleCategoryReorder = async (categoryName, newOrder) => {
    // 1. Find all skills with this category
    const skillsToUpdate = skills.filter(s => s.category === categoryName);
    
    // 2. Update them all (Optimistic UI update could be added here)
    if(window.confirm(`Update rank of "${categoryName}" to ${newOrder}? This updates ${skillsToUpdate.length} skills.`)) {
        try {
            await Promise.all(skillsToUpdate.map(s => updateSkill(s._id, { ...s, categoryOrder: Number(newOrder) })));
            loadAllData();
        } catch(err) { alert("Error updating category order"); }
    }
  };

  const handleLogin = (e) => { e.preventDefault(); if (password === "anuj123") setIsAuthenticated(true); else alert("Wrong Password!"); };
  const handleProfileUpdate = async (e) => { e.preventDefault(); await updateProfile(profile); alert("Updated!"); };

  // --- HANDLERS ---
  const handleEduSubmit = async (e) => { e.preventDefault(); if (editingEduId) { await updateEducation(editingEduId, newEdu); setEditingEduId(null); } else { await createEducation(newEdu); } setNewEdu({ degree: "", branch: "", school: "", year: "", grade: "", description: "" }); loadAllData(); };
  const startEditingEdu = (edu) => { setEditingEduId(edu._id); setNewEdu(edu); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); };
  const handleDeleteEdu = async (id) => { if(window.confirm("Delete?")) { await deleteEducation(id); loadAllData(); }};

  const handleProjectSubmit = async (e) => { 
    e.preventDefault(); 
    const techStackArray = typeof newProject.techStack === 'string' ? newProject.techStack.split(",").map(t => t.trim()) : newProject.techStack; 
    const payload = { ...newProject, techStack: techStackArray }; 
    if (editingProjId) { await updateProject(editingProjId, payload); setEditingProjId(null); } else { await createProject(payload); } 
    setNewProject({ title: "", description: "", techStack: "", githubLink: "", liveLink: "", image: "", order: 0 }); 
    loadAllData(); 
  };

  const startEditingProject = (proj) => { 
    setEditingProjId(proj._id); 
    setNewProject({ ...proj, techStack: proj.techStack.join(", "), image: proj.image || "", order: proj.order || 0 }); 
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); 
  };
  const handleDeleteProject = async (id) => { if(window.confirm("Delete?")) { await deleteProject(id); loadAllData(); }};

  const handleSkillSubmit = async (e) => { 
      e.preventDefault(); 
      if (editingSkillId) { 
          await updateSkill(editingSkillId, newSkill); 
          setEditingSkillId(null); 
      } else { 
          await createSkill(newSkill); 
      } 
      // Reset form but keep last category if creating multiples? No, reset all for safety.
      setNewSkill({ name: "", category: "", level: 80, color: "#000000", order: 0, categoryOrder: 0 }); 
      setIsNewCategory(false);
      loadAllData(); 
  };

  const startEditingSkill = (skill) => { 
      setEditingSkillId(skill._id); 
      setNewSkill(skill); 
      setIsNewCategory(false); // Usually editing keeps existing category
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); 
  };
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
              <label>Email</label>
              <input style={inputStyle} value={profile.socialLinks?.email || ""} onChange={e => setProfile({...profile, socialLinks: {...profile.socialLinks, email: e.target.value}})} placeholder="e.g. 2404anuj@gmail.com"/>
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
                  <div>
                    <strong style={{ fontSize: "1.2rem", color: "#555" }}>#{p.order || 0}</strong>&nbsp;
                    <strong style={{ fontSize: "1.2rem" }}>{p.title}</strong><br/><small>{p.techStack.join(", ")}</small>
                  </div>
                  <div style={{display:"flex", gap:"10px"}}>
                    <button onClick={() => startEditingProject(p)} style={btnEdit}>Edit</button>
                    <button onClick={() => handleDeleteProject(p._id)} style={btnDelete}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <h3 style={sectionHeader}>{editingProjId ? "Edit Project" : "Add Project"}</h3>
            <form onSubmit={handleProjectSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "800px" }}>
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Title</label>
                  <input style={inputStyle} placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
                </div>
                <div style={{ width: "80px" }}>
                  <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Rank</label>
                  <input type="number" style={inputStyle} placeholder="1" value={newProject.order} onChange={(e) => setNewProject({...newProject, order: Number(e.target.value)})} />
                </div>
              </div>
              <textarea style={{...inputStyle, height: "100px"}} placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required />
              <input style={inputStyle} placeholder="Tech Stack (comma separated)" value={newProject.techStack} onChange={e => setNewProject({...newProject, techStack: e.target.value})} required />
              <input style={inputStyle} placeholder="Image Path" value={newProject.image} onChange={(e) => setNewProject({...newProject, image: e.target.value})} />
              <input style={inputStyle} placeholder="GitHub Link" value={newProject.githubLink} onChange={e => setNewProject({...newProject, githubLink: e.target.value})} />
              <input style={inputStyle} placeholder="Live Link" value={newProject.liveLink} onChange={e => setNewProject({...newProject, liveLink: e.target.value})} />
              <div style={{display:"flex", gap:"10px"}}>
                <button type="submit" style={btnPrimary}>{editingProjId ? "Update Project" : "Add Project"}</button>
                {editingProjId && <button type="button" onClick={() => { setEditingProjId(null); setNewProject({title:"", description:"", techStack:"", githubLink:"", liveLink:"", image:"", order: 0}); }} style={btnCancel}>Cancel</button>}
              </div>
            </form>
          </div>
        )}

        {/* ---------------- SKILLS TAB (UPDATED) ---------------- */}
        {activeTab === "skills" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2>Manage Skills</h2>
                <button 
                  onClick={() => setCategoryMode(!categoryMode)} 
                  style={{ ...btnEdit, background: categoryMode ? "#333" : "#eee", color: categoryMode ? "white" : "#333" }}
                >
                    {categoryMode ? "Exit Category Manager" : "Manage Categories"}
                </button>
            </div>

            {/* VIEW 1: CATEGORY MANAGER (Rank Categories Only) */}
            {categoryMode && (
                <div style={{ marginBottom: "40px", padding: "20px", background: "rgba(255,255,255,0.4)", borderRadius: "12px" }}>
                    <h3>Reorder Categories</h3>
                    <p style={{fontSize:"13px", color:"#666", marginBottom:"15px"}}>Changing a rank here updates ALL skills in that category.</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {distinctCategories.map((cat) => (
                            <div key={cat.name} style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                <strong style={{ minWidth: "120px" }}>{cat.name}</strong>
                                <input 
                                    type="number" 
                                    defaultValue={cat.order} 
                                    style={{ ...inputStyle, width: "70px", padding: "8px" }}
                                    onBlur={(e) => {
                                        if(Number(e.target.value) !== cat.order) {
                                            handleCategoryReorder(cat.name, e.target.value);
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* VIEW 2: SKILL LIST (Grouped by Category for Clarity) */}
            {!categoryMode && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
                {skills.sort((a,b) => (a.categoryOrder - b.categoryOrder) || (a.order - b.order)).map(s => (
                  <div key={s._id} style={{ ...listItemStyle, borderRadius: "20px", padding: "8px 15px", display: "inline-flex", width: "auto" }}>
                    <span style={{ marginRight: "10px" }}>
                      <b style={{marginRight:"5px", color:"#555"}}>#{s.order || 0}</b>
                      {s.name} <small style={{opacity: 0.6, marginLeft:"5px"}}>({s.category})</small>
                    </span>
                    <div style={{display:"flex", alignItems:"center", marginLeft:"auto", gap:"10px"}}>
                       <span onClick={() => startEditingSkill(s)} style={{ color: "#4f8cff", cursor: "pointer" }}>✎</span>
                       <span onClick={() => handleDeleteSkill(s._id)} style={{ color: "#ff4444", cursor: "pointer", fontWeight: "bold" }}>×</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <h3 style={sectionHeader}>{editingSkillId ? "Edit Skill" : "Add New Skill"}</h3>
            <form onSubmit={handleSkillSubmit} style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "flex-end" }}>
              
              <div style={{ flex: 2, minWidth: "150px" }}>
                <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Name</label>
                <input style={inputStyle} placeholder="e.g. Docker" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} required />
              </div>
              
              {/* SMART CATEGORY SELECTOR */}
              <div style={{ flex: 1, minWidth: "150px" }}>
                 <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Category</label>
                 
                 {!isNewCategory ? (
                    <select 
                        style={inputStyle} 
                        value={newSkill.category} 
                        onChange={handleCategorySelect}
                        required={!isNewCategory}
                    >
                        <option value="">-- Select Category --</option>
                        {distinctCategories.map(c => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                        <option value="___NEW___">+ Create New Category</option>
                    </select>
                 ) : (
                    <div style={{ display: "flex", gap: "5px" }}>
                        <input 
                            style={inputStyle} 
                            placeholder="New Category Name" 
                            value={newSkill.category} 
                            onChange={e => setNewSkill({...newSkill, category: e.target.value})} 
                            autoFocus
                        />
                        <button type="button" onClick={() => setIsNewCategory(false)} style={btnCancel}>✖</button>
                    </div>
                 )}
              </div>

              {/* READ-ONLY / AUTO-FILLED ORDERS (Editable if needed) */}
              <div style={{ width: "70px" }}>
                <label style={{display:"block", marginBottom:"5px", fontSize:"12px", opacity: 0.5}}>Cat. Rank</label>
                <input type="number" style={{...inputStyle, background: "#eee"}} value={newSkill.categoryOrder || 0} onChange={e => setNewSkill({...newSkill, categoryOrder: Number(e.target.value)})} />
              </div>

              <div style={{ width: "70px" }}>
                <label style={{display:"block", marginBottom:"5px", fontSize:"12px"}}>Rank</label>
                <input type="number" style={inputStyle} value={newSkill.order || 0} onChange={e => setNewSkill({...newSkill, order: Number(e.target.value)})} />
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
                 {editingSkillId && <button type="button" onClick={() => { setEditingSkillId(null); setNewSkill({name:"", category:"", level:80, color:"#000000", order:0, categoryOrder:0}); setIsNewCategory(false); }} style={{...btnCancel, marginTop:0, border: "1px solid transparent"}}>Cancel</button>}
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