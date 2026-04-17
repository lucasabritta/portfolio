import {
  buildPhoneHref,
  type ResumeData,
} from "@portfolio/resume-content";

import {
  buildHomeMarketing,
  HOME_RESUME_ANCHOR_ID,
  type HomeMarketingBlocks,
} from "./home-site";

export type HomeResumeSectionData = {
  anchorId: string;
  summary: {
    summaryHighlights: ResumeData["summaryHighlights"];
    techStack: ResumeData["techStack"];
  };
  workHistory: ResumeData["workHistory"];
  education: ResumeData["education"];
  certifications: ResumeData["certifications"];
  projects: ResumeData["personalProjects"];
  contact: {
    location: ResumeData["location"];
    phone: ResumeData["phone"];
    phoneHref: string;
    email: ResumeData["email"];
    linkedin: ResumeData["linkedin"];
  };
};

export type HomePageModel = {
  marketing: HomeMarketingBlocks;
  resume: HomeResumeSectionData;
};

/**
 * Build all data the `/` App Router page needs so the JSX stays a dumb
 * composition of `@portfolio/storybook` sections. Keeps side effects (data
 * reads, href derivation) out of the server component body and gives tests
 * and storybook previews a single seam to swap inputs.
 */
export function buildHomePageModel(resume: ResumeData): HomePageModel {
  return {
    marketing: buildHomeMarketing(resume),
    resume: {
      anchorId: HOME_RESUME_ANCHOR_ID,
      summary: {
        summaryHighlights: resume.summaryHighlights,
        techStack: resume.techStack,
      },
      workHistory: resume.workHistory,
      education: resume.education,
      certifications: resume.certifications,
      projects: resume.personalProjects,
      contact: {
        location: resume.location,
        phone: resume.phone,
        phoneHref: buildPhoneHref(resume.phone),
        email: resume.email,
        linkedin: resume.linkedin,
      },
    },
  };
}
