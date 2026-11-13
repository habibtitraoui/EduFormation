import { CourseFigure } from "../components/figures/CourseFigure";
import { ButtonLink, SectionShell } from "../components/ui";
import { contact } from "../lib/config";
import { useLocale } from "../lib/locale";

export function Hero() {
  const { t } = useLocale();

  return (
    <SectionShell id="hero" ariaLabelledby="hero-title" className="hero-backdrop">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
        <div className="max-w-[560px]">
          <p className="flex items-center gap-3 text-label text-muted">
            <span className="w-6 border-t border-accent" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-5 text-display-sm sm:text-display lg:text-display-lg">
            <span className="block">{t.hero.title}</span>
            <span className="block text-accent">{t.hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-prose text-body text-muted">{t.hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <ButtonLink href="#contact-form" size="lg">{t.hero.ctaPrimary}</ButtonLink>
            <ButtonLink href={`mailto:${contact.email}`} variant="secondary" size="lg">
              {t.hero.ctaSecondary}
            </ButtonLink>
          </div>
          <p className="mt-4 max-w-prose text-label text-muted">{t.hero.meta}</p>
        </div>
        <CourseFigure />
      </div>
    </SectionShell>
  );
}
