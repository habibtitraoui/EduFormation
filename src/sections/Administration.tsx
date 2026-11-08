import { AdminControls } from "../components/figures/AdminControls";
import { SectionShell } from "../components/ui";
import { useLocale } from "../lib/locale";

export function Administration() {
  const { t } = useLocale();
  const admin = t.admin;
  const items = [
    { title: admin.mockAccessLabel, body: admin.access },
    { title: admin.mockStatusLabel, body: admin.suspend },
    { title: admin.mockTemplateLabel, body: admin.templates },
  ];

  return (
    <SectionShell id="admin" ariaLabelledby="admin-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="admin-title" className="text-title text-fg">{admin.title}</h2>
          <p className="mt-4 max-w-prose text-body text-muted">{admin.body}</p>
          <ul className="mt-6 grid gap-4">
            {items.map((item) => (
              <li key={item.title}>
                <h3 className="text-label text-fg">{item.title}</h3>
                <p className="mt-1 max-w-prose text-body-sm text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-prose border-s-2 border-line-strong ps-4 text-body-sm text-muted">{admin.note}</p>
        </div>
        <div className="min-w-0 lg:order-first"><AdminControls /></div>
      </div>
    </SectionShell>
  );
}
