import type { NextConfig } from "next";

const wpHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_WP_URL
      ? new URL(process.env.NEXT_PUBLIC_WP_URL).hostname
      : undefined;
  } catch {
    return undefined;
  }
})();

const nextConfig: NextConfig = {
  // Self-hosted on Iranian VPS via PM2/Docker + Nginx — NOT Vercel.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: wpHost
      ? [{ protocol: "https", hostname: wpHost }]
      : [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    // tune as needed for the headless WP payloads
    optimizePackageImports: ["@tanstack/react-query"],
  },
};

export default nextConfig;
