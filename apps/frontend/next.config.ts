import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@portfolio/resume-content", "@portfolio/storybook"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/storybook", destination: "/storybook/index.html" },
        { source: "/storybook/", destination: "/storybook/index.html" },
      ],
    };
  },
};

export default nextConfig;
