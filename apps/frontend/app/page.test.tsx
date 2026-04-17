/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { buildPhoneHref, resumeData } from "@portfolio/resume-content";

import Home from "./page";

afterEach(() => {
  cleanup();
});

describe("Home page", () => {
  it("renders résumé copy from resumeData", () => {
    render(<Home />);
    expect(screen.getAllByText(resumeData.name).length).toBeGreaterThan(0);
    const phoneLinks = screen.getAllByRole("link", { name: resumeData.phone });
    expect(phoneLinks[0]).toHaveAttribute("href", buildPhoneHref(resumeData.phone));
  });

  it("keeps page shell and section composition in frontend", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /professional summary/i })).toBeInTheDocument();
    expect(document.getElementById("resume")).toBeTruthy();
  });

  it("surfaces person-first home CTAs and routes", () => {
    render(<Home />);
    const h1 = screen.getByRole("heading", { level: 1, name: resumeData.name });
    const heroRoot = h1.closest("header");
    expect(heroRoot).toBeTruthy();
    const projects = within(heroRoot as HTMLElement).getByRole("link", { name: "View Projects" });
    expect(projects).toHaveAttribute("href", "/projects");
    const storybookLinks = screen.getAllByRole("link", { name: "Open Storybook" });
    expect(storybookLinks.length).toBeGreaterThanOrEqual(1);
    expect(storybookLinks.every((el) => el.getAttribute("href") === "/storybook")).toBe(true);
    expect(within(heroRoot as HTMLElement).getByText("Proof points")).toBeInTheDocument();
    expect(within(heroRoot as HTMLElement).getByRole("list")).toBeInTheDocument();
  });

  it("keeps cv download path under /api", () => {
    render(<Home />);
    const cvPdfLinks = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href") === "/api/cv");
    expect(cvPdfLinks.length).toBeGreaterThanOrEqual(1);
    expect(cvPdfLinks.some((el) => /download cv/i.test(el.textContent ?? ""))).toBe(true);
  });
});
