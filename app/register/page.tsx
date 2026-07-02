"use client";

import { useActionState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { registerAction, FormState } from "@/app/actions/auth";

const initialState: FormState = {
  success: false,
  error: undefined,
};

function RegisterForm() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <div className="relative w-full max-w-md bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8 z-10 shadow-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex w-12 h-12 bg-[#e8ff5a] rounded-2xl items-center justify-center mb-4 text-[#0a0a0a]">
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 10 Q4 4 7 8 Q10 12 13 6 L15 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-black tracking-tight font-[family-name:var(--font-syne)] text-[#f0f0f0]">
          Create Account
        </h1>
        <p className="text-xs text-[#555] mt-1.5">
          Join ShopWave to track your orders and checkout faster
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="redirect" value={redirectPath} />

        {state.error && (
          <div className="bg-[#ff5a5a]/10 border border-[#ff5a5a]/40 text-[#ff5a5a] text-xs font-semibold px-4 py-3 rounded-xl">
            {state.error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[#888] uppercase tracking-wider block mb-1.5">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              required
              placeholder="John"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#e8ff5a] transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#888] uppercase tracking-wider block mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              required
              placeholder="Doe"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#e8ff5a] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#888] uppercase tracking-wider block mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="john.doe@example.com"
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#e8ff5a] transition-colors"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#888] uppercase tracking-wider block mb-1.5">
            Password (Min 6 chars)
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#e8ff5a] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#e8ff5a] text-[#0a0a0a] font-bold py-3.5 rounded-xl hover:bg-[#d4eb45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2"
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-[#1f1f1f]">
          <p className="text-xs text-[#555]">
            Already have an account?{" "}
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectPath)}`}
              className="text-[#e8ff5a] hover:underline font-semibold"
            >
              Log in instead
            </Link>
          </p>
        </div>
      </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 text-[#f0f0f0]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#e8ff5a] blur-[120px]" />
      </div>

      <Suspense fallback={
        <div className="w-full max-w-md bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8 text-center text-xs text-[#555]">
          Loading registration secure portal...
        </div>
      }>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
