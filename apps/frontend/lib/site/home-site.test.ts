import { PROJECT_URLS, resumeData } from "@portfolio/resume-content";
import { describe, expect, it } from "vitest";

import { buildHomeMarketing, HOME_RESUME_ANCHOR_ID } from "./home-site";

describe("buildHomeMarketing", () => {
  it("wires hero CTAs and condensed résumé anchor from résumé data", () => {
    const m = buildHomeMarketing(resumeData);
    expect(m.homeLeadHero.projectsHref).toBe("/projects");
    expect(m.homeLeadHero.githubHref).toBe("https://github.com/lucasabritta");
    expect(m.homeLeadHero.name).toBe(resumeData.name);
    expect(m.homeLeadHero.proofPoints).toHaveLength(3);
    expect(m.homeLeadHero.proofPoints[0]?.body).toContain("$200M valuation");
    expect(m.homeLeadHero.proofPoints[1]?.body).toContain("cloud infrastructure");
    expect(m.homeLeadHero.proofPoints[2]?.body).toContain("360° feedback");
    expect(m.condensedCv.resumeAnchorId).toBe(HOME_RESUME_ANCHOR_ID);
    expect(m.condensedCv.heading).toBe("Work history");
    expect(m.condensedCv.entries).toHaveLength(resumeData.workHistory.length);
    expect(m.condensedCv.entries[0]?.company).toBe(resumeData.workHistory[0]?.company);
  });

  it("keeps featured work pointing at the projects page", () => {
    const m = buildHomeMarketing(resumeData);
    expect(m.featuredWork.flagship.href).toBe("/projects");
    expect(m.featuredWork.flagship.ctaLabel).toBe("View Projects");
    expect(m.featuredWork.flagship.external).toBeFalsy();
    expect(m.featuredWork.flagship.actions).toEqual([
      {
        label: "Google Play",
        href: PROJECT_URLS.echoesMissingCatPlayStore,
        variant: "primary",
        external: true,
      },
      {
        label: "Medium article",
        href: PROJECT_URLS.echoesMissingCatMediumArticle,
        variant: "secondary",
        external: true,
      },
    ]);
    expect(m.featuredWork.supporting[0]?.href).toBe("/projects");
    expect(m.featuredWork.supporting[0]?.external).toBeFalsy();
  });
});
