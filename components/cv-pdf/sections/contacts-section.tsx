import { Link, Text, View } from "@react-pdf/renderer";

import { cvPdfStyles } from "@/components/cv-pdf/styles";
import type { ContactLink } from "@/lib/cv-data";

type ContactsSectionProps = {
  phone: string;
  email: string;
  location: string;
  contactLinks: readonly ContactLink[];
};

export function ContactsSection({
  phone,
  email,
  location,
  contactLinks,
}: ContactsSectionProps) {
  const secondaryLinks = contactLinks.filter((contact) => contact.href !== `mailto:${email}`);

  return (
    <View style={cvPdfStyles.sectionBlock}>
      <Text style={cvPdfStyles.sectionTitle}>Contacts</Text>
      <Text style={cvPdfStyles.contactLine}>Phone: {phone}</Text>
      <Link src={`mailto:${email}`} style={[cvPdfStyles.contactLine, cvPdfStyles.link]}>
        Email: {email}
      </Link>
      <Text style={cvPdfStyles.contactLine}>Location: {location}</Text>
      {secondaryLinks.map((contact) => (
        <Link
          key={`${contact.label}-${contact.href}`}
          src={contact.href}
          style={[cvPdfStyles.externalLink, cvPdfStyles.contactSectionLink]}
        >
          {contact.label}
        </Link>
      ))}
    </View>
  );
}
