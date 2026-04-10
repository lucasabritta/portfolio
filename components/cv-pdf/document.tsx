import { Document, Page, Text, View } from "@react-pdf/renderer";

import "@/components/cv-pdf/fonts";
import { BulletList } from "@/components/cv-pdf/sections/bullet-list";
import { LeftColumn } from "@/components/cv-pdf/sections/left-column";
import { WorkEntry } from "@/components/cv-pdf/sections/work-entry";
import { cvPdfStyles } from "@/components/cv-pdf/styles";
import { cvData } from "@/lib/cv-data";

export function CvPdfDocument() {
  const firstEntry = cvData.workHistory[0];
  const secondEntry = cvData.workHistory[1];
  const thirdEntry = cvData.workHistory[2];
  const remainingEntries = cvData.workHistory.slice(3);

  const summaryBullets = [...cvData.summaryHighlights];

  return (
    <Document
      author={cvData.name}
      creator="Next.js Portfolio"
      producer="Next.js Portfolio"
      subject={`${cvData.name} CV`}
      title={`${cvData.name} CV`}
    >
      <Page size="LETTER" style={cvPdfStyles.page}>
        <View style={cvPdfStyles.row}>
          <LeftColumn cvData={cvData} />
          <View style={cvPdfStyles.rightColumn}>
            <Text style={cvPdfStyles.sectionTitle}>Professional Summary</Text>
            <Text style={cvPdfStyles.paragraph}>{cvData.summary}</Text>
            <BulletList items={summaryBullets} />

            <View style={cvPdfStyles.workSection}>
              <Text style={cvPdfStyles.sectionTitle}>Work History</Text>
              {firstEntry ? <WorkEntry entry={firstEntry} /> : null}
              {secondEntry ? <WorkEntry entry={secondEntry} /> : null}
              {thirdEntry ? <WorkEntry entry={thirdEntry} showAchievements={false} /> : null}
              {thirdEntry ? <Text style={cvPdfStyles.achievementsTitle}>Key achievements:</Text> : null}
            </View>
          </View>
        </View>
      </Page>

      <Page size="LETTER" style={cvPdfStyles.page}>
        <View style={cvPdfStyles.row}>
          <View style={cvPdfStyles.leftColumn} />
          <View style={cvPdfStyles.rightColumn}>
            {thirdEntry && thirdEntry.achievements.length > 0 ? (
              <BulletList items={thirdEntry.achievements} />
            ) : null}
            {remainingEntries.map((entry) => (
              <WorkEntry key={`${entry.company}-${entry.role}-${entry.period}`} entry={entry} />
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
