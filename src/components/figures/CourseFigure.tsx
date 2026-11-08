import { Award, FileText } from "lucide-react";

import { cn } from "../../lib/cn";
import { formatDuration } from "../../lib/format";
import { useLocale } from "../../lib/locale";
import { Badge, Figure, ProgressBar } from "../ui";

/** Three neutral window dots, drawn rather than `rounded-full` divs (§13.3). */
function WindowDots() {
  return (
    <svg viewBox="0 0 44 8" className="h-2 w-11 shrink-0" aria-hidden="true">
      <circle cx="4" cy="4" r="3.5" className="fill-line-strong" />
      <circle cx="22" cy="4" r="3.5" className="fill-line-strong" />
      <circle cx="40" cy="4" r="3.5" className="fill-line-strong" />
    </svg>
  );
}

/**
 * The hero figure (§7.1): a course page drawn in JSX from the product's own
 * tokens. It is chrome, not a claim — the caption says so, and the whole mock is
 * hidden from assistive technology so nobody is read a list of invented lessons.
 */
export function CourseFigure() {
  const { t, locale } = useLocale();
  const hero = t.hero;

  return (
    <Figure caption={hero.figureCaption}>
      <div aria-hidden="true">
        <div className="flex h-10 items-center gap-3 border-b border-line bg-inset px-4">
          <WindowDots />
          <span dir="ltr" className="truncate font-mono text-meta text-muted">{hero.figurePath}</span>
        </div>

        <div className="flex">
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 border-b border-line px-4 py-4">
              <span className="truncate text-card text-fg">{hero.figureCourse}</span>
              <ProgressBar value={hero.figureProgress} label={hero.figureProgressLabel} />
            </div>

            <ul>
              {hero.figureLessons.map((lesson, index) => {
                const minutes = hero.figureDurations[index] ?? 0;
                const isDone = index === 0;
                const isRunning = index === 1;

                return (
                  <li
                    key={lesson}
                    className={cn(
                      "flex flex-col gap-2 px-4 py-3",
                      index < hero.figureLessons.length - 1 ? "border-b border-line" : undefined,
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="min-w-0 flex-1 text-body-sm text-fg">{lesson}</span>
                      <span dir="ltr" className="numeric shrink-0 pt-1 font-mono text-meta text-muted">
                        {formatDuration(minutes, locale, t.unit.minutes)}
                      </span>
                      {isDone ? <Badge tone="success">{hero.figureStatusDone}</Badge> : null}
                      {isRunning ? <Badge tone="warning">{hero.figureStatusProgress}</Badge> : null}
                    </div>
                    {isRunning ? (
                      <ProgressBar value={45} label={hero.figureProgressLabel} className="max-w-40" />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden w-44 shrink-0 flex-col gap-4 border-s border-line px-4 py-4 sm:flex">
            <div className="flex flex-col gap-2">
              <span className="text-meta text-muted">{hero.figureStatusLabel}</span>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-control border border-success/30 bg-success-soft px-2 py-1 text-label text-success">
                <Award className="h-4 w-4" aria-hidden="true" />
                {hero.figureCertificate}
              </span>
            </div>

            <div className="flex flex-col gap-2 border-t border-line pt-4">
              <span className="text-meta text-muted">{hero.figureResources}</span>
              {hero.figureResourceItems.map((resource) => (
                <span key={resource} className="inline-flex items-center gap-1.5 text-label text-fg">
                  <FileText className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  <span className="min-w-0 break-words">{resource}</span>
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </Figure>
  );
}
