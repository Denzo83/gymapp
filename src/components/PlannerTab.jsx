import React, { useState, useMemo } from "react";
import {
  DndContext, DragOverlay, PointerSensor, TouchSensor,
  useSensor, useSensors, closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext, useSortable, verticalListSortingStrategy, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, X, GripVertical, ChevronDown, ChevronUp, Trash2, Check, Search } from "lucide-react";
import { CATEGORIES, DAYS } from "../data/exercises";

const catClass = id => `cat-${id}`;

// ── Sortable plan item ────────────────────────────────────────────────────
function PlanItem({ item, onRemove, onUpdate }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.planId });

  const [open, setOpen] = useState(false);
  const cat = CATEGORIES.find(c => c.id === item.category);

  return (
    <div ref={setNodeRef} style={{
      transform: CSS.Transform.toString(transform), transition,
      opacity: isDragging ? .4 : 1,
      background: "var(--surface)",
      border: "1.5px solid var(--border)",
      borderRadius: 12,
      overflow: "hidden",
      marginBottom: 8,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 12px" }}>
        <button className="drag-handle" {...attributes} {...listeners}><GripVertical size={16}/></button>
        <span style={{ fontSize:17 }}>{cat?.emoji}</span>
        <span style={{ flex:1, fontWeight:700, fontSize:14, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {item.name}
        </span>
        <span className={`pill ${catClass(item.category)}`} style={{ flexShrink:0, fontSize:10.5 }}>
          {item.sets}×{item.reps}
        </span>
        <button onClick={()=>setOpen(x=>!x)} style={{ color:"var(--muted)", padding:4 }}>
          {open ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
        </button>
        <button onClick={()=>onRemove(item.planId)} style={{ color:"var(--muted)", padding:4 }}>
          <X size={14}/>
        </button>
      </div>

      {open && (
        <div style={{ borderTop:"1.5px solid var(--border)", padding:"12px", background:"var(--bg)", display:"flex", flexWrap:"wrap", gap:10 }}>
          <div>
            <label className="label">Sets</label>
            <input type="number" className="input" min={1} max={20} value={item.sets}
              onChange={e=>onUpdate(item.planId,{sets:Number(e.target.value)})}
              style={{ width:70, textAlign:"center", padding:"9px 8px" }}/>
          </div>
          <div>
            <label className="label">Reps</label>
            <input className="input" value={item.reps}
              onChange={e=>onUpdate(item.planId,{reps:e.target.value})}
              style={{ width:80, textAlign:"center", padding:"9px 8px" }}/>
          </div>
          <div style={{ flex:1, minWidth:110 }}>
            <label className="label">Weight / note</label>
            <input className="input" value={item.weight||""}
              placeholder="e.g. 50kg"
              onChange={e=>onUpdate(item.planId,{weight:e.target.value})}
              style={{ padding:"9px 10px" }}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Exercise picker sheet ─────────────────────────────────────────────────
function ExercisePicker({ exercises, onPick, onClose }) {
  const [search, setSearch] = useState("");
  const [cat, setCat]       = useState("all");

  const filtered = useMemo(() => exercises.filter(ex => {
    const q = search.toLowerCase();
    const mQ = ex.name.toLowerCase().includes(q) || (ex.muscles||[]).some(m=>m.toLowerCase().includes(q));
    const mC = cat==="all" || ex.category===cat;
    return mQ && mC;
  }), [exercises, search, cat]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-handle"/>
        <div className="sheet-title">Add exercise</div>
        <div style={{ padding:"12px 20px 8px", flexShrink:0 }}>
          <div style={{ position:"relative", marginBottom:10 }}>
            <Search size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)", pointerEvents:"none" }}/>
            <input className="input" value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search exercises…" style={{ paddingLeft:34 }} autoFocus/>
          </div>
          <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:4 }}>
            {[{id:"all",label:"All",emoji:"✨"},...CATEGORIES].map(c=>(
              <button key={c.id} onClick={()=>setCat(c.id)} style={{
                padding:"5px 12px", borderRadius:99, fontSize:12, fontWeight:700, flexShrink:0,
                background: cat===c.id ? "var(--accent)" : "var(--bg2)",
                color: cat===c.id ? "#fff" : "var(--muted)",
                border: cat===c.id ? "none" : "1.5px solid var(--border)",
              }}>{c.emoji} {c.label}</button>
            ))}
          </div>
        </div>
        <div className="sheet-body" style={{ padding:0 }}>
          {filtered.map(ex => {
            const c = CATEGORIES.find(x=>x.id===ex.category);
            return (
              <button key={ex.id} onClick={()=>{ onPick(ex); onClose(); }} style={{
                display:"flex", alignItems:"center", gap:10, width:"100%",
                padding:"13px 20px", textAlign:"left",
                borderBottom:"1px solid var(--border)", background:"none",
                transition:"background .1s",
              }}
              onTouchStart={e=>e.currentTarget.style.background="var(--bg2)"}
              onTouchEnd={e=>e.currentTarget.style.background="none"}>
                <span style={{ fontSize:18 }}>{c?.emoji}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:14, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{ex.name}</div>
                  <div style={{ fontSize:11, color:"var(--muted)", marginTop:1, textTransform:"capitalize" }}>{ex.equipment} · {(ex.muscles||[]).slice(0,2).join(", ")}</div>
                </div>
                <span className={`pill ${catClass(ex.category)}`} style={{ fontSize:10, flexShrink:0 }}>{c?.label}</span>
              </button>
            );
          })}
          {filtered.length===0 && (
            <div style={{ textAlign:"center", padding:"40px 20px", color:"var(--muted)" }}>
              <div style={{ fontSize:36, marginBottom:8 }}>🔍</div>
              <p>No exercises found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Day card ──────────────────────────────────────────────────────────────
function DayCard({ day, items, exercises, onAdd, onRemove, onUpdate, onLog, onClear }) {
  const [picking, setPicking] = useState(false);
  const ids = items.map(i=>i.planId);

  return (
    <div className="card" style={{ marginBottom:14, overflow:"hidden" }}>
      {/* Day header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 14px", borderBottom: items.length ? "1.5px solid var(--border)" : "none" }}>
        <div>
          <div style={{ fontFamily:"Instrument Serif,serif", fontSize:18 }}>{day}</div>
          <div style={{ fontSize:11, color:"var(--muted)", marginTop:1 }}>{items.length} exercise{items.length!==1?"s":""}</div>
        </div>
        <div style={{ display:"flex", gap:7, alignItems:"center" }}>
          {items.length > 0 && (
            <>
              <button className="btn btn-sm" style={{ background:"#d1fae5", color:"#065f46", padding:"7px 11px" }}
                onClick={()=>onLog(day)} title="Log as done">
                <Check size={13}/> Done
              </button>
              <button className="btn btn-sm btn-danger" onClick={()=>onClear(day)} style={{ padding:"7px 10px" }}>
                <Trash2 size={13}/>
              </button>
            </>
          )}
          <button className="btn btn-primary btn-sm" onClick={()=>setPicking(true)} style={{ padding:"7px 11px" }}>
            <Plus size={14}/>
          </button>
        </div>
      </div>

      {/* Items */}
      {items.length > 0 && (
        <div style={{ padding:"10px 12px 2px" }}>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {items.map(item=>(
              <PlanItem key={item.planId} item={item} onRemove={onRemove} onUpdate={onUpdate}/>
            ))}
          </SortableContext>
        </div>
      )}

      {picking && (
        <ExercisePicker exercises={exercises} onPick={(ex)=>onAdd(day,ex)} onClose={()=>setPicking(false)}/>
      )}
    </div>
  );
}

// ── Main planner ──────────────────────────────────────────────────────────
export default function PlannerTab({ exercises, weekPlan, updateDayPlan, clearDayPlan, logWorkout }) {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint:{ distance:5 } }),
    useSensor(TouchSensor,   { activationConstraint:{ delay:150, tolerance:5 } }),
  );

  const allItems = useMemo(()=>Object.values(weekPlan).flat(),[weekPlan]);
  const activeItem = activeId ? allItems.find(i=>i.planId===activeId) : null;

  const findDay = id => DAYS.find(d=>(weekPlan[d]||[]).some(i=>i.planId===id));

  const addExercise = (day, ex) => {
    const item = { ...ex, planId:`${ex.id}_${day}_${Date.now()}`, sets:3, reps:"10", weight:"" };
    updateDayPlan(day, [...(weekPlan[day]||[]), item]);
  };

  const removeExercise = planId => {
    DAYS.forEach(d => {
      const list = weekPlan[d]||[];
      if (list.find(i=>i.planId===planId)) updateDayPlan(d, list.filter(i=>i.planId!==planId));
    });
  };

  const updateItem = (planId, changes) => {
    DAYS.forEach(d => {
      const list = weekPlan[d]||[];
      if (list.find(i=>i.planId===planId)) updateDayPlan(d, list.map(i=>i.planId===planId?{...i,...changes}:i));
    });
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || active.id===over.id) return;
    const day = findDay(active.id);
    if (!day) return;
    const list = weekPlan[day]||[];
    const oi = list.findIndex(i=>i.planId===active.id);
    const ni = list.findIndex(i=>i.planId===over.id);
    if (oi!==-1 && ni!==-1) updateDayPlan(day, arrayMove(list,oi,ni));
  };

  return (
    <div className="page">
      <div style={{ marginBottom:20 }}>
        <h2 style={{ fontSize:28 }}>Weekly Plan 📅</h2>
        <p style={{ color:"var(--muted)", fontSize:13, marginTop:3 }}>Tap + to add · drag to reorder · expand to adjust</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter}
        onDragStart={({active})=>setActiveId(active.id)}
        onDragEnd={handleDragEnd}>
        {DAYS.map(day=>(
          <DayCard key={day} day={day}
            items={weekPlan[day]||[]}
            exercises={exercises}
            onAdd={addExercise}
            onRemove={removeExercise}
            onUpdate={updateItem}
            onLog={d=>logWorkout(d,weekPlan[d]||[])}
            onClear={clearDayPlan}/>
        ))}
        <DragOverlay>
          {activeItem && (
            <div className="card" style={{ padding:"11px 14px", fontWeight:700, fontSize:14, boxShadow:"0 8px 24px rgba(0,0,0,.15)", opacity:.92 }}>
              {CATEGORIES.find(c=>c.id===activeItem.category)?.emoji} {activeItem.name}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
