"use client";

import { motion } from "framer-motion";
import type { Habit } from "@/types/habit";
import { calculateCurrentStreak } from "@/lib/streaks";
import { getHabitSlug } from "@/lib/slug";
import { Check, Edit2, Trash2, Flame } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type HabitCardProps = {
  habit: Habit;
  today: string;
  onToggleComplete: (habit: Habit) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
};

export default function HabitCard({
  habit,
  today,
  onToggleComplete,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const slug = getHabitSlug(habit.name);
  const streak = calculateCurrentStreak(habit.completions, today);
  const isCompletedToday = habit.completions.includes(today);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      data-testid={`habit-card-${slug}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-300",
        isCompletedToday
          ? "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          : "border-white/10 bg-white/5 hover:border-white/20"
      )}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {isCompletedToday && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"
                >
                  <Check size={12} strokeWidth={3} />
                </motion.div>
              )}
              <h2 className={cn(
                "text-lg font-bold tracking-tight break-words",
                isCompletedToday ? "text-emerald-400" : "text-slate-100"
              )}>
                {habit.name}
              </h2>
            </div>

            {habit.description && (
              <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 break-words">
                {habit.description}
              </p>
            )}

            <div className="mt-4 flex items-center gap-3">
              <div 
                data-testid={`habit-streak-${slug}`}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                  streak > 0 
                    ? "bg-orange-500/10 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.1)]" 
                    : "bg-slate-500/10 text-slate-500"
                )}
              >
                <Flame size={12} className={streak > 0 ? "animate-pulse" : ""} />
                Current streak: {streak} days
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:self-start">
            <motion.button
              whileTap={{ scale: 0.95 }}
              data-testid={`habit-complete-${slug}`}
              type="button"
              onClick={() => onToggleComplete(habit)}
              className={cn(
                "flex h-10 items-center justify-center rounded-xl px-4 font-mono text-sm font-bold transition-all",
                isCompletedToday
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20"
              )}
            >
              {isCompletedToday ? "Done!" : "Complete"}
            </motion.button>

            <div className="flex items-center gap-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                data-testid={`habit-edit-${slug}`}
                type="button"
                onClick={() => onEdit(habit)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                title="Edit Habit"
              >
                <Edit2 size={16} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                data-testid={`habit-delete-${slug}`}
                type="button"
                onClick={() => onDelete(habit)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 transition-all hover:bg-rose-500 hover:text-white"
                title="Delete Habit"
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Progress Bar Decoration */}
      <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-500" 
           style={{ width: isCompletedToday ? "100%" : "0%" }} />
    </motion.article>
  );
}
