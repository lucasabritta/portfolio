import { describe, expect, it } from "vitest";

import { SECTION_ID_TO_LOCATION } from "./location-maps";
import { resolveLocation } from "./properties";

describe("SECTION_ID_TO_LOCATION", () => {
  it.each(
    Object.entries(SECTION_ID_TO_LOCATION).map(([sectionId, location]) => ({
      sectionId,
      location,
    })),
  )("maps section id $sectionId to $location", ({ sectionId, location }) => {
    document.body.innerHTML = `
      <section id="${sectionId}">
        <a href="/target">Link</a>
      </section>
    `;
    const link = document.querySelector("a")!;
    expect(resolveLocation(link, "/")).toBe(location);
  });
});

describe("resolveLocation edge cases", () => {
  it("resolves header_mobile inside a dialog panel", () => {
    document.body.innerHTML = `
      <header>
        <div role="dialog">
          <nav><a href="/projects">Projects</a></nav>
        </div>
      </header>
    `;
    const link = document.querySelector("nav a")!;
    expect(resolveLocation(link, "/")).toBe("header_mobile");
  });

  it("resolves featured_work_supporting for the second article in featured work", () => {
    document.body.innerHTML = `
      <section id="featured-work">
        <article><a href="/a">First</a></article>
        <article><a href="/b">Second</a></article>
      </section>
    `;
    const second = document.querySelectorAll("article a")[1]!;
    expect(resolveLocation(second, "/")).toBe("featured_work_supporting");
  });
});
