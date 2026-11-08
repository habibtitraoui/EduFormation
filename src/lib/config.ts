/**
 * The only place that reads `import.meta.env` (§4).
 *
 * `vite.config.ts` refuses a production build without these values; this module
 * repeats the check so a bundle built the wrong way fails loudly in the console
 * instead of rendering links to a development server.
 */

const DEV_APP_URL = "http://localhost:3000";

function normalizeUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
}

function normalizeText(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

const configuredAppUrl = normalizeUrl(import.meta.env.VITE_APP_URL);

if (configuredAppUrl === null && import.meta.env.PROD) {
  throw new Error(
    "[eduformation-landing] VITE_APP_URL is missing from this production bundle. " +
      "Set it to the origin of the EduFormation application (no trailing slash) and build again.",
  );
}

export const appUrl: string = configuredAppUrl ?? DEV_APP_URL;

/** The three cross-origin targets this page is allowed to link to (§2). */
export const appRoutes = {
  login: `${appUrl}/login`,
  categories: `${appUrl}/categories`,
  liveEvents: `${appUrl}/live-events`,
} as const;

const configuredEmail = normalizeText(import.meta.env.VITE_CONTACT_EMAIL);
// The example file is a template, not an owner-supplied contact address.
const contactEmail = configuredEmail?.toLowerCase() === "contact@example.com" ? null : configuredEmail;
const contactEndpoint = normalizeUrl(import.meta.env.VITE_CONTACT_ENDPOINT);

/**
 * [OWNER] inputs. When neither is supplied the page ships without the contact
 * column and without the demo call to action — that is the intended behaviour,
 * not a broken build.
 */
export const contact = {
  email: contactEmail,
  endpoint: contactEndpoint,
  /** A form is only rendered when there is somewhere to POST it. */
  hasForm: contactEndpoint !== null,
  /** With an address but no endpoint, the demo action is a mailto: link. */
  hasMailto: contactEndpoint === null && contactEmail !== null,
  canRequestDemo: contactEndpoint !== null || contactEmail !== null,
} as const;

export function demoMailto(subject: string, body: string): string {
  const address = contact.email ?? "";
  const query = new URLSearchParams({ subject, body }).toString();
  return `mailto:${address}?${query}`;
}
