export const CONTACT_EMAIL = "arthur@nexxogenn.com";

/** Opens Gmail compose in the browser (works even without a desktop mail app). */
export function getGmailComposeUrl(
  to = CONTACT_EMAIL,
  subject = "Trvrse inquiry"
): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
