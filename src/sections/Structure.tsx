import { Layers3, Route, SquarePlay } from "lucide-react";

import { Card, SectionShell } from "../components/ui";
import { formatNumber } from "../lib/format";
import { useLocale } from "../lib/locale";

export function Structure() {
  const { t, locale } = useLocale();
  const items = [
    { title: t.structure.pathTitle, body: t.structure.pathBody, icon: Route },
    { title: t.structure.courseTitle, body: t.structure.courseBody, icon: Layers3 },
    { title: t.structure.lessonTitle, body: t.structure.lessonBody, icon: SquarePlay },
  ];

  return (
    <SectionShell id="structure" eyebrow={t.nav.structure} title={t.structure.title} description={t.structure.body}>
      <ol className="grid gap-4 sm:grid-cols-3 sm:gap-5" role="list">
        {items.map(({ title, body, icon: Icon }, index) => (
          <li key={title} className="min-w-0">
            <Card className="h-full p-5 sm:p-6 lg:p-7">
              <div className="flex items-center justify-between gap-3" aria-hidden="true">
                <span className="icon-tile icon-tile-soft"><Icon className="size-5" /></span>
                <span className="numeric font-mono text-label text-accent">{formatNumber(index + 1, locale).padStart(2, "0")}</span>
              </div>
              <h3 className="display-type mt-5 text-block">{title}</h3>
              <p className="mt-2 text-body text-muted">{body}</p>
            </Card>
          </li>
        ))}
      </ol>
      <p className="mx-auto mt-6 max-w-3xl text-center text-body-sm text-muted">{t.structure.note}</p>
    </SectionShell>
  );
}
