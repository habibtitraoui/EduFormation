import { CirclePlay, Hand, MessageCircle, ThumbsUp } from "lucide-react";

import { useLocale } from "../../lib/locale";
import { Badge, Figure } from "../ui";

/** A dark room mock, never an image of a real meeting or real participants. */
export function SessionFigure() {
  const { t } = useLocale();
  const live = t.live;

  return (
    <Figure caption={live.caption}>
      <div aria-hidden="true" className="bg-media p-3 text-media-fg sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-label text-media-fg/80">{live.mockStageLabel}</span>
          <Badge tone="success">{live.mockBadge}</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_10rem]">
          <div className="min-w-0">
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-control border border-media-fg/12 bg-media-chrome">
              <div className="absolute inset-3 border border-media-fg/12" />
              <div className="flex flex-col items-center gap-2 text-media-fg/80">
                <CirclePlay className="h-6 w-6" />
                <span className="text-meta">{live.mockStageLabel}</span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-control border border-media-fg/12 px-2 py-1 text-meta text-media-fg/80">
                <ThumbsUp className="h-4 w-4" />{live.mockReactions}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-control border border-media-fg/12 px-2 py-1 text-meta text-media-fg/80">
                <Hand className="h-4 w-4" />{live.mockHands}
              </span>
            </div>
          </div>
          <div className="min-w-0 border-t border-media-fg/12 pt-3 sm:border-t-0 sm:border-s sm:ps-3 sm:pt-0">
            <p className="text-meta text-media-fg/70">{live.mockParticipants}</p>
            <ul className="mt-2 space-y-2">
              {live.mockRoles.map((role) => (
                <li key={role} className="flex items-center gap-2 text-meta text-media-fg/90">
                  <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" fill="none">
                    <circle cx="10" cy="10" r="9.5" className="stroke-media-fg/30" />
                    <circle cx="10" cy="7" r="2.5" className="fill-media-fg/70" />
                    <path d="M5.5 15c.5-2.5 2-3.5 4.5-3.5s4 1 4.5 3.5" className="stroke-media-fg/70" />
                  </svg>
                  <span className="truncate">{role}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 border-t border-media-fg/12 pt-3 text-meta text-media-fg/70">
              <MessageCircle className="h-4 w-4" />{live.mockChat}
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-1">
              {live.mockChatLines.map((line) => (
                <p key={line} className="rounded-control border border-media-fg/12 bg-media-chrome p-2 text-meta text-media-fg/90">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Figure>
  );
}
