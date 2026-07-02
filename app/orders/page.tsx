import { getSessionUser } from "@/lib/session";
import { getOrdersByUserId } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function OrdersPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const orders = getOrdersByUserId(user.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="bg-[#0a0a0a] min-h-[calc(100vh-64px)] text-[#f0f0f0]">

      <div className="border-b border-[#1f1f1f] px-6 pt-10 pb-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight font-[family-name:var(--font-syne)] mb-1">
              Order History
            </h1>
            <p className="text-sm text-[#555]">
              You have placed {orders.length} order{orders.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 bg-[#141414] border border-[#2a2a2a] text-[#888] hover:text-[#f0f0f0] hover:border-[#444] font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
          >
            Back to Profile
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-[#141414] border border-[#2a2a2a] rounded-3xl p-8">
            <span className="text-4xl block mb-4">📦</span>
            <h2 className="text-lg font-bold mb-2">No orders found</h2>
            <p className="text-xs text-[#555] max-w-sm mx-auto mb-6">
              You haven&apos;t placed any orders yet. Head over to our catalog to find something you love!
            </p>
            <Link
              href="/products"
              className="inline-flex bg-[#e8ff5a] text-[#0a0a0a] font-bold text-xs px-5 py-3 rounded-xl hover:bg-[#d4eb45] transition-colors"
            >
              Shop Our Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
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
                <div
                  key={order.id}
                  className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#3a3a3a] transition-all"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#e8ff5a]">
                        #{order.id}
                      </span>
                      <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyles}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#555]">{formattedDate}</div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-none border-[#1f1f1f]">
                    <div className="text-right sm:text-right">
                      <span className="text-[10px] text-[#555] uppercase tracking-wider block font-bold">
                        Total Amount
                      </span>
                      <span className="text-sm font-black text-[#f0f0f0] block mt-0.5">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>

                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-flex bg-[#1f1f1f] border border-[#2a2a2a] text-[#888] hover:text-[#f0f0f0] hover:border-[#444] hover:bg-[#252525] font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
