import { afterEach, describe, expect, it } from "vitest";

import {
  buildPageViewPayload,
  preparePageViewTracking,
  shouldTrackErrorBoundary,
  shouldTrackNotFoundView,
} from "./analytics-shell-lifecycle";
import { resetImpressionDedupeForTests } from "./impression-dedupe";

describe("analytics shell lifecycle", () => {
  afterEach(() => {
    resetImpressionDedupeForTests();
  });

  it("builds page view payload with route name and hash", () => {
    expect(buildPageViewPayload("/projects", "#main")).toEqual({
      pathname: "/projects",
      route_name: "projects",
      hash: "#main",
    });
  });

  it("preparePageViewTracking dedupes within the same pathname epoch", () => {
    const first = preparePageViewTracking("/");
    const second = preparePageViewTracking("/");
    expect(first.shouldTrack).toBe(true);
    expect(second.shouldTrack).toBe(false);
  });

  it("emits separate page views for different hashes on the same pathname", () => {
    window.history.replaceState({}, "", "/");
    const first = preparePageViewTracking("/");
    window.history.replaceState({}, "", "/#resume");
    const second = preparePageViewTracking("/");
    expect(first.shouldTrack).toBe(true);
    expect(second.shouldTrack).toBe(true);
    expect(first.payload).toEqual({
      pathname: "/",
      route_name: "home",
    });
    expect(second.payload).toEqual({
      pathname: "/",
      route_name: "home",
      hash: "#resume",
    });
  });

  it("dedupes the same hash within one pathname epoch", () => {
    window.history.replaceState({}, "", "/#resume");
    const first = preparePageViewTracking("/");
    const second = preparePageViewTracking("/");
    expect(first.shouldTrack).toBe(true);
    expect(second.shouldTrack).toBe(false);
  });

  it("tracks not_found once per pathname", () => {
    expect(shouldTrackNotFoundView("/missing")).toBe(true);
    expect(shouldTrackNotFoundView("/missing")).toBe(false);
  });

  it("tracks error boundaries once per context and digest", () => {
    expect(shouldTrackErrorBoundary("segment", "abc")).toBe(true);
    expect(shouldTrackErrorBoundary("segment", "abc")).toBe(false);
    expect(shouldTrackErrorBoundary("global", "abc")).toBe(true);
  });
});
