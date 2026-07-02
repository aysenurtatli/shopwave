"use client";

import { useCart } from "@/store/cartContext";
import { useState, useTransition } from "react";
import { placeOrderAction } from "@/app/actions/order";
import Link from "next/link";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, BadgeCheck, Phone, MapPin, User } from "lucide-react";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();

  const [shippingForm, setShippingForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<number | null>(null);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "cardNumber") {
      value = value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (value.length > 19) return;
    } else if (name === "expiry") {
      value = value.replace(/\//g, "");
      if (value.length > 4) return;
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
    } else if (name === "cvv") {
      value = value.replace(/\D/g, "");
      if (value.length > 3) return;
    }

    setPaymentForm({ ...paymentForm, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !shippingForm.name ||
      !shippingForm.phone ||
      !shippingForm.address ||
      !shippingForm.city ||
      !shippingForm.zip
    ) {
      setError("Please complete all shipping details.");
      return;
    }

    if (
      paymentForm.cardNumber.length < 19 ||
      paymentForm.expiry.length < 5 ||
      paymentForm.cvv.length < 3
    ) {
      setError("Please provide a valid card number, expiry date, and CVV.");
      return;
    }

    const apiItems = items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    startTransition(async () => {
      const res = await placeOrderAction(shippingForm, apiItems);
      if (res.success && res.orderId) {
        setPlacedOrderId(res.orderId);
        clearCart();
      } else {
        setError(res.error || "Failed to place the order. Please try again.");
      }
    });
  };

  if (placedOrderId) {
    return (
      <main className="bg-[#0a0a0a] min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 text-[#f0f0f0]">
        <div className="max-w-md w-full bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">

          <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#e8ff5a] opacity-5 blur-xl pointer-events-none" />
          
          <div className="inline-flex w-16 h-16 bg-[#e8ff5a]/10 border border-[#e8ff5a]/30 text-[#e8ff5a] rounded-full items-center justify-center mb-6">
            <BadgeCheck className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black tracking-tight font-[family-name:var(--font-syne)] mb-3">
            Order Confirmed!
          </h1>
          <p className="text-xs text-[#888] leading-relaxed mb-6">
            Your simulated payment was processed successfully. Thank you for shopping with ShopWave!
          </p>

          <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-4 mb-8">
            <span className="text-[10px] text-[#555] uppercase tracking-wider block font-bold">
              Your Order Number
            </span>
            <span className="text-lg font-mono font-black text-[#e8ff5a] block mt-1">
              #{placedOrderId}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={`/orders/${placedOrderId}`}
              className="bg-[#e8ff5a] text-[#0a0a0a] font-bold text-sm py-3.5 rounded-xl hover:bg-[#d4eb45] transition-colors"
            >
              Track Order Status
            </Link>
            <Link
              href="/products"
              className="bg-transparent border border-[#2a2a2a] text-[#888] hover:text-[#f0f0f0] font-semibold text-xs py-3 rounded-xl transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="bg-[#0a0a0a] min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 text-[#f0f0f0]">
        <div className="max-w-md w-full bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8 text-center shadow-xl">
          <span className="text-4xl block mb-4">🛒</span>
          <h1 className="text-lg font-bold mb-2">Checkout is empty</h1>
          <p className="text-xs text-[#555] mb-6 max-w-xs mx-auto">
            You do not have any items in your shopping cart to checkout.
          </p>
          <Link
            href="/products"
            className="inline-flex bg-[#e8ff5a] text-[#0a0a0a] font-bold text-xs px-5 py-3 rounded-xl hover:bg-[#d4eb45] transition-colors"
          >
            Shop products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#f0f0f0] pb-16">

      <div className="border-b border-[#1f1f1f] px-6 pt-10 pb-6 mb-8">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link
            href="/cart"
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#2a2a2a] text-[#888] hover:text-[#f0f0f0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-black tracking-tight font-[family-name:var(--font-syne)]">
              Secure Checkout
            </h1>
            <p className="text-sm text-[#555]">Simulation Mode &bull; No real charges apply</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_400px] gap-8">

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-[#ff5a5a]/10 border border-[#ff5a5a]/40 text-[#ff5a5a] text-xs font-semibold px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#e8ff5a] flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4" /> Shipping Information
            </h2>

            <div>
              <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={shippingForm.name}
                  onChange={handleShippingChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-3 text-sm text-[#f0f0f0] outline-none focus:border-[#e8ff5a] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={shippingForm.phone}
                  onChange={handleShippingChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-3 text-sm text-[#f0f0f0] outline-none focus:border-[#e8ff5a] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-1.5">
                Street Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]">
                  <MapPin className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="123 Neon Wave Blvd"
                  value={shippingForm.address}
                  onChange={handleShippingChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-3 text-sm text-[#f0f0f0] outline-none focus:border-[#e8ff5a] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Los Angeles"
                  value={shippingForm.city}
                  onChange={handleShippingChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] outline-none focus:border-[#e8ff5a] transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-1.5">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zip"
                  required
                  placeholder="90001"
                  value={shippingForm.zip}
                  onChange={handleShippingChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] outline-none focus:border-[#e8ff5a] transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#e8ff5a] flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Mock Payment Method
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] text-[#555] font-semibold bg-[#0a0a0a] border border-[#2a2a2a] px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e8ff5a]" /> Sandbox Secure
              </span>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-1.5">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                required
                placeholder="4000 1234 5678 9010"
                value={paymentForm.cardNumber}
                onChange={handlePaymentChange}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] outline-none focus:border-[#e8ff5a] transition-colors font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-1.5">
                  Expiration Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  required
                  placeholder="MM/YY"
                  value={paymentForm.expiry}
                  onChange={handlePaymentChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] outline-none focus:border-[#e8ff5a] transition-colors font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-1.5">
                  CVV Code
                </label>
                <input
                  type="password"
                  name="cvv"
                  required
                  placeholder="•••"
                  value={paymentForm.cvv}
                  onChange={handlePaymentChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] outline-none focus:border-[#e8ff5a] transition-colors font-mono"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#e8ff5a] text-[#0a0a0a] font-bold py-4 rounded-xl hover:bg-[#d4eb45] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm shadow-lg shadow-[#e8ff5a]/10"
          >
            {isPending ? "Processing Security Validation..." : `Simulate Payment & Place Order ($${total.toFixed(2)})`}
          </button>
        </form>

        <div className="space-y-6">
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6 h-fit">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#e8ff5a] mb-5">
              Order Summary
            </h2>

            <div className="divide-y divide-[#1f1f1f] max-h-[300px] overflow-y-auto pr-1 mb-5">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5 max-w-[240px]">
                    <span className="font-semibold text-[#f0f0f0] block truncate">
                      {item.product.name}
                    </span>
                    <span className="text-[#555] block">
                      Quantity: <span className="text-[#888] font-bold">{item.quantity}</span> &bull; ${item.product.price} each
                    </span>
                  </div>
                  <span className="font-bold text-[#f0f0f0] text-right">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1f1f1f] pt-4 space-y-3">
              <div className="flex justify-between text-xs text-[#888]">
                <span>Items Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs text-[#888]">
                <span>Shipping</span>
                <span className="text-[#e8ff5a] font-semibold">Free</span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold border-t border-[#1f1f1f] pt-3 mt-1">
                <span>Grand Total</span>
                <span className="text-base text-[#e8ff5a] font-black">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
