import { getSessionUser } from "@/lib/session";
import { logoutAction } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="bg-[#0a0a0a] min-h-[calc(100vh-64px)] text-[#f0f0f0]">

      <div className="border-b border-[#1f1f1f] px-6 pt-10 pb-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight font-[family-name:var(--font-syne)] mb-1">
              Your Profile
            </h1>
            <p className="text-sm text-[#555]">Manage your account details and view purchase history</p>
          </div>
          
          <div className="flex gap-3">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 bg-[#141414] border border-[#2a2a2a] text-[#888] hover:text-[#f0f0f0] hover:border-[#444] font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
            >
              Order History
            </Link>
            
            <form action={logoutAction}>
              <button
                type="submit"
                className="bg-transparent border border-red-500/30 hover:border-red-500 text-red-400 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all hover:bg-red-500/10 cursor-pointer"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="md:col-span-1 bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden">

            <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#e8ff5a] opacity-5 blur-xl pointer-events-none" />
            
            <div className="w-20 h-20 bg-[#1e1e1e] border border-[#3a3a3a] rounded-full flex items-center justify-center mb-4 text-3xl font-black text-[#e8ff5a] font-[family-name:var(--font-syne)]">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
            
            <h2 className="text-lg font-bold text-[#f0f0f0]">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-xs text-[#555] mt-1">{user.email}</p>
            
            <div className="w-full mt-6 pt-6 border-t border-[#1f1f1f]">
              <span className="text-[10px] text-[#444] uppercase tracking-wider block font-bold">
                Account Status
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#e8ff5a]/10 border border-[#e8ff5a]/30 text-[#e8ff5a] text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff5a]" />
                Active Customer
              </span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">

            <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8ff5a] mb-5">
                Account Details
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] text-[#555] uppercase tracking-wider block font-bold">
                    First Name
                  </span>
                  <span className="text-sm font-semibold text-[#f0f0f0] block mt-1">
                    {user.firstName}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#555] uppercase tracking-wider block font-bold">
                    Last Name
                  </span>
                  <span className="text-sm font-semibold text-[#f0f0f0] block mt-1">
                    {user.lastName}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#555] uppercase tracking-wider block font-bold">
                    Email Address
                  </span>
                  <span className="text-sm font-semibold text-[#f0f0f0] block mt-1">
                    {user.email}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#555] uppercase tracking-wider block font-bold">
                    Member Since
                  </span>
                  <span className="text-sm font-semibold text-[#f0f0f0] block mt-1">
                    {memberSince}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8ff5a] mb-4">
                ShopWave Experience
              </h3>
              <p className="text-xs text-[#888] leading-relaxed mb-4">
                Thank you for being a part of ShopWave. You have full access to our premium catalog, instant checkout with simulated payment systems, and direct order tracking.
              </p>
              
              <div className="flex gap-3">
                <Link
                  href="/products"
                  className="bg-[#e8ff5a] text-[#0a0a0a] font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-[#d4eb45] transition-colors"
                >
                  Browse Products
                </Link>
                <Link
                  href="/cart"
                  className="bg-transparent border border-[#2a2a2a] text-[#f0f0f0] hover:border-[#444] font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
                >
                  View Shopping Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
