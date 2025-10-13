import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Désactiver ESLint pendant le build pour Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Désactiver les erreurs TypeScript pendant le build (optionnel)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**", pathname: "/**" },
      { protocol: "http",  hostname: "**", pathname: "/**" },
    ],
  },
};

export default nextConfig;