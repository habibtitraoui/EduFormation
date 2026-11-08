import type { Locale } from "./content/types";

import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { LocaleProvider, useLocale } from "./lib/locale";
import { ThemeProvider } from "./lib/theme";
import { Administration } from "./sections/Administration";
import { CapabilityStrip } from "./sections/CapabilityStrip";
import { Certificates } from "./sections/Certificates";
import { Faq } from "./sections/Faq";
import { FeatureGrid } from "./sections/FeatureGrid";
import { FinalCta } from "./sections/FinalCta";
import { Hero } from "./sections/Hero";
import { HowItWorks } from "./sections/HowItWorks";
import { LiveSessions } from "./sections/LiveSessions";
import { Protection } from "./sections/Protection";
import { Structure } from "./sections/Structure";

function Page() {
  const { t } = useLocale();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-5 focus:z-50 focus:rounded-control focus:bg-ink focus:px-4 focus:py-2 focus:text-ink-fg">
        {t.nav.skipToContent}
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <CapabilityStrip />
        <Structure />
        <FeatureGrid />
        <Certificates />
        <LiveSessions />
        <Administration />
        <Protection />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

export default function App({ initialLocale }: { initialLocale?: Locale }) {
  return (
    <ThemeProvider>
      <LocaleProvider initialLocale={initialLocale}><Page /></LocaleProvider>
    </ThemeProvider>
  );
}
