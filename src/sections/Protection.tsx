import { SectionShell } from "../components/ui";
import { useLocale } from "../lib/locale";

export function Protection() {
  const { t } = useLocale();
  const protection = t.protection;
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
  const hosting = [protection.hostingDb, protection.hostingStorage, protection.hostingDomain];

  return (
    <SectionShell id="protection" ariaLabelledby="protection-title" className="border-y border-line bg-inset">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="protection-title" className="text-title text-fg">{protection.deterredTitle}</h2>
          <p className="mt-4 max-w-prose text-body text-muted">{protection.deterredBody}</p>
          <ul className="mt-5 list-disc space-y-2 ps-5 text-body-sm text-muted">
            {deterred.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-block text-fg">{protection.limitsTitle}</h3>
          <p className="mt-4 max-w-prose text-body text-muted">{protection.limitsBody}</p>
          <ul className="mt-5 list-disc space-y-2 ps-5 text-body-sm text-muted">
            {limits.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="mt-6 max-w-prose border-s-2 border-line-strong ps-4 text-body-sm text-fg">{protection.drm}</p>
        </div>
      </div>
      <div className="mt-12 border-t border-line pt-6">
        <h3 className="text-card text-fg">{protection.hostingTitle}</h3>
        <p className="mt-2 max-w-prose text-body-sm text-muted">{protection.hostingNote}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-6">
          {hosting.map((item) => <li key={item} className="text-label text-fg">{item}</li>)}
        </ul>
      </div>
    </SectionShell>
  );
}
