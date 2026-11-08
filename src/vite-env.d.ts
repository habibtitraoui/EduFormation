/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the EduFormation application, no trailing slash. */
  readonly VITE_APP_URL?: string;
  /** Canonical origin of this site, used for canonical / og:url. */
  readonly VITE_SITE_URL?: string;
  /** [OWNER] contact channel for the demo call to action. */
  readonly VITE_CONTACT_EMAIL?: string;
  /** [OWNER] optional form endpoint (POST, JSON). Empty disables the form. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
