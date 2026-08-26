import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.shellyryan.art" }],
        destination: "https://shellyryan.art/:path*",
        permanent: true,
      },
    ];
  },
  experimental: {
    useTypeScriptCli: false,
    webpackBuildWorker: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
