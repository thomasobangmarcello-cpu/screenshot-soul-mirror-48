import { createFileRoute } from "@tanstack/react-router";

import enterpriseImage from "@/assets/enterprise.jpg";
import { PageHeader, Section } from "@/components/page-header";
import { useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: seo("About — Kakuma Skills to Success", "Why Kakuma Skills to Success exists: our vision, mission, objectives and the change we want to see in Kakuma.") }),
  component: About,
});

function About() {
  const { t } = useLang();
  const blocks = [
    { title: t("Background", "Historia"), body: t("In Kakuma, many people finish school, complete vocational courses or teach themselves valuable skills — and then get stuck. The certificate sits in a folder. The skill is used only at home. This project began from one idea: the gap is rarely a lack of ability, it is a lack of direction on how to use it.", "Kakuma, watu wengi humaliza shule, hukamilisha kozi za ufundi au hujifunza wenyewe ujuzi wenye thamani — kisha hukwama. Cheti hubaki kwenye faili. Ujuzi hutumika nyumbani tu. Mradi huu ulianza na wazo moja: pengo mara chache ni ukosefu wa uwezo, bali ni ukosefu wa mwelekeo wa jinsi ya kuutumia.") },
    { title: t("Vision", "Maono"), body: t("A Kakuma where every person knows what they are good at and has a real way to earn from it.", "Kakuma ambapo kila mtu anajua anachokiweza na ana njia halisi ya kupata kipato kutokana nacho.") },
    { title: t("Mission", "Dhamira"), body: t("To help refugees discover their talents, strengthen practical skills, and turn certificates and informal knowledge into work and business opportunities.", "Kuwasaidia wakimbizi kugundua vipaji vyao, kuimarisha ujuzi wa vitendo, na kugeuza vyeti na maarifa yasiyo rasmi kuwa fursa za kazi na biashara.") },
  ];
  const objectives = [
    t("Help each person name their skills, talents and strengths.", "Kumsaidia kila mtu kutaja ujuzi, vipaji na uwezo wake."),
    t("Offer practical activities that turn knowledge into proof of skill.", "Kutoa shughuli za vitendo zinazogeuza maarifa kuwa ushahidi wa ujuzi."),
    t("Guide people to realistic careers that match who they are.", "Kuwaongoza watu kwenye kazi halisi zinazolingana nao."),
    t("Share only verified opportunities — never rumours.", "Kushiriki fursa zilizothibitishwa tu — kamwe si uvumi."),
    t("Support small businesses with clear, local guidance.", "Kusaidia biashara ndogo kwa mwongozo ulio wazi na unaofaa eneo."),
    t("Connect learners with trusted mentors.", "Kuwaunganisha wanaojifunza na washauri wanaoaminika."),
  ];
  const challenges = [
    t("Certificates that are not being used", "Vyeti visivyotumika"),
    t("Skills learned informally that nobody recognises", "Ujuzi uliopatikana kwa njia isiyo rasmi usiotambuliwa"),
    t("Little guidance on which path to choose", "Mwongozo mdogo kuhusu njia ya kuchagua"),
    t("Unreliable information about opportunities", "Taarifa zisizoaminika kuhusu fursa"),
    t("Few role models and mentors within reach", "Washauri na mifano ya kuigwa wachache walio karibu"),
  ];
  const impact = [
    t("More people confident about what they can offer", "Watu wengi zaidi wenye uhakika na wanachoweza kutoa"),
    t("More certificates and talents put to real use", "Vyeti na vipaji vingi zaidi vikitumika kihalisi"),
    t("More small businesses started with a plan", "Biashara ndogo nyingi zaidi zikianzishwa kwa mpango"),
    t("A community that shares knowledge and opens doors for each other", "Jamii inayoshirikiana maarifa na kufunguliana milango"),
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("About us", "Kuhusu sisi")}
        title={t("A certificate is where you start, not where you stop", "Cheti ni mahali unapoanzia, si unapoishia")}
        intro={t("Kakuma Skills to Success is a digital empowerment platform built for refugees living in Kakuma Refugee Camp, Kenya.", "Kakuma Skills to Success ni jukwaa la kidijitali la uwezeshaji lililotengenezwa kwa ajili ya wakimbizi wanaoishi katika Kambi ya Wakimbizi ya Kakuma, Kenya.")}
      />
      <Section className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="space-y-8">
          {blocks.map((b) => (
            <div key={b.title}>
              <h2 className="text-2xl font-bold md:text-3xl">{b.title}</h2>
              <p className="mt-2 text-lg text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
        <img src={enterpriseImage} alt={t("A tailor at work in a market stall", "Mshonaji akiwa kazini katika kibanda cha soko")} loading="lazy" width={1536} height={1024} className="aspect-3/2 w-full rounded-3xl object-cover shadow-soft" />
      </Section>
      <section className="bg-secondary">
        <Section className="grid gap-8 lg:grid-cols-3">
          {[
            { title: t("Our objectives", "Malengo yetu"), items: objectives },
            { title: t("Challenges we address", "Changamoto tunazoshughulikia"), items: challenges },
            { title: t("The impact we work towards", "Athari tunayoilenga"), items: impact },
          ].map((col) => (
            <div key={col.title} className="rounded-2xl bg-card p-6 shadow-soft">
              <h2 className="text-2xl font-bold">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-3"><span className="mt-2 size-2.5 shrink-0 rounded-full bg-accent" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      </section>
    </>
  );
}
