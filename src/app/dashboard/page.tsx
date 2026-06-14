"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import HabitForm from "@/components/habits/HabitForm";
import HabitList from "@/components/habits/HabitList";
import { getCurrentSession, logout } from "@/lib/auth";
import {
  getHabits,
  getHabitsByUser,
  saveHabits,
  toggleHabitCompletion,
} from "@/lib/habits";
import type { Habit } from "@/types/habit";
import Modal from "@/components/shared/Modal";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const session = getCurrentSession();
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

  const [habits, setHabits] = useState<Habit[]>(
    session ? getHabitsByUser(session.userId) : [],
  );
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
  const [error, setError] = useState<string | null>(null);

  const closeModal = () => {
    setHabitToDelete(null);
    setShowForm(false);
    setEditingHabit(null);
    setError(null);
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    const isAnyModalOpen = habitToDelete || showForm || editingHabit;

    if (isAnyModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [habitToDelete, showForm, editingHabit]);

  function syncHabits(updatedHabits: Habit[]) {
    saveHabits(updatedHabits);

    if (session) {
      setHabits(
        updatedHabits.filter((habit) => habit.userId === session.userId),
      );
    }
  }

  function handleCreateHabit(values: {
    name: string;
    description: string;
    frequency: "daily";
  }) {
    if (!session) return;

    const allHabits = getHabits();
    const isDuplicate = allHabits.some(
      (h) =>
        h.userId === session.userId &&
        h.name.toLowerCase() === values.name.toLowerCase(),
    );

    if (isDuplicate) {
      setError("A habit with this name already exists.");
      return;
    }

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      userId: session.userId,
      name: values.name,
      description: values.description,
      frequency: values.frequency,
      createdAt: new Date().toISOString(),
      completions: [],
    };

    const updatedHabits = [newHabit, ...allHabits];

    syncHabits(updatedHabits);
    setShowForm(false);
    setError(null);
  }

  function handleEditHabit(values: {
    name: string;
    description: string;
    frequency: "daily";
  }) {
    if (!editingHabit || !session) return;

    const allHabits = getHabits();
    const isDuplicate = allHabits.some(
      (h) =>
        h.userId === session.userId &&
        h.id !== editingHabit.id &&
        h.name.toLowerCase() === values.name.toLowerCase(),
    );

    if (isDuplicate) {
      setError("A habit with this name already exists.");
      return;
    }

    const updatedHabits = allHabits.map((habit) => {
      if (habit.id !== editingHabit.id) {
        return habit;
      }

      return {
        ...habit,
        name: values.name,
        description: values.description,
        frequency: "daily" as const,
      };
    });

    syncHabits(updatedHabits);
    setEditingHabit(null);
    setError(null);
  }

  function handleToggleComplete(habitToUpdate: Habit) {
    const updatedHabits = getHabits().map((habit) => {
      if (habit.id !== habitToUpdate.id) {
        return habit;
      }

      return toggleHabitCompletion(habit, today);
    });

    syncHabits(updatedHabits);
  }

  function handleConfirmDelete() {
    if (!habitToDelete) return;

    const updatedHabits = getHabits().filter(
      (habit) => habit.id !== habitToDelete.id,
    );

    syncHabits(updatedHabits);
    setHabitToDelete(null);
  }

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <main
      data-testid="dashboard-page"
      className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30"
    >
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-8">
          <header className="flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
                HT
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white hidden sm:block">
                Habit Tracker
              </h1>
            </div>

            <button
              data-testid="auth-logout-button"
              type="button"
              onClick={handleLogout}
              className="rounded-xl font-mono bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:border-white/20 active:scale-95"
            >
              Log out
            </button>
          </header>

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 shadow-2xl shadow-indigo-500/20">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome back!
              </h2>
              <p className="mt-3 text-indigo-100 text-lg">
                You&apos;re doing great. Keep those streaks alive and build the life you want, one habit at a time.
              </p>
            </div>
            {/* Background pattern for the hero section */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </section>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Your Habits
              <span className="text-xs font-medium bg-white/10 text-slate-400 px-2 py-0.5 rounded-full">
                {habits.length}
              </span>
            </h3>

            <button
              data-testid="create-habit-button"
              type="button"
              onClick={() => setShowForm(true)}
              className="hidden sm:flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:-translate-y-0.5 active:scale-95"
            >
              <span className="text-lg">+</span> Create Habit
            </button>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-400 animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <HabitList
            habits={habits}
            today={today}
            onToggleComplete={handleToggleComplete}
            onEdit={setEditingHabit}
            onDelete={setHabitToDelete}
          />
        </section>
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => setShowForm(true)}
        className="sm:hidden fixed bottom-8 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 z-40 active:scale-90 transition-transform"
        aria-label="Create Habit"
      >
        <span className="text-2xl font-bold">+</span>
      </button>

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <HabitForm
            submitLabel="Create Habit"
            onSave={handleCreateHabit}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {editingHabit && (
        <Modal onClose={() => setEditingHabit(null)}>
          <HabitForm
            initialValues={{
              name: editingHabit.name,
              description: editingHabit.description,
              frequency: editingHabit.frequency,
            }}
            submitLabel="Update Habit"
            onSave={handleEditHabit}
            onCancel={() => setEditingHabit(null)}
          />
        </Modal>
      )}

      {habitToDelete && (
        <Modal onClose={closeModal}>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </div>
            <h2 className="text-xl font-bold text-white">Delete Habit?</h2>
            <p className="mt-2 text-sm text-slate-400">
              Are you sure you want to delete <span className="font-semibold text-slate-200">{habitToDelete.name}</span>? This action cannot be undone.
            </p>

            <div className="mt-8 flex flex-col gap-2">
              <button
                data-testid="confirm-delete-button"
                type="button"
                onClick={handleConfirmDelete}
                className="w-full rounded-xl bg-rose-500 py-3 text-sm font-bold text-white transition-all hover:bg-rose-600 active:scale-95"
              >
                Delete Habit
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-full rounded-xl bg-white/5 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-white/10 active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
