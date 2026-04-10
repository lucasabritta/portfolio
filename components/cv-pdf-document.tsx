import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { cvData } from "@/lib/cv-data";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#111827",
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.45,
    paddingHorizontal: 40,
    paddingVertical: 36,
  },
  heading: {
    fontSize: 23,
    fontWeight: 700,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  subheading: {
    color: "#4b5563",
    fontSize: 11,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  contactRow: {
    borderBottom: "1 solid #d1d5db",
    color: "#374151",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
    paddingBottom: 12,
  },
  link: {
    color: "#1d4ed8",
    textDecoration: "none",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    borderBottom: "1 solid #e5e7eb",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginBottom: 8,
    paddingBottom: 4,
    textTransform: "uppercase",
  },
  paragraph: {
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 4,
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    alignItems: "baseline",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: 700,
  },
  entryMeta: {
    color: "#4b5563",
    fontSize: 9,
  },
  entrySubtitle: {
    color: "#4b5563",
    marginBottom: 4,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  chip: {
    backgroundColor: "#f3f4f6",
    borderRadius: 999,
    color: "#374151",
    fontSize: 9,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <View>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bullet}>-</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function CvPdfDocument() {
  return (
    <Document
      author={cvData.name}
      creator="Next.js Portfolio"
      producer="Next.js Portfolio"
      subject={`${cvData.name} CV`}
      title={`${cvData.name} CV`}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>{cvData.name}</Text>
        <Text style={styles.subheading}>{cvData.role}</Text>

        <View style={styles.contactRow}>
          <Text>{cvData.phone}</Text>
          <Link src={`mailto:${cvData.email}`} style={styles.link}>
            {cvData.email}
          </Link>
          <Link src={cvData.linkedin} style={styles.link}>
            LinkedIn
          </Link>
          <Text>{cvData.location}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.paragraph}>{cvData.summary}</Text>
          <BulletList items={cvData.summaryHighlights} />
          <View style={styles.chips}>
            {cvData.techStack.map((item) => (
              <Text key={item} style={styles.chip}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work History</Text>
          {cvData.workHistory.map((entry) => (
            <View key={`${entry.company}-${entry.role}`} style={styles.entry} wrap={false}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>
                  {entry.company} / {entry.role}
                </Text>
                <Text style={styles.entryMeta}>{entry.period}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{entry.location}</Text>
              <Text style={styles.paragraph}>{entry.summary}</Text>
              {entry.achievements.length > 0 ? <BulletList items={entry.achievements} /> : null}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {cvData.education.map((entry) => (
            <View key={entry.institution} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{entry.institution}</Text>
                <Text style={styles.entryMeta}>{entry.date}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{entry.location}</Text>
              <Text>{entry.degree}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          <BulletList items={cvData.certifications} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Projects</Text>
          {cvData.personalProjects.map((project) => (
            <View key={project.title} style={styles.entry}>
              <Text style={styles.entryTitle}>{project.title}</Text>
              <Text style={styles.paragraph}>{project.description}</Text>
              <Link src={project.href} style={styles.link}>
                {project.href}
              </Link>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
