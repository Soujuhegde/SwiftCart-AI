import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
    // In production, we typically don't use rewrites for cross-origin APIs unless using a proxy.
    // If NEXT_PUBLIC_API_URL is set, we point there.
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
