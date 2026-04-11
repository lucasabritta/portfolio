import { View } from "@react-pdf/renderer";

import {
  LeftColumnCertifications,
  LeftColumnContacts,
  LeftColumnEducation,
  LeftColumnHeader,
  LeftColumnProjects,
} from "@/components/cv-pdf/sections/left-column/index";
import { cvPdfStyles } from "@/components/cv-pdf/styles";
import type { CvData } from "@/lib/cv-data";

type LeftColumnProps = {
  cvData: CvData;
};

/** Sidebar top: name, role, contacts — pairs with {@link SummarySection} on the right. */
export function LeftColumnSummaryBand({ cvData }: LeftColumnProps) {
  return (
    <View style={cvPdfStyles.leftColumn}>
      <LeftColumnHeader name={cvData.name} role={cvData.role} />
      <LeftColumnContacts
        phone={cvData.phone}
        email={cvData.email}
        location={cvData.location}
        linkedin={cvData.linkedin}
      />
      <View style={cvPdfStyles.leftColumnBandFill} />
    </View>
  );
}

/** Sidebar below summary: education, certifications, projects — pairs with work history on the right. */
export function LeftColumnLowerBand({ cvData }: LeftColumnProps) {
  return (
    <View style={cvPdfStyles.leftColumn}>
      <View style={cvPdfStyles.leftSections}>
        <LeftColumnEducation education={cvData.education} />
        <LeftColumnCertifications certifications={cvData.certifications} />
        <LeftColumnProjects projects={cvData.personalProjects} />
      </View>
    </View>
  );
}
