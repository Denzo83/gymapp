import React, { useState, useMemo } from "react";
import { Plus, Search, X, Pencil } from "lucide-react";
import { CATEGORIES, EQUIPMENT_TYPES } from "../data/exercises";

const catClass = id => `cat-${id}`;

function ExerciseSheet({ exercise, onSave, onClose }) {
  const isNew = !exercise?.id;
  const [form, setForm] = useState({
    name:"", category:"push", equipment:"barbell", muscles:[], notes:"",
    ...(exercise||{}),
  });
  const [muscleInput, setMuscleInput] = useState("");
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const addMuscle = () => {
    const m = muscleInput.trim().toLowerCase();
    if (m && !form.muscles.includes(m)) set("muscles",[...form.muscles,m]);
    setMuscleInput("");
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-handle"/>
        <div className="sheet-title">{isNew ? "Add exercise ✨" : "Edit exercise"}</div>
        <div className="sheet-body">
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div>
              <label className="label">Name</label>
              <input className="input" value={form.name} onChange={e=>set("name",e.target.value)}
                placeholder="e.g. Hip Thrust" autoFocus/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <label className="label">Category</label>
                <select className="input" value={form.category} onChange={e=>set("category",e.target.value)}
                  style={{ fontSize:14 }}>
                  {CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Equipment</label>
                <select className="input" value={form.equipment} onChange={e=>set("equipment",e.target.value)}
                  style={{ fontSize:14, textTransform:"capitalize" }}>
                  {EQUIPMENT_TYPES.map(eq=><option key={eq} value={eq} style={{textTransform:"capitalize"}}>{eq}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label">Muscles (tap Enter)</label>
              <div style={{ display:"flex", gap:8, marginBottom:8 }}>
                <input className="input" value={muscleInput} onChange={e=>setMuscleInput(e.target.value)}
                  onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault(); addMuscle(); }}}
                  placeholder="e.g. glutes" style={{ flex:1 }}/>
                <button className="btn btn-primary btn-sm" onClick={addMuscle} style={{ padding:"0 14px" }}>
                  <Plus size={15}/>
                </button>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {form.muscles.map(m=>(
                  <span key={m} className="pill" style={{ background:"var(--bg2)", color:"var(--muted)", gap:5 }}>
                    {m}
                    <button onClick={()=>set("muscles",form.muscles.filter(x=>x!==m))} style={{ fontSize:13, color:"inherit", lineHeight:1 }}>×</button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Notes / cues</label>
              <textarea className="input" value={form.notes} onChange={e=>set("notes",e.target.value)}
                placeholder="Form tips, variations, weight notes…" style={{ height:72, resize:"none" }}/>
            </div>
          </div>
        </div>
        <div className="sheet-footer">
          <button className="btn btn-ghost" style={{ flex:1, justifyContent:"center" }} onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" style={{ flex:2, justifyContent:"center" }}
            onClick={()=>{ if(form.name.trim()) onSave(form); }}
            disabled={!form.name.trim()}>
            {isNew ? "Add Exercise" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExercisesTab({ exercises, saveExercise, deleteExercise }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCat] = useState("all");
  const [sheet, setSheet]   = useState(null); // null | "new" | exercise

  const filtered = useMemo(()=>exercises.filter(ex=>{
    const q = search.toLowerCase();
    const mQ = ex.name.toLowerCase().includes(q) || (ex.muscles||[]).some(m=>m.toLowerCase().includes(q)) || ex.equipment?.toLowerCase().includes(q);
    const mC = catFilter==="all" || ex.category===catFilter;
    return mQ && mC;
  }),[exercises,search,catFilter]);

  const grouped = useMemo(()=>{
    const g={};
    CATEGORIES.forEach(c=>{
      const items=filtered.filter(ex=>ex.category===c.id);
      if(items.length) g[c.id]=items;
    });
    return g;
  },[filtered]);

  const handleSave = async (form) => { await saveExercise(form); setSheet(null); };

  return (
    <div className="page">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div>
          <h2 style={{ fontSize:28 }}>Exercises 🏋️</h2>
          <p style={{ color:"var(--muted)", fontSize:13, marginTop:2 }}>{exercises.length} in your bank</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={()=>setSheet("new")}>
          <Plus size={15}/> Add
        </button>
      </div>

      {/* Search */}
      <div style={{ position:"relative", marginBottom:12 }}>
        <Search size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)", pointerEvents:"none" }}/>
        <input className="input" value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search exercises…" style={{ paddingLeft:34 }}/>
        {search && <button onClick={()=>setSearch("")} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", color:"var(--muted)" }}><X size={15}/></button>}
      </div>

      {/* Category pills */}
      <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:4, marginBottom:20 }}>
        {[{id:"all",label:"All",emoji:"✨"},...CATEGORIES].map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)} style={{
            padding:"6px 14px", borderRadius:99, fontSize:12.5, fontWeight:700, flexShrink:0,
            background: catFilter===c.id ? "var(--accent)" : "var(--surface)",
            color:       catFilter===c.id ? "#fff"          : "var(--muted)",
            border:`1.5px solid ${catFilter===c.id ? "var(--accent)" : "var(--border)"}`,
          }}>{c.emoji} {c.label}</button>
        ))}
      </div>

      {/* Grouped exercises */}
      {Object.entries(grouped).map(([catId,items])=>{
        const cat = CATEGORIES.find(c=>c.id===catId);
        return (
          <div key={catId} style={{ marginBottom:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
              <span style={{ fontSize:18 }}>{cat?.emoji}</span>
              <h3 style={{ fontSize:17 }}>{cat?.label}</h3>
              <span className={`pill ${catClass(catId)}`} style={{ fontSize:10.5 }}>{items.length}</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {items.map(ex=>(
                <div key={ex.id} className="card fade-in" style={{ display:"flex", alignItems:"center", gap:10, padding:"13px 14px" }}>
                  <span style={{ fontSize:18 }}>{cat?.emoji}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:14, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{ex.name}</div>
                    <div style={{ display:"flex", gap:5, marginTop:3, flexWrap:"wrap" }}>
                      <span className={`pill ${catClass(catId)}`} style={{ fontSize:10.5 }}>{cat?.label}</span>
                      <span className="pill" style={{ background:"var(--bg2)", color:"var(--muted)", fontSize:10.5, textTransform:"capitalize" }}>{ex.equipment}</span>
                    </div>
                  </div>
                  <button onClick={()=>setSheet(ex)} style={{ color:"var(--muted)", padding:6 }}><Pencil size={14}/></button>
                  <button onClick={()=>deleteExercise(ex.id)} style={{ color:"var(--muted)", padding:6 }}><X size={14}/></button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length===0 && (
        <div style={{ textAlign:"center", padding:"50px 20px", color:"var(--muted)" }}>
          <div style={{ fontSize:44, marginBottom:10 }}>🔍</div>
          <h3 style={{ fontSize:20, marginBottom:6 }}>Nothing found</h3>
          <p style={{ fontSize:13 }}>Try a different search or add a new one!</p>
        </div>
      )}

      {sheet && (
        <ExerciseSheet
          exercise={sheet==="new" ? null : sheet}
          onSave={handleSave}
          onClose={()=>setSheet(null)}/>
      )}
    </div>
  );
}
