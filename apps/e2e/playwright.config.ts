import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "yarn --cwd ../frontend dev:docker",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    // First boot may compile `/build` and compile Storybook if `ensure-storybook-public` runs.
    timeout: 300_000,
  },
});
