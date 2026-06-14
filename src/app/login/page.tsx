import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#020617] px-4 selection:bg-indigo-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px]" />
      </div>

      <section className="relative z-10 w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-2xl shadow-black/40">
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
          <p className="mt-2 text-sm text-slate-400">
            Log in to continue building consistent daily habits.
          </p>
        </div>

        <LoginForm />

        <div className="mt-4 text-right">
          <Link href="/forgot-password" className="text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors">
            Forgot Password?
          </Link>
        </div>

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
