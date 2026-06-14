import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bai_Jamjuree } from "next/font/google";
import ServiceWorkerRegister from "@/components/shared/ServiceWorkerRegister";
import "./globals.css";

const bai = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Track your daily habits and build consistent streaks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bai.className} h-full antialiased bg-[#020617]`}
    >
      <body className="min-h-full flex flex-col text-slate-100">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
