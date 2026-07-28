import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "5b5c-2404-c0-c206-2f69-400a-f454-6e8d-fcad.ngrok-free.app",
        port: "",
        pathname: "/api/files/**",
      },
    ],
  },
};

export default nextConfig;
