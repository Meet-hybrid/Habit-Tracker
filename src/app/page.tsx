"use client";

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className=\"flex min-h-screen flex-col items-center justify-center p-24 text-center bg-gradient-to-br from-green-50 to-blue-50\">
      <div className=\"max-w-4xl mx-auto\">
        <h1 className=\"text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8\">
          Track Your Habits
        </h1>
        <p className=\"text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed\">
          Build consistent streaks and transform your daily routines with our simple, powerful habit tracker.
        </p>
        <div className=\"flex flex-col sm:flex-row gap-4 justify-center items-center\">
          <Link href=\"/login\">
            <Link href=\"/login\" className=\"px-8 py-6 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white shadow-xl rounded-lg transition-all\">
              Get Started Free
            </Link>
          </Link>
          <Link href=\"/about\">
            <Link href=\"/about\" className=\"px-8 py-6 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50 rounded-lg transition-all\">
              Learn More
            </Link>
          </Link>
        </div>
        <div className=\"mt-20 grid grid-cols-1 md:grid-cols-3 gap-8\">
          <div className=\"p-8 rounded-2xl bg-white shadow-lg\">
            <h3 className=\"text-xl font-bold mb-4\">Daily Streaks</h3>
            <p>Visualize your progress and stay motivated.</p>
          </div>
          <div className=\"p-8 rounded-2xl bg-white shadow-lg\">
            <h3 className=\"text-xl font-bold mb-4\">Simple Tracking</h3>
            <p>Mark habits complete in one tap.</p>
          </div>
          <div className=\"p-8 rounded-2xl bg-white shadow-lg\">
            <h3 className=\"text-xl font-bold mb-4\">Data Insights</h3>
            <p>Analytics to understand your patterns.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

