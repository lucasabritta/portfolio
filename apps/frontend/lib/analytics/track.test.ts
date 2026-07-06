import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const capture = vi.fn();

vi.mock("./posthog-client", () => ({
  getPostHog: vi.fn(() => ({ capture })),
  initPostHog: vi.fn(() => ({ capture })),
}));

vi.mock("./query-params", () => ({
  getAnalyticsQueryProperties: vi.fn(() => ({
    utm_source: "test",
    entry_query: "utm_source=test",
  })),
}));

import { getPostHog, initPostHog } from "./posthog-client";
import { getAnalyticsQueryProperties } from "./query-params";
import { trackEvent } from "./track";

describe("trackEvent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "phc_test");
    vi.mocked(getPostHog).mockReturnValue({ capture } as never);
    vi.mocked(initPostHog).mockReturnValue({ capture } as never);
    vi.mocked(getAnalyticsQueryProperties).mockReturnValue({
      utm_source: "test",
      entry_query: "utm_source=test",
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("no-ops when PostHog key is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "");
    vi.mocked(getPostHog).mockReturnValue(null);
    vi.mocked(initPostHog).mockReturnValue(null);
    trackEvent("test_event", { foo: "bar" });
    expect(capture).not.toHaveBeenCalled();
  });

  it("merges preserved query properties into capture payload", () => {
    trackEvent("test_event", { foo: "bar" });
    expect(capture).toHaveBeenCalledWith("test_event", {
      utm_source: "test",
      entry_query: "utm_source=test",
      foo: "bar",
    });
  });

  it("lets explicit event properties override query properties", () => {
    trackEvent("test_event", { utm_source: "override" });
    expect(capture).toHaveBeenCalledWith("test_event", {
      utm_source: "override",
      entry_query: "utm_source=test",
    });
  });
});
