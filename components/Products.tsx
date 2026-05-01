"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import {
  PRODUCTS,
  CATEGORY_LABELS,
  getSortedProducts,
  searchProducts,
  type Category,
  type ProductExtended,
} from "@/data/products";
import { useSearchParams } from "next/navigation";

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
];

export default function Products() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState(searchQuery);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlySale, setOnlySale] = useState(false);

  const filtered = useMemo(() => {
    let list: ProductExtended[] = search.trim()
      ? searchProducts(search)
      : [...PRODUCTS];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (onlyInStock) {
      list = list.filter((p) => p.inStock);
    }
    if (onlySale) {
      list = list.filter((p) => !!p.originalPrice);
    }

    return getSortedProducts(
      list,
      sort as "price-asc" | "price-desc" | "rating" | "newest",
    );
  }, [activeCategory, sort, search, onlyInStock, onlySale]);

  const toggleWishlist = (product: ProductExtended) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id],
    );
  };

  const addToCart = (product: ProductExtended) => {
    setCart((prev) => [...prev, product.id]);
  };

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#f0f0f0]">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="border-b border-[#1f1f1f] px-6 pt-10 pb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black tracking-tight font-(family-name:--font-syne) mb-1">
            All Products
          </h1>
          <p className="text-sm text-[#555]">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "all"
              ? ` in ${CATEGORY_LABELS[activeCategory]}`
              : ""}
            {search ? ` for "${search}"` : ""}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* ── Toolbar ───────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search + sort row */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle
                    cx="6.5"
                    cy="6.5"
                    r="4.5"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10.5 10.5L13.5 13.5"
                    stroke="#888"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] outline-none focus:border-[#444] transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#f0f0f0]"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 3l8 8M11 3l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#444] transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            {/* Filters */}
            <button
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`text-xs font-semibold px-3 py-2.5 rounded-xl border transition-colors ${
                onlyInStock
                  ? "bg-[#e8ff5a] text-[#0a0a0a] border-[#e8ff5a]"
                  : "bg-[#141414] text-[#888] border-[#2a2a2a] hover:border-[#444] hover:text-[#f0f0f0]"
              }`}
            >
              In stock
            </button>
            <button
              onClick={() => setOnlySale(!onlySale)}
              className={`text-xs font-semibold px-3 py-2.5 rounded-xl border transition-colors ${
                onlySale
                  ? "bg-[#ff5a5a] text-white border-[#ff5a5a]"
                  : "bg-[#141414] text-[#888] border-[#2a2a2a] hover:border-[#444] hover:text-[#f0f0f0]"
              }`}
            >
              On sale
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 text-sm font-semibold px-4 py-2 rounded-xl border transition-colors ${
                activeCategory === "all"
                  ? "bg-[#f0f0f0] text-[#0a0a0a] border-[#f0f0f0]"
                  : "bg-[#141414] text-[#888] border-[#2a2a2a] hover:border-[#444] hover:text-[#f0f0f0]"
              }`}
            >
              All
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-sm font-semibold px-4 py-2 rounded-xl border transition-colors ${
                  activeCategory === cat
                    ? "bg-[#f0f0f0] text-[#0a0a0a] border-[#f0f0f0]"
                    : "bg-[#141414] text-[#888] border-[#2a2a2a] hover:border-[#444] hover:text-[#f0f0f0]"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product grid ──────────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-[#f0f0f0] font-(family-name:--font-syne) mb-2">
              No products found
            </h3>
            <p className="text-sm text-[#555] mb-6">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setOnlyInStock(false);
                setOnlySale(false);
              }}
              className="text-sm font-semibold bg-[#1f1f1f] border border-[#2a2a2a] text-[#f0f0f0] px-5 py-2.5 rounded-xl hover:border-[#444] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* ── Cart toast ────────────────────────────────────────────────── */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-3 bg-[#f0f0f0] text-[#0a0a0a] text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M1 1h1.5l2 7h7l2.5-5H4.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="6.5"
                  cy="13.5"
                  r="1"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <circle
                  cx="11.5"
                  cy="13.5"
                  r="1"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
              {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
              <button
                onClick={() => setCart([])}
                className="ml-1 text-[#555] hover:text-[#0a0a0a]"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M2 2l9 9M11 2l-9 9"
                    stroke="currentColor"
                    strokeWidth="1.4"
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
