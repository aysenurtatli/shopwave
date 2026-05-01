"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { ProductExtended } from "@/data/products";
import { getFeaturedProducts } from "@/data/products";
import PlasmaWave from "@/components/PlasmaWave";
// ─── Mock data ────────────────────────────────────────────────────────────────
const FEATURED_PRODUCTS = getFeaturedProducts(4);

const CATEGORIES = [
  {
    label: "Sneakers",
    emoji: "👟",
    href: "/products?cat=sneakers",
    count: 142,
  },
  { label: "Audio", emoji: "🎧", href: "/products?cat=audio", count: 86 },
  { label: "Watches", emoji: "⌚", href: "/products?cat=watches", count: 63 },
  { label: "Bags", emoji: "🎒", href: "/products?cat=bags", count: 97 },
  { label: "Cameras", emoji: "📷", href: "/products?cat=cameras", count: 44 },
  { label: "Tech", emoji: "💻", href: "/products?cat=tech", count: 118 },
];

const DEALS = [
  {
    label: "Flash Sale",
    sublabel: "Ends in 3h 42m",
    accent: "#ff5a5a",
    href: "/deals/flash",
  },
  {
    label: "Bundle & Save",
    sublabel: "Up to 35% off",
    accent: "#e8ff5a",
    href: "/deals/bundles",
  },
  {
    label: "New Arrivals",
    sublabel: "Just dropped",
    accent: "#5affb8",
    href: "/new",
  },
];

// ─── Countdown timer ──────────────────────────────────────────────────────────
function CountdownBadge({ totalSeconds }: { totalSeconds: number }) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return (
    <div className="flex items-center gap-1 font-mono text-sm font-bold text-[#ff5a5a]">
      {[h, m, s].map((v, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-md px-1.5 py-0.5 tabular-nums">
            {String(v).padStart(2, "0")}
          </span>
          {i < 2 && <span className="text-[#555]">:</span>}
        </span>
      ))}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function HomePage() {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [wishlisted, setWishlisted] = useState<string[]>([]);

  const handleAddToCart = (product: ProductExtended) => {
    setCartItems((prev) => [...prev, product.id]);
  };

  const handleToggleWishlist = (product: ProductExtended) => {
    setWishlisted((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id],
    );
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#f0f0f0]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative px-6 pt-16 pb-20 overflow-hidden">
        {/* Background grid */}
        {/* <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#e8ff5a 1px, transparent 1px), linear-gradient(90deg, #e8ff5a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        /> */}
        <div className="absolute inset-0 z-5">
          <PlasmaWave
            colors={["#e8ff5a", "#eaeaea"]}
            speed1={0.02}
            speed2={0.02}
            focalLength={0.9}
            bend1={1}
            bend2={0.5}
            dir2={1}
            rotationDeg={0}
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/90 z-10" />

        {/* Glow blob */}
        {/* <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#e8ff5a] opacity-[0.06] blur-[100px]" /> */}

        <div className="relative max-w-4xl mx-auto text-center z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-4 py-1.5 text-xs font-semibold text-[#888] mb-6 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff5a] animate-pulse" />
            Summer Collection 2025 — Now Live
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.92] mb-6 font-[family-name:var(--font-syne)]">
            Ride the
            <span className="block text-[#e8ff5a]">next wave.</span>
          </h1>

          <p className="text-[#888] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Curated gear for the ones who move fast. Fresh drops, unbeatable
            prices, free shipping over $75.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#e8ff5a] text-[#0a0a0a] font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#d4eb45] transition-colors"
            >
              Shop All Products
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
              View Deals
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-14 pt-10 border-t border-[#1f1f1f]">
            {[
              { value: "50K+", label: "Happy customers" },
              { value: "4.9★", label: "Average rating" },
              { value: "Free", label: "Returns & exchanges" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-black text-[#f0f0f0] font-[family-name:var(--font-syne)]">
                  {stat.value}
                </div>
                <div className="text-xs text-[#555] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deal banners ─────────────────────────────────────────────────── */}
      <section className="px-6 pb-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DEALS.map((deal) => (
            <Link
              key={deal.label}
              href={deal.href}
              className="group relative flex items-center justify-between bg-[#141414] border border-[#2a2a2a] rounded-2xl px-5 py-4 hover:border-[#3a3a3a] transition-all overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at 0% 50%, ${deal.accent}12 0%, transparent 60%)`,
                }}
              />
              <div className="relative">
                <p className="font-bold text-[#f0f0f0] text-sm">{deal.label}</p>
                <p className="text-xs text-[#555] mt-0.5">{deal.sublabel}</p>
              </div>
              <svg
                className="relative text-[#555] group-hover:text-[#f0f0f0] transition-colors"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 8h8M9 5l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black font-[family-name:var(--font-syne)] text-[#f0f0f0]">
              Shop by category
            </h2>
            <Link
              href="/products"
              className="text-xs text-[#555] hover:text-[#e8ff5a] transition-colors"
            >
              All categories →
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group flex flex-col items-center gap-2 bg-[#141414] border border-[#2a2a2a] rounded-2xl py-5 px-3 hover:border-[#e8ff5a]/40 hover:bg-[#161600] transition-all"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-semibold text-[#888] group-hover:text-[#f0f0f0] transition-colors">
                  {cat.label}
                </span>
                <span className="text-[10px] text-[#444]">
                  {cat.count} items
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flash sale banner ─────────────────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-[#141414] border border-[#ff5a5a]/30 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                background:
                  "radial-gradient(circle at 0% 50%, #ff5a5a 0%, transparent 60%)",
              }}
            />
            <div className="relative flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#ff5a5a]/15 border border-[#ff5a5a]/30 flex items-center justify-center text-lg">
                ⚡
              </div>
              <div>
                <p className="font-black text-[#f0f0f0] text-sm font-[family-name:var(--font-syne)]">
                  Flash Sale — up to 50% off
                </p>
                <p className="text-xs text-[#555] mt-0.5">
                  Limited stock. Hurry up!
                </p>
              </div>
            </div>
            <div className="relative flex items-center gap-4">
              <CountdownBadge totalSeconds={13320} />
              <Link
                href="/deals/flash"
                className="text-xs font-bold bg-[#ff5a5a] text-white px-4 py-2 rounded-lg hover:bg-[#e84e4e] transition-colors whitespace-nowrap"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured products ─────────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black font-[family-name:var(--font-syne)] text-[#f0f0f0]">
              Featured picks
            </h2>
            <Link
              href="/products"
              className="text-xs text-[#555] hover:text-[#e8ff5a] transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlisted.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────────── */}
      <section className="border-t border-[#1f1f1f] px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: "🚚", title: "Free shipping", desc: "On orders over $75" },
            { icon: "🔄", title: "Easy returns", desc: "30-day hassle-free" },
            {
              icon: "🔒",
              title: "Secure checkout",
              desc: "256-bit encryption",
            },
            { icon: "💬", title: "24/7 support", desc: "Always here to help" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[#f0f0f0]">
                  {item.title}
                </p>
                <p className="text-xs text-[#555] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
