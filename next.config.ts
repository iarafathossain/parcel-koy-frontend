import { env } from "@/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${env.API_URL_INTERNAL}/api/auth/:path*`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${env.API_URL_INTERNAL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
