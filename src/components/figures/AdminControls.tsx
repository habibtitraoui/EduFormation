import { useLocale } from "../../lib/locale";
import { Badge, Figure } from "../ui";

/** Labelled, non-interactive examples rather than a fake working admin panel. */
export function AdminControls() {
  const { t } = useLocale();
  const admin = t.admin;

  return (
    <Figure caption={admin.figureCaption}>
      <div aria-hidden="true" className="divide-y divide-line">
        <div className="p-5">
          <p className="text-label text-muted">{admin.mockAccessLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {admin.mockAccessOptions.map((option, index) => (
              <Badge key={option} tone={index === admin.mockAccessChosen ? "accent" : "neutral"}>
                {option}
              </Badge>
            ))}
          </div>
        </div>
        <div className="p-5">
          <p className="text-label text-muted">{admin.mockStatusLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {admin.mockStatusOptions.map((option, index) => (
              <Badge key={option} tone={index === admin.mockStatusChosen ? "warning" : "neutral"}>
                {option}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <p className="text-label text-muted">{admin.mockTemplateLabel}</p>
            <p dir="ltr" className="mt-2 font-mono text-body-sm text-fg">{admin.mockTemplateValue}</p>
          </div>
          <div>
            <p className="text-label text-muted">{admin.mockIssuanceLabel}</p>
            <Badge tone="success" className="mt-2">{admin.mockIssuanceValue}</Badge>
          </div>
        </div>
      </div>
    </Figure>
  );
}
