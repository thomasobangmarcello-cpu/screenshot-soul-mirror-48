import { BadgeCheck, CalendarDays, MapPin } from "lucide-react";
import type { ReactNode } from "react";

import { OPPORTUNITY_KINDS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import type { Opportunity } from "@/lib/queries";

export function OpportunityCard({ item, action }: { item: Opportunity; action?: ReactNode }) {
  const { t, tl } = useLang();
  const kind = OPPORTUNITY_KINDS.find((k) => k.id === item.kind);
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
        <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{kind ? tl(kind.label) : item.kind}</span>
        <span className="inline-flex items-center gap-1 text-success"><BadgeCheck className="size-4" />{t("Verified", "Imethibitishwa")}</span>
      </div>
      <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
      <p className="font-medium text-muted-foreground">{item.organization}</p>
      {item.summary ? <p className="mt-2">{item.summary}</p> : null}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        {item.location ? <span className="inline-flex items-center gap-1"><MapPin className="size-4" />{item.location}</span> : null}
        {item.deadline ? <span className="inline-flex items-center gap-1"><CalendarDays className="size-4" />{t("Deadline", "Mwisho")}: {item.deadline}</span> : null}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 pt-1">
        {item.apply_url ? (
          <a href={item.apply_url} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded-full bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90">
            {t("How to apply", "Jinsi ya kuomba")}
          </a>
        ) : null}
        {action}
      </div>
    </article>
  );
}
