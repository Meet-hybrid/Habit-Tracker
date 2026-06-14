"use client";

import { useState } from "react";
import { validateHabitName } from "@/lib/validators";

type HabitFormValues = {
  name: string;
  description: string;
  frequency: "daily";
};

type HabitFormProps = {
  initialValues?: HabitFormValues;
  submitLabel?: string;
  onSave: (values: HabitFormValues) => void;
  onCancel?: () => void;
};

export default function HabitForm({
  initialValues,
  submitLabel = "Save habit",
  onSave,
  onCancel,
}: HabitFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = validateHabitName(name);

    if (!result.valid) {
      setError(result.error);
      return;
    }

    if (description.length > 200) {
      setError("Description must be less than 200 characters.");
      return;
    }

    onSave({
      name: result.value,
      description: description.trim(),
      frequency: "daily",
    });

    setName("");
    setDescription("");
    setError(null);
  }

  return (
    <form
      data-testid="habit-form"
      onSubmit={handleSubmit}
      className="rounded-2xl bg-slate-900/50 p-6 border border-white/10 backdrop-blur-sm"
    >
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex justify-between items-end">
            <label className="text-sm font-semibold text-slate-300">
              Habit name
            </label>
            <span className={`text-[10px] ${name.length > 50 ? "text-rose-400" : "text-slate-500"}`}>
              {name.length}/50
            </span>
          </div>
          <input
            data-testid="habit-name-input"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            placeholder="Drink water"
          />
        </div>

        <div>
          <div className="flex justify-between items-end">
            <label className="text-sm font-semibold text-slate-300">
              Description
            </label>
            <span className={`text-[10px] ${description.length > 200 ? "text-rose-400" : "text-slate-500"}`}>
              {description.length}/200
            </span>
          </div>
          <textarea
            data-testid="habit-description-input"
            value={description}
            rows={3}
            maxLength={250}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
            placeholder="Describe your habit"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-300">
            Frequency
          </label>
          <select
            data-testid="habit-frequency-select"
            value="daily"
            disabled
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 cursor-not-allowed text-slate-500 text-sm px-4 py-2.5 outline-none"
          >
            <option value="daily">Daily</option>
          </select>
        </div>

        {error && (
          <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-2 mt-2">
          <button
            data-testid="habit-save-button"
            type="submit"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-mono font-bold px-4 py-2.5 text-sm text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            {submitLabel}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl font-mono border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white cursor-pointer transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
