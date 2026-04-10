import { View } from "@react-pdf/renderer";

import {
  LeftColumnCertifications,
  LeftColumnEducation,
  LeftColumnHeader,
  LeftColumnProjects,
} from "@/components/cv-pdf/sections/left-column/index";
import { cvPdfStyles } from "@/components/cv-pdf/styles";
import type { CvData } from "@/lib/cv-data";

type LeftColumnProps = {
  cvData: CvData;
};

export function LeftColumn({ cvData }: LeftColumnProps) {
  return (
    <View style={cvPdfStyles.leftColumn}>
      <LeftColumnHeader name={cvData.name} role={cvData.role} />

      <View style={cvPdfStyles.leftSections}>
        <LeftColumnEducation education={cvData.education} />
        <LeftColumnCertifications certifications={cvData.certifications} />
        <LeftColumnProjects projects={cvData.personalProjects} />
      </View>
    </View>
  );
}
