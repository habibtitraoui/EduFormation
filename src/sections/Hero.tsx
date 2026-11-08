import { CourseFigure } from "../components/figures/CourseFigure";
import { ButtonLink, SectionShell } from "../components/ui";
import { cn } from "../lib/cn";
import { appRoutes, contact } from "../lib/config";
import { useLocale } from "../lib/locale";
import { demoTarget } from "../lib/navigation";

export function Hero() {
  const { t } = useLocale();
  const demo = demoTarget(t);

  return (
    <SectionShell id="hero" ariaLabelledby="hero-title">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
        <div className="max-w-[560px]">
          <p className="flex items-center gap-3 text-label text-muted">
            <span className="w-6 border-t border-accent" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-5 text-display-sm sm:text-display lg:text-display-lg">
            <span className="block">{t.hero.title}</span>
            <span className="block text-muted">{t.hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-prose text-body text-muted">{t.hero.body}</p>
          <div className={cn("mt-8 flex flex-wrap gap-2", demo !== null && "max-[479px]:flex-col max-[479px]:items-start")}>
            <ButtonLink href={appRoutes.login} size="lg">{t.hero.ctaPrimary}</ButtonLink>
            {demo !== null ? (
              <ButtonLink href={demo} variant="secondary" size="lg" className={contact.hasForm ? "js-only" : undefined}>{t.hero.ctaSecondary}</ButtonLink>
            ) : null}
          </div>
          <p className="mt-4 max-w-prose text-label text-muted">{t.hero.meta}</p>
        </div>
        <CourseFigure />
      </div>
    </SectionShell>
  );
}
