import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ExternalLink } from "lucide-react";

import { PageHeader, Section } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { useCompleted } from "@/hooks/use-user-data";
import { ACTIVITIES, AREA_IDS, AREAS, LEARNING_SITES } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { isAreaId } from "@/lib/matching";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/skills")({
  validateSearch: (s: Record<string, unknown>): { area?: string } => {
    const a = s["area"];
    return typeof a === "string" ? { area: a } : {};
  },
  head: () => ({ meta: seo("Skills Development — Kakuma Skills to Success", "Practical exercises, tutorials and hands-on projects to sharpen the skills you already have.") }),
  component: Skills,
});

const chip = "rounded-full border-2 px-4 py-2 text-[0.95rem] font-semibold transition-colors";

function Skills() {
  const { t, tl } = useLang();
  const search = Route.useSearch();
  const area = isAreaId(search.area) ? search.area : null;
  const { ids, toggle, user } = useCompleted();
  const list = area ? ACTIVITIES.filter((a) => a.area === area) : ACTIVITIES;
  const kindLabel = { exercise: t("Exercise", "Zoezi"), tutorial: t("Tutorial", "Mafunzo"), project: t("Project", "Mradi") };

  return (
    <>
      <PageHeader
        eyebrow={t("Skills Development", "Kukuza Ujuzi")}
        title={t("Practise until your skill speaks for itself", "Fanya mazoezi hadi ujuzi wako ujieleze wenyewe")}
        intro={t("Short, hands-on activities you can do with what you have. Finish one, keep the proof, add it to your portfolio.", "Shughuli fupi za vitendo unazoweza kufanya kwa ulicho nacho. Maliza moja, hifadhi ushahidi, uongeze kwenye jalada lako.")}
      />
      <Section>
        <div className="flex flex-wrap gap-2">
          <Link to="/skills" className={`${chip} ${area ? "border-border bg-card" : "border-primary bg-primary text-primary-foreground"}`}>{t("All areas", "Maeneo yote")}</Link>
          {AREA_IDS.map((id) => (
            <Link key={id} to="/skills" search={{ area: id }} className={`${chip} ${area === id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/50"}`}>
              {tl(AREAS[id].name)}
            </Link>
          ))}
        </div>

        {user ? (
          <p className="mt-6 font-semibold text-muted-foreground">
            {t("Completed", "Zilizokamilika")}: {ids.length} / {ACTIVITIES.length}
          </p>
        ) : (
          <p className="mt-6 rounded-xl bg-sun-soft p-4 font-medium">
            <Link to="/auth" className="font-bold text-primary underline">{t("Sign in", "Ingia")}</Link>{" "}
            {t("to mark activities as done and track your progress.", "ili kuweka alama shughuli ulizomaliza na kufuatilia maendeleo yako.")}
          </p>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => {
            const done = ids.includes(a.id);
            return (
              <article key={a.id} className={`flex flex-col rounded-2xl border-2 bg-card p-6 ${done ? "border-success" : "border-border"}`}>
                <div className="flex flex-wrap gap-2 text-sm font-bold">
                  <span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">{kindLabel[a.kind]}</span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{tl(AREAS[a.area].name)}</span>
                </div>
                <h2 className="mt-3 text-xl font-bold">{tl(a.title)}</h2>
                <p className="mt-2 flex-1 text-muted-foreground">{tl(a.body)}</p>
                {user ? (
                  <Button
                    variant={done ? "outline" : "default"}
                    disabled={toggle.isPending}
                    onClick={() => toggle.mutate(a.id)}
                    className="mt-4 h-11 self-start rounded-full px-5 text-base"
                  >
                    {done ? <><Check /> {t("Done — undo", "Imekamilika — tengua")}</> : t("Mark as done", "Weka alama imekamilika")}
                  </Button>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold md:text-3xl">{t("Free learning sites", "Tovuti za bure za kujifunza")}</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {t("These are independent websites, not partners of this project. They need an internet connection, so check your data before opening them.", "Hizi ni tovuti huru, si washirika wa mradi huu. Zinahitaji intaneti, kwa hiyo angalia bando lako kabla ya kuzifungua.")}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LEARNING_SITES.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-border bg-card p-5 hover:border-primary">
                <span className="flex items-center gap-2 text-lg font-bold">{s.name} <ExternalLink className="size-4 text-muted-foreground" /></span>
                <span className="mt-1 block text-[0.95rem] text-muted-foreground">{tl(s.about)}</span>
              </a>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
