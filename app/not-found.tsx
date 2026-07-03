import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#0a0a0a] min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 text-[#f0f0f0]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full bg-[#e8ff5a] blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8 z-10 shadow-2xl text-center">
        <div className="inline-flex w-12 h-12 bg-[#e8ff5a]/10 border border-[#e8ff5a]/20 text-[#e8ff5a] rounded-2xl items-center justify-center mb-6">
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
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>

        <h1 className="text-2xl font-black tracking-tight font-(family-name:--font-syne) text-[#f0f0f0] mb-2">
          Page Not Found
        </h1>

        <p className="text-xs text-[#555] mb-6">
          The wave you are looking for has crashed. The page does not exist or
          has been relocated.
        </p>

        <Link
          href="/"
          className="inline-flex w-full bg-[#e8ff5a] hover:bg-[#d4eb45] text-[#0a0a0a] text-sm font-bold py-3.5 rounded-xl transition-colors justify-center items-center"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
