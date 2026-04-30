"use client";

import type { Habit } from "@/types/habit";
import { calculateCurrentStreak } from "@/lib/streaks";
import { getHabitSlug } from "@/lib/slug";

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
    <article
      data-testid={`habit-card-${slug}`}
      className={`rounded-2xl border-l-4 p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
        isCompletedToday
          ? "border-l-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200"
          : "border-l-indigo-400 bg-white border border-slate-100"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            {isCompletedToday && (
              <span className="text-violet-500 text-base">✓</span>
            )}
            <h2 className={`text-lg font-bold tracking-tight ${isCompletedToday ? "text-violet-700" : "text-slate-800"}`}>
              {habit.name}
            </h2>
          </div>

          {habit.description && (
            <p className="mt-1 text-sm text-slate-500 leading-relaxed">{habit.description}</p>
          )}

          <p
            data-testid={`habit-streak-${slug}`}
            className={`mt-3 text-xs font-semibold uppercase tracking-wider ${streak > 0 ? "text-amber-600" : "text-slate-400"}`}
          >
            🔥 {streak} day{streak === 1 ? "" : "s"} streak
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            data-testid={`habit-complete-${slug}`}
            type="button"
            onClick={() => onToggleComplete(habit)}
            className={`rounded-xl px-3 py-2 font-mono font-bold text-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
              isCompletedToday
                ? "bg-violet-100 text-violet-700 border border-violet-300 hover:bg-violet-200"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isCompletedToday ? "Unmark" : "Complete"}
          </button>

          <button
            data-testid={`habit-edit-${slug}`}
            type="button"
            onClick={() => onEdit(habit)}
            className="rounded-xl font-mono border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 cursor-pointer transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-slate-800 hover:-translate-y-1"
          >
            Edit
          </button>

          <button
            data-testid={`habit-delete-${slug}`}
            type="button"
            onClick={() => onDelete(habit)}
            className="rounded-xl font-mono border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-500 cursor-pointer transition-all duration-300 hover:bg-rose-500 hover:text-white hover:-translate-y-1"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
