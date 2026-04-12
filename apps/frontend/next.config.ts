import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: [
    "@portfolio/resume-content",
    "@portfolio/storybook",
    "@portfolio/backend",
  ],
  outputFileTracingRoot: path.join(__dirname, "../.."),
  outputFileTracingIncludes: {
    "/api/cv": ["./public/cv-fonts/**/*"],
  },
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
