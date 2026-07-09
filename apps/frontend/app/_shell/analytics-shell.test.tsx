/**
 * @vitest-environment jsdom
 */
import { cleanup, render, waitFor } from "@testing-library/react";
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

vi.mock("@/lib/analytics/client-context", () => ({
  rotateClientPageInstanceId: vi.fn(),
}));

vi.mock("@/lib/analytics/track", () => ({
  trackEvent: (...args: unknown[]) => capture(...args),
}));

import { AnalyticsShell } from "./analytics-shell";
import { rotateClientPageInstanceId } from "@/lib/analytics/client-context";
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
    cleanup();
    vi.unstubAllEnvs();
    resetImpressionDedupeForTests();
  });

  it("initializes analytics and tracks a deduped page view on mount without rotating the page instance", async () => {
    render(<AnalyticsShell />);

    await waitFor(() => {
      expect(initPostHog).toHaveBeenCalled();
      expect(captureEntryParams).toHaveBeenCalled();
      expect(capture).toHaveBeenCalledWith(
        ANALYTICS_EVENTS.pageViewed,
        expect.objectContaining({ pathname: "/" }),
      );
    });
    expect(rotateClientPageInstanceId).not.toHaveBeenCalled();
    expect(capture).toHaveBeenCalledTimes(1);
    expect(registerAnalyticsQueryProperties).toHaveBeenCalled();
  });

  it("rotates the page instance id when the pathname changes", async () => {
    const { rerender } = render(<AnalyticsShell />);
    await waitFor(() => expect(initPostHog).toHaveBeenCalled());
    expect(rotateClientPageInstanceId).not.toHaveBeenCalled();

    mockPathname = "/projects";
    rerender(<AnalyticsShell />);

    await waitFor(() => expect(rotateClientPageInstanceId).toHaveBeenCalled());
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
