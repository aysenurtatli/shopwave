import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["placehold.co", "images.unsplash.com"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
