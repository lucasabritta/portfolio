import path from "node:path";

import { defineConfig, devices } from "@playwright/test";

import { E2E_POSTHOG_KEY } from "./support/helpers/posthog-ingest";

const frontendDir = path.resolve(__dirname, "../frontend");
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  timeout: process.env.CI ? 90_000 : 30_000,
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    viewport: { width: 1280, height: 720 },
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 720 } },
    },
  ],
  webServer: {
    command: [
      "node ../../tools/ensure-storybook-public.mjs",
      "rm -rf .next",
      `NEXT_PUBLIC_POSTHOG_KEY=${process.env.NEXT_PUBLIC_POSTHOG_KEY ?? E2E_POSTHOG_KEY} node ./node_modules/next/dist/bin/next dev --hostname 0.0.0.0 --port 3000`,
    ].join(" && "),
    cwd: frontendDir,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    // First boot may compile `/site-architecture` and Storybook if `ensure-storybook-public` runs.
    timeout: 300_000,
    env: {
      ...process.env,
      NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? E2E_POSTHOG_KEY,
    },
  },
});
