import { Text, View } from "@react-pdf/renderer";

import { BulletList } from "@/components/cv-pdf/sections/bullet-list";
import { cvPdfStyles } from "@/components/cv-pdf/styles";
import type { ExperienceEntry } from "@/lib/cv-data";

type WorkEntryProps = {
  entry: ExperienceEntry;
  showAchievements?: boolean;
  /** First job in a column/section — no 6pt top band (Word `spacing_before` on later Heading2). */
  stackPosition?: "first" | "continued";
};

export function WorkEntry({
  entry,
  showAchievements = true,
  stackPosition = "first",
}: WorkEntryProps) {
  const entryContainerStyle =
    stackPosition === "continued"
      ? [cvPdfStyles.entry, cvPdfStyles.workEntryContinued]
      : cvPdfStyles.entry;

  return (
    <View style={entryContainerStyle}>
      <Text style={cvPdfStyles.rightTitle}>
        <Text style={cvPdfStyles.rightTitleCompany}>{entry.company}</Text>
        <Text style={cvPdfStyles.rightTitleSlash}> / </Text>
        <Text style={cvPdfStyles.rightTitleRole}>{entry.role}</Text>
      </Text>
      <Text style={cvPdfStyles.rightMeta}>
        {entry.location} {"  •  "}
        {entry.period}
      </Text>
      <Text style={cvPdfStyles.workEntryLead}>{entry.summary}</Text>
      {showAchievements && entry.achievements.length > 0 ? (
        <View>
          <Text style={cvPdfStyles.achievementsTitle}>Key achievements:</Text>
          <BulletList items={entry.achievements} />
        </View>
      ) : null}
    </View>
  );
}
