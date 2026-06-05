import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { init } = vi.hoisted(() => ({
  init: vi.fn(),
}));

vi.mock("posthog-js", () => ({
  default: {
    __loaded: false,
    init,
    capture: vi.fn(),
  },
}));

import posthog from "posthog-js";

import { getPostHogKey, initPostHog, isAnalyticsEnabled } from "./posthog-client";

describe("posthog-client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "phc_test");
    (posthog as { __loaded: boolean }).__loaded = false;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is disabled without a key", () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "");
    expect(isAnalyticsEnabled()).toBe(false);
    expect(getPostHogKey()).toBeFalsy();
  });

  it("initializes with cookieless contract", () => {
    initPostHog();
    expect(init).toHaveBeenCalledWith(
      "phc_test",
      expect.objectContaining({
        api_host: "/ingest",
        ui_host: "https://eu.posthog.com",
        cookieless_mode: "always",
        capture_pageview: false,
        autocapture: false,
        disable_session_recording: true,
        disable_surveys: true,
        respect_dnt: true,
        persistence: "memory",
      }),
    );
  });
});
