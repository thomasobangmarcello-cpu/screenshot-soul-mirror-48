import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Compass, GraduationCap, HandHeart, Hammer, Lightbulb, Sprout, Store, Users } from "lucide-react";

import heroImage from "@/assets/hero.jpg";
import { OpportunityCard } from "@/components/opportunity-card";
import { EmptyState, Section } from "@/components/page-header";
import { RouteError, RouteNotFound } from "@/components/route-states";
import { ACTIVITIES, CAREERS, GUIDES } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { opportunitiesQuery } from "@/lib/queries";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(opportunitiesQuery),
  head: () => ({
    meta: seo(
      "Kakuma Skills to Success — Discover Your Skills. Build Your Future.",
      "A free platform helping refugees in Kakuma discover their talents, build practical skills and turn certificates and know-how into work and business.",
    ),
  }),
  component: Index,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});

const cta = "inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-lg font-bold transition-colors";

function Index() {
  const { t } = useLang();
  const { data: opportunities } = useSuspenseQuery(opportunitiesQuery);

  // Every figure below is counted from what is really on the site right now.
  const stats = [
    { n: ACTIVITIES.length, label: t("practical learning activities", "shughuli za kujifunza kwa vitendo") },
    { n: CAREERS.length, label: t("career paths explained", "njia za kazi zilizoelezwa") },
    { n: GUIDES.length, label: t("business guides", "miongozo ya biashara") },
    { n: opportunities.length, label: t("verified opportunities listed", "fursa zilizothibitishwa") },
  ];

  const audiences = [
    { icon: GraduationCap, title: t("Graduates", "Wahitimu"), body: t("You studied — now find where your certificate fits.", "Umesoma — sasa tafuta mahali cheti chako kinapofaa.") },
    { icon: Hammer, title: t("Vocational trainees", "Wanafunzi wa ufundi"), body: t("Turn training into paid jobs and customers.", "Geuza mafunzo kuwa kazi za kulipwa na wateja.") },
    { icon: Lightbulb, title: t("Self-taught youth", "Vijana waliojifunza wenyewe"), body: t("No papers? Your skills still count. Show them.", "Huna vyeti? Ujuzi wako bado una thamani. Uonyeshe.") },
    { icon: Store, title: t("Entrepreneurs", "Wajasiriamali"), body: t("Plan, start and grow a small business.", "Panga, anzisha na ukuze biashara ndogo.") },
    { icon: Briefcase, title: t("Job seekers", "Wanaotafuta kazi"), body: t("Find verified openings that match what you can do.", "Pata nafasi zilizothibitishwa zinazolingana na unachoweza kufanya.") },
  ];

  const sections = [
    { to: "/discover", icon: Compass, title: t("Discover Your Skills", "Gundua Ujuzi Wako"), body: t("Answer a few questions and get advice made for you.", "Jibu maswali machache upate ushauri unaokufaa.") },
    { to: "/skills", icon: Sprout, title: t("Skills Development", "Kukuza Ujuzi"), body: t("Exercises and projects to sharpen your strengths.", "Mazoezi na miradi ya kunoa uwezo wako.") },
    { to: "/careers", icon: Briefcase, title: t("Career Guidance", "Mwongozo wa Kazi"), body: t("See which professions fit your mix of skills.", "Ona kazi zinazolingana na mchanganyiko wa ujuzi wako.") },
    { to: "/opportunities", icon: GraduationCap, title: t("Opportunity Hub", "Kituo cha Fursa"), body: t("Verified jobs, scholarships, training and more.", "Ajira, ufadhili, mafunzo na zaidi — vilivyothibitishwa.") },
    { to: "/entrepreneurship", icon: Store, title: t("Entrepreneurship Hub", "Kituo cha Ujasiriamali"), body: t("Guides for starting and running a business.", "Miongozo ya kuanzisha na kuendesha biashara.") },
    { to: "/mentorship", icon: HandHeart, title: t("Mentorship", "Ushauri"), body: t("Connect with verified mentors and leaders.", "Ungana na washauri na viongozi waliothibitishwa.") },
  ] as const;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img src={heroImage} alt="" fetchPriority="high" width={1536} height={1024} className="absolute inset-0 -z-20 size-full object-cover object-right" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
              {t("For refugees in Kakuma, Kenya", "Kwa wakimbizi wa Kakuma, Kenya")}
            </p>
            <h1 className="mt-5 text-5xl font-extrabold md:text-6xl lg:text-7xl">Kakuma Skills to Success</h1>
            <p className="mt-4 font-display text-2xl font-bold text-accent md:text-3xl">
              {t("Discover Your Skills. Build Your Future.", "Gundua Ujuzi Wako. Jenga Maisha Yako ya Baadaye.")}
            </p>
            <p className="mt-5 max-w-xl text-lg text-ink-foreground/90">
              {t(
                "A certificate is only the starting point. We help you see what you already know, build on it, and turn it into real work or a business.",
                "Cheti ni mwanzo tu. Tunakusaidia kuona unachokijua tayari, kukiendeleza, na kukigeuza kuwa kazi halisi au biashara.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/discover" className={`${cta} bg-accent text-accent-foreground hover:bg-accent/90`}>
                {t("Discover Your Skills", "Gundua Ujuzi Wako")} <ArrowRight className="size-5" />
              </Link>
              <Link to="/auth" className={`${cta} border-2 border-ink-foreground/70 text-ink-foreground hover:bg-ink-foreground/10`}>
                {t("Get Started", "Anza Sasa")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <h2 className="max-w-3xl text-3xl font-bold md:text-4xl">
          {t("From having skills to using them", "Kutoka kuwa na ujuzi hadi kuutumia")}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {t(
            "Many people in Kakuma have training, talent or experience but no clear way to apply it. This platform bridges that gap in three steps.",
            "Watu wengi Kakuma wana mafunzo, vipaji au uzoefu lakini hawana njia wazi ya kuvitumia. Jukwaa hili linaziba pengo hilo kwa hatua tatu.",
          )}
        </p>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { title: t("Know", "Jua"), body: t("Uncover your talents, abilities and what you already do well.", "Gundua vipaji vyako, uwezo wako na unachokifanya vizuri tayari.") },
            { title: t("Build", "Jenga"), body: t("Practise with real exercises and projects that prove your skill.", "Fanya mazoezi na miradi halisi inayothibitisha ujuzi wako.") },
            { title: t("Apply", "Tumia"), body: t("Use it: a job, a customer, a scholarship or your own business.", "Utumie: ajira, mteja, ufadhili au biashara yako mwenyewe.") },
          ].map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-full bg-accent font-display text-xl font-extrabold text-accent-foreground">{i + 1}</span>
              <h3 className="mt-4 text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-5xl font-extrabold text-accent">{s.n}</dd>
                <dt className="mt-1 text-primary-foreground/90">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-primary-foreground/75">
            {t("These numbers are counted live from this site. Nothing is estimated.", "Namba hizi zinahesabiwa moja kwa moja kutoka kwenye tovuti hii. Hakuna makadirio.")}
          </p>
        </div>
      </section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold md:text-4xl">{t("Featured opportunities", "Fursa zilizoangaziwa")}</h2>
          <Link to="/opportunities" className="inline-flex items-center gap-1 font-bold text-primary hover:underline">
            {t("Open the Opportunity Hub", "Fungua Kituo cha Fursa")} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-6">
          {opportunities.length === 0 ? (
            <EmptyState
              title={t("No verified opportunities yet", "Bado hakuna fursa zilizothibitishwa")}
              body={t(
                "We only show opportunities that have been confirmed with the organisation offering them. Listings will appear here as soon as they are verified.",
                "Tunaonyesha tu fursa zilizothibitishwa na shirika linalozitoa. Fursa zitaonekana hapa mara tu zitakapothibitishwa.",
              )}
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {opportunities.slice(0, 3).map((o) => <OpportunityCard key={o.id} item={o} />)}
            </div>
          )}
        </div>
      </Section>

      <section className="bg-sun-soft">
        <Section>
          <div className="flex items-center gap-3">
            <Users className="size-8 text-primary" />
            <h2 className="text-3xl font-bold md:text-4xl">{t("Made for you, wherever you are starting", "Imetengenezwa kwa ajili yako, popote unapoanzia")}</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-2xl bg-card p-5 shadow-soft">
                <a.icon className="size-7 text-primary" />
                <h3 className="mt-3 text-lg font-bold">{a.title}</h3>
                <p className="mt-1 text-[0.95rem] text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section>
        <h2 className="text-3xl font-bold md:text-4xl">{t("Everything in one place", "Kila kitu mahali pamoja")}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link key={s.to} to={s.to} className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary">
              <s.icon className="size-8 text-primary" />
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-muted-foreground">{s.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-bold text-primary">{t("Open", "Fungua")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
