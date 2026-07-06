import { PROJECT_URLS, resumeData } from "@portfolio/resume-content";
import { describe, expect, it } from "vitest";

import { buildHomeMarketing, HOME_RESUME_ANCHOR_ID } from "./home-site";

describe("buildHomeMarketing", () => {
  it("wires hero CTAs and condensed résumé anchor from résumé data", () => {
    const m = buildHomeMarketing(resumeData);
    expect(m.homeLeadHero.projectsHref).toBe("/projects");
    expect(m.homeLeadHero.contactHref).toBe("#contact-heading");
    expect(m.homeLeadHero.githubHref).toBe("https://github.com/lucasabritta");
    expect(m.homeLeadHero.name).toBe(resumeData.name);
    expect(m.homeLeadHero.proofPoints).toEqual([
      "Played a key role in growing a Startup from Seed to Series A and B, contributing to its ~$200 M valuation while leading engineering quality and platform excellence.",
      "Hands-on background in software development and automation, with expertise in cloud infrastructure, CI/CD, observability and performance.",
      "Shipped high-impact product features at startup speed—from new revenue-driving capabilities to core user-flow improvements—with measurable gains in adoption, conversion, and release velocity.",
    ]);
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
