"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/store/cartContext";
import {
  getProductsByCategory,
  CATEGORY_LABELS,
} from "@/data/products";
import { Product, Review } from "@/types";
import { getReviewsAction, addReviewAction } from "@/app/actions/reviews";
import { useEffect } from "react";

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8l-2.78 1.5.53-3.1L1.5 4.2l3.15-.47L6 1z"
            fill={s <= Math.round(rating) ? "#e8ff5a" : "#2a2a2a"}
          />
        </svg>
      ))}
    </div>
  );
}

function Breadcrumb({ product }: { product: Product }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-[#555] mb-8">
      <Link href="/" className="hover:text-[#f0f0f0] transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link href="/products" className="hover:text-[#f0f0f0] transition-colors">
        Products
      </Link>
      <span>/</span>
      <Link
        href={`/products?cat=${product.category}`}
        className="hover:text-[#f0f0f0] transition-colors"
      >
        {CATEGORY_LABELS[product.category]}
      </Link>
      <span>/</span>
      <span className="text-[#888] truncate max-w-[160px]">{product.name}</span>
    </nav>
  );
}

function ImageGallery({ image, name }: { image: string; name: string }) {

  const thumbs = [image, image, image, image];
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex gap-3">

      <div className="flex flex-col gap-2">
        {thumbs.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-colors flex-shrink-0 ${
              selected === i
                ? "border-[#e8ff5a]"
                : "border-[#2a2a2a] hover:border-[#444]"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`${name} view ${i + 1}`}
                fill
                loading="eager"
                className="object-cover"
                sizes="56px"
              />
            </div>
          </button>
        ))}
      </div>

      <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-[#1a1a1a]">
        <Image
          src={thumbs[selected]}
          alt={name}
          fill
          loading="eager"
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}

function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-0 border border-[#2a2a2a] rounded-xl overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-10 h-10 flex items-center justify-center text-[#888] hover:text-[#f0f0f0] hover:bg-[#1f1f1f] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 7h8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <span className="w-10 h-10 flex items-center justify-center text-sm font-bold text-[#f0f0f0] border-x border-[#2a2a2a]">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-10 h-10 flex items-center justify-center text-[#888] hover:text-[#f0f0f0] hover:bg-[#1f1f1f] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 3v8M3 7h8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default function ProductDetailPage({ product: initialProduct }: { product: Product }) {
  const [product, setProduct] = useState<Product>(initialProduct);

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { addToCart } = useCart();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => {

    getReviewsAction(product.id).then((res) => {
      if (res.success && res.reviews) {
        setReviews(res.reviews);
      }
      setReviewsLoading(false);
    });

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser({
            id: data.user.id,
            name: `${data.user.firstName} ${data.user.lastName}`,
          });
        } else {
          setUser(null);
        }
      })
      .catch((err) => console.error(err));
  }, [product.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError(null);
    setReviewSuccess(false);

    if (!newComment.trim()) {
      setReviewError("Please enter a review comment.");
      return;
    }

    setReviewSubmitting(true);
    const res = await addReviewAction(product.id, newRating, newComment);
    setReviewSubmitting(false);

    if (res.success && res.review) {
      setReviews((prev) => [res.review, ...prev]);
      setNewComment("");
      setNewRating(5);
      setReviewSuccess(true);

      const newCount = product.reviewCount + 1;
      const newAvgRating =
        Math.round(
          ((product.rating * product.reviewCount + newRating) / newCount) * 10
        ) / 10;

      setProduct({
        ...product,
        reviewCount: newCount,
        rating: newAvgRating,
      });
    } else {
      setReviewError(res.error || "Failed to submit review.");
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#f0f0f0]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Breadcrumb product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          <ImageGallery image={product.image} name={product.name} />

          <div className="flex flex-col">

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-[#555] uppercase tracking-widest">
                {product.brand}
              </span>
              {product.badge && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    product.badge === "Sale"
                      ? "bg-[#ff5a5a] text-white"
                      : product.badge === "New"
                        ? "bg-[#e8ff5a] text-[#0a0a0a]"
                        : product.badge === "Hot"
                          ? "bg-[#ff8c5a] text-white"
                          : "bg-[#c85aff] text-white"
                  }`}
                >
                  {product.badge}
                </span>
              )}
              {!product.inStock && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#2a2a2a] text-[#555]">
                  Out of stock
                </span>
              )}
            </div>

            <h1 className="text-3xl font-black tracking-tight leading-tight font-[family-name:var(--font-syne)] mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-5">
              <Stars rating={product.rating} />
              <span className="text-sm font-semibold text-[#f0f0f0]">
                {product.rating}.0
              </span>
              <span className="text-sm text-[#555]">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-black text-[#f0f0f0] font-[family-name:var(--font-syne)]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#555] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-[#ff5a5a]">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-[#888] leading-relaxed mb-6 border-t border-[#1f1f1f] pt-6">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#555] bg-[#141414] border border-[#2a2a2a] px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <QuantitySelector value={quantity} onChange={setQuantity} />
                <button
                  onClick={() => setWished(!wished)}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-colors ${
                    wished
                      ? "border-[#e8ff5a]/40 bg-[#161600] text-[#e8ff5a]"
                      : "border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#f0f0f0]"
                  }`}
                  aria-label="Wishlist"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M9 15s-6-4.35-6-8.25A3.75 3.75 0 0 1 9 4.5a3.75 3.75 0 0 1 6 2.25C15 10.65 9 15 9 15z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      fill={wished ? "currentColor" : "none"}
                    />
                  </svg>
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl transition-all duration-200 ${
                  added
                    ? "bg-[#1f1f1f] border border-[#2a2a2a] text-[#e8ff5a]"
                    : product.inStock
                      ? "bg-[#e8ff5a] text-[#0a0a0a] hover:bg-[#d4eb45]"
                      : "bg-[#1a1a1a] text-[#444] cursor-not-allowed"
                }`}
              >
                {added ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8.5l3.5 3.5 6.5-7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Added to cart
                  </>
                ) : (
                  <>
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
                    {product.inStock
                      ? `Add to cart — $${(product.price * quantity).toFixed(2)}`
                      : "Out of stock"}
                  </>
                )}
              </button>
            </div>

            {product.inStock &&
              product.stockCount &&
              product.stockCount <= 10 && (
                <p className="text-xs text-[#ff8c5a] font-semibold mb-4">
                  ⚡ Only {product.stockCount} left in stock
                </p>
              )}

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#1f1f1f]">
              {[
                { icon: "🚚", label: "Free shipping", sub: "Over $75" },
                { icon: "🔄", label: "Free returns", sub: "30 days" },
                { icon: "🔒", label: "Secure pay", sub: "Encrypted" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-xs font-semibold text-[#888]">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-[#444]">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex gap-1 border-b border-[#1f1f1f] mb-8">
            {(["details", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[#e8ff5a] text-[#f0f0f0]"
                    : "border-transparent text-[#555] hover:text-[#888]"
                }`}
              >
                {tab}
                {tab === "reviews" && (
                  <span className="ml-1.5 text-[10px] text-[#555]">
                    ({product.reviewCount})
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab === "details" && (
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-[#f0f0f0] mb-3">
                  Product details
                </h3>
                <dl className="space-y-2">
                  {[
                    { label: "Brand", value: product.brand },
                    {
                      label: "Category",
                      value: CATEGORY_LABELS[product.category],
                    },
                    {
                      label: "SKU",
                      value: `SW-${product.id.padStart(4, "0")}`,
                    },
                    {
                      label: "Availability",
                      value: product.inStock ? "In stock" : "Out of stock",
                    },
                    ...(product.stockCount
                      ? [
                          {
                            label: "Stock",
                            value: `${product.stockCount} units`,
                          },
                        ]
                      : []),
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between text-sm py-2 border-b border-[#1a1a1a]"
                    >
                      <dt className="text-[#555]">{row.label}</dt>
                      <dd className="text-[#f0f0f0] font-medium">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#f0f0f0] mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#555] bg-[#141414] border border-[#2a2a2a] px-3 py-1.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">

              <div className="flex items-center gap-6 bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 mb-6">
                <div className="text-center shrink-0">
                  <div className="text-5xl font-black text-[#f0f0f0] font-[family-name:var(--font-syne)]">
                    {product.rating > 0 ? product.rating.toFixed(1) : "0.0"}
                  </div>
                  <Stars rating={product.rating} size={16} />
                  <div className="text-xs text-[#555] mt-1">
                    {product.reviewCount} reviews
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    let pct = 0;
                    if (reviews.length > 0) {
                      const count = reviews.filter((r) => r.rating === star).length;
                      pct = Math.round((count / reviews.length) * 100);
                    }
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-[#555] w-2">{star}</span>
                        <div className="flex-1 h-1.5 bg-[#1f1f1f] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#e8ff5a] rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#555] w-6">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8ff5a] mb-4">
                  Write a Review
                </h3>
                {user ? (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    {reviewError && (
                      <div className="bg-[#ff5a5a]/10 border border-[#ff5a5a]/40 text-[#ff5a5a] text-xs font-semibold px-4 py-2.5 rounded-xl">
                        {reviewError}
                      </div>
                    )}
                    {reviewSuccess && (
                      <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-4 py-2.5 rounded-xl">
                        Review submitted successfully!
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-2">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setNewRating(num)}
                            className="focus:outline-none cursor-pointer"
                          >
                            <svg width="24" height="24" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8l-2.78 1.5.53-3.1L1.5 4.2l3.15-.47L6 1z"
                                fill={num <= newRating ? "#e8ff5a" : "#2a2a2a"}
                              />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-1.5">
                        Review Comments
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="What did you like or dislike about this gear?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#e8ff5a] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={reviewSubmitting}
                      className="bg-[#e8ff5a] text-[#0a0a0a] font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-[#d4eb45] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {reviewSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl">
                    <p className="text-xs text-[#555]">
                      You must be{" "}
                      <Link href={`/login?redirect=/products/${product.id}`} className="text-[#e8ff5a] font-bold hover:underline">
                        logged in
                      </Link>{" "}
                      to write a product review.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8ff5a] mb-2">
                  Customer Reviews ({reviews.length})
                </h3>
                {reviewsLoading ? (
                  <p className="text-xs text-[#555] py-4 text-center font-semibold">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-8 bg-[#141414] border border-[#2a2a2a] rounded-xl">
                    <p className="text-xs text-[#555]">No reviews yet. Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  reviews.map((review) => {
                    const reviewDate = new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                    return (
                      <div
                        key={review.id}
                        className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-[#3a3a3a] flex items-center justify-center text-xs font-bold text-[#e8ff5a] font-[family-name:var(--font-syne)]">
                              {review.userName[0]}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#f0f0f0]">
                                {review.userName}
                              </p>
                              <Stars rating={review.rating} size={11} />
                            </div>
                          </div>
                          <span className="text-xs text-[#444]">{reviewDate}</span>
                        </div>
                        <p className="text-sm text-[#888] leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black font-[family-name:var(--font-syne)] text-[#f0f0f0]">
                More from {CATEGORY_LABELS[product.category]}
              </h2>
              <Link
                href={`/products?cat=${product.category}`}
                className="text-xs text-[#555] hover:text-[#e8ff5a] transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isWishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={(prod) =>
                    setWishlist((prev) =>
                      prev.includes(prod.id)
                        ? prev.filter((id) => id !== prod.id)
                        : [...prev, prod.id],
                    )
                  }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
