export default function Loading() {
  return (
    <div className="bg-[#0a0a0a] min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center text-[#f0f0f0] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#e8ff5a] opacity-5 blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-5 z-10">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-2 border-[#1a1a1a] rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-[#e8ff5a] rounded-full animate-spin shadow-[0_0_15px_#e8ff5a]/30" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#666] animate-pulse">
          Loading Wave
        </span>
      </div>
    </div>
  );
}
