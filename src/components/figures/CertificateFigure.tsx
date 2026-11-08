import { useLocale } from "../../lib/locale";
import { Wordmark } from "../Wordmark";
import { Badge, Figure } from "../ui";

/** A document made with paper tokens, so it remains light in both themes. */
export function CertificateFigure() {
  const { t } = useLocale();
  const certificate = t.certificates;

  return (
    <Figure caption={certificate.sampleCaption}>
      <div aria-hidden="true" className="bg-inset p-3 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-label text-muted">{certificate.specFormatsLabel}</span>
          <Badge tone="neutral">{certificate.sampleBadge}</Badge>
        </div>
        <div className="relative aspect-[1000/707] w-full overflow-hidden border border-paper-line bg-paper text-paper-fg shadow-card">
          <div className="absolute inset-6 flex flex-col items-center justify-between border border-paper-line p-2 text-center sm:p-3">
            <Wordmark tone="paper" />
            <div className="min-w-0">
              <p className="font-serif text-[15px] leading-5 font-semibold sm:text-block">
                {certificate.sampleTitle}
              </p>
              <p className="mt-1 text-meta text-paper-muted sm:mt-2 sm:text-label">{certificate.sampleRecipient}</p>
              <p className="mt-1 text-meta text-paper-fg sm:mt-2 sm:text-body-sm">{certificate.sampleCourse}</p>
            </div>
            <div className="flex w-full items-end justify-between gap-2 text-start">
              <div className="min-w-0">
                <p className="text-meta text-paper-muted">{certificate.sampleCodeLabel}</p>
                <p dir="ltr" className="numeric truncate font-mono text-meta text-paper-fg">
                  {certificate.sampleCode}
                </p>
              </div>
              <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0 text-paper-muted sm:h-10 sm:w-10" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" />
                <circle cx="20" cy="20" r="14" stroke="currentColor" strokeDasharray="2 2" />
                <path d="M14 20h12M20 14v12" stroke="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Figure>
  );
}
