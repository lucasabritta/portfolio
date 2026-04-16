import { resumeData } from "@portfolio/resume-content";
import { describe, expect, it } from "vitest";

import { buildHomeMarketing, HOME_RESUME_ANCHOR_ID } from "./home-site";

describe("buildHomeMarketing", () => {
  it("wires hero CTAs and condensed résumé anchor from résumé data", () => {
    const m = buildHomeMarketing(resumeData);
    expect(m.homeLeadHero.downloadHref).toBe("/api/cv");
    expect(m.homeLeadHero.projectsHref).toBe("/projects");
    expect(m.homeLeadHero.storybookHref).toBe("/storybook");
    expect(m.homeLeadHero.name).toBe(resumeData.name);
    expect(m.homeLeadHero.proofPoints).toHaveLength(3);
    expect(m.condensedCv.resumeAnchorId).toBe(HOME_RESUME_ANCHOR_ID);
    expect(m.condensedCv.entries).toHaveLength(3);
    expect(m.condensedCv.entries[0]?.company).toBe(resumeData.workHistory[0]?.company);
  });

  it("marks flagship store link as external for featured work", () => {
    const m = buildHomeMarketing(resumeData);
    expect(m.featuredWork.flagship.href).toMatch(/^https:\/\//);
    expect(m.featuredWork.flagship.external).toBe(true);
    expect(m.featuredWork.supporting[0]?.href).toBe("/projects");
    expect(m.featuredWork.supporting[0]?.external).toBeFalsy();
  });
});
