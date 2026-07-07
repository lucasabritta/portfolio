/**
 * @vitest-environment jsdom
 */
import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { resetImpressionDedupeForTests } from "@/lib/analytics/impression-dedupe";

const capture = vi.fn();
const replace = vi.fn();
let mockPathname = "/";
const searchParams = new URLSearchParams("utm_source=test");

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useSearchParams: () => searchParams,
  useRouter: () => ({ replace }),
}));

vi.mock("@/lib/analytics/posthog-client", () => ({
  initPostHog: vi.fn(),
  isAnalyticsEnabled: vi.fn(() => true),
  registerAnalyticsQueryProperties: vi.fn(),
}));

vi.mock("@/lib/analytics/query-params", () => ({
  captureEntryParams: vi.fn(),
  syncPreservedParamsToCurrentUrl: vi.fn(() => null),
}));

vi.mock("@/lib/analytics/track", () => ({
  trackEvent: (...args: unknown[]) => capture(...args),
}));

import { AnalyticsShell } from "./analytics-shell";
import { captureEntryParams, syncPreservedParamsToCurrentUrl } from "@/lib/analytics/query-params";
import { initPostHog, registerAnalyticsQueryProperties } from "@/lib/analytics/posthog-client";

describe("AnalyticsShell", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname = "/";
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "phc_test");
    resetImpressionDedupeForTests();
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    resetImpressionDedupeForTests();
  });

  it("initializes analytics and tracks a deduped page view on mount", async () => {
    render(<AnalyticsShell />);

    await waitFor(() => {
      expect(initPostHog).toHaveBeenCalled();
      expect(captureEntryParams).toHaveBeenCalled();
      expect(capture).toHaveBeenCalledWith(
        ANALYTICS_EVENTS.pageViewed,
        expect.objectContaining({ pathname: "/" }),
      );
    });
    expect(capture).toHaveBeenCalledTimes(1);
    expect(registerAnalyticsQueryProperties).toHaveBeenCalled();
  });

  it("tracks another page view when the hash changes on the same pathname", async () => {
    render(<AnalyticsShell />);
    await waitFor(() => expect(capture).toHaveBeenCalledTimes(1));

    window.history.replaceState({}, "", "/#resume");
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    await waitFor(() => {
      expect(capture).toHaveBeenCalledTimes(2);
      expect(capture).toHaveBeenLastCalledWith(
        ANALYTICS_EVENTS.pageViewed,
        expect.objectContaining({ pathname: "/", hash: "#resume" }),
      );
    });
  });

  it("replaces the URL when preserved UTMs need syncing on init", async () => {
    vi.mocked(syncPreservedParamsToCurrentUrl).mockReturnValue("/?utm_source=test");

    render(<AnalyticsShell />);

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith("/?utm_source=test", { scroll: false });
    });
  });

  it("re-registers query properties on popstate", async () => {
    render(<AnalyticsShell />);
    await waitFor(() => expect(registerAnalyticsQueryProperties).toHaveBeenCalled());

    vi.mocked(registerAnalyticsQueryProperties).mockClear();
    window.dispatchEvent(new PopStateEvent("popstate"));

    await waitFor(() => expect(registerAnalyticsQueryProperties).toHaveBeenCalled());
  });
});
