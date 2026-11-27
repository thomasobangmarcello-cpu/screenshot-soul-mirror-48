import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader, Section } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { useAuth } from "@/lib/auth";
import {
  ACTIVITIES, AREA_IDS, AREAS, CERTIFICATE_ADVICE, CERTIFICATE_OPTIONS, EDUCATION_OPTIONS,
  GOAL_OPTIONS, TALENT_IDS, TALENTS, WORK_OPTIONS, type Option,
} from "@/lib/content";
import { useLang, type L } from "@/lib/i18n";
import { matchCareers, parseAnswers, rankAreas, type Answers } from "@/lib/matching";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/discover")({
  head: () => ({ meta: seo("Discover Your Skills — Kakuma Skills to Success", "A short step-by-step questionnaire about your education, abilities, talents and passions that gives you tailored skill-building advice and career pathways.") }),
  component: Discover,
});

type Step = { key: keyof Answers; multi: boolean; title: L; hint: L; options: Option[] };

const areaOptions: Option[] = AREA_IDS.map((id) => ({ id, label: AREAS[id].name }));

const STEPS: Step[] = [
  { key: "education", multi: false, title: { en: "What is your highest level of education?", sw: "Kiwango chako cha juu cha elimu ni kipi?" }, hint: { en: "Choose one. Every answer is a good starting point.", sw: "Chagua moja. Kila jibu ni mwanzo mzuri." }, options: EDUCATION_OPTIONS },
  { key: "certificates", multi: false, title: { en: "Do you have any certificates?", sw: "Je, una vyeti vyovyote?" }, hint: { en: "School, college, vocational or short-course certificates.", sw: "Vyeti vya shule, chuo, ufundi au kozi fupi." }, options: CERTIFICATE_OPTIONS },
  { key: "skills", multi: true, title: { en: "What can you already do?", sw: "Unaweza kufanya nini tayari?" }, hint: { en: "Choose all that apply — even if you learned them at home or by yourself.", sw: "Chagua yote yanayokuhusu — hata kama ulijifunza nyumbani au mwenyewe." }, options: areaOptions },
  { key: "talents", multi: true, title: { en: "What comes naturally to you?", sw: "Ni nini kinakujia kwa urahisi?" }, hint: { en: "Things people say you are good at.", sw: "Mambo ambayo watu husema unayaweza." }, options: TALENT_IDS.map((id) => ({ id, label: TALENTS[id] })) },
  { key: "work", multi: false, title: { en: "What is your work experience?", sw: "Uzoefu wako wa kazi ni upi?" }, hint: { en: "Paid or unpaid — it all counts.", sw: "Ya kulipwa au isiyolipwa — yote yana thamani." }, options: WORK_OPTIONS },
  { key: "interests", multi: true, title: { en: "What do you enjoy or want to learn?", sw: "Unapenda nini au unataka kujifunza nini?" }, hint: { en: "Choose the areas that excite you.", sw: "Chagua maeneo yanayokuvutia." }, options: areaOptions },
  { key: "goal", multi: false, title: { en: "What is your main goal right now?", sw: "Lengo lako kuu kwa sasa ni lipi?" }, hint: { en: "Choose one.", sw: "Chagua moja." }, options: GOAL_OPTIONS },
];

type Draft = Partial<Record<keyof Answers, string | string[]>>;

function Discover() {
  const { t, tl } = useLang();
  const { user } = useAuth();
  const [consent, setConsent] = useState(false);
  const [index, setIndex] = useState(-1); // -1 = privacy notice, STEPS.length = results
  const [draft, setDraft] = useState<Draft>({});
  const [result, setResult] = useState<Answers | null>(null);
  const [saved, setSaved] = useState(false);

  const step = STEPS[index];

  const choose = (s: Step, id: string) => {
    setDraft((d) => {
      if (!s.multi) return { ...d, [s.key]: id };
      const current = Array.isArray(d[s.key]) ? (d[s.key] as string[]) : [];
      return { ...d, [s.key]: current.includes(id) ? current.filter((x) => x !== id) : [...current, id] };
    });
  };

  const finish = async () => {
    const answers = parseAnswers(draft);
    if (!answers) return;
    setResult(answers);
    setIndex(STEPS.length);
    window.scrollTo({ top: 0 });
    if (user) {
      const { error } = await supabase
        .from("skill_assessments")
        .upsert({ user_id: user.id, answers: answers as unknown as Json, updated_at: new Date().toISOString() });
      if (error) toast.error(t("We could not save your answers.", "Hatukuweza kuhifadhi majibu yako."));
      else setSaved(true);
    }
  };

  const restart = () => {
    setDraft({});
    setResult(null);
    setSaved(false);
    setIndex(0);
  };

  return (
    <>
      <PageHeader
        eyebrow={t("Discover Your Skills", "Gundua Ujuzi Wako")}
        title={t("Find out what you are already good at", "Gundua unachokiweza tayari")}
        intro={t("Seven short questions. About three minutes. You get advice and career paths made for your answers.", "Maswali saba mafupi. Takriban dakika tatu. Unapata ushauri na njia za kazi zinazolingana na majibu yako.")}
      />
      <Section className="max-w-3xl">
        {index === -1 ? (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-8 shrink-0 text-primary" />
              <h2 className="text-2xl font-bold">{t("Before you start: your privacy", "Kabla ya kuanza: faragha yako")}</h2>
            </div>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• {t("We ask about your education, skills, talents, work and interests.", "Tunauliza kuhusu elimu yako, ujuzi, vipaji, kazi na mambo unayopenda.")}</li>
              <li>• {t("We do not ask for your ID number, address or any documents.", "Hatuombi namba yako ya kitambulisho, anwani wala nyaraka zozote.")}</li>
              <li>• {user
                ? t("Because you are signed in, your answers are saved to your private dashboard. Only you can see them.", "Kwa kuwa umeingia, majibu yako yanahifadhiwa kwenye dashibodi yako ya faragha. Ni wewe tu unayeweza kuyaona.")
                : t("You are not signed in, so your answers stay on this device and are not saved.", "Hujaingia, kwa hiyo majibu yako yanabaki kwenye kifaa hiki na hayahifadhiwi.")}</li>
            </ul>
            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl bg-secondary p-4">
              <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-1 size-5" />
              <span className="font-medium">
                {t("I understand and agree to answer these questions. ", "Ninaelewa na ninakubali kujibu maswali haya. ")}
                <Link to="/privacy" className="text-primary underline">{t("Read the privacy notice", "Soma taarifa ya faragha")}</Link>
              </span>
            </label>
            <Button disabled={!consent} onClick={() => setIndex(0)} className="mt-6 h-12 rounded-full px-7 text-base font-bold">
              {t("Start the questionnaire", "Anza dodoso")} <ArrowRight />
            </Button>
          </div>
        ) : null}

        {step ? (
          <div>
            <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
              <span>{t("Question", "Swali")} {index + 1} / {STEPS.length}</span>
            </div>
            <Progress value={((index + 1) / STEPS.length) * 100} className="mt-2 h-2.5" />
            <h2 className="mt-6 text-3xl font-bold">{tl(step.title)}</h2>
            <p className="mt-2 text-muted-foreground">{tl(step.hint)}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {step.options.map((o) => {
                const value = draft[step.key];
                const on = Array.isArray(value) ? value.includes(o.id) : value === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => choose(step, o.id)}
                    className={`flex min-h-16 items-center gap-3 rounded-2xl border-2 p-4 text-left text-[1.05rem] font-semibold transition-colors ${on ? "border-primary bg-secondary text-secondary-foreground" : "border-border bg-card hover:border-primary/50"}`}
                  >
                    <span className={`grid size-6 shrink-0 place-items-center border-2 ${step.multi ? "rounded-md" : "rounded-full"} ${on ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>
                      {on ? <Check className="size-4" /> : null}
                    </span>
                    {tl(o.label)}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <Button variant="outline" onClick={() => setIndex(index - 1)} className="h-12 rounded-full px-6 text-base">
                <ArrowLeft /> {t("Back", "Rudi")}
              </Button>
              <Button
                disabled={!step.multi && !draft[step.key]}
                onClick={() => (index === STEPS.length - 1 ? void finish() : setIndex(index + 1))}
                className="h-12 rounded-full px-7 text-base font-bold"
              >
                {index === STEPS.length - 1 ? t("See my results", "Ona matokeo yangu") : t("Next", "Endelea")} <ArrowRight />
              </Button>
            </div>
          </div>
        ) : null}

        {result ? <Results answers={result} saved={saved} signedIn={!!user} onRestart={restart} /> : null}
      </Section>
    </>
  );
}

function Results({ answers, saved, signedIn, onRestart }: { answers: Answers; saved: boolean; signedIn: boolean; onRestart: () => void }) {
  const { t, tl } = useLang();
  const top = rankAreas(answers);
  const careers = matchCareers(top, answers.education).slice(0, 4);
  const certificateAdvice = CERTIFICATE_ADVICE[answers.certificates];

  const goalNext = {
    job: { to: "/opportunities", label: t("Look for verified jobs", "Tafuta ajira zilizothibitishwa") },
    business: { to: "/entrepreneurship", label: t("Open the business guides", "Fungua miongozo ya biashara") },
    study: { to: "/opportunities", label: t("Look for scholarships and training", "Tafuta ufadhili na mafunzo") },
    freelance: { to: "/skills", label: t("Build work samples to show clients", "Tengeneza sampuli za kazi za kuwaonyesha wateja") },
  }[answers.goal];

  if (top.length === 0) {
    return (
      <div className="rounded-2xl bg-sun-soft p-8 text-center">
        <h2 className="text-2xl font-bold">{t("We need a little more to go on", "Tunahitaji taarifa zaidi kidogo")}</h2>
        <p className="mt-2 text-muted-foreground">{t("Choose at least one skill, talent or interest so we can suggest a path.", "Chagua angalau ujuzi, kipaji au jambo moja unalopenda ili tukupendekezee njia.")}</p>
        <Button onClick={onRestart} className="mt-5 h-12 rounded-full px-6 text-base">{t("Try again", "Jaribu tena")}</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="font-bold text-primary">{t("Your results", "Matokeo yako")}</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">{t("Your strongest skill areas", "Maeneo yako imara zaidi ya ujuzi")}</h2>
      </div>

      {top.map((id, i) => {
        const area = AREAS[id];
        const activities = ACTIVITIES.filter((a) => a.area === id);
        return (
          <article key={id} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent font-display text-lg font-extrabold text-accent-foreground">{i + 1}</span>
              <h3 className="text-2xl font-bold">{tl(area.name)}</h3>
            </div>
            <p className="mt-3 text-lg">{tl(area.strength)}</p>
            <h4 className="mt-5 font-bold">{t("Your next steps", "Hatua zako zinazofuata")}</h4>
            <ul className="mt-2 space-y-2">
              {area.steps.map((s) => <li key={s.en} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-success" />{tl(s)}</li>)}
            </ul>
            <h4 className="mt-5 font-bold">{t("Activities to try", "Shughuli za kujaribu")}</h4>
            <ul className="mt-2 space-y-1">
              {activities.map((a) => <li key={a.id}>• {tl(a.title)}</li>)}
            </ul>
            <Link to="/skills" search={{ area: id }} className="mt-4 inline-flex items-center gap-1 font-bold text-primary hover:underline">
              {t("Open these activities", "Fungua shughuli hizi")} <ArrowRight className="size-4" />
            </Link>
          </article>
        );
      })}

      {certificateAdvice ? (
        <div className="rounded-2xl bg-sun-soft p-6">
          <h3 className="text-xl font-bold">{t("About your certificates", "Kuhusu vyeti vyako")}</h3>
          <p className="mt-2 text-lg">{tl(certificateAdvice)}</p>
        </div>
      ) : null}

      <div>
        <h3 className="text-2xl font-bold">{t("Career paths that fit you", "Njia za kazi zinazokufaa")}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {careers.map(({ career, ready }) => (
            <div key={career.id} className="rounded-2xl border border-border bg-card p-5">
              <p className={`text-sm font-bold ${ready ? "text-success" : "text-muted-foreground"}`}>
                {ready ? t("You can start now", "Unaweza kuanza sasa") : t("Needs training first", "Inahitaji mafunzo kwanza")}
              </p>
              <h4 className="mt-1 text-lg font-bold">{tl(career.title)}</h4>
              <p className="mt-1 text-[0.95rem] text-muted-foreground">{tl(career.start)}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/careers" search={{ areas: top.join(","), edu: answers.education }} className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90">
            {t("See all matching careers", "Ona kazi zote zinazolingana")}
          </Link>
          <Link to={goalNext.to} className="inline-flex h-12 items-center rounded-full border-2 border-primary px-6 font-bold text-primary hover:bg-secondary">
            {goalNext.label}
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-secondary p-6">
        {signedIn ? (
          <p className="font-semibold">
            {saved ? t("Your results are saved to your dashboard.", "Matokeo yako yamehifadhiwa kwenye dashibodi yako.") : t("Saving your results…", "Tunahifadhi matokeo yako…")}{" "}
            <Link to="/dashboard" className="text-primary underline">{t("Open my dashboard", "Fungua dashibodi yangu")}</Link>
          </p>
        ) : (
          <p className="font-semibold">
            {t("These results are not saved. Create a free account to keep them and track your progress.", "Matokeo haya hayajahifadhiwa. Fungua akaunti ya bure ili kuyahifadhi na kufuatilia maendeleo yako.")}{" "}
            <Link to="/auth" className="text-primary underline">{t("Create an account", "Fungua akaunti")}</Link>
          </p>
        )}
        <button type="button" onClick={onRestart} className="mt-3 font-bold text-primary underline">{t("Answer the questions again", "Jibu maswali tena")}</button>
      </div>
    </div>
  );
}
