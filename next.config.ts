import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Only the hero video is still served from Cloudinary; every image
      // now comes from Sanity. Kept because the video poster could yet be
      // routed through next/image.
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
