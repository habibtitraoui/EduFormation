import type { Copy } from "../content/types";

import { contact, demoMailto } from "./config";

export type NavItem = {
  label: string;
  href: string;
};

/** In-page anchors, shared by the header, the mobile menu and the footer. */
export function sectionNav(t: Copy): NavItem[] {
  return [
    { label: t.nav.product, href: "#features" },
    { label: t.nav.structure, href: "#structure" },
    { label: t.nav.certificates, href: "#certificates" },
    { label: t.nav.live, href: "#live" },
    { label: t.nav.admin, href: "#admin" },
    { label: t.nav.faq, href: "#faq" },
  ];
}

/**
 * Where "Request a demo" goes (§8): the form when an endpoint is configured, a
 * mailto: when only an address is, and nothing at all when the owner supplied
 * neither — the button is then not rendered rather than rendered dead.
 */
export function demoTarget(t: Copy): string | null {
  if (contact.hasForm) return "#demo";
  if (contact.email !== null) return demoMailto(t.contact.mailtoSubject, t.contact.mailtoBody);
  return null;
}
