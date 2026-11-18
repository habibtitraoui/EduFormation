import type { Copy } from "../content/types";

export type NavItem = {
  label: string;
  href: string;
};

/** Main destinations shared by the desktop and mobile navigation. */
export function sectionNav(t: Copy): NavItem[] {
  return [
    { label: t.nav.overview, href: "#capabilities" },
    { label: t.nav.product, href: "#features" },
    { label: t.how.title, href: "#how" },
    { label: t.nav.faq, href: "#faq" },
  ];
}
