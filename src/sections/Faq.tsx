import { ChevronDown } from "lucide-react";

import { SectionShell } from "../components/ui";
import { faqItems } from "../content/types";
import { fillTemplate, formatNumber } from "../lib/format";
import { useLocale } from "../lib/locale";

export function Faq() {
  const { t, locale } = useLocale();

  return (
    <SectionShell id="faq" title={t.faq.title} eyebrow={t.nav.faq} className="border-y border-line bg-inset/55">
      <div className="mx-auto grid max-w-4xl gap-3.5">
        {faqItems(t).map((item, index) => (
          <details key={item.id} name="faq" open={index === 0} className="faq-item rounded-card border border-line bg-panel shadow-card">
            <summary className="text-body font-semibold sm:text-[17px]">
              <span className="faq-dot" aria-hidden="true" />
              {item.question}
              <ChevronDown className="faq-chevron size-5 text-accent" aria-hidden="true" />
            </summary>
            <p className="faq-answer text-body text-muted">{fillTemplate(item.answer, { pixels: formatNumber(3508, locale) })}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
