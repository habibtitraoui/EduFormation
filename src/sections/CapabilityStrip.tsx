import { Award, CloudUpload, Languages, Video } from "lucide-react";

import { CourseFigure } from "../components/figures/CourseFigure";
import { SectionShell } from "../components/ui";
import { useLocale } from "../lib/locale";

export function CapabilityStrip() {
  const { t } = useLocale();
  const facts = [
    { title: t.strip.video, detail: t.strip.videoDetail, icon: CloudUpload },
    { title: t.strip.live, detail: t.strip.liveDetail, icon: Video },
    { title: t.strip.certificates, detail: t.strip.certificatesDetail, icon: Award },
    { title: t.strip.languages, detail: t.strip.languagesDetail, icon: Languages },
  ];

  return (
    <SectionShell id="capabilities" eyebrow={t.strip.label} title={t.strip.title} className="pt-0">
      <div className="showcase-frame spotlight-grid">
        <ul className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1" role="list">
          {facts.map(({ title, detail, icon: Icon }) => (
            <li key={title} className="flex items-center gap-3 rounded-card border border-line bg-panel p-3.5 shadow-card sm:gap-4 sm:p-4">
              <span className="icon-tile"><Icon className="size-5" aria-hidden="true" /></span>
              <div className="min-w-0">
                <h3 className="text-card text-fg">{title}</h3>
                <p className="mt-1 text-body-sm text-muted">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <CourseFigure />
      </div>
    </SectionShell>
  );
}
