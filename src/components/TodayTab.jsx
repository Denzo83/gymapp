import React, { useState } from "react";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { CATEGORIES, DAYS } from "../data/exercises";

const catClass = id => `cat-${id}`;

export default function TodayTab({ weekPlan, logWorkout, setTab }) {
  const today   = new Date();
  const dayName = format(today, "EEEE");
  const plan    = weekPlan[dayName] || [];

  const [checked, setChecked] = useState({});
  const [notes, setNotes]     = useState("");
  const [logged, setLogged]   = useState(false);

  const toggle = id => setChecked(p => ({ ...p, [id]: !p[id] }));
  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = plan.length ? Math.round(doneCount / plan.length * 100) : 0;
  const anyDone = doneCount > 0;

  const greet = () => {
    const h = today.getHours();
    if (h < 12) return "Good morning 🌸";
    if (h < 17) return "Good afternoon ☀️";
    return "Good evening 🌙";
  };

  const handleLog = () => {
    const done = plan.filter(ex => checked[ex.planId]);
    logWorkout(dayName, done, notes);
    setLogged(true);
  };

  if (logged) return (
    <div className="page" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"60vh", textAlign:"center" }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
      <h2 style={{ fontSize:30, marginBottom:8 }}>Amazing work!</h2>
      <p style={{ color:"var(--muted)", fontSize:14, marginBottom:24 }}>Session logged to history.</p>
      <button className="btn btn-primary" onClick={()=>{ setLogged(false); setChecked({}); setNotes(""); }}>
        Log another session
      </button>
    </div>
  );

  return (
    <div className="page">
      {/* Hero */}
      <div style={{
        background:"linear-gradient(135deg,#fce4f0 0%,#ddf4fb 60%,#d6f7e6 100%)",
        borderRadius:18, padding:"22px 20px 18px", marginBottom:20,
      }}>
        <p style={{ fontFamily:"Instrument Serif,serif", fontSize:26, lineHeight:1.15 }}>{greet()}</p>
        <p style={{ color:"var(--muted)", fontSize:13, marginTop:4 }}>{format(today,"EEEE, d MMMM yyyy")}</p>
        {plan.length > 0 && (
          <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
            <span style={{ background:"rgba(255,255,255,.65)", borderRadius:99, padding:"5px 13px", fontSize:12, fontWeight:700 }}>
              {plan.length} exercises
            </span>
            <span style={{ background:"rgba(255,255,255,.65)", borderRadius:99, padding:"5px 13px", fontSize:12, fontWeight:700 }}>
              {doneCount} done ✓
            </span>
          </div>
        )}
      </div>

      {plan.length === 0 ? (
        <div style={{ textAlign:"center", padding:"40px 20px", color:"var(--muted)" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🌿</div>
          <h3 style={{ fontSize:22, marginBottom:6 }}>Rest day!</h3>
          <p style={{ fontSize:14, marginBottom:20 }}>Nothing planned for {dayName}.</p>
          <button className="btn btn-primary" onClick={()=>setTab("planner")}>
            Plan your week <ChevronRight size={14}/>
          </button>
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div style={{ marginBottom:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--muted)", marginBottom:6 }}>
              <span style={{ fontWeight:700 }}>Progress</span>
              <span style={{ fontWeight:700 }}>{pct}%</span>
            </div>
            <div style={{ height:8, background:"var(--border)", borderRadius:99, overflow:"hidden" }}>
              <div style={{
                height:"100%", borderRadius:99, transition:"width .4s ease",
                width:`${pct}%`,
                background: pct===100 ? "#22c55e" : "var(--accent)",
              }}/>
            </div>
          </div>

          {/* Exercise list */}
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
            {plan.map(ex => {
              const cat  = CATEGORIES.find(c=>c.id===ex.category);
              const done = !!checked[ex.planId];
              return (
                <button key={ex.planId} onClick={()=>toggle(ex.planId)} style={{
                  display:"flex", alignItems:"center", gap:12,
                  padding:"15px 14px",
                  background: done ? "var(--bg2)" : "var(--surface)",
                  border:`1.5px solid ${done ? "var(--border)" : "var(--border)"}`,
                  borderRadius:14, textAlign:"left",
                  opacity: done ? .6 : 1,
                  transition:"all .15s",
                  boxShadow: done ? "none" : "0 2px 8px rgba(46,31,15,.06)",
                }}>
                  <div style={{ flexShrink:0, color: done ? "#22c55e" : "var(--border)", transition:"color .15s" }}>
                    {done ? <CheckCircle2 size={24} color="#22c55e"/> : <Circle size={24}/>}
                  </div>
                  <span style={{ fontSize:18, flexShrink:0 }}>{cat?.emoji}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:15, textDecoration:done?"line-through":"none",
                      whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {ex.name}
                    </div>
                    <div style={{ display:"flex", gap:6, marginTop:3, flexWrap:"wrap" }}>
                      <span className={`pill ${catClass(ex.category)}`}>{ex.sets} × {ex.reps}</span>
                      {ex.weight && <span className="pill" style={{ background:"var(--bg2)", color:"var(--muted)" }}>{ex.weight}</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Notes */}
          <div style={{ marginBottom:16 }}>
            <label className="label">Session notes</label>
            <textarea className="input" value={notes} onChange={e=>setNotes(e.target.value)}
              placeholder="How did it feel? Any PRs? Notes for next time…"
              style={{ height:80, resize:"none" }}/>
          </div>

          <button className="btn btn-primary" onClick={handleLog} disabled={!anyDone} style={{
            width:"100%", justifyContent:"center", padding:"15px", fontSize:16,
            opacity: anyDone ? 1 : .4,
          }}>
            {pct===100 ? "🎉 Log complete workout" : "✅ Log progress so far"}
          </button>
        </>
      )}
    </div>
  );
}
