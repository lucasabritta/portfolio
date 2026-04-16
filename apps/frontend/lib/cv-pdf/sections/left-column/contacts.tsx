import { Link, Text, View } from "@react-pdf/renderer";

import { cvPdfStyles } from "@cv-pdf/styles";
import { wrapLongUrl } from "@cv-pdf/sections/text-format";

type LeftColumnContactsProps = {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
};

export function LeftColumnContacts({
  phone,
  email,
  location,
  linkedin,
}: LeftColumnContactsProps) {
  return (
    <View style={cvPdfStyles.sidebarTextColumn}>
      <Text style={cvPdfStyles.leftContactPhone}>{phone}</Text>
      <Link src={linkedin} style={[cvPdfStyles.leftLinkedInLink, cvPdfStyles.externalLink]} wrap>
        {wrapLongUrl(linkedin)}
      </Link>
      <Link src={`mailto:${email}`} style={[cvPdfStyles.leftContactLine, cvPdfStyles.link]}>
        {email}
      </Link>
      <Text style={cvPdfStyles.leftContactLine}>{location}</Text>
    </View>
  );
}
