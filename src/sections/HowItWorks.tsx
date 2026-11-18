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
    <SectionShell id="how" title={t.how.title} eyebrow={t.how.eyebrow}>
      <div className="spotlight-grid">
        <ol className="step-list" role="list">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true" className="step-number font-semibold">{formatNumber(index + 1, locale)}</span>
              <div className="pt-1 sm:pt-2">
                <h3 className="display-type text-block sm:text-title">{step.title}</h3>
                <p className="mt-2 max-w-prose text-body text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="showcase-frame workflow-art" aria-hidden="true">
          <img src="/illustrations/workflow.svg" alt="" width={440} height={282} loading="lazy" decoding="async" />
        </div>
      </div>
    </SectionShell>
  );
}
