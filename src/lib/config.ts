/** The only place that reads `import.meta.env`. */

function normalizeUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
}

function normalizeText(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

const configuredEmail = normalizeText(import.meta.env.VITE_CONTACT_EMAIL);
/** The site owner's address; hosts may override it at build time. */
const contactEmail = configuredEmail ?? "titraoui.habibe@gmail.com";
const contactEndpoint = normalizeUrl(import.meta.env.VITE_CONTACT_ENDPOINT);

export const contact = {
  email: contactEmail,
  endpoint: contactEndpoint,
} as const;

export function contactMailto(subject: string, body: string): string {
  const query = new URLSearchParams({ subject, body }).toString();
  return `mailto:${contact.email}?${query}`;
}
