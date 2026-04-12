import { View } from "@react-pdf/renderer";

import {
  LeftColumnCertifications,
  LeftColumnContacts,
  LeftColumnEducation,
  LeftColumnHeader,
  LeftColumnProjects,
} from "@cv-pdf/sections/left-column/index";
import { cvPdfStyles } from "@cv-pdf/styles";
import type { ResumeData } from "@portfolio/resume-content";

type LeftColumnProps = {
  resumeData: ResumeData;
};

/** Sidebar top: name, role, contacts — pairs with {@link SummarySection} on the right. */
export function LeftColumnSummaryBand({ resumeData }: LeftColumnProps) {
  return (
    <View style={cvPdfStyles.leftColumn}>
      <LeftColumnHeader name={resumeData.name} role={resumeData.role} />
      <LeftColumnContacts
        phone={resumeData.phone}
        email={resumeData.email}
        location={resumeData.location}
        linkedin={resumeData.linkedin}
      />
      <View style={cvPdfStyles.leftColumnBandFill} />
    </View>
  );
}

/** Sidebar below summary: education, certifications, projects — pairs with work history on the right. */
export function LeftColumnLowerBand({ resumeData }: LeftColumnProps) {
  return (
    <View style={cvPdfStyles.leftColumn}>
      <View style={cvPdfStyles.leftSections}>
        <LeftColumnEducation education={resumeData.education} />
        <LeftColumnCertifications certifications={resumeData.certifications} />
        <LeftColumnProjects projects={resumeData.personalProjects} />
      </View>
    </View>
  );
}
