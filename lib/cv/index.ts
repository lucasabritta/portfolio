import { cvCertifications } from "./certifications";
import { cvEducation } from "./education";
import { cvPersonalProjects } from "./personal-projects";
import { cvProfile } from "./profile";
import type { CvData } from "./types";
import { cvWorkHistory } from "./work-history";

export const cvData = {
  ...cvProfile,
  certifications: [...cvCertifications],
  education: [...cvEducation],
  personalProjects: [...cvPersonalProjects],
  workHistory: [...cvWorkHistory],
} satisfies CvData;

export type {
  ContactLink,
  CvData,
  EducationEntry,
  ExperienceEntry,
  PersonalProject,
} from "./types";
