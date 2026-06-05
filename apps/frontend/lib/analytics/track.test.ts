import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const capture = vi.fn();

vi.mock("./posthog-client", () => ({
  getPostHog: vi.fn(() => ({ capture })),
  initPostHog: vi.fn(() => ({ capture })),
}));

import { getPostHog, initPostHog } from "./posthog-client";
import { trackEvent } from "./track";

describe("trackEvent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "phc_test");
    vi.mocked(getPostHog).mockReturnValue({ capture } as never);
    vi.mocked(initPostHog).mockReturnValue({ capture } as never);
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

  it("captures events when analytics is enabled", () => {
    trackEvent("test_event", { foo: "bar" });
    expect(capture).toHaveBeenCalledWith("test_event", { foo: "bar" });
  });
});
