import { SectionShell } from "../components/ui";
import { formatNumber } from "../lib/format";
import { useLocale } from "../lib/locale";

export function HowItWorks() {
  const { t, locale } = useLocale();
  const steps = [
    { title: t.how.step1Title, body: t.how.step1Body },
    { title: t.how.step2Title, body: t.how.step2Body },
    { title: t.how.step3Title, body: t.how.step3Body },
  ];

  return (
    <SectionShell id="how" title={t.how.title}>
      <ol className="grid gap-6 sm:grid-cols-3 sm:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t border-line pt-5">
            <span aria-hidden="true" className="numeric font-mono text-label text-muted">
              {formatNumber(index + 1, locale).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-card text-fg">{step.title}</h3>
            <p className="mt-2 max-w-prose text-body-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
