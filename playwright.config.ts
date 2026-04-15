import { defineConfig } from "playwright/test";

export default defineConfig({
  testDir: "./apps/e2e",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: [
    {
      command: "yarn workspace @portfolio/backend dev",
      url: "http://localhost:4000/api/health",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: "yarn dev:docker",
      url: "http://localhost:3000",
      env: {
        ...process.env,
        BACKEND_ORIGIN: "http://localhost:4000",
      },
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
