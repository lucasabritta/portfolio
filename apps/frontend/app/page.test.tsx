/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react";
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

  it("keeps cv download path under /api", () => {
    render(<Home />);
    const cvPdfLinks = screen.getAllByRole("link").filter((el) => el.getAttribute("href") === "/api/cv");
    expect(cvPdfLinks.length).toBeGreaterThanOrEqual(1);
    expect(cvPdfLinks.some((el) => /download cv/i.test(el.textContent ?? ""))).toBe(true);
  });
});
