import { useState, useCallback } from "react";
import { DEFAULT_EXERCISES } from "../data/exercises";

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export default function useStore() {
  const [exercises, setEx]     = useState(() => load("gp_exercises", DEFAULT_EXERCISES));
  const [weekPlan, setPlan]    = useState(() => load("gp_weekplan", {}));
  const [history, setHistory]  = useState(() => load("gp_history", []));

  const setAndSaveEx = useCallback((fn) => {
    setEx(prev => { const next = typeof fn === "function" ? fn(prev) : fn; save("gp_exercises", next); return next; });
  }, []);

  const setAndSavePlan = useCallback((fn) => {
    setPlan(prev => { const next = typeof fn === "function" ? fn(prev) : fn; save("gp_weekplan", next); return next; });
  }, []);

  const setAndSaveHistory = useCallback((fn) => {
    setHistory(prev => { const next = typeof fn === "function" ? fn(prev) : fn; save("gp_history", next); return next; });
  }, []);

  // Exercises
  const saveExercise = useCallback((ex) => {
    if (ex.id) {
      setAndSaveEx(prev => prev.map(e => e.id === ex.id ? ex : e));
    } else {
      const newEx = { ...ex, id: `ex_${Date.now()}` };
      setAndSaveEx(prev => [...prev, newEx]);
    }
  }, [setAndSaveEx]);

  const deleteExercise = useCallback((id) => {
    setAndSaveEx(prev => prev.filter(e => e.id !== id));
  }, [setAndSaveEx]);

  // Week plan
  const updateDayPlan = useCallback((day, items) => {
    setAndSavePlan(prev => ({ ...prev, [day]: items }));
  }, [setAndSavePlan]);

  const clearDayPlan = useCallback((day) => {
    setAndSavePlan(prev => ({ ...prev, [day]: [] }));
  }, [setAndSavePlan]);

  // History
  const logWorkout = useCallback((day, items, notes = "") => {
    const entry = {
      id: `h_${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      day_name: day,
      exercises: items,
      notes,
    };
    setAndSaveHistory(prev => [entry, ...prev]);
    return entry;
  }, [setAndSaveHistory]);

  const deleteHistory = useCallback((id) => {
    setAndSaveHistory(prev => prev.filter(h => h.id !== id));
  }, [setAndSaveHistory]);

  return {
    exercises, saveExercise, deleteExercise,
    weekPlan, updateDayPlan, clearDayPlan,
    history, logWorkout, deleteHistory,
  };
}
