import { Text, View } from "@react-pdf/renderer";

import { BulletList } from "@/components/cv-pdf/sections/bullet-list";
import { cvPdfStyles } from "@/components/cv-pdf/styles";
import type { ExperienceEntry } from "@/lib/cv-data";

type WorkEntryProps = {
  entry: ExperienceEntry;
  showAchievements?: boolean;
};

export function WorkEntry({ entry, showAchievements = true }: WorkEntryProps) {
  return (
    <View style={cvPdfStyles.entry}>
      <Text style={cvPdfStyles.rightTitle}>
        {entry.company} / {entry.role}
      </Text>
      <Text style={cvPdfStyles.rightMeta}>
        {entry.location} • {entry.period}
      </Text>
      <Text style={cvPdfStyles.paragraph}>{entry.summary}</Text>
      {showAchievements && entry.achievements.length > 0 ? (
        <View>
          <Text style={cvPdfStyles.achievementsTitle}>Key achievements:</Text>
          <BulletList items={entry.achievements} />
        </View>
      ) : null}
    </View>
  );
}
