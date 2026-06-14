"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import { validatePassword } from "@/lib/validators";

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const passwordResult = validatePassword(password);
    if (!passwordResult.valid) {
      setError(passwordResult.error);
      return;
    }

    const result = signup(email, password);

    if (!result.success) {
      setError(result.error);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="auth-signup-form"
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="auth-signup-email" className="text-sm font-semibold text-slate-300">
          Email
        </label>
        <input
          id="auth-signup-email"
          data-testid="auth-signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
      </div>

      <div className="relative flex flex-col gap-1.5">
        <label htmlFor="auth-signup-password" className="text-sm font-semibold text-slate-300">
          Password
        </label>
        <input
          id="auth-signup-password"
          data-testid="auth-signup-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />

        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 bottom-2.5 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-sm text-rose-400">
          {error}
        </p>
      )}

      <button
        data-testid="auth-signup-submit"
        type="submit"
        className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-mono font-bold text-white py-2.5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
      >
        Sign Up
      </button>
    </form>
  );
}
