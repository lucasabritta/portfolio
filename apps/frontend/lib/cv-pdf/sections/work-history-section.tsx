import { Text, View } from "@react-pdf/renderer";

import { WorkEntry } from "@cv-pdf/sections/work-entry";
import { cvPdfStyles } from "@cv-pdf/styles";
import { buildPdfWorkEntryKey } from "@cv-pdf/work-history";
import type { ResumeExperienceEntry } from "@portfolio/resume-content";

type FirstPageEntry = {
  entry: ResumeExperienceEntry;
  showAchievements: boolean;
};

type WorkHistorySectionProps = {
  entries: readonly FirstPageEntry[];
};

export function WorkHistorySection({ entries }: WorkHistorySectionProps) {
  return (
    <View style={cvPdfStyles.workSection}>
      <View style={cvPdfStyles.summaryDivider} />
      <Text style={[cvPdfStyles.sectionTitle, cvPdfStyles.workHistoryTitle]}>Work History</Text>
      {entries.map(({ entry, showAchievements }, index) => (
        <WorkEntry
          key={buildPdfWorkEntryKey(entry)}
          entry={entry}
          showAchievements={showAchievements}
          stackPosition={index === 0 ? "first" : "continued"}
        />
      ))}
      {entries.length > 0 && !entries[entries.length - 1].showAchievements ? (
        <Text style={cvPdfStyles.achievementsTitle}>Key achievements:</Text>
      ) : null}
    </View>
  );
}
