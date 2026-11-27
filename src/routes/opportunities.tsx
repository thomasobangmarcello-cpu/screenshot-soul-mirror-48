import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck } from "lucide-react";

import { OpportunityCard } from "@/components/opportunity-card";
import { EmptyState, PageHeader, Section } from "@/components/page-header";
import { RouteError, RouteNotFound } from "@/components/route-states";
import { Button } from "@/components/ui/button";
import { useSaved } from "@/hooks/use-user-data";
import { OPPORTUNITY_KINDS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { opportunitiesQuery } from "@/lib/queries";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/opportunities")({
  validateSearch: (s: Record<string, unknown>): { kind?: string } => {
    const k = s["kind"];
    return typeof k === "string" ? { kind: k } : {};
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(opportunitiesQuery),
  head: () => ({ meta: seo("Opportunity Hub — Kakuma Skills to Success", "Verified jobs, internships, scholarships, vocational training, volunteering roles and freelance gigs for people in Kakuma.") }),
  component: Opportunities,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});

const chip = "rounded-full border-2 px-4 py-2 text-[0.95rem] font-semibold transition-colors";

function Opportunities() {
  const { t, tl } = useLang();
  const { data } = useSuspenseQuery(opportunitiesQuery);
  const { kind } = Route.useSearch();
  const active = OPPORTUNITY_KINDS.some((k) => k.id === kind) ? kind : undefined;
  const list = active ? data.filter((o) => o.kind === active) : data;
  const { ids, toggle, user } = useSaved();

  return (
    <>
      <PageHeader
        eyebrow={t("Opportunity Hub", "Kituo cha Fursa")}
        title={t("Real opportunities, checked before they are shown", "Fursa halisi, zilizokaguliwa kabla ya kuonyeshwa")}
        intro={t("Only listings confirmed with the organisation offering them appear here. No rumours, no fees to apply.", "Ni fursa zilizothibitishwa na shirika linalozitoa tu zinazoonekana hapa. Hakuna uvumi, hakuna ada ya kuomba.")}
      />
      <Section>
        <div className="flex flex-wrap gap-2">
          <Link to="/opportunities" className={`${chip} ${active ? "border-border bg-card" : "border-primary bg-primary text-primary-foreground"}`}>{t("All", "Zote")}</Link>
          {OPPORTUNITY_KINDS.map((k) => (
            <Link key={k.id} to="/opportunities" search={{ kind: k.id }} className={`${chip} ${active === k.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/50"}`}>
              {tl(k.label)}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          {list.length === 0 ? (
            <EmptyState
              title={t("No verified listings here yet", "Bado hakuna fursa zilizothibitishwa hapa")}
              body={t(
                "We would rather show nothing than show something we have not checked. New opportunities appear here as soon as they are verified.",
                "Ni afadhali tusionyeshe chochote kuliko kuonyesha kitu ambacho hatujakikagua. Fursa mpya zitaonekana hapa mara tu zitakapothibitishwa.",
              )}
            >
              <Link to="/skills" className="inline-flex h-11 items-center rounded-full bg-primary px-5 font-bold text-primary-foreground">{t("Build your skills meanwhile", "Kuza ujuzi wako kwa sasa")}</Link>
              <Link to="/entrepreneurship" className="inline-flex h-11 items-center rounded-full border-2 border-primary px-5 font-bold text-primary">{t("Explore business guides", "Angalia miongozo ya biashara")}</Link>
            </EmptyState>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {list.map((o) => {
                const saved = ids.includes(o.id);
                return (
                  <OpportunityCard
                    key={o.id}
                    item={o}
                    action={user ? (
                      <Button variant="outline" disabled={toggle.isPending} onClick={() => toggle.mutate(o.id)} className="h-11 rounded-full px-5 text-base">
                        {saved ? <><BookmarkCheck /> {t("Saved", "Imehifadhiwa")}</> : <><Bookmark /> {t("Save", "Hifadhi")}</>}
                      </Button>
                    ) : (
                      <Link to="/auth" className="inline-flex h-11 items-center rounded-full border border-input px-5 font-semibold">{t("Sign in to save", "Ingia ili kuhifadhi")}</Link>
                    )}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-12 rounded-2xl bg-sun-soft p-6">
          <h2 className="text-xl font-bold">{t("Stay safe", "Kaa salama")}</h2>
          <p className="mt-2">{t("A genuine employer or scholarship never asks you to pay to apply. If someone asks for money, do not pay.", "Mwajiri au mfadhili wa kweli hakuombi ulipe ili kuomba. Mtu akikuomba pesa, usilipe.")}</p>
        </div>
      </Section>
    </>
  );
}
