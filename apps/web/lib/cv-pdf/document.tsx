import { Document, Page, View } from "@react-pdf/renderer";

import "@/lib/cv-pdf/fonts";
import {
  buildPdfWorkEntryKey,
  buildWorkHistoryLayout,
} from "@/lib/cv-pdf/work-history";
import { BulletList } from "@/lib/cv-pdf/sections/bullet-list";
import {
  LeftColumnLowerBand,
  LeftColumnSummaryBand,
} from "@/lib/cv-pdf/sections/left-column";
import { SummarySection } from "@/lib/cv-pdf/sections/summary-section";
import { WorkEntry } from "@/lib/cv-pdf/sections/work-entry";
import { WorkHistorySection } from "@/lib/cv-pdf/sections/work-history-section";
import { cvPdfStyles } from "@/lib/cv-pdf/styles";
import { cvData } from "@portfolio/cv";

export function CvPdfDocument() {
  const {
    firstPageEntries,
    firstOverflowAchievements,
    remainingEntries,
    summaryBullets,
  } = buildWorkHistoryLayout(cvData);

  return (
    <Document
      author={cvData.name}
      creator="Next.js Portfolio"
      producer="Next.js Portfolio"
      subject={`${cvData.name} CV`}
      title={`${cvData.name} CV`}
    >
      <Page size="LETTER" style={cvPdfStyles.page}>
        <View style={[cvPdfStyles.row, cvPdfStyles.summaryBandRow]}>
          <LeftColumnSummaryBand cvData={cvData} />
          <View style={cvPdfStyles.rightColumn}>
            <SummarySection summary={cvData.summary} highlights={summaryBullets} />
          </View>
        </View>
        <View style={[cvPdfStyles.row, cvPdfStyles.lowerBandRow]}>
          <LeftColumnLowerBand cvData={cvData} />
          <View style={cvPdfStyles.rightColumn}>
            <WorkHistorySection entries={firstPageEntries} />
          </View>
        </View>
      </Page>

      <Page size="LETTER" style={cvPdfStyles.page}>
        <View style={cvPdfStyles.row}>
          <View style={cvPdfStyles.leftColumn} />
          <View style={cvPdfStyles.rightColumn}>
            <BulletList items={firstOverflowAchievements} />
            {remainingEntries.map((entry, index) => (
              <WorkEntry
                key={buildPdfWorkEntryKey(entry)}
                entry={entry}
                stackPosition={
                  index === 0 && firstOverflowAchievements.length === 0 ? "first" : "continued"
                }
              />
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
