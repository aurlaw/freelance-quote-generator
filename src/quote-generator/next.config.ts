import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_QUOTE_API_URL || 'http://localhost:5000'}/:path*`,
      },
    ];
  },  
};

export default nextConfig;
