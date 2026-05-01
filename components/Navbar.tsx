"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { findProductsByName, ProductExtended } from "@/data/products";
import { PRODUCTS } from "@/data/products";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wished, setWished] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ProductExtended[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    const results = findProductsByName(search);

    if (results.length === 1) {
      // tek ürün → direkt detaya git
      router.push(`/products/${results[0].slug}`);
    } else {
      // 0 veya birden fazla → liste sayfası
      router.push(`/products?search=${search}`);
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );

    setResults(filtered.slice(0, 5));
  }, [search]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    }

    if (e.key === "Enter") {
      if (activeIndex >= 0) {
        const selected = results[activeIndex];
        router.push(`/products/${selected.slug}`);
        setSearch("");
        setShowDropdown(false);
      }
    }

    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main navbar */}
      <nav className="bg-[#141414] border-b border-[#2a2a2a] px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-[#e8ff5a] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 10 Q4 4 7 8 Q10 12 13 6 L15 6"
                stroke="#0a0a0a"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <span className="font-bold text-[20px] text-[#f0f0f0] tracking-tight font-[family-name:var(--font-syne)]">
            ShopWave
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.label)}
              className={`text-sm font-medium px-3 py-1.5 rounded-[10px] transition-colors ${
                activeLink === link.label
                  ? "text-[#e8ff5a]"
                  : "text-[#888] hover:text-[#f0f0f0] hover:bg-[#1f1f1f]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex flex-1 max-w-sm relative"
        >
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
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search products…"
            className="w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-[10px] pl-9 pr-3 py-2 text-sm text-[#f0f0f0] placeholder-[#888] outline-none focus:border-[#444] transition-colors"
          />
          {showDropdown && search.trim() && (
            <div className="absolute top-full left-0 w-full bg-[#141414] border border-[#2a2a2a] rounded-xl mt-2 shadow-lg z-50">
              {results.length > 0 ? (
                results.map((product, index) => (
                  <div
                    key={product.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      router.push(`/products/${product.slug}`);
                      setShowDropdown(false);
                      setSearch("");
                    }}
                    className={`px-4 py-3 cursor-pointer transition-colors ${
                      index === activeIndex
                        ? "bg-[#1f1f1f]"
                        : "hover:bg-[#1f1f1f]"
                    }`}
                  >
                    <p className="text-sm text-[#f0f0f0]">{product.name}</p>
                    <p className="text-xs text-[#555]">{product.brand}</p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-[#888]">No results found</p>
                  <p className="text-xs text-[#555] mt-1">
                    Try a different search term
                  </p>
                </div>
              )}
            </div>
          )}
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Cart */}
          <button
            onClick={() => setCartCount(cartCount === 3 ? 0 : 3)}
            className="relative w-10 h-10 flex items-center justify-center rounded-[10px] border border-transparent text-[#888] hover:text-[#f0f0f0] hover:bg-[#1f1f1f] hover:border-[#2a2a2a] transition-colors"
            aria-label="Cart"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M1 1h2l2.5 9h8L16 5H5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="7.5"
                cy="15.5"
                r="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="13.5"
                cy="15.5"
                r="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#e8ff5a] text-[#0a0a0a] text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-[#888] hover:text-[#f0f0f0] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 4L16 16M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 5h14M3 10h14M3 15h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#141414] border-b border-[#2a2a2a] px-6 py-4 flex flex-col gap-1">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="relative mb-2">
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
              className="w-full bg-[#1f1f1f] border border-[#2a2a2a] rounded-[10px] pl-9 pr-3 py-2 text-sm text-[#f0f0f0] placeholder-[#888] outline-none focus:border-[#444] transition-colors"
            />
          </form>

          {/* Mobile nav links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveLink(link.label);
                setMobileOpen(false);
              }}
              className={`text-[15px] font-medium px-3 py-2.5 rounded-[10px] transition-colors ${
                activeLink === link.label
                  ? "text-[#e8ff5a]"
                  : "text-[#888] hover:text-[#f0f0f0] hover:bg-[#1f1f1f]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
