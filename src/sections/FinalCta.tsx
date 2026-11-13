import { ContactForm } from "../components/ContactForm";
import { ButtonLink, SectionShell } from "../components/ui";
import { contact } from "../lib/config";
import { useLocale } from "../lib/locale";

export function FinalCta() {
  const { t } = useLocale();

  return (
    <SectionShell id="contact" ariaLabelledby="contact-title">
      <div className="rounded-overlay border border-line bg-panel p-8 shadow-card md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="contact-title" className="text-title text-fg">{t.finalCta.title}</h2>
            <p className="mt-3 max-w-prose text-body text-muted">{t.finalCta.body}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:shrink-0">
            <ButtonLink href="#contact-form" size="lg">{t.finalCta.primary}</ButtonLink>
            <ButtonLink href={`mailto:${contact.email}`} variant="secondary" size="lg">{contact.email}</ButtonLink>
          </div>
        </div>
        <div className="mt-8"><ContactForm /></div>
      </div>
    </SectionShell>
  );
}
