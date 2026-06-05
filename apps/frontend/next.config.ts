import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@portfolio/resume-content", "@portfolio/storybook"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/ingest/static/:path*",
          destination: "https://eu-assets.i.posthog.com/static/:path*",
        },
        { source: "/ingest/decide", destination: "https://eu.i.posthog.com/decide" },
        { source: "/ingest/:path*", destination: "https://eu.i.posthog.com/:path*" },
        { source: "/storybook", destination: "/storybook/index.html" },
        { source: "/storybook/", destination: "/storybook/index.html" },
      ],
    };
  },
};

export default nextConfig;
