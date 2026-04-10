import { Text, View } from "@react-pdf/renderer";

import { cvPdfStyles } from "@/components/cv-pdf/styles";

type LeftColumnCertificationsProps = {
  certifications: readonly string[];
};

export function LeftColumnCertifications({
  certifications,
}: LeftColumnCertificationsProps) {
  return (
    <View style={cvPdfStyles.certificationsSection}>
      <View style={cvPdfStyles.dividerLine} />
      <Text style={cvPdfStyles.sectionTitle}>Certifications</Text>
      {certifications.map((certification) => (
        <Text key={certification} style={cvPdfStyles.certificationText}>
          {certification}
        </Text>
      ))}
    </View>
  );
}
