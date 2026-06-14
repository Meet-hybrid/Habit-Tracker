"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    // Mock password reset request
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#020617] px-4 selection:bg-indigo-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px]" />
      </div>

      <section className="relative z-10 w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-2xl shadow-black/40">
        {!isSubmitted ? (
          <>
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
                Reset Password
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Enter your email and we&apos;ll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reset-email" className="text-sm font-semibold text-slate-300">
                  Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-mono font-bold text-white py-2.5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
              >
                Send Instructions
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
            <p className="text-slate-400 mb-8">
              We&apos;ve sent password reset instructions to <span className="text-slate-200 font-medium">{email}</span>.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Didn&apos;t receive the email? Try again
            </button>
          </div>
        )}

        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </section>
    </main>
  );
}
