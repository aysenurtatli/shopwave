"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] bg-[#0a0a0a] text-[#f0f0f0]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* TOP GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
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

          {/* Shop */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-[#888] uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-[#555] hover:text-[#e8ff5a]"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-[#555] hover:text-[#e8ff5a]"
                >
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-[#555] hover:text-[#e8ff5a]">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/best-sellers"
                  className="text-[#555] hover:text-[#e8ff5a]"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-[#888] uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-[#555] hover:text-[#e8ff5a]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-[#555] hover:text-[#e8ff5a]"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-[#555] hover:text-[#e8ff5a]"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#555] hover:text-[#e8ff5a]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-[#888] uppercase tracking-wider">
              Social
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-[#555] hover:text-[#e8ff5a]">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555] hover:text-[#e8ff5a]">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555] hover:text-[#e8ff5a]">
                  TikTok
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555] hover:text-[#e8ff5a]">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-[#1f1f1f] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#555]">
            © {new Date().getFullYear()} ShopWave. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
