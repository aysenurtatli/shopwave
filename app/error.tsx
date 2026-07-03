"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js Error Boundary:", error);
  }, [error]);

  return (
    <main className="bg-[#0a0a0a] min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 text-[#f0f0f0]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full bg-[#ff5a5a] blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8 z-10 shadow-2xl text-center">
        <div className="inline-flex w-12 h-12 bg-[#ff5a5a]/10 border border-[#ff5a5a]/20 text-[#ff5a5a] rounded-2xl items-center justify-center mb-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1 className="text-2xl font-black tracking-tight font-(family-name:--font-syne) text-[#f0f0f0] mb-2">
          Something went wrong
        </h1>

        <p className="text-xs text-[#555] mb-6">
          An unexpected error occurred during rendering. If this persists,
          please try again or contact support.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 bg-[#ff5a5a] hover:bg-[#e04545] text-[#0a0a0a] text-sm font-bold py-3.5 rounded-xl transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2a2a] text-[#f0f0f0] text-sm font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
