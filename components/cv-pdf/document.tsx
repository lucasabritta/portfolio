import { Document, Page, Text, View } from "@react-pdf/renderer";

import "@/components/cv-pdf/fonts";
import {
  buildWorkEntryKey,
  buildWorkHistoryPartitions,
} from "@/components/cv-pdf/work-history";
import { BulletList } from "@/components/cv-pdf/sections/bullet-list";
import { LeftColumn } from "@/components/cv-pdf/sections/left-column";
import { WorkEntry } from "@/components/cv-pdf/sections/work-entry";
import { cvPdfStyles } from "@/components/cv-pdf/styles";
import { cvData } from "@/lib/cv-data";

export function CvPdfDocument() {
  const { firstEntry, secondEntry, thirdEntry, remainingEntries, summaryBullets } =
    buildWorkHistoryPartitions(cvData);

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
              <View style={cvPdfStyles.summaryDivider} />
              <Text style={[cvPdfStyles.sectionTitle, cvPdfStyles.workHistoryTitle]}>Work History</Text>
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
              <WorkEntry key={buildWorkEntryKey(entry)} entry={entry} />
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
