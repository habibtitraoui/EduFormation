import { ArrowRight } from "lucide-react";

import { SessionFigure } from "../components/figures/SessionFigure";
import { SectionShell } from "../components/ui";
import { appRoutes } from "../lib/config";
import { useLocale } from "../lib/locale";

export function LiveSessions() {
  const { t } = useLocale();

  return (
    <SectionShell id="live" ariaLabelledby="live-title" className="border-t border-line">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="live-title" className="text-title text-fg">{t.live.title}</h2>
          <p className="mt-4 max-w-prose text-body text-muted">{t.live.body}</p>
          <p className="mt-3 max-w-prose text-body text-muted">{t.live.roomNote}</p>
          <ul className="mt-6 grid gap-2">
            {[t.live.chat, t.live.hands, t.live.replay].map((item) => (
              <li key={item} className="rounded-control border border-line bg-panel px-4 py-3 text-body-sm text-fg">
                {item}
              </li>
            ))}
          </ul>
          <a href={appRoutes.liveEvents} className="mt-6 inline-flex items-center gap-2 rounded-control text-body-sm font-medium text-accent hover:underline">
            {t.live.openCta}<ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </a>
        </div>
        <SessionFigure />
      </div>
    </SectionShell>
  );
}
