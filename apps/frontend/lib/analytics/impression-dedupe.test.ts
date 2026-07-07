import { afterEach, describe, expect, it } from "vitest";

import { ANALYTICS_EVENTS } from "./events";
import {
  beginNavigationImpressionEpoch,
  createImpressionDedupeKey,
  resetImpressionDedupeForTests,
  shouldEmitImpression,
} from "./impression-dedupe";

describe("impression dedupe", () => {
  afterEach(() => {
    resetImpressionDedupeForTests();
  });

  it("blocks duplicate impressions within the same navigation epoch", () => {
    beginNavigationImpressionEpoch("/");
    const key = createImpressionDedupeKey(ANALYTICS_EVENTS.pageViewed, { pathname: "/" });
    expect(shouldEmitImpression(key)).toBe(true);
    expect(shouldEmitImpression(key)).toBe(false);
  });

  it("allows a fresh impression after pathname changes", () => {
    beginNavigationImpressionEpoch("/");
    const key = createImpressionDedupeKey(ANALYTICS_EVENTS.pageViewed, { pathname: "/" });
    expect(shouldEmitImpression(key)).toBe(true);

    beginNavigationImpressionEpoch("/projects");
    expect(shouldEmitImpression(key)).toBe(true);
  });

  it("does not increment epoch when pathname is unchanged (Strict Mode re-run)", () => {
    beginNavigationImpressionEpoch("/");
    const key = createImpressionDedupeKey(ANALYTICS_EVENTS.pageViewed, { pathname: "/" });
    expect(shouldEmitImpression(key)).toBe(true);

    beginNavigationImpressionEpoch("/");
    expect(shouldEmitImpression(key)).toBe(false);
  });
});
