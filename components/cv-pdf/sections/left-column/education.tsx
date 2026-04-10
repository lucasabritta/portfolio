import { Text, View } from "@react-pdf/renderer";

import { splitDegree } from "@/components/cv-pdf/sections/text-format";
import { cvPdfStyles } from "@/components/cv-pdf/styles";
import type { EducationEntry } from "@/lib/cv-data";

type LeftColumnEducationProps = {
  education: readonly EducationEntry[];
};

export function LeftColumnEducation({ education }: LeftColumnEducationProps) {
  return (
    <View>
      <View style={cvPdfStyles.dividerLine} />
      <Text style={cvPdfStyles.sectionTitle}>Education</Text>
      {education.map((entry) => {
        const { prefix, suffix } = splitDegree(entry.degree);

        return (
          <View key={`${entry.institution}-${entry.date}`} style={cvPdfStyles.leftEntry}>
            <Text style={cvPdfStyles.leftMain}>{entry.institution} /</Text>
            <Text style={cvPdfStyles.leftSub}>
              {entry.location} • {entry.date}
            </Text>
            <Text style={cvPdfStyles.degreeText}>
              <Text style={cvPdfStyles.degreePrefix}>{prefix}</Text>
              {suffix}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
