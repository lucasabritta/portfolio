import { afterEach, describe, expect, it } from "vitest";

import {
  getClientAnalyticsContext,
  getClientPageInstanceId,
  getClientWindowId,
  resetClientAnalyticsContextForTests,
  rotateClientPageInstanceId,
} from "./client-context";

describe("client analytics context", () => {
  afterEach(() => {
    resetClientAnalyticsContextForTests();
  });

  it("returns a stable window id per tab session", () => {
    const first = getClientWindowId();
    const second = getClientWindowId();
    expect(first).toBeTruthy();
    expect(second).toBe(first);
  });

  it("returns a stable page instance id until rotated", () => {
    const first = getClientPageInstanceId();
    const second = getClientPageInstanceId();
    expect(first).toBeTruthy();
    expect(second).toBe(first);
  });

  it("rotates page instance id on navigation epochs", () => {
    const before = getClientPageInstanceId();
    const after = rotateClientPageInstanceId();
    expect(after).toBeTruthy();
    expect(after).not.toBe(before);
    expect(getClientPageInstanceId()).toBe(after);
  });

  it("includes both ids in analytics context", () => {
    expect(getClientAnalyticsContext()).toEqual({
      client_window_id: getClientWindowId(),
      client_page_instance_id: getClientPageInstanceId(),
    });
  });
});
