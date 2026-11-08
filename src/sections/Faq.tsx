import { SectionShell } from "../components/ui";
import { faqItems } from "../content/types";
import { fillTemplate, formatNumber } from "../lib/format";
import { useLocale } from "../lib/locale";

export function Faq() {
  const { t, locale } = useLocale();

  return (
    <SectionShell id="faq" ariaLabelledby="faq-title" className="border-t border-line">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16">
        <h2 id="faq-title" className="text-title text-fg">{t.faq.title}</h2>
        <div className="min-w-0 border-t border-line">
          {faqItems(t).map((item, index) => (
            <details key={item.id} name="faq" open={index === 0} className="faq-item border-b border-line">
              <summary className="flex items-start justify-between gap-4 rounded-control py-4 text-body font-medium text-fg">
                {item.question}
              </summary>
              <p className="max-w-prose pb-5 pe-8 text-body-sm text-muted">{fillTemplate(item.answer, { pixels: formatNumber(3508, locale) })}</p>
            </details>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
