import { describe, expect, it, vi, beforeEach } from "vitest";

import { ANALYTICS_EVENTS } from "./events";
import { trackClickTarget } from "./click-tracking";

const capture = vi.fn();

vi.mock("./track", () => ({
  trackEvent: (...args: unknown[]) => capture(...args),
}));

describe("trackClickTarget", () => {
  beforeEach(() => {
    capture.mockClear();
  });

  it("tracks footer link clicks", () => {
    document.body.innerHTML = `<footer><a href="https://github.com/lucasabritta">GitHub</a></footer>`;
    const link = document.querySelector("footer a")!;
    trackClickTarget(link, "/");
    expect(capture).toHaveBeenCalledWith(
      ANALYTICS_EVENTS.footerLinkClicked,
      expect.objectContaining({ label: "GitHub" }),
    );
  });

  it("skips theme switch buttons so theme_changed is not duplicated", () => {
    document.body.innerHTML = `
      <header>
        <div role="group" aria-label="Theme">
          <button type="button" aria-label="Dark">Dark</button>
        </div>
      </header>
    `;
    const button = document.querySelector("button")!;
    trackClickTarget(button, "/");
    expect(capture).not.toHaveBeenCalled();
  });

  it("tracks CTA clicks in home hero", () => {
    document.body.innerHTML = `<header id="home-hero"><a href="/projects">View Projects</a></header>`;
    const link = document.querySelector("#home-hero a")!;
    trackClickTarget(link, "/");
    expect(capture).toHaveBeenCalledWith(
      ANALYTICS_EVENTS.ctaClicked,
      expect.objectContaining({ location: "home_hero", label: "View Projects" }),
    );
  });
});
