import { getSessionUser } from "@/lib/session";
import { getOrderDetails } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const orderId = parseInt(id, 10);

  if (isNaN(orderId)) {
    notFound();
  }

  const details = getOrderDetails(orderId, user.id);

  if (!details) {
    notFound();
  }

  const { order, items } = details;

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusStyles = {
    Pending: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    Processing: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    Shipped: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    Delivered: "bg-green-500/10 border-green-500/30 text-green-400",
    Cancelled: "bg-red-500/10 border-red-500/30 text-red-400",
  }[order.status] || "bg-[#1f1f1f] border-[#2a2a2a] text-[#888]";

  return (
    <main className="bg-[#0a0a0a] min-h-[calc(100vh-64px)] text-[#f0f0f0] pb-16">

      <div className="border-b border-[#1f1f1f] px-6 pt-10 pb-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black tracking-tight font-[family-name:var(--font-syne)]">
                Order Details
              </h1>
              <span className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles}`}>
                {order.status}
              </span>
            </div>
            <p className="text-xs text-[#555]">
              Placed on {formattedDate} &bull; Order ID: <span className="font-mono font-semibold">#{order.id}</span>
            </p>
          </div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 bg-[#141414] border border-[#2a2a2a] text-[#888] hover:text-[#f0f0f0] hover:border-[#444] font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
          >
            &larr; Back to History
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-[1fr_300px] gap-8">

          <div className="space-y-6">
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#1f1f1f] bg-[#1a1a1a]/50">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#e8ff5a]">
                  Items Ordered
                </h2>
              </div>
              
              <div className="divide-y divide-[#1c1c1c]">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">

                      <div className="w-[60px] h-[60px] relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="text-sm font-semibold hover:text-[#e8ff5a] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-[#555] mt-1">
                          Brand: {item.product.brand} &bull; Category: {item.product.category}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#888] block">
                        x{item.quantity}
                      </span>
                      <span className="text-xs text-[#555] block mt-0.5">
                        ${item.unit_price} each
                      </span>
                      <span className="text-sm font-bold text-[#f0f0f0] block mt-1">
                        ${(item.unit_price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#141414]/30 border border-[#2a2a2a]/50 rounded-2xl p-4 text-[11px] text-[#555] leading-relaxed">
              <strong>Note on pricing:</strong> The price displayed above represents the historical unit price of each product at the exact moment this order was finalized. Future price drops or increases in our catalog will not affect this historical order record.
            </div>
          </div>

          <div className="space-y-6">

            <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#e8ff5a] mb-4">
                Shipping Information
              </h3>
              
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-[#555] block">Customer Name</span>
                  <span className="font-semibold text-[#f0f0f0] block mt-0.5">
                    {order.shippingName}
                  </span>
                </div>
                <div>
                  <span className="text-[#555] block">Phone Number</span>
                  <span className="font-semibold text-[#f0f0f0] block mt-0.5 font-mono">
                    {order.shippingPhone}
                  </span>
                </div>
                <div>
                  <span className="text-[#555] block">Delivery Address</span>
                  <span className="font-semibold text-[#f0f0f0] block mt-0.5 leading-relaxed">
                    {order.shippingAddress}
                  </span>
                </div>
                <div>
                  <span className="text-[#555] block">City & Zip Code</span>
                  <span className="font-semibold text-[#f0f0f0] block mt-0.5">
                    {order.shippingCity}, {order.shippingZip}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#e8ff5a] mb-4">
                Payment Summary
              </h3>

              <div className="space-y-2 text-xs border-b border-[#1f1f1f] pb-3 mb-3">
                <div className="flex justify-between text-[#888]">
                  <span>Subtotal</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Shipping</span>
                  <span className="text-[#e8ff5a]">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-bold">
                <span>Grand Total</span>
                <span className="text-base text-[#e8ff5a] font-black">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
