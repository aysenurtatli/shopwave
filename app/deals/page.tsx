"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, type ProductExtended } from "@/data/products";
import type { Product } from "@/components/ProductCard";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DealSection {
  id: string;
  label: string;
  sublabel: string;
  accent: string;
  filter: (p: ProductExtended) => boolean;
}

// ─── Deal sections config ─────────────────────────────────────────────────────
const DEAL_SECTIONS: DealSection[] = [
  {
    id: "flash",
    label: "⚡ Flash Sale",
    sublabel: "Limited time — prices drop fast",
    accent: "#ff5a5a",
    filter: (p) => !!p.originalPrice,
  },
  {
    id: "new",
    label: "✦ New Arrivals",
    sublabel: "Just landed in the store",
    accent: "#e8ff5a",
    filter: (p) => p.badge === "New",
  },
  {
    id: "hot",
    label: "🔥 Trending Now",
    sublabel: "Everyone's buying these",
    accent: "#ff8c5a",
    filter: (p) => p.badge === "Hot",
  },
  {
    id: "limited",
    label: "⏳ Low Stock",
    sublabel: "Almost gone — grab yours",
    accent: "#c85aff",
    filter: (p) => !!p.stockCount && p.stockCount <= 15,
  },
];

// ─── Countdown timer hook ─────────────────────────────────────────────────────
function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return { h, m, s, expired: seconds === 0 };
}

// ─── Countdown display ────────────────────────────────────────────────────────
function Countdown({ seconds }: { seconds: number }) {
  const { h, m, s, expired } = useCountdown(seconds);

  if (expired) {
    return <span className="text-xs font-bold text-[#555]">Ended</span>;
  }

  return (
    <div className="flex items-center gap-1">
      {[h, m, s].map((v, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-md px-1.5 py-0.5 text-xs font-mono font-bold text-[#f0f0f0] tabular-nums min-w-[26px] text-center">
            {String(v).padStart(2, "0")}
          </span>
          {i < 2 && <span className="text-[#555] text-xs">:</span>}
        </span>
      ))}
    </div>
  );
}

// ─── Promo banner ─────────────────────────────────────────────────────────────
function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#141414] border border-[#2a2a2a] px-8 py-10 mb-12 text-center">
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#e8ff5a 1px, transparent 1px), linear-gradient(90deg, #e8ff5a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-[#e8ff5a] opacity-[0.05] blur-[80px]" />

      <div className="relative">
        <span className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-4 py-1.5 text-xs font-semibold text-[#888] mb-4 tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a5a] animate-pulse" />
          Flash sale ends in
          <Countdown seconds={13320} />
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-[family-name:var(--font-syne)] text-[#f0f0f0] mb-3">
          Today&apos;s best deals.
        </h1>
        <p className="text-[#555] text-base max-w-md mx-auto">
          Hand-picked discounts updated daily. Free shipping on orders over $75.
        </p>
      </div>
    </div>
  );
}

// ─── Deal section ─────────────────────────────────────────────────────────────
function DealsSection({
  section,
  wishlist,
  onToggleWishlist,
  onAddToCart,
}: {
  section: DealSection;
  wishlist: string[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}) {
  const products = useMemo(() => PRODUCTS.filter(section.filter), [section]);

  if (products.length === 0) return null;

  const countdownSeconds: Record<string, number> = {
    flash: 13320,
    new: 86400,
    hot: 43200,
    limited: 21600,
  };

  return (
    <section className="mb-14">
      {/* Section header */}
      <div
        className="flex items-center justify-between rounded-2xl px-5 py-4 mb-5 border"
        style={{
          background: `${section.accent}0d`,
          borderColor: `${section.accent}30`,
        }}
      >
        <div>
          <h2 className="text-lg font-black font-[family-name:var(--font-syne)] text-[#f0f0f0]">
            {section.label}
          </h2>
          <p className="text-xs text-[#555] mt-0.5">{section.sublabel}</p>
        </div>
        <div className="flex items-center gap-3">
          {section.id === "flash" && (
            <Countdown seconds={countdownSeconds[section.id]} />
          )}
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{
              background: `${section.accent}20`,
              color: section.accent,
            }}
          >
            {products.length} item{products.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DealsPage() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleToggleWishlist = (product: ProductExtended) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id],
    );
  };

  const handleAddToCart = (product: ProductExtended) => {
    setCart((prev) => [...prev, product.id]);
  };

  const visibleSections =
    activeFilter === "all"
      ? DEAL_SECTIONS
      : DEAL_SECTIONS.filter((s) => s.id === activeFilter);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#f0f0f0]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <PromoBanner />

        {/* Filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveFilter("all")}
            className={`shrink-0 text-sm font-semibold px-4 py-2 rounded-xl border transition-colors ${
              activeFilter === "all"
                ? "bg-[#f0f0f0] text-[#0a0a0a] border-[#f0f0f0]"
                : "bg-[#141414] text-[#888] border-[#2a2a2a] hover:border-[#444] hover:text-[#f0f0f0]"
            }`}
          >
            All Deals
          </button>
          {DEAL_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveFilter(section.id)}
              className={`shrink-0 text-sm font-semibold px-4 py-2 rounded-xl border transition-colors ${
                activeFilter === section.id
                  ? "border-[#f0f0f0] bg-[#f0f0f0] text-[#0a0a0a]"
                  : "bg-[#141414] text-[#888] border-[#2a2a2a] hover:border-[#444] hover:text-[#f0f0f0]"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Deal sections */}
        {visibleSections.map((section) => (
          <DealsSection
            key={section.id}
            section={section}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
          />
        ))}

        {/* Cart toast */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-3 bg-[#f0f0f0] text-[#0a0a0a] text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M1 1h1.5l2 7.5h7.5L15 4H4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="6.5"
                  cy="13.5"
                  r="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="11.5"
                  cy="13.5"
                  r="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
              <button
                onClick={() => setCart([])}
                className="ml-1 text-[#999] hover:text-[#0a0a0a] transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M2 2l9 9M11 2l-9 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
