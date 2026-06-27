import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "res.cloudinary.com" }, // Real farm photos
    ],
  },
};

export default nextConfig;
