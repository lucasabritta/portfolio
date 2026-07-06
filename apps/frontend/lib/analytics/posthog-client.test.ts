import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { init, register } = vi.hoisted(() => ({
  init: vi.fn(),
  register: vi.fn(),
}));

vi.mock("posthog-js", () => ({
  default: {
    __loaded: false,
    init,
    register,
    capture: vi.fn(),
  },
}));

vi.mock("./query-params", () => ({
  captureEntryParams: vi.fn(),
  getAnalyticsQueryProperties: vi.fn(() => ({
    utm_source: "test",
    entry_query: "utm_source=test",
  })),
}));

import posthog from "posthog-js";

import { captureEntryParams, getAnalyticsQueryProperties } from "./query-params";
import {
  getPostHogKey,
  initPostHog,
  isAnalyticsEnabled,
  registerAnalyticsQueryProperties,
  resetPostHogClientForTests,
} from "./posthog-client";

describe("posthog-client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "phc_test");
    (posthog as { __loaded: boolean }).__loaded = false;
    resetPostHogClientForTests();
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
    expect(captureEntryParams).toHaveBeenCalled();
    expect(getAnalyticsQueryProperties).toHaveBeenCalled();
    expect(register).toHaveBeenCalledWith({
      utm_source: "test",
      entry_query: "utm_source=test",
    });
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

  it("initializes e2e keys with Playwright-friendly capture settings", () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "phc_e2e012345678901234567890123456789012345");
    (posthog as { __loaded: boolean }).__loaded = false;
    initPostHog();
    expect(init).toHaveBeenCalledWith(
      "phc_e2e012345678901234567890123456789012345",
      expect.objectContaining({
        cookieless_mode: "always",
        disable_compression: true,
        flush_at: 1,
        flush_interval: 0,
        opt_out_useragent_filter: true,
        persistence: "memory",
        request_batching: false,
        respect_dnt: false,
      }),
    );
  });

  it("registerAnalyticsQueryProperties captures and registers query params", () => {
    initPostHog();
    vi.clearAllMocks();
    registerAnalyticsQueryProperties();
    expect(captureEntryParams).toHaveBeenCalled();
    expect(getAnalyticsQueryProperties).toHaveBeenCalled();
    expect(register).toHaveBeenCalledWith({
      utm_source: "test",
      entry_query: "utm_source=test",
    });
  });

  it("registerAnalyticsQueryProperties is a no-op when analytics is disabled", () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "");
    vi.clearAllMocks();
    registerAnalyticsQueryProperties();
    expect(captureEntryParams).not.toHaveBeenCalled();
    expect(register).not.toHaveBeenCalled();
  });
});
