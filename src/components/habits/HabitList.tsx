"use client";

import type { Habit } from "@/types/habit";
import HabitCard from "./HabitCard";
import { motion, AnimatePresence } from "framer-motion";

type HabitListProps = {
  habits: Habit[];
  today: string;
  onToggleComplete: (habit: Habit) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
};

export default function HabitList({
  habits,
  today,
  onToggleComplete,
  onEdit,
  onDelete,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        data-testid="empty-state"
        className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center"
      >
        <h2 className="text-xl font-bold text-white">No habits yet</h2>
        <p className="mt-2 text-sm text-slate-400">
          Create your first habit to start tracking your progress and building streaks.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-4">
      <AnimatePresence mode="popLayout">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            today={today}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
