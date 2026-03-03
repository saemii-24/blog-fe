import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    if (!process.env.API_BASE_URL) return [];

    return [
      {
        source: "/api/signup",
        destination: `${process.env.API_BASE_URL}/auth/signup`,
      },
      {
        source: "/api/login",
        destination: `${process.env.API_BASE_URL}/auth/login`,
      },
    ];
  },
};

export default nextConfig;
