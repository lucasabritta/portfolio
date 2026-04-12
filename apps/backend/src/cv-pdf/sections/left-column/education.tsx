import { Text, View } from "@react-pdf/renderer";

import { splitDegree } from "@cv-pdf/sections/text-format";
import { cvPdfStyles } from "@cv-pdf/styles";
import type { ResumeEducationEntry } from "@portfolio/resume-content";

type LeftColumnEducationProps = {
  education: readonly ResumeEducationEntry[];
};

export function LeftColumnEducation({ education }: LeftColumnEducationProps) {
  return (
    <View style={cvPdfStyles.sidebarTextColumn}>
      <View style={cvPdfStyles.dividerLine} />
      <Text style={cvPdfStyles.sectionTitle}>Education</Text>
      {education.map((entry) => {
        const { prefix, suffix } = splitDegree(entry.degree);

        return (
          <View key={`${entry.institution}-${entry.date}`} style={cvPdfStyles.leftEntry}>
            <Text style={cvPdfStyles.leftInstitutionLine}>
              <Text style={cvPdfStyles.leftInstitution}>
                {entry.institution}
                {/* NBSP keeps “…school /” from breaking with a stray hyphen in some viewers. */}
                {"\u00a0"}
              </Text>
              <Text style={cvPdfStyles.leftSlash}>/</Text>
              <Text style={cvPdfStyles.rightMeta}>
                {" "}
                {entry.location} {"  •  "}
                {entry.date}
              </Text>
            </Text>
            <Text style={cvPdfStyles.degreeLine}>
              <Text style={cvPdfStyles.degreePrefixBold}>{prefix}</Text>
              <Text style={cvPdfStyles.degreeSuffixPlain}>{suffix}</Text>
            </Text>
          </View>
        );
      })}
    </View>
  );
}
