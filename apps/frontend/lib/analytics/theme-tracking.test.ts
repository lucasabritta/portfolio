import { describe, expect, it, vi } from "vitest";

import { handleThemePreferenceChange, shouldTrackThemePreferenceChange } from "./theme-tracking";

describe("shouldTrackThemePreferenceChange", () => {
  it("returns false when preference is unchanged", () => {
    expect(shouldTrackThemePreferenceChange("dark", "dark")).toBe(false);
    expect(shouldTrackThemePreferenceChange("system", "system")).toBe(false);
  });

  it("returns true when preference changes", () => {
    expect(shouldTrackThemePreferenceChange("system", "dark")).toBe(true);
    expect(shouldTrackThemePreferenceChange("light", "dark")).toBe(true);
  });
});

describe("handleThemePreferenceChange", () => {
  it("applies preference without tracking when unchanged", () => {
    const apply = vi.fn();
    const track = vi.fn();

    handleThemePreferenceChange("dark", "dark", { apply, track });

    expect(apply).toHaveBeenCalledWith("dark");
    expect(track).not.toHaveBeenCalled();
  });

  it("applies preference and tracks when changed", () => {
    const apply = vi.fn();
    const track = vi.fn();

    handleThemePreferenceChange("system", "dark", { apply, track });

    expect(apply).toHaveBeenCalledWith("dark");
    expect(track).toHaveBeenCalledWith("dark");
  });
});
