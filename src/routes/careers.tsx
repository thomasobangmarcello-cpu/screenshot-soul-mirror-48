import { createFileRoute, Link } from "@tanstack/react-router";

import { EmptyState, PageHeader, Section } from "@/components/page-header";
import { AREA_IDS, AREAS, EDUCATION_OPTIONS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { isAreaId, isEducation, matchCareers } from "@/lib/matching";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
  validateSearch: (s: Record<string, unknown>): { areas?: string; edu?: string } => {
    const out: { areas?: string; edu?: string } = {};
    const a = s["areas"];
    const e = s["edu"];
    if (typeof a === "string" && a) out.areas = a;
    if (typeof e === "string" && e) out.edu = e;
    return out;
  },
  head: () => ({ meta: seo("Career Guidance — Kakuma Skills to Success", "Explore realistic professions that match your own mix of qualifications, skills and interests.") }),
  component: Careers,
});

function Careers() {
  const { t, tl } = useLang();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const areas = (search.areas ?? "").split(",").filter(isAreaId);
  const education = isEducation(search.edu) ? search.edu : "secondary";
  const matches = matchCareers(areas, education);

  const update = (nextAreas: string[], nextEdu: string) =>
    void navigate({ to: ".", search: nextAreas.length ? { areas: nextAreas.join(","), edu: nextEdu } : { edu: nextEdu }, replace: true, resetScroll: false });

  return (
    <>
      <PageHeader
        eyebrow={t("Career Guidance", "Mwongozo wa Kazi")}
        title={t("Which work fits your mix of skills?", "Ni kazi gani inalingana na mchanganyiko wa ujuzi wako?")}
        intro={t("Choose your skills and interests and your education. We show realistic professions — and what each one needs.", "Chagua ujuzi wako, mambo unayopenda na elimu yako. Tunaonyesha kazi halisi — na kila moja inahitaji nini.")}
      />
      <Section className="grid gap-10 lg:grid-cols-[22rem_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-xl font-bold">{t("1. Your skills and interests", "1. Ujuzi wako na mambo unayopenda")}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {AREA_IDS.map((id) => {
              const on = areas.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => update(on ? areas.filter((x) => x !== id) : [...areas, id], education)}
                  className={`rounded-full border-2 px-3.5 py-2 text-left text-[0.95rem] font-semibold transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"}`}
                >
                  {tl(AREAS[id].name)}
                </button>
              );
            })}
          </div>
          <label htmlFor="edu" className="mt-6 block text-xl font-bold font-display">{t("2. Your education", "2. Elimu yako")}</label>
          <select
            id="edu"
            value={education}
            onChange={(e) => update(areas, e.target.value)}
            className="mt-3 h-12 w-full rounded-xl border border-input bg-background px-3 text-base"
          >
            {EDUCATION_OPTIONS.map((o) => <option key={o.id} value={o.id}>{tl(o.label)}</option>)}
          </select>
          <p className="mt-5 text-[0.95rem] text-muted-foreground">
            {t("Not sure what to choose?", "Huna uhakika wa kuchagua?")}{" "}
            <Link to="/discover" className="font-bold text-primary underline">{t("Take the skills questionnaire", "Jibu dodoso la ujuzi")}</Link>
          </p>
        </aside>

        <div>
          {areas.length === 0 ? (
            <EmptyState
              title={t("Choose at least one area", "Chagua angalau eneo moja")}
              body={t("Pick the skills and interests that describe you and matching careers will appear here.", "Chagua ujuzi na mambo unayopenda yanayokuelezea na kazi zinazolingana zitaonekana hapa.")}
            />
          ) : (
            <>
              <p className="font-semibold text-muted-foreground">{matches.length} {t("matching careers", "kazi zinazolingana")}</p>
              <div className="mt-4 space-y-4">
                {matches.map(({ career, ready }) => (
                  <article key={career.id} className="rounded-2xl border border-border bg-card p-6">
                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${ready ? "bg-success text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {ready
                        ? t("You can start now", "Unaweza kuanza sasa")
                        : career.needs === "diploma"
                          ? t("Needs a diploma or degree first", "Inahitaji stashahada au shahada kwanza")
                          : t("Needs a recognised certificate first", "Inahitaji cheti kinachotambulika kwanza")}
                    </span>
                    <h2 className="mt-3 text-2xl font-bold">{tl(career.title)}</h2>
                    <p className="mt-2">{tl(career.does)}</p>
                    <p className="mt-3 rounded-xl bg-secondary p-4"><strong>{t("How to begin: ", "Jinsi ya kuanza: ")}</strong>{tl(career.start)}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {career.areas.map((id) => (
                        <Link key={id} to="/skills" search={{ area: id }} className="text-sm font-bold text-primary underline">
                          {t("Practise", "Fanya mazoezi")}: {tl(AREAS[id].name)}
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </Section>
    </>
  );
}
