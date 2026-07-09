import { describe, expect, it } from "vitest";

import { resolveClickEvent } from "./event-registry";
import {
  classifyLinkKind,
  contactChannelFromHref,
  extractClickLabel,
  isWordmarkClick,
  resolveLocation,
  routeNameFromPathname,
  sanitizeTarget,
  statusPageContext,
} from "./properties";

describe("classifyLinkKind", () => {
  it("classifies link kinds", () => {
    expect(classifyLinkKind("/projects")).toBe("internal");
    expect(classifyLinkKind("https://github.com/lucasabritta")).toBe("external");
    expect(classifyLinkKind("mailto:test@example.com")).toBe("mailto");
    expect(classifyLinkKind("tel:+1234567890")).toBe("tel");
    expect(classifyLinkKind("#resume")).toBe("hash");
  });
});

describe("sanitizeTarget", () => {
  it("never emits raw mailto or tel values", () => {
    expect(sanitizeTarget("mailto:jane@example.com")).toBe("mailto");
    expect(sanitizeTarget("tel:+441234567890")).toBe("tel");
  });

  it("sanitizes internal and external hrefs", () => {
    expect(sanitizeTarget("/projects")).toBe("/projects");
    expect(sanitizeTarget("https://github.com/lucasabritta/portfolio")).toBe(
      "github.com/lucasabritta/portfolio",
    );
  });
});

describe("contactChannelFromHref", () => {
  it("maps contact channels without exposing values", () => {
    expect(contactChannelFromHref("mailto:jane@example.com")).toBe("email");
    expect(contactChannelFromHref("tel:+123")).toBe("phone");
    expect(contactChannelFromHref("https://linkedin.com/in/example")).toBe("linkedin");
  });
});

describe("routeNameFromPathname", () => {
  it("maps known routes", () => {
    expect(routeNameFromPathname("/")).toBe("home");
    expect(routeNameFromPathname("/projects")).toBe("projects");
    expect(routeNameFromPathname("/site-architecture")).toBe("site_architecture");
    expect(routeNameFromPathname("/unknown")).toBe("other");
  });
});

describe("resolveLocation", () => {
  it("resolves footer and section locations from DOM context", () => {
    document.body.innerHTML = `
      <section id="featured-work">
        <a href="/projects">View Projects</a>
      </section>
      <footer><a href="https://github.com/lucasabritta">GitHub</a></footer>
    `;

    const sectionLink = document.querySelector("#featured-work a")!;
    const footerLink = document.querySelector("footer a")!;

    expect(resolveLocation(sectionLink, "/")).toBe("featured_work_flagship");
    expect(resolveLocation(footerLink, "/")).toBe("footer");
  });

  it("resolves home hero from structural anchor", () => {
    document.body.innerHTML = `
      <header id="home-hero"><a href="/projects">View Projects</a></header>
    `;
    const link = document.querySelector("#home-hero a")!;
    expect(resolveLocation(link, "/")).toBe("home_hero");
  });
});

describe("resolveClickEvent", () => {
  it("maps footer clicks to footer_link_clicked", () => {
    document.body.innerHTML = `<footer><a href="https://github.com/lucasabritta">GitHub</a></footer>`;
    const link = document.querySelector("footer a")!;
    const resolved = resolveClickEvent({
      element: link,
      pathname: "/",
      href: link.getAttribute("href"),
    });
    expect(resolved.event).toBe("footer_link_clicked");
    expect(resolved.properties.label).toBe("GitHub");
    expect(resolved.properties.target).toBe("github.com/lucasabritta");
  });

  it("maps site architecture flow anchors", () => {
    document.body.innerHTML = `<a href="#architecture">Boundaries</a>`;
    const link = document.querySelector("a")!;
    const resolved = resolveClickEvent({
      element: link,
      pathname: "/site-architecture",
      href: "#architecture",
    });
    expect(resolved.event).toBe("section_flow_clicked");
    expect(resolved.properties.section_id).toBe("architecture");
  });

  it("maps contact section mailto to contact_clicked with channel only", () => {
    document.body.innerHTML = `
      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact</h2>
        <a href="mailto:jane@example.com">jane@example.com</a>
      </section>
    `;
    const link = document.querySelector("a")!;
    const resolved = resolveClickEvent({
      element: link,
      pathname: "/",
      href: "mailto:jane@example.com",
    });
    expect(resolved.event).toBe("contact_clicked");
    expect(resolved.properties.channel).toBe("email");
    expect(resolved.properties).not.toHaveProperty("target", "jane@example.com");
    expect(resolved.properties.label).toBeUndefined();
  });

  it("maps wordmark clicks", () => {
    document.body.innerHTML = `<header><a href="/">Lucas Abritta</a><nav><a href="/projects">Projects</a></nav></header>`;
    const wordmark = document.querySelector('header > a[href="/"]')!;
    const resolved = resolveClickEvent({
      element: wordmark,
      pathname: "/",
      href: "/",
    });
    expect(resolved.event).toBe("wordmark_clicked");
    expect(isWordmarkClick(wordmark, "/")).toBe(true);
  });

  it("maps header nav clicks", () => {
    document.body.innerHTML = `<header><nav><a href="/projects">Projects</a></nav></header>`;
    const link = document.querySelector("nav a")!;
    const resolved = resolveClickEvent({
      element: link,
      pathname: "/",
      href: "/projects",
    });
    expect(resolved.event).toBe("nav_clicked");
    expect(resolved.properties.surface).toBe("header_desktop");
  });

  it("maps mobile nav menu toggle buttons", () => {
    document.body.innerHTML = `
      <header>
        <button type="button" aria-controls="mobile-nav" aria-expanded="true" aria-label="Close navigation menu">
          Close
        </button>
      </header>
    `;
    const button = document.querySelector("button")!;
    const resolved = resolveClickEvent({
      element: button,
      pathname: "/",
      href: null,
    });
    expect(resolved.event).toBe("nav_menu_toggled");
    expect(resolved.properties.menu_state).toBe("close");
  });

  it("maps repo clicks on the projects page", () => {
    document.body.innerHTML = `
      <section aria-labelledby="repos-heading">
        <h2 id="repos-heading">Pinned GitHub repositories</h2>
        <a href="https://github.com/lucasabritta/portfolio">View on GitHub</a>
      </section>
    `;
    const link = document.querySelector("a")!;
    const resolved = resolveClickEvent({
      element: link,
      pathname: "/projects",
      href: link.getAttribute("href"),
    });
    expect(resolved.event).toBe("repo_clicked");
    expect(resolved.properties.repo_name).toBe("portfolio");
  });

  it("maps resume project cards", () => {
    document.body.innerHTML = `
      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading">Personal projects</h2>
        <article><h3>Echoes of the missing cat</h3><a href="/projects">View project</a></article>
      </section>
    `;
    const link = document.querySelector("a")!;
    const resolved = resolveClickEvent({
      element: link,
      pathname: "/",
      href: "/projects",
    });
    expect(resolved.event).toBe("project_card_clicked");
    expect(resolved.properties.project_title).toBe("echoes_of_the_missing_cat");
  });

  it("maps status page actions from heading context", () => {
    document.body.innerHTML = `
      <main><h1>Page not found</h1><a href="/">Back to home</a></main>
    `;
    const link = document.querySelector("a")!;
    expect(statusPageContext()).toBe("not_found");
    const resolved = resolveClickEvent({
      element: link,
      pathname: "/missing-page",
      href: "/",
    });
    expect(resolved.event).toBe("status_action_clicked");
    expect(resolved.properties.context).toBe("not_found");
  });

  it("falls back to link_clicked for unknown locations", () => {
    document.body.innerHTML = `<div><a href="/unknown">Mystery</a></div>`;
    const link = document.querySelector("a")!;
    const resolved = resolveClickEvent({
      element: link,
      pathname: "/unknown",
      href: "/unknown",
    });
    expect(resolved.event).toBe("link_clicked");
  });

  it("redacts mailto labels", () => {
    document.body.innerHTML = `<a href="mailto:secret@example.com">secret@example.com</a>`;
    const link = document.querySelector("a")!;
    expect(extractClickLabel(link, "mailto:secret@example.com")).toBe("mailto");
  });
});

describe("cta_clicked locations", () => {
  const cases: Array<{
    location: string;
    html: string;
    pathname: string;
  }> = [
    {
      location: "home_hero",
      html: `<header id="home-hero"><a href="/target">CTA</a></header>`,
      pathname: "/",
    },
    {
      location: "featured_work_flagship",
      html: `<section id="featured-work"><article><a href="/target">CTA</a></article></section>`,
      pathname: "/",
    },
    {
      location: "featured_work_supporting",
      html: `<section id="featured-work"><article><a href="/a">First</a></article><article><a href="/target">Second</a></article></section>`,
      pathname: "/",
    },
    {
      location: "build_teaser",
      html: `<section id="build-teaser"><a href="/target">CTA</a></section>`,
      pathname: "/",
    },
    {
      location: "cv_preview",
      html: `<section id="cv-preview"><a href="/target">CTA</a></section>`,
      pathname: "/",
    },
    {
      location: "projects_flagship",
      html: `<section aria-labelledby="flagship-title"><h2 id="flagship-title">Flagship</h2><a href="/target">CTA</a></section>`,
      pathname: "/projects",
    },
    {
      location: "site_architecture",
      html: `<section id="build-ctas"><a href="/target">CTA</a></section>`,
      pathname: "/site-architecture",
    },
    {
      location: "projects_page",
      html: `<main><a href="/target">CTA</a></main>`,
      pathname: "/projects",
    },
  ];

  it.each(cases)("maps $location to cta_clicked", ({ location, html, pathname }) => {
    document.body.innerHTML = html;
    const link =
      location === "featured_work_supporting"
        ? (document.querySelectorAll("a")[1] as HTMLAnchorElement)
        : (document.querySelector("a") as HTMLAnchorElement);

    const resolved = resolveClickEvent({
      element: link,
      pathname,
      href: "/target",
    });

    expect(resolved.event).toBe("cta_clicked");
    expect(resolved.properties.location).toBe(location);
  });
});
