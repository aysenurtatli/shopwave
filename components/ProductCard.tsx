"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: "New" | "Sale" | "Hot" | "Limited";
  slug: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const [wished, setWished] = useState(isWishlisted);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const handleAddToCart = () => {
    onAddToCart?.(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWished(!wished);
    onToggleWishlist?.(product);
  };

  const badgeStyles: Record<string, string> = {
    New: "bg-[#e8ff5a] text-[#0a0a0a]",
    Sale: "bg-[#ff5a5a] text-white",
    Hot: "bg-[#ff8c5a] text-white",
    Limited: "bg-[#c85aff] text-white",
  };

  return (
    <div className="group relative bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#3a3a3a] transition-all duration-300">
      {/* Image area */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-square bg-[#1a1a1a] overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="eager"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#141414]/80 backdrop-blur-sm border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-[#f0f0f0] hover:border-[#444] transition-all opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 duration-200"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 15s-6-4.35-6-8.25A3.75 3.75 0 0 1 9 4.5a3.75 3.75 0 0 1 6 2.25C15 10.65 9 15 9 15z"
              stroke={wished ? "#e8ff5a" : "currentColor"}
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill={wished ? "#e8ff5a" : "none"}
            />
          </svg>
        </button>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {/* Discount badge */}
        {discount && !product.badge && (
          <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ff5a5a] text-white">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-[#f0f0f0] leading-snug mb-2 hover:text-[#e8ff5a] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8l-2.78 1.5.53-3.1L1.5 4.2l3.15-.47L6 1z"
                  fill={
                    star <= Math.round(product.rating) ? "#e8ff5a" : "#2a2a2a"
                  }
                />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-[#555]">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[#f0f0f0]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#555] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[8px] transition-all duration-200 ${
              added
                ? "bg-[#e8ff5a] text-[#0a0a0a]"
                : "bg-[#1f1f1f] border border-[#2a2a2a] text-[#f0f0f0] hover:bg-[#e8ff5a] hover:text-[#0a0a0a] hover:border-[#e8ff5a]"
            }`}
          >
            {added ? (
              <>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M2 7l3 3 6-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M1 1h1.5l1.8 6.5h5.7L12 4H4"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="5.5"
                    cy="11"
                    r="0.8"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <circle
                    cx="9.5"
                    cy="11"
                    r="0.8"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
