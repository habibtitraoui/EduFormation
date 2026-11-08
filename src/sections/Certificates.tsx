import { CertificateFigure } from "../components/figures/CertificateFigure";
import { SectionShell } from "../components/ui";
import { fillTemplate, formatNumber } from "../lib/format";
import { useLocale } from "../lib/locale";

export function Certificates() {
  const { t, locale } = useLocale();
  const certificate = t.certificates;
  const specs = [
    { label: certificate.specFormatsLabel, value: fillTemplate(certificate.specFormats, {
      pixels: formatNumber(3508, locale),
      dpi: formatNumber(300, locale),
      width: formatNumber(297, locale),
      height: formatNumber(210, locale),
    }) },
    { label: certificate.specBordersLabel, value: certificate.specBorders },
    { label: certificate.specBrandingLabel, value: certificate.specBranding },
    { label: certificate.specTypeLabel, value: certificate.specType },
  ];

  return (
    <SectionShell id="certificates" ariaLabelledby="certificates-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="certificates-title" className="text-title text-fg">{certificate.title}</h2>
          <p className="mt-4 max-w-prose text-body text-muted">{certificate.body}</p>
          <dl className="mt-7 border-t border-line">
            {specs.map((spec) => (
              <div key={spec.label} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
                <dt className="text-label text-muted">{spec.label}</dt>
                <dd className="text-body-sm text-fg">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="min-w-0 lg:order-first"><CertificateFigure /></div>
      </div>
    </SectionShell>
  );
}
