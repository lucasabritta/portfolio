import { Link, Text, View } from "@react-pdf/renderer";

import { cvPdfStyles } from "@/components/cv-pdf/styles";
import type { CvData } from "@/lib/cv-data";

type LeftColumnProps = {
  cvData: CvData;
};

export function LeftColumn({ cvData }: LeftColumnProps) {
  return (
    <View style={cvPdfStyles.leftColumn}>
      <Text style={cvPdfStyles.headerName}>{cvData.name}</Text>
      <Text style={cvPdfStyles.headerRole}>{cvData.role}</Text>
      <Text style={cvPdfStyles.contactLine}>{cvData.phone}</Text>
      <Link src={cvData.linkedin} style={[cvPdfStyles.linkedinLine, cvPdfStyles.externalLink]}>
        {cvData.linkedin}
      </Link>
      <Link src={`mailto:${cvData.email}`} style={[cvPdfStyles.emailLine, cvPdfStyles.link]}>
        {cvData.email}
      </Link>
      <Text style={cvPdfStyles.contactLine}>{cvData.location}</Text>

      <View style={cvPdfStyles.leftSections}>
        <View style={cvPdfStyles.dividerLine} />
        <Text style={cvPdfStyles.sectionTitle}>Education</Text>
        {cvData.education.map((entry) => (
          <View key={entry.institution} style={cvPdfStyles.leftEntry}>
            <Text style={cvPdfStyles.leftMain}>{entry.institution} /</Text>
            <Text style={cvPdfStyles.leftSub}>
              {entry.location} • {entry.date}
            </Text>
            <Text>{entry.degree}</Text>
          </View>
        ))}

        <View style={cvPdfStyles.certificationsSection}>
          <View style={cvPdfStyles.dividerLine} />
          <Text style={cvPdfStyles.sectionTitle}>Certifications</Text>
          {cvData.certifications.map((certification) => (
            <Text key={certification} style={cvPdfStyles.certificationText}>
              {certification}
            </Text>
          ))}
        </View>

        <View style={cvPdfStyles.dividerLine} />
        <Text style={cvPdfStyles.sectionTitle}>Personal projects</Text>
        {cvData.personalProjects.map((project) => (
          <View key={project.title}>
            <Text style={cvPdfStyles.paragraph}>{project.description}</Text>
            <Link src={project.href} style={cvPdfStyles.externalLink}>
              {project.href}
            </Link>
          </View>
        ))}
      </View>
    </View>
  );
}
