import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Syne, DM_Sans } from "next/font/google";
import { CartProvider } from "@/store/cartContext";
import Footer from "@/components/Footer";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopwave",
  description: "Mini e-commerce project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
