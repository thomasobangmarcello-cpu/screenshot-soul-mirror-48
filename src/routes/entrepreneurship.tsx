import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, Section } from "@/components/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GUIDES } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/entrepreneurship")({
  head: () => ({ meta: seo("Entrepreneurship Hub — Kakuma Skills to Success", "Practical guides to starting a small business in Kakuma: business plans, marketing, managing money and turning talents into income.") }),
  component: Entrepreneurship,
});

function Entrepreneurship() {
  const { t, tl } = useLang();
  return (
    <>
      <PageHeader
        eyebrow={t("Entrepreneurship Hub", "Kituo cha Ujasiriamali")}
        title={t("Turn what you know into a business", "Geuza unachokijua kuwa biashara")}
        intro={t("Step-by-step guides you can follow with little money and what you already have.", "Miongozo ya hatua kwa hatua unayoweza kufuata kwa pesa kidogo na ulicho nacho tayari.")}
      />
      <Section className="max-w-4xl">
        <Accordion type="single" collapsible defaultValue={GUIDES[0]?.id ?? ""} className="space-y-4">
          {GUIDES.map((g) => (
            <AccordionItem key={g.id} value={g.id} className="rounded-2xl border border-border bg-card px-6 shadow-soft">
              <AccordionTrigger className="py-5 text-left font-display text-xl font-bold hover:no-underline md:text-2xl">{tl(g.title)}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base">
                <p className="text-lg text-muted-foreground">{tl(g.intro)}</p>
                <ol className="mt-4 space-y-3">
                  {g.steps.map((s, i) => (
                    <li key={s.en} className="flex gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent font-bold text-accent-foreground">{i + 1}</span>
                      <span className="pt-0.5 text-[1.05rem]">{tl(s)}</span>
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10 rounded-2xl bg-sun-soft p-6">
          <h2 className="text-2xl font-bold">{t("Not sure which business fits you?", "Huna uhakika ni biashara gani inakufaa?")}</h2>
          <p className="mt-2 text-muted-foreground">{t("Start with the skills questionnaire. Your strongest skills point to your best first business.", "Anza na dodoso la ujuzi. Ujuzi wako imara zaidi unaonyesha biashara yako bora ya kwanza.")}</p>
          <Link to="/discover" className="mt-4 inline-flex h-12 items-center rounded-full bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90">{t("Discover Your Skills", "Gundua Ujuzi Wako")}</Link>
        </div>
      </Section>
    </>
  );
}
