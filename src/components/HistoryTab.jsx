import React, { useState, useMemo } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay,
         parseISO, startOfWeek, endOfWeek, addMonths, subMonths } from "date-fns";
import { CATEGORIES } from "../data/exercises";

const catClass = id => `cat-${id}`;

function MonthCalendar({ history, selectedDate, onSelect }) {
  const [month, setMonth] = useState(new Date());
  const monthStart = startOfMonth(month);
  const monthEnd   = endOfMonth(month);
  const calStart   = startOfWeek(monthStart, { weekStartsOn:1 });
  const calEnd     = endOfWeek(monthEnd,     { weekStartsOn:1 });
  const days       = eachDayOfInterval({ start:calStart, end:calEnd });

  const workoutDates = useMemo(()=>{
    const s=new Set(); history.forEach(h=>s.add(h.date)); return s;
  },[history]);

  return (
    <div className="card" style={{ padding:"16px 14px", marginBottom:20 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <button className="btn btn-ghost btn-sm" onClick={()=>setMonth(m=>subMonths(m,1))} style={{ padding:"6px 10px" }}>
          <ChevronLeft size={16}/>
        </button>
        <h3 style={{ fontSize:18 }}>{format(month,"MMMM yyyy")}</h3>
        <button className="btn btn-ghost btn-sm" onClick={()=>setMonth(m=>addMonths(m,1))} style={{ padding:"6px 10px" }}>
          <ChevronRight size={16}/>
        </button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:4 }}>
        {["M","T","W","T","F","S","S"].map((d,i)=>(
          <div key={i} style={{ textAlign:"center", fontSize:11, fontWeight:700, color:"var(--muted)" }}>{d}</div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
        {days.map(day=>{
          const ds = format(day,"yyyy-MM-dd");
          const isToday    = isSameDay(day,new Date());
          const hasWorkout = workoutDates.has(ds);
          const isSelected = selectedDate===ds;
          const thisMonth  = day.getMonth()===month.getMonth();

          return (
            <button key={ds} onClick={()=>hasWorkout&&onSelect(isSelected?null:ds)} style={{
              aspectRatio:"1", borderRadius:10, fontSize:13.5,
              fontWeight: hasWorkout||isToday ? 700 : 400,
              background: isSelected     ? "var(--accent)"   :
                          isToday        ? "var(--accent-lt)" :
                          hasWorkout     ? "var(--bg2)"       : "transparent",
              color: isSelected          ? "#fff"             :
                     isToday            ? "var(--accent)"     :
                     thisMonth          ? "var(--text)"       : "var(--border)",
              border: isToday&&!isSelected ? "2px solid var(--accent)" : "none",
              cursor: hasWorkout ? "pointer" : "default",
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2,
            }}>
              {format(day,"d")}
              {hasWorkout && (
                <div style={{ width:4, height:4, borderRadius:"50%",
                  background: isSelected ? "rgba(255,255,255,.7)" : "var(--accent)" }}/>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WorkoutCard({ entry, onDelete }) {
  const [open, setOpen] = useState(false);
  const date = parseISO(entry.date);
  const cats = [...new Set((entry.exercises||[]).map(e=>e.category))];

  return (
    <div className="card" style={{ marginBottom:10, overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 14px", cursor:"pointer" }}
        onClick={()=>setOpen(x=>!x)}>
        <div style={{ background:"var(--accent-lt)", borderRadius:12, padding:"8px 12px", textAlign:"center", flexShrink:0 }}>
          <div style={{ fontFamily:"Instrument Serif,serif", fontSize:22, lineHeight:1, color:"var(--accent)" }}>{format(date,"d")}</div>
          <div style={{ fontSize:10, color:"var(--muted)", fontWeight:700, textTransform:"uppercase" }}>{format(date,"MMM")}</div>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontWeight:700, fontSize:15 }}>{entry.day_name}</div>
          <div style={{ fontSize:12, color:"var(--muted)", marginTop:1 }}>{(entry.exercises||[]).length} exercises</div>
          <div style={{ display:"flex", gap:5, marginTop:5, flexWrap:"wrap" }}>
            {cats.map(c=>{ const cat=CATEGORIES.find(x=>x.id===c); return (
              <span key={c} className={`pill ${catClass(c)}`} style={{ fontSize:10.5 }}>{cat?.emoji} {cat?.label}</span>
            );})}
          </div>
        </div>
        <button onClick={e=>{e.stopPropagation();onDelete(entry.id);}} className="btn btn-sm btn-danger" style={{ flexShrink:0, padding:"8px 10px" }}>
          <Trash2 size={13}/>
        </button>
      </div>

      {open && (
        <div style={{ borderTop:"1.5px solid var(--border)", background:"var(--bg)", padding:"10px 14px" }}>
          {(entry.exercises||[]).map((ex,i)=>{
            const cat=CATEGORIES.find(c=>c.id===ex.category);
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0",
                borderBottom: i<(entry.exercises.length-1) ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize:16 }}>{cat?.emoji}</span>
                <span style={{ flex:1, fontWeight:700, fontSize:14 }}>{ex.name}</span>
                <span className={`pill ${catClass(ex.category)}`} style={{ fontSize:10.5 }}>{ex.sets}×{ex.reps}</span>
                {ex.weight&&<span style={{ fontSize:11, color:"var(--muted)" }}>{ex.weight}</span>}
              </div>
            );
          })}
          {entry.notes&&<p style={{ fontSize:13, color:"var(--muted)", marginTop:10, fontStyle:"italic" }}>💬 {entry.notes}</p>}
        </div>
      )}
    </div>
  );
}

export default function HistoryTab({ history, deleteHistory }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState("list");

  const displayed = useMemo(()=>
    selectedDate ? history.filter(h=>h.date===selectedDate) : history
  ,[history,selectedDate]);

  return (
    <div className="page">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
        <div>
          <h2 style={{ fontSize:28 }}>History 📖</h2>
          <p style={{ color:"var(--muted)", fontSize:13, marginTop:2 }}>{history.length} sessions logged</p>
        </div>
        <div style={{ display:"flex", gap:7 }}>
          {["list","calendar"].map(v=>(
            <button key={v} onClick={()=>setView(v)} style={{
              padding:"7px 13px", borderRadius:10, fontSize:13, fontWeight:700,
              background: view===v ? "var(--accent)" : "var(--bg2)",
              color: view===v ? "#fff" : "var(--muted)",
              border: view===v ? "none" : "1.5px solid var(--border)",
            }}>{v==="list" ? "📋 List" : "📅 Cal"}</button>
          ))}
        </div>
      </div>

      {view==="calendar" && (
        <MonthCalendar history={history} selectedDate={selectedDate} onSelect={setSelectedDate}/>
      )}

      {selectedDate && (
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
          <span style={{ fontFamily:"Instrument Serif,serif", fontSize:15 }}>
            {format(parseISO(selectedDate),"EEEE, d MMMM")}
          </span>
          <button onClick={()=>setSelectedDate(null)} style={{ color:"var(--muted)", fontSize:12, display:"flex", alignItems:"center", gap:3 }}>
            <X size={13}/> clear
          </button>
        </div>
      )}

      {displayed.length===0 ? (
        <div style={{ textAlign:"center", padding:"48px 20px", color:"var(--muted)" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🌱</div>
          <h3 style={{ fontSize:22, marginBottom:6 }}>No sessions yet</h3>
          <p style={{ fontSize:14 }}>Head to Today, check off exercises and hit Log — it'll appear here!</p>
        </div>
      ) : (
        displayed.map(entry=>(
          <WorkoutCard key={entry.id} entry={entry} onDelete={deleteHistory}/>
        ))
      )}
    </div>
  );
}
