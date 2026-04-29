import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: dirname },
      {
        find: /^@cv-pdf\/(.+)$/,
        replacement: path.resolve(dirname, "lib/cv-pdf/$1"),
      },
    ],
  },
  esbuild: { jsx: "automatic" },
  test: {
    environment: "jsdom",
    include: ["app/**/*.{test,spec}.{ts,tsx}", "lib/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/.next/**"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
