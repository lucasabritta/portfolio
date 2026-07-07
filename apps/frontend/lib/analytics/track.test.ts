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
import { ANALYTICS_EVENTS } from "./events";
import { resetImpressionDedupeForTests } from "./impression-dedupe";
import { trackEvent, trackImpression } from "./track";

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
    resetImpressionDedupeForTests();
  });

  it("no-ops when PostHog key is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "");
    vi.mocked(getPostHog).mockReturnValue(null);
    vi.mocked(initPostHog).mockReturnValue(null);
    trackEvent(ANALYTICS_EVENTS.themeChanged, { preference: "dark" });
    expect(capture).not.toHaveBeenCalled();
  });

  it("merges preserved query properties into capture payload", () => {
    trackEvent(ANALYTICS_EVENTS.themeChanged, { preference: "dark" });
    expect(capture).toHaveBeenCalledWith(ANALYTICS_EVENTS.themeChanged, {
      utm_source: "test",
      entry_query: "utm_source=test",
      preference: "dark",
    });
  });

  it("does not let event properties override preserved attribution props", () => {
    trackEvent(ANALYTICS_EVENTS.themeChanged, {
      utm_source: "override",
      entry_query: "override",
    });
    expect(capture).toHaveBeenCalledWith(ANALYTICS_EVENTS.themeChanged, {
      utm_source: "test",
      entry_query: "utm_source=test",
    });
  });

  it("sanitizes contact-shaped property values", () => {
    trackEvent(ANALYTICS_EVENTS.contactClicked, {
      target: "mailto:secret@example.com",
    });
    expect(capture).toHaveBeenCalledWith(ANALYTICS_EVENTS.contactClicked, {
      utm_source: "test",
      entry_query: "utm_source=test",
      target: "mailto",
    });
  });
});

describe("trackImpression", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetImpressionDedupeForTests();
    vi.mocked(getPostHog).mockReturnValue({ capture } as never);
  });

  afterEach(() => {
    resetImpressionDedupeForTests();
  });

  it("captures only once per dedupe key", () => {
    trackImpression(
      ANALYTICS_EVENTS.notFoundViewed,
      { pathname: "/missing" },
      {
        pathname: "/missing",
      },
    );
    trackImpression(
      ANALYTICS_EVENTS.notFoundViewed,
      { pathname: "/missing" },
      {
        pathname: "/missing",
      },
    );
    expect(capture).toHaveBeenCalledTimes(1);
  });
});
