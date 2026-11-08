import { DemoRequestForm } from "../components/DemoRequestForm";
import { ButtonLink, SectionShell } from "../components/ui";
import { cn } from "../lib/cn";
import { appRoutes, contact } from "../lib/config";
import { useLocale } from "../lib/locale";
import { demoTarget } from "../lib/navigation";

export function FinalCta() {
  const { t } = useLocale();
  const demo = demoTarget(t);

  return (
    <SectionShell id="get-started" ariaLabelledby="get-started-title">
      <div className="rounded-overlay border border-line bg-panel p-8 shadow-card md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="get-started-title" className="text-title text-fg">{t.finalCta.title}</h2>
            <p className="mt-3 max-w-prose text-body text-muted">{t.finalCta.body}</p>
          </div>
          <div className={cn("flex flex-wrap gap-2 lg:shrink-0", demo !== null && "max-[479px]:flex-col max-[479px]:items-start")}>
            <ButtonLink href={appRoutes.login} size="lg">{t.finalCta.primary}</ButtonLink>
            {demo !== null ? (
              <ButtonLink href={demo} variant="secondary" size="lg" className={contact.hasForm ? "js-only" : undefined}>{t.finalCta.secondary}</ButtonLink>
            ) : null}
          </div>
        </div>
        {contact.hasForm ? <div className="mt-8"><DemoRequestForm /></div> : null}
      </div>
    </SectionShell>
  );
}
