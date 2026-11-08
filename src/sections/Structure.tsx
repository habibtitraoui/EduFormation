import { Card, SectionShell } from "../components/ui";
import { formatNumber } from "../lib/format";
import { useLocale } from "../lib/locale";

export function Structure() {
  const { t, locale } = useLocale();
  const steps = [
    { title: t.structure.pathTitle, body: t.structure.pathBody },
    { title: t.structure.courseTitle, body: t.structure.courseBody },
    { title: t.structure.lessonTitle, body: t.structure.lessonBody },
  ];

  return (
    <SectionShell id="structure" title={t.structure.title} description={t.structure.body}>
      <div className="relative">
        <div aria-hidden="true" className="absolute top-0 bottom-0 start-8 w-px bg-line sm:top-8 sm:end-0 sm:bottom-auto sm:start-0 sm:h-px sm:w-auto" />
        <ol className="relative grid gap-4 sm:grid-cols-3 sm:gap-5">
          {steps.map((step, index) => (
            <li key={step.title} className="min-w-0">
              <Card className="h-full p-5">
                <span className="numeric font-mono text-label text-muted" aria-hidden="true">
                  {formatNumber(index + 1, locale).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-card text-fg">{step.title}</h3>
                <p className="mt-2 max-w-prose text-body-sm text-muted">{step.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-6 max-w-prose text-body-sm text-muted">{t.structure.note}</p>
    </SectionShell>
  );
}
