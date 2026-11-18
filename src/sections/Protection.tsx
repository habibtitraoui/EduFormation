import { Cloud, Database, Globe, Info, ShieldCheck } from "lucide-react";

import { Card, SectionShell } from "../components/ui";
import { useLocale } from "../lib/locale";

export function Protection() {
  const { t } = useLocale();
  const { protection } = t;
  const deterred = [
    protection.deterredHotkeys,
    protection.deterredPause,
    protection.deterredMark,
    protection.deterredUrls,
    protection.deterredBucket,
  ];
  const limits = [
    protection.limitsRecorder,
    protection.limitsCamera,
    protection.limitsFile,
    protection.limitsShare,
  ];
  const hosting = [
    { label: protection.hostingDb, icon: Database },
    { label: protection.hostingStorage, icon: Cloud },
    { label: protection.hostingDomain, icon: Globe },
  ];

  return (
    <SectionShell id="protection" eyebrow={t.footer.security} title={protection.deterredTitle} description={protection.deterredBody} className="border-y border-line bg-inset/55">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <Card className="p-6 sm:p-8">
          <span className="icon-tile"><ShieldCheck className="size-5" aria-hidden="true" /></span>
          <h3 className="display-type mt-4 text-block">{protection.controlsTitle}</h3>
          <ul className="mt-4 list-disc space-y-2 ps-5 text-body text-muted marker:text-accent">
            {deterred.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Card>
        <Card className="p-6 sm:p-8">
          <span className="icon-tile icon-tile-soft"><Info className="size-5" aria-hidden="true" /></span>
          <h3 className="display-type mt-4 text-block">{protection.limitsTitle}</h3>
          <p className="mt-2 max-w-prose text-body text-muted">{protection.limitsBody}</p>
          <ul className="mt-4 list-disc space-y-2 ps-5 text-body text-muted marker:text-accent">
            {limits.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="mt-5 rounded-control bg-accent-soft px-4 py-3 text-body-sm text-fg">{protection.drm}</p>
        </Card>
      </div>
      <div className="mt-6 rounded-card border border-line bg-panel p-6 sm:p-8">
        <h3 className="display-type text-block">{protection.hostingTitle}</h3>
        <p className="mt-2 text-body text-muted">{protection.hostingNote}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3" role="list">
          {hosting.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-2.5 rounded-control bg-inset px-4 py-3 text-body-sm text-fg">
              <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" />{label}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
