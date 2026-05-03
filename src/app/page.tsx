import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8">
          Track Your Habits
        </h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Build better habits one day at a time. Track your progress and stay motivated.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}