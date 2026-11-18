import { KeyRound, LayoutTemplate, UserRound } from "lucide-react";

import { FeatureSpotlight } from "../components/FeatureSpotlight";
import { AdminControls } from "../components/figures/AdminControls";
import { useLocale } from "../lib/locale";

export function Administration() {
  const { t } = useLocale();
  const { admin } = t;
  const items = [
    { title: admin.mockAccessLabel, body: admin.access, icon: KeyRound },
    { title: admin.mockStatusLabel, body: admin.suspend, icon: UserRound },
    { title: admin.mockTemplateLabel, body: admin.templates, icon: LayoutTemplate },
  ];

  return (
    <FeatureSpotlight id="admin" eyebrow={t.nav.admin} title={admin.title} description={admin.body} figure={<AdminControls />} reverse>
      <ul className="mt-6 grid gap-4" role="list">
        {items.map(({ title, body, icon: Icon }) => (
          <li key={title} className="flex items-start gap-3">
            <span className="icon-tile icon-tile-soft"><Icon className="size-5" aria-hidden="true" /></span>
            <div>
              <h3 className="text-card text-fg">{title}</h3>
              <p className="mt-1 max-w-prose text-body-sm text-muted">{body}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-prose border-s-2 border-accent/35 ps-4 text-body-sm text-muted">{admin.note}</p>
    </FeatureSpotlight>
  );
}
