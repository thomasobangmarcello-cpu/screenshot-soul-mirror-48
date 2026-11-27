import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Section } from "@/components/page-header";
import { useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: seo("Privacy notice — Kakuma Skills to Success", "What information Kakuma Skills to Success stores about you, why, and how you can remove it.") }),
  component: Privacy,
});

function Privacy() {
  const { t } = useLang();
  const points = [
    { title: t("What we store", "Tunachohifadhi"), body: t("Only what you choose to give: your email for signing in, your name, your questionnaire answers, the activities you complete, opportunities you save and the portfolio items you add.", "Kile tu unachochagua kutoa: barua pepe yako ya kuingia, jina lako, majibu yako ya dodoso, shughuli unazokamilisha, fursa unazohifadhi na kazi unazoongeza kwenye jalada.") },
    { title: t("Why", "Kwa nini"), body: t("To give you advice that fits you and to keep your progress when you come back.", "Ili kukupa ushauri unaokufaa na kuhifadhi maendeleo yako unaporudi.") },
    { title: t("Who can see it", "Nani anaweza kuiona"), body: t("Only you. Your portfolio becomes visible to others only if you switch on sharing, and you can switch it off at any time.", "Wewe tu. Jalada lako huonekana kwa wengine tu ukiwasha kushiriki, na unaweza kuzima wakati wowote.") },
    { title: t("You can use the site without an account", "Unaweza kutumia tovuti bila akaunti"), body: t("The questionnaire, guides and career tools work without signing in. In that case your answers stay on your device and are not saved.", "Dodoso, miongozo na zana za kazi hufanya kazi bila kuingia. Katika hali hiyo majibu yako hubaki kwenye kifaa chako na hayahifadhiwi.") },
    { title: t("Removing your information", "Kuondoa taarifa zako"), body: t("In your dashboard you can delete everything you have saved with one button.", "Kwenye dashibodi yako unaweza kufuta kila kitu ulichohifadhi kwa kitufe kimoja.") },
    { title: t("Sensitive details", "Taarifa nyeti"), body: t("Please do not enter your refugee ID number, ration card number or health information anywhere on this site. We never ask for them.", "Tafadhali usiandike namba yako ya kitambulisho cha mkimbizi, namba ya kadi ya mgao au taarifa za afya mahali popote kwenye tovuti hii. Hatuziombi kamwe.") },
  ];
  return (
    <>
      <PageHeader eyebrow={t("Privacy", "Faragha")} title={t("Your information belongs to you", "Taarifa zako ni mali yako")} intro={t("A short, plain explanation of what we keep and what we never ask for.", "Maelezo mafupi na rahisi ya tunachohifadhi na tusichoomba kamwe.")} />
      <Section className="max-w-3xl space-y-7">
        {points.map((p) => (
          <div key={p.title}>
            <h2 className="text-2xl font-bold">{p.title}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </Section>
    </>
  );
}
