import { FeatureSpotlight } from "../components/FeatureSpotlight";
import { CertificateFigure } from "../components/figures/CertificateFigure";
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
    <FeatureSpotlight id="certificates" eyebrow={t.nav.certificates} title={certificate.title} description={certificate.body} figure={<CertificateFigure />} reverse>
      <dl className="mt-6 divide-y divide-line rounded-card border border-line bg-panel px-4 sm:px-5">
        {specs.map((spec) => (
          <div key={spec.label} className="grid gap-1 py-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-label font-semibold text-accent">{spec.label}</dt>
            <dd className="text-body-sm text-fg">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </FeatureSpotlight>
  );
}
