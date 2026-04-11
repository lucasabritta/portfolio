import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@portfolio/cv", "@portfolio/web-ui"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
  outputFileTracingIncludes: {
    "/api/cv": ["./public/cv-fonts/**/*"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Both paths: Next may 308 `/storybook/` → `/storybook`; HTML uses `<base href="/storybook/">` from the build script.
        { source: "/storybook", destination: "/storybook/index.html" },
        { source: "/storybook/", destination: "/storybook/index.html" },
      ],
    };
  },
};

export default nextConfig;
