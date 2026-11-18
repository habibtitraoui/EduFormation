import { Mail } from "lucide-react";

import { ContactForm } from "../components/ContactForm";
import { SectionShell } from "../components/ui";
import { Wordmark } from "../components/Wordmark";
import { contact } from "../lib/config";
import { useLocale } from "../lib/locale";

export function FinalCta() {
  const { t } = useLocale();

  return (
    <SectionShell id="contact" eyebrow={t.footer.contact} title={t.finalCta.title} description={t.finalCta.body}>
      <div id="contact-form" tabIndex={-1} className="contact-layout mx-auto grid max-w-6xl scroll-mt-23 gap-5 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="contact-panel flex min-w-0 flex-col items-start justify-center rounded-overlay border border-line p-6 sm:p-10">
          <Wordmark />
          <p className="mt-6 max-w-[25ch] text-[clamp(1.25rem,2.3vw,1.85rem)] leading-snug font-semibold text-fg">{t.hero.meta}</p>
          <a href={`mailto:${contact.email}`} className="mt-7 inline-flex max-w-full items-center gap-2 rounded-control border border-accent/28 bg-panel px-3.5 py-2.5 text-body-sm font-medium text-accent hover:underline">
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <bdi className="wrap-anywhere">{contact.email}</bdi>
          </a>
        </div>
        <ContactForm />
      </div>
    </SectionShell>
  );
}
