export function buildPhoneHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
