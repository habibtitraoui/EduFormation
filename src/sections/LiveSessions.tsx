import { ArrowRight, Check } from "lucide-react";

import { FeatureSpotlight } from "../components/FeatureSpotlight";
import { SessionFigure } from "../components/figures/SessionFigure";
import { useLocale } from "../lib/locale";

export function LiveSessions() {
  const { t } = useLocale();
  const { live } = t;

  return (
    <FeatureSpotlight id="live" eyebrow={t.nav.live} title={live.title} description={live.body} figure={<SessionFigure />}>
      <p className="mt-3 max-w-prose text-body text-muted">{live.roomNote}</p>
      <ul className="mt-6 grid gap-2" role="list">
        {[live.chat, live.hands, live.replay].map((item) => (
          <li key={item} className="flex items-center gap-3 rounded-control border border-line bg-panel px-4 py-3 text-body-sm text-fg">
            <Check className="size-4 shrink-0 text-accent" aria-hidden="true" />{item}
          </li>
        ))}
      </ul>
      <a href="#contact-form" className="mt-6 inline-flex items-center gap-2 rounded-control text-body-sm font-semibold text-accent hover:underline">
        {live.openCta}<ArrowRight className="size-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
      </a>
    </FeatureSpotlight>
  );
}
