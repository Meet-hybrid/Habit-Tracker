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
  const today = new Date().toISOString().slice(0, 10);

  const [habits, setHabits] = useState<Habit[]>(
    session ? getHabitsByUser(session.userId) : [],
  );
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);

  const closeModal = () => {
    setHabitToDelete(null);
    setShowForm(false);
    setEditingHabit(null);
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

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      userId: session.userId,
      name: values.name,
      description: values.description,
      frequency: values.frequency,
      createdAt: new Date().toISOString(),
      completions: [],
    };

    const updatedHabits = [newHabit, ...getHabits()];

    syncHabits(updatedHabits);
    setShowForm(false);
  }

  function handleEditHabit(values: {
    name: string;
    description: string;
    frequency: "daily";
  }) {
    if (!editingHabit) return;

    const updatedHabits = getHabits().map((habit) => {
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-6"
    >
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm tracking-tight font-bold text-white shadow-lg shadow-indigo-500/30">
                HT
              </div>
              <p className="text-sm font-bold uppercase text-indigo-300 tracking-[5px]">
                Habit Tracker
              </p>
            </div>
          </div>

          <button
            data-testid="auth-logout-button"
            type="button"
            onClick={handleLogout}
            className="w-fit rounded-xl font-mono bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-white cursor-pointer transition-all duration-300 hover:bg-white hover:text-slate-900 hover:-translate-y-0.5"
          >
            Log out
          </button>
        </header>

        <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-px shadow-xl shadow-indigo-500/20">
          <div className="rounded-2xl bg-slate-900/80 backdrop-blur-sm px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Your Dashboard
            </h1>
            <p className="mt-2 text-sm text-indigo-300">
              Track your daily habits and build consistent streaks.
            </p>
          </div>
        </section>

        {!showForm && !editingHabit && (
          <button
            data-testid="create-habit-button"
            type="button"
            onClick={() => setShowForm(true)}
            className="w-fit rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-mono font-bold px-5 py-2.5 text-sm text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            + Create habit
          </button>
        )}

        {showForm && (
          <Modal onClose={() => setShowForm(false)}>
            <HabitForm
              submitLabel="Create habit"
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
              submitLabel="Update habit"
              onSave={handleEditHabit}
              onCancel={() => setEditingHabit(null)}
            />
          </Modal>
        )}

        <HabitList
          habits={habits}
          today={today}
          onToggleComplete={handleToggleComplete}
          onEdit={setEditingHabit}
          onDelete={setHabitToDelete}
        />

        {habitToDelete && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={closeModal}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold text-slate-800">
                Confirm deletion
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to delete{" "}
                <strong className="text-slate-700">{habitToDelete.name}</strong>?
              </p>

              <div className="mt-6 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl font-mono border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 cursor-pointer transition-all duration-300 hover:bg-slate-800 hover:text-white hover:-translate-y-0.5"
                >
                  Cancel
                </button>

                <button
                  data-testid="confirm-delete-button"
                  type="button"
                  onClick={handleConfirmDelete}
                  className="rounded-xl font-mono bg-rose-500 px-4 py-2 text-sm font-semibold text-white cursor-pointer transition-all duration-300 hover:bg-rose-600 hover:-translate-y-0.5"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
