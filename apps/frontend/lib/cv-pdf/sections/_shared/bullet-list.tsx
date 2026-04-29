import { Text, View } from "@react-pdf/renderer";

import { cvPdfStyles } from "@cv-pdf/styles";

type BulletListProps = {
  items: readonly string[];
};

export function BulletList({ items }: BulletListProps) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={`${index}-${item}`} style={cvPdfStyles.bulletRow}>
          <View style={cvPdfStyles.bulletDot} />
          <Text style={cvPdfStyles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}
