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
    expect(
      screen.queryByRole("heading", { name: /professional summary/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /personal projects/i })).toBeInTheDocument();
    expect(document.getElementById("resume")).toBeTruthy();
  });

  it("surfaces person-first home CTAs and routes", () => {
    render(<Home />);
    const h1 = screen.getByRole("heading", { level: 1, name: resumeData.name });
    const heroRoot = h1.closest("header");
    expect(heroRoot).toBeTruthy();
    expect(within(heroRoot as HTMLElement).getByText("Proof points")).toBeInTheDocument();
    expect(
      within(heroRoot as HTMLElement).getByText(
        "Shipped high-impact product features at startup speed—from new revenue-driving capabilities to core user-flow improvements—with measurable gains in adoption, conversion, and release velocity.",
      ),
    ).toBeInTheDocument();
    const projects = within(heroRoot as HTMLElement).getByRole("link", { name: "View Projects" });
    expect(projects).toHaveAttribute("href", "/projects");
    expect(
      within(heroRoot as HTMLElement).queryByRole("link", { name: /Open Storybook/i }),
    ).not.toBeInTheDocument();
    expect(
      within(heroRoot as HTMLElement).getByRole("link", { name: /GitHub profile/i }),
    ).toHaveAttribute("href", "https://github.com/lucasabritta");
    expect(screen.getByRole("link", { name: /Google Play.*opens in a new tab/i })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.echoes.missingcat",
    );
    expect(
      screen.getByRole("link", { name: /Medium article.*opens in a new tab/i }),
    ).toHaveAttribute(
      "href",
      "https://medium.com/@lucasabritta_93729/what-i-learned-building-an-android-game-with-ai-agents-5f64d23024fe",
    );
    expect(screen.queryByRole("link", { name: /download cv/i })).not.toBeInTheDocument();
  });
});
