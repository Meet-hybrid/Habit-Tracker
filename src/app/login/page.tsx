import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-2xl shadow-black/40">
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm tracking-tight font-bold text-white shadow-lg shadow-indigo-500/30">
              HT
            </div>
            <p className="text-sm font-bold uppercase text-indigo-300 tracking-[5px]">
              Habit Tracker
            </p>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-indigo-300">
            Log in to continue building consistent daily habits.
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}
