"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, type ProductExtended } from "@/data/products";
import ShinyText from "@/components/ShinyText";

interface DealSection {
  id: string;
  label: string;
  sublabel: string;
  accent: string;
  filter: (p: ProductExtended) => boolean;
}

const DEAL_SECTIONS: DealSection[] = [
  {
    id: "flash",
    label: "⚡ Flash Sale",
    sublabel: "Limited time — prices drop fast",
    accent: "#ff5a5a",
    filter: (p) => !!p.originalPrice,
  },
  {
    id: "bundles",
    label: "🎁 Bundle & Save",
    sublabel: "Special value packages and discounts",
    accent: "#5affb8",
    filter: (p) => p.badge === "Sale" || p.price > 120,
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

function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#141414] border border-[#2a2a2a] px-8 py-10 mb-12 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#e8ff5a 1px, transparent 1px), linear-gradient(90deg, #e8ff5a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#e8ff5a] bg-[#e8ff5a]/10 px-3 py-1 rounded-full border border-[#e8ff5a]/20 mb-4">
          Limited Wave Offers
        </span>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none font-[family-name:var(--font-syne)] text-[#f0f0f0] max-w-lg mb-4">
          <ShinyText text="Unbeatable values, limited quantities." speed={4} />
        </h1>

        <p className="text-xs text-[#555] max-w-sm mb-6">
          Fresh drops, bundle savings, and flash sales updated hourly. Act fast
          before they disappear.
        </p>

        <div className="flex flex-col items-center gap-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-4 min-w-[220px]">
          <span className="text-[9px] font-bold text-[#555] uppercase tracking-wider">
            Wave Event Ends In
          </span>
          <Countdown seconds={3 * 3600 + 42 * 60 + 15} />
        </div>
      </div>
    </div>
  );
}

function DealsSection({
  section,
  wishlist,
  onToggleWishlist,
}: {
  section: DealSection;
  wishlist: string[];
  onToggleWishlist: (p: ProductExtended) => void;
}) {
  const products = useMemo(() => PRODUCTS.filter(section.filter), [section]);

  if (products.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-3 mb-6">
        <div>
          <h2 className="text-lg font-black font-[family-name:var(--font-syne)] text-[#f0f0f0]">
            {section.label}
          </h2>
          <p className="text-xs text-[#555] mt-0.5">{section.sublabel}</p>
        </div>
        <div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background: `${section.accent}20`,
              color: section.accent,
            }}
          >
            {products.length} item{products.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
}

function DealsContent() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  useEffect(() => {
    if (
      typeParam &&
      ["flash", "bundles", "new", "hot", "limited"].includes(typeParam)
    ) {
      setActiveFilter(typeParam);
    }
  }, [typeParam]);

  const handleToggleWishlist = (product: ProductExtended) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id],
    );
  };

  const visibleSections = useMemo(() => {
    return activeFilter === "all"
      ? DEAL_SECTIONS
      : DEAL_SECTIONS.filter((s) => s.id === activeFilter);
  }, [activeFilter]);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#f0f0f0]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <PromoBanner />

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

        {visibleSections.map((section) => (
          <DealsSection
            key={section.id}
            section={section}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        ))}

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

export default function DealsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#0a0a0a] min-h-[calc(100vh-64px)] w-full flex items-center justify-center text-xs text-[#555]">
          Loading Deals...
        </div>
      }
    >
      <DealsContent />
    </Suspense>
  );
}
