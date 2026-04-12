/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { buildPhoneHref, resumeData } from "@portfolio/resume-content";
import { HomePageView } from "@portfolio/storybook";

import Home from "./page";

describe("Home page", () => {
  it("renders résumé copy from resumeData", () => {
    render(<Home />);
    expect(screen.getAllByText(resumeData.name).length).toBeGreaterThan(0);
    const phoneLinks = screen.getAllByRole("link", { name: resumeData.phone });
    expect(phoneLinks[0]).toHaveAttribute("href", buildPhoneHref(resumeData.phone));
  });

  it("composes HomePageView with the same props as the default export", () => {
    render(
      <HomePageView
        downloadHref="/api/cv"
        name={resumeData.name}
        role={resumeData.role}
        summary={resumeData.summary}
        location={resumeData.location}
        phone={resumeData.phone}
        phoneHref={buildPhoneHref(resumeData.phone)}
        email={resumeData.email}
        linkedin={resumeData.linkedin}
        contactLinks={resumeData.contactLinks}
        summaryHighlights={resumeData.summaryHighlights}
        techStack={resumeData.techStack}
        workHistory={resumeData.workHistory}
        education={resumeData.education}
        certifications={resumeData.certifications}
        personalProjects={resumeData.personalProjects}
      />,
    );
    expect(screen.getAllByText(resumeData.name).length).toBeGreaterThan(0);
  });
});
