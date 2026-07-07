import { afterEach, describe, expect, it, vi } from "vitest";

import { handleCapturedNavigationClick } from "./navigation-click";
import { resetPreservedParamsForTests } from "./query-params";

describe("handleCapturedNavigationClick", () => {
  afterEach(() => {
    resetPreservedParamsForTests();
  });

  it("tracks nav clicks before UTM-preserving navigation intercepts the event", () => {
    const order: string[] = [];
    const track = vi.fn(() => {
      order.push("track");
    });
    const push = vi.fn(() => {
      order.push("push");
    });

    document.body.innerHTML = `<header><nav><a href="/projects">Projects</a></nav></header>`;
    sessionStorage.setItem("pf:params", JSON.stringify({ utm_source: "test" }));

    const link = document.querySelector("nav a")!;
    const event = new MouseEvent("click", { bubbles: true, cancelable: true, composed: true });
    Object.defineProperty(event, "target", { value: link, enumerable: true });
    const stopImmediatePropagation = vi.spyOn(event, "stopImmediatePropagation");

    handleCapturedNavigationClick(event, { track, push }, "/");

    expect(track).toHaveBeenCalledWith(link, "/");
    expect(push).toHaveBeenCalledWith("/projects?utm_source=test");
    expect(stopImmediatePropagation).toHaveBeenCalled();
    expect(order).toEqual(["track", "push"]);
  });

  it("tracks CTA clicks without intercepting when there are no preserved params", () => {
    const track = vi.fn();
    const push = vi.fn();

    document.body.innerHTML = `<header id="home-hero"><a href="/projects">View Projects</a></header>`;

    const link = document.querySelector("#home-hero a")!;
    const event = new MouseEvent("click", { bubbles: true, cancelable: true, composed: true });
    Object.defineProperty(event, "target", { value: link, enumerable: true });

    handleCapturedNavigationClick(event, { track, push }, "/");

    expect(track).toHaveBeenCalledWith(link, "/");
    expect(push).not.toHaveBeenCalled();
  });
});
