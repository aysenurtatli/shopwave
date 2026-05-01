"use client";

import { useCart } from "@/store/cartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Order placed successfully 🎉");
    clearCart();
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#f0f0f0]">
      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_400px] gap-8">
        {/* ── Form ── */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold mb-6">Checkout</h2>

          {["name", "email", "address", "city", "zip"].map((field) => (
            <div key={field} className="mb-4">
              <label className="text-xs text-[#888] capitalize mb-1 block">
                {field}
              </label>
              <input
                type="text"
                value={form[field as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#e8ff5a]"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full mt-4 bg-[#e8ff5a] text-[#0a0a0a] font-bold py-3 rounded-xl hover:bg-[#d4eb45]"
          >
            Place Order
          </button>
        </form>

        {/* ── Summary ── */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 h-fit">
          <h2 className="text-sm font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between text-sm text-[#888]"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#1f1f1f] pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span>Shipping</span>
              <span className="text-[#e8ff5a]">Free</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
