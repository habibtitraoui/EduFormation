import { ArrowDown } from "lucide-react";

import { ContactForm } from "../components/ContactForm";
import { ButtonLink, SectionShell } from "../components/ui";
import { Wordmark } from "../components/Wordmark";
import { useLocale } from "../lib/locale";

export function FinalCta() {
  const { t } = useLocale();

  return (
    <SectionShell id="contact" eyebrow={t.footer.contact} title={t.finalCta.title} description={t.finalCta.body}>
      <div id="contact-form" tabIndex={-1} className="contact-layout mx-auto grid max-w-6xl scroll-mt-23 gap-5 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="contact-panel flex min-w-0 flex-col items-start justify-center rounded-overlay border border-line p-6 sm:p-10">
          <Wordmark />
          <p className="mt-6 max-w-[25ch] text-[clamp(1.25rem,2.3vw,1.85rem)] leading-snug font-semibold text-fg">{t.hero.meta}</p>
          <ButtonLink href="#footer-contact" variant="secondary" className="mt-7 max-w-full">
            {t.finalCta.otherContact}<ArrowDown className="size-4 shrink-0" aria-hidden="true" />
          </ButtonLink>
        </div>
        <ContactForm />
      </div>
    </SectionShell>
  );
}
