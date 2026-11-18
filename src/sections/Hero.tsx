import { Award, BookOpen, CalendarDays, CirclePlay } from "lucide-react";

import { ButtonLink, Eyebrow, SectionShell } from "../components/ui";
import { LOCALES } from "../content/types";
import { formatNumber } from "../lib/format";
import { useLocale } from "../lib/locale";

export function Hero() {
  const { t, locale } = useLocale();
  const { hero } = t;
  const facts = [
    { value: formatNumber(LOCALES.length, locale), label: hero.facts.languages },
    { value: "A4", label: hero.facts.certificate },
    { value: hero.facts.sessionsValue, label: hero.facts.sessions },
  ];

  return (
    <SectionShell id="hero" ariaLabelledby="hero-title" className="hero-shell">
      <div className="relative text-center">
        <span className="hero-float hero-float-start" aria-hidden="true"><BookOpen className="size-7" /></span>
        <span className="hero-float hero-float-end" aria-hidden="true"><Award className="size-7" /></span>
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 id="hero-title" className="display-type hero-title mx-auto mt-5 max-w-[70rem] sm:mt-6">
          {hero.title}{" "}
          <span className="hero-accent">
            {hero.highlight}
            <svg viewBox="0 0 440 18" preserveAspectRatio="none" fill="none" className="hero-underline" aria-hidden="true">
              <path d="M3 11C100 22 220 -1 437 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="hero-lead">{hero.body}</p>
        <ul className="hero-facts" role="list">
          {facts.map(({ value, label }) => (
            <li key={label}>
              <p className="display-type hero-fact-value"><bdi>{value}</bdi></p>
              <p className="hero-fact-label">{label}</p>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <ButtonLink href="#contact-form" size="lg">
            <CalendarDays className="size-4 shrink-0" aria-hidden="true" />{hero.ctaPrimary}
          </ButtonLink>
          <ButtonLink href="#features" variant="secondary" size="lg">
            <CirclePlay className="size-4 shrink-0" aria-hidden="true" />{hero.ctaExplore}
          </ButtonLink>
        </div>
      </div>
    </SectionShell>
  );
}
