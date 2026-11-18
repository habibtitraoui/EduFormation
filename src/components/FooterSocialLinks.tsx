import { useLocale } from "../lib/locale";

const profiles = [
  { platform: "facebook", href: "https://www.facebook.com/share/1CxjnGsWPZ/?mibextid=wwXIfr" },
  { platform: "instagram", href: "https://www.instagram.com/h2d.dev?dmpr=MTB2MmN3bXEwOHA5NQ%3D%3D&utm_source=qr" },
  { platform: "whatsapp", href: "https://wa.me/message/QVOQMCZGFPIQF1" },
] as const;

export function FooterSocialLinks() {
  const { t } = useLocale();

  return (
    <ul className="mt-4 flex flex-wrap gap-2" role="list">
      {profiles.map(({ platform, href }) => (
        <li key={platform}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.footer.social[platform]}
            title={t.footer.social[platform]}
            className="inline-grid size-10 place-items-center rounded-control border border-line bg-accent-soft text-accent transition-colors duration-150 hover:border-accent hover:bg-ink hover:text-ink-fg"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
              <use href={`/illustrations/social-icons.svg#${platform}`} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
