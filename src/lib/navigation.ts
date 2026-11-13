import type { Copy } from "../content/types";

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
