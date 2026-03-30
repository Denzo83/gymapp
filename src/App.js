import React, { useState } from "react";
import "./index.css";
import useStore from "./hooks/useStore";
import TodayTab from "./components/TodayTab";
import PlannerTab from "./components/PlannerTab";
import ExercisesTab from "./components/ExercisesTab";
import HistoryTab from "./components/HistoryTab";

const NAV = [
  { id:"today",     label:"Today",     emoji:"🌸" },
  { id:"planner",   label:"Plan",      emoji:"📅" },
  { id:"exercises", label:"Exercises", emoji:"🏋️" },
  { id:"history",   label:"History",   emoji:"📖" },
];

export default function App() {
  const [tab, setTab] = useState("today");
  const store = useStore();

  return (
    <div className="app">
      <div className="page" style={{ padding:0 }}>
        {tab==="today"     && <TodayTab     weekPlan={store.weekPlan} logWorkout={store.logWorkout} setTab={setTab}/>}
        {tab==="planner"   && <PlannerTab   exercises={store.exercises} weekPlan={store.weekPlan} updateDayPlan={store.updateDayPlan} clearDayPlan={store.clearDayPlan} logWorkout={store.logWorkout}/>}
        {tab==="exercises" && <ExercisesTab exercises={store.exercises} saveExercise={store.saveExercise} deleteExercise={store.deleteExercise}/>}
        {tab==="history"   && <HistoryTab   history={store.history} deleteHistory={store.deleteHistory}/>}
      </div>

      <nav className="bottom-nav">
        {NAV.map(n=>(
          <button key={n.id} className={`nav-btn ${tab===n.id?"active":""}`} onClick={()=>setTab(n.id)}>
            <span className="nav-icon">{n.emoji}</span>
            {n.label}
            <span className="nav-dot"/>
          </button>
        ))}
      </nav>
    </div>
  );
}
