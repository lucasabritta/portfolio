import { Document, Page, Text, View } from "@react-pdf/renderer";
import { resumeData } from "@portfolio/resume-content";

import { cvPdfStyles } from "./cv-pdf.styles";

export function CvPdfDocument() {
  return (
    <Document title={`${resumeData.name} CV`}>
      <Page size="A4" style={cvPdfStyles.page}>
        <View style={cvPdfStyles.header}>
          <Text style={cvPdfStyles.name}>{resumeData.name}</Text>
          <Text style={cvPdfStyles.subtitle}>{resumeData.role}</Text>
          <Text style={cvPdfStyles.subtitle}>{resumeData.email}</Text>
          <Text style={cvPdfStyles.subtitle}>{resumeData.phone}</Text>
        </View>

        <View style={cvPdfStyles.section}>
          <Text style={cvPdfStyles.sectionTitle}>Professional summary</Text>
          <Text>{resumeData.summary}</Text>
        </View>

        <View style={cvPdfStyles.section}>
          <Text style={cvPdfStyles.sectionTitle}>Experience highlights</Text>
          {resumeData.workHistory.flatMap((entry) =>
            entry.achievements.map((highlight) => (
              <Text key={`${entry.company}-${highlight.slice(0, 24)}`} style={cvPdfStyles.bullet}>
                {"- "}
                {highlight}
              </Text>
            )),
          )}
        </View>
      </Page>
    </Document>
  );
}
