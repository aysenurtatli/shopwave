"use client";

import Link from "next/link";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: "Maya Chen",
    role: "Founder & CEO",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    initials: "MC",
  },
  {
    name: "Jordan Lee",
    role: "Head of Product",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    initials: "JL",
  },
  {
    name: "Priya Nair",
    role: "Lead Designer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    initials: "PN",
  },
  {
    name: "Sam Rivera",
    role: "Head of Engineering",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    initials: "SR",
  },
];

const STATS = [
  { value: "50K+", label: "Happy customers" },
  { value: "18+", label: "Countries shipped to" },
  { value: "4.9★", label: "Average rating" },
  { value: "2019", label: "Founded" },
];

const VALUES = [
  {
    icon: "⚡",
    title: "Speed first",
    body: "We move fast — fast shipping, fast support, fast site. Your time matters.",
  },
  {
    icon: "🎯",
    title: "Curated quality",
    body: "Every product is hand-picked. We'd rather carry 200 great items than 2,000 average ones.",
  },
  {
    icon: "🌱",
    title: "Sustainable choices",
    body: "We prioritise brands with ethical supply chains and eco-conscious packaging.",
  },
  {
    icon: "💬",
    title: "Real support",
    body: "Humans, not bots. Our support team is available 7 days a week to actually help.",
  },
];

const MILESTONES = [
  {
    year: "2019",
    event: "ShopWave founded in a small apartment in San Francisco.",
  },
  {
    year: "2020",
    event: "Crossed 1,000 customers and launched our mobile app.",
  },
  { year: "2021", event: "Expanded to Europe and Asia. Crossed $1M in GMV." },
  { year: "2022", event: "Launched the ShopWave membership program." },
  { year: "2023", event: "50K+ customers across 18 countries." },
  { year: "2025", event: "New platform launch — faster, smarter, better." },
];

// ─── Section header ───────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#555] mb-3">
      {children}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#f0f0f0]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 text-center">
        {/* Grid bg */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#e8ff5a 1px, transparent 1px), linear-gradient(90deg, #e8ff5a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#e8ff5a] opacity-[0.05] blur-[100px]" />

        <div className="relative max-w-3xl mx-auto">
          <SectionLabel>Our story</SectionLabel>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.9] font-[family-name:var(--font-syne)] mb-6">
            Built for the
            <span className="block text-[#e8ff5a]">next wave.</span>
          </h1>
          <p className="text-[#888] text-lg leading-relaxed max-w-xl mx-auto">
            ShopWave started with a simple idea: shopping online should feel
            exciting, not exhausting. We're a small team obsessed with great
            products and even better experiences.
          </p>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-black text-[#f0f0f0] font-[family-name:var(--font-syne)] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[#555]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div>
            <SectionLabel>Our mission</SectionLabel>
            <h2 className="text-3xl font-black tracking-tight font-[family-name:var(--font-syne)] text-[#f0f0f0] mb-5 leading-tight">
              Make great products
              <br />
              accessible to everyone.
            </h2>
            <p className="text-[#888] text-sm leading-relaxed mb-4">
              We scour the globe for gear worth buying — things that last, that
              look good, and that don't cost the earth. Every product in our
              catalogue has been reviewed by a real person on our team.
            </p>
            <p className="text-[#888] text-sm leading-relaxed mb-8">
              We believe shopping should feel like discovering something new,
              not scrolling through an endless feed of mediocrity. That's why we
              keep our catalogue tight and our standards high.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#e8ff5a] text-[#0a0a0a] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#d4eb45] transition-colors"
            >
              Shop the collection
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Image collage */}
          <div className="grid grid-cols-2 gap-3">
            {[
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
              "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
            ].map((src, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden bg-[#1a1a1a] ${
                  i === 0
                    ? "aspect-square"
                    : i === 1
                      ? "aspect-[4/5]"
                      : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 border-t border-[#1a1a1a] pt-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <SectionLabel>What we stand for</SectionLabel>
            <h2 className="text-3xl font-black tracking-tight font-[family-name:var(--font-syne)] text-[#f0f0f0]">
              Our values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#3a3a3a] transition-colors"
              >
                <div className="text-2xl mb-4">{v.icon}</div>
                <h3 className="text-sm font-bold text-[#f0f0f0] mb-2 font-[family-name:var(--font-syne)]">
                  {v.title}
                </h3>
                <p className="text-xs text-[#555] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 border-t border-[#1a1a1a] pt-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10 text-center">
            <SectionLabel>How we got here</SectionLabel>
            <h2 className="text-3xl font-black tracking-tight font-[family-name:var(--font-syne)] text-[#f0f0f0]">
              Our journey
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[52px] top-2 bottom-2 w-px bg-[#2a2a2a]" />
            <div className="space-y-6">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="relative z-10 shrink-0 w-[52px] text-right">
                    <span className="text-xs font-bold text-[#e8ff5a]">
                      {m.year}
                    </span>
                  </div>
                  {/* Dot */}
                  <div className="relative z-10 mt-0.5 w-3 h-3 shrink-0 rounded-full border-2 border-[#e8ff5a] bg-[#0a0a0a]" />
                  <p className="text-sm text-[#888] leading-relaxed pt-px">
                    {m.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 border-t border-[#1a1a1a] pt-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <SectionLabel>The people behind it</SectionLabel>
            <h2 className="text-3xl font-black tracking-tight font-[family-name:var(--font-syne)] text-[#f0f0f0]">
              Meet the team
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#3a3a3a] transition-colors group"
              >
                <div className="relative aspect-square bg-[#1a1a1a]">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold text-[#f0f0f0]">
                    {member.name}
                  </p>
                  <p className="text-xs text-[#555] mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden bg-[#141414] border border-[#2a2a2a] rounded-2xl px-8 py-14 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(#e8ff5a 1px, transparent 1px), linear-gradient(90deg, #e8ff5a 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#e8ff5a] opacity-[0.04] blur-[80px] rounded-full" />
            <div className="relative">
              <h2 className="text-4xl font-black tracking-tight font-[family-name:var(--font-syne)] text-[#f0f0f0] mb-3">
                Ready to ride the wave?
              </h2>
              <p className="text-[#555] text-sm mb-8 max-w-sm mx-auto">
                Join 50,000+ shoppers who trust ShopWave for their favourite
                gear.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#e8ff5a] text-[#0a0a0a] font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#d4eb45] transition-colors"
                >
                  Shop now
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7h8M8 4l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="/deals"
                  className="inline-flex items-center gap-2 bg-transparent border border-[#2a2a2a] text-[#f0f0f0] font-semibold text-sm px-6 py-3 rounded-xl hover:border-[#444] hover:bg-[#1a1a1a] transition-colors"
                >
                  View deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
