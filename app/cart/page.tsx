"use client";

import Image from "next/image";
import { useCart } from "@/store/cartContext";
import Link from "next/link";

export default function Cart() {
  const { items, updateQuantity, removeEntireItem, clearCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#f0f0f0]">
      {/* Header */}
      <div className="border-b border-[#1f1f1f] px-6 pt-10 pb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black tracking-tight font-[family-name:var(--font-syne)]">
            Your Cart
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#555] text-sm">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* ── Cart Items ── */}
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#1a1a1a] last:border-none"
                >
                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <div className="w-[70px] h-[70px] relative rounded-xl overflow-hidden bg-[#1a1a1a]">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="70px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#f0f0f0]">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#555]">
                        ${item.product.price} each
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-6">
                    {/* Quantity Adjusters */}
                    <div className="flex items-center border border-[#2a2a2a] rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#888] hover:text-[#f0f0f0] hover:bg-[#1f1f1f] transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 h-7 flex items-center justify-center text-xs font-bold text-[#f0f0f0] border-x border-[#2a2a2a]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#888] hover:text-[#f0f0f0] hover:bg-[#1f1f1f] transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#f0f0f0] min-w-[60px] text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeEntireItem(item.product.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a2a] text-[#555] hover:text-red-400 hover:border-red-400 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Summary ── */}
            <div className="h-fit bg-[#141414] border border-[#2a2a2a] rounded-2xl p-5">
              <h2 className="text-sm font-bold mb-4">Order Summary</h2>

              <div className="flex justify-between text-sm text-[#888] mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-[#888] mb-4">
                <span>Shipping</span>
                <span className="text-[#e8ff5a]">Free</span>
              </div>

              <div className="flex justify-between text-base font-bold border-t border-[#1f1f1f] pt-4 mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link href={"/checkout"}>
                <button className="w-full bg-[#e8ff5a] text-[#0a0a0a] font-bold py-3 rounded-xl hover:bg-[#d4eb45] transition-colors">
                  Checkout
                </button>
              </Link>

              <button
                onClick={clearCart}
                className="w-full mt-3 text-xs text-[#555] hover:text-red-400 transition-colors"
              >
                Clear cart
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
