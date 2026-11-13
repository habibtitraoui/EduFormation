/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical origin of this site, used for canonical / og:url. */
  readonly VITE_SITE_URL?: string;
  /** Contact email destination. Defaults to the owner's published address. */
  readonly VITE_CONTACT_EMAIL?: string;
  /** Optional form endpoint accepting a JSON POST with name, email, and message. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
