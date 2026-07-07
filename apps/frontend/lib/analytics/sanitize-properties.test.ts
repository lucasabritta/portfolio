import { describe, expect, it } from "vitest";

import { sanitizeAnalyticsProperties } from "./sanitize-properties";

describe("sanitizeAnalyticsProperties", () => {
  it("redacts mailto and tel targets", () => {
    expect(
      sanitizeAnalyticsProperties({
        target: "mailto:secret@example.com",
        label: "tel:+1234567890",
      }),
    ).toEqual({
      target: "mailto",
      label: "tel",
    });
  });

  it("redacts email-shaped label values", () => {
    expect(sanitizeAnalyticsProperties({ label: "jane@example.com" })).toEqual({
      label: "email",
    });
  });

  it("leaves non-contact properties unchanged", () => {
    expect(
      sanitizeAnalyticsProperties({
        location: "home_hero",
        route_name: "projects",
      }),
    ).toEqual({
      location: "home_hero",
      route_name: "projects",
    });
  });
});
