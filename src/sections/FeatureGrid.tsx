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
    <SectionShell id="features" title={t.features.title} className="border-t border-line">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, body, icon: Icon }) => (
          <Card key={title} className="h-full p-5">
            <Icon className="h-5 w-5 text-muted" aria-hidden="true" />
            <h3 className="mt-5 text-card text-fg">{title}</h3>
            <p className="mt-2 max-w-prose text-body-sm text-muted">{body}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
