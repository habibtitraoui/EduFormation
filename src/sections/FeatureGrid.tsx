import { Award, ChartNoAxesCombined, Clock3, KeyRound, NotebookPen, Video } from "lucide-react";

import { Card, SectionShell } from "../components/ui";
import { useLocale } from "../lib/locale";

export function FeatureGrid() {
  const { t } = useLocale();
  const features = [
    { ...t.features.progress, icon: Clock3 },
    { ...t.features.notes, icon: NotebookPen },
    { ...t.features.access, icon: KeyRound },
    { ...t.features.analytics, icon: ChartNoAxesCombined },
    { ...t.features.certificate, icon: Award },
    { ...t.features.live, icon: Video },
  ];

  return (
    <SectionShell id="features" eyebrow={t.nav.product} title={t.features.title} className="bg-inset/55">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {features.map(({ title, body, icon: Icon }) => (
          <Card key={title} className="p-6 lg:min-h-48 lg:p-7">
            <span className="icon-tile"><Icon className="size-5" aria-hidden="true" /></span>
            <h3 className="display-type mt-5 text-block">{title}</h3>
            <p className="mt-2 max-w-[36ch] text-body text-muted">{body}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
