import { SectionShell } from "../components/ui";
import { cn } from "../lib/cn";
import { useLocale } from "../lib/locale";

export function CapabilityStrip() {
  const { t } = useLocale();
  const facts = [
    { title: t.strip.video, detail: t.strip.videoDetail },
    { title: t.strip.live, detail: t.strip.liveDetail },
    { title: t.strip.certificates, detail: t.strip.certificatesDetail },
    { title: t.strip.languages, detail: t.strip.languagesDetail },
  ];

  return (
    <SectionShell id="capabilities" ariaLabelledby="capabilities-title" className="border-y border-line">
      <h2 id="capabilities-title" className="sr-only">{t.strip.label}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4">
        {facts.map((fact, index) => (
          <li
            key={fact.title}
            className={cn(
              "min-w-0 py-4 pe-4 md:py-0",
              index % 2 === 1 ? "border-s border-line ps-4" : undefined,
              index >= 2 ? "border-t border-line md:border-t-0" : undefined,
              index > 0 ? "md:border-s md:border-line md:ps-5" : undefined,
            )}
          >
            <p className="text-body font-semibold text-fg">{fact.title}</p>
            <p className="mt-2 max-w-prose text-label text-muted">{fact.detail}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
