import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["support/helpers/**/*.test.ts"],
  },
});
