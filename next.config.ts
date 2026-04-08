import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dcmaxktcvcrkxxzkzkju.supabase.co",
      },
    ],
  },
};

export default nextConfig;
