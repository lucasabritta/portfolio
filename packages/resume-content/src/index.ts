import { resumeCertifications } from "./certifications";
import { resumeEducation } from "./education";
import { resumePersonalProjects } from "./personal-projects";
import { resumeProfile } from "./profile";
import type { ResumeData } from "./types";
import { resumeWorkHistory } from "./work-history";

export const resumeData = {
  ...resumeProfile,
  certifications: [...resumeCertifications],
  education: [...resumeEducation],
  personalProjects: [...resumePersonalProjects],
  workHistory: [...resumeWorkHistory],
} satisfies ResumeData;

export { buildPhoneHref } from "./contact";
export { buildCvFilename } from "./cv-filename";
export { buildWorkEntryStableKey } from "./work-entry-stable-key";

export type {
  ResumeContactLink,
  ResumeData,
  ResumeEducationEntry,
  ResumeExperienceEntry,
  ResumePersonalProject,
} from "./types";
