import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { OpportunityCard } from "@/components/opportunity-card";
import { Section } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCompleted } from "@/hooks/use-user-data";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { ACTIVITIES, AREAS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { parseAnswers, rankAreas } from "@/lib/matching";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "My dashboard — Kakuma Skills to Success" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

const card = "rounded-2xl border border-border bg-card p-6 shadow-soft";

function Dashboard() {
  const { t } = useLang();
  const { user } = useAuth();
  const navigate = useNavigate();
  const profile = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (!user || profile.isLoading) {
    return <div className="py-24 text-center text-muted-foreground">{t("Loading…", "Inapakia…")}</div>;
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/" });
  };

  return (
    <>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 py-10 sm:px-6">
          <div className="min-w-0">
            <p className="font-bold text-primary">{t("My dashboard", "Dashibodi yangu")}</p>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">
              {t("Welcome", "Karibu")}{profile.data?.full_name ? `, ${profile.data.full_name}` : ""}
            </h1>
            <p className="mt-1 truncate text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={() => void signOut()} className="h-11 rounded-full px-5 text-base">{t("Sign out", "Toka")}</Button>
        </div>
      </section>
      {profile.data?.consent_at ? (
        <Workspace userId={user.id} profile={profile.data} />
      ) : (
        <ConsentGate userId={user.id} defaultName={typeof user.user_metadata["full_name"] === "string" ? user.user_metadata["full_name"] : ""} />
      )}
    </>
  );
}

/** Nothing personal is stored until the person agrees here. */
function ConsentGate({ userId, defaultName }: { userId: string; defaultName: string }) {
  const { t } = useLang();
  const qc = useQueryClient();
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState(defaultName);
  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("profiles").upsert({ id: userId, full_name: name.trim(), consent_at: new Date().toISOString() });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
    onError: () => toast.error(t("We could not save. Please try again.", "Hatukuweza kuhifadhi. Tafadhali jaribu tena.")),
  });

  return (
    <Section className="max-w-2xl">
      <div className={card}>
        <div className="flex items-center gap-3">
          <ShieldCheck className="size-8 shrink-0 text-primary" />
          <h2 className="text-2xl font-bold">{t("Your agreement, before we save anything", "Ridhaa yako, kabla hatujahifadhi chochote")}</h2>
        </div>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li>• {t("We will store your name, questionnaire answers, progress, saved opportunities and portfolio.", "Tutahifadhi jina lako, majibu ya dodoso, maendeleo, fursa ulizohifadhi na jalada lako.")}</li>
          <li>• {t("Only you can see them, unless you choose to share your portfolio.", "Ni wewe tu unayeweza kuviona, isipokuwa ukichagua kushiriki jalada lako.")}</li>
          <li>• {t("You can delete everything at any time from this dashboard.", "Unaweza kufuta kila kitu wakati wowote kutoka kwenye dashibodi hii.")}</li>
          <li>• {t("Never enter ID numbers, ration card numbers or health details.", "Usiandike kamwe namba za vitambulisho, namba za kadi ya mgao wala taarifa za afya.")}</li>
        </ul>
        <div className="mt-5 space-y-1.5">
          <Label htmlFor="consent-name" className="text-base">{t("Your name", "Jina lako")}</Label>
          <Input id="consent-name" value={name} maxLength={120} onChange={(e) => setName(e.target.value)} className="h-12 text-base" />
        </div>
        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl bg-secondary p-4">
          <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-1 size-5" />
          <span className="font-medium">
            {t("I agree to my information being stored as described. ", "Ninakubali taarifa zangu zihifadhiwe kama ilivyoelezwa. ")}
            <Link to="/privacy" className="text-primary underline">{t("Privacy notice", "Taarifa ya faragha")}</Link>
          </span>
        </label>
        <Button disabled={!agree || save.isPending} onClick={() => save.mutate()} className="mt-5 h-12 rounded-full px-7 text-base font-bold">
          {t("Agree and continue", "Kubali na uendelee")}
        </Button>
      </div>
    </Section>
  );
}

type Profile = { id: string; full_name: string; headline: string; bio: string; portfolio_public: boolean };

function Workspace({ userId, profile }: { userId: string; profile: Profile }) {
  const { t, tl } = useLang();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { ids: completed } = useCompleted();

  const assessment = useQuery({
    queryKey: ["assessment", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("skill_assessments").select("answers").eq("user_id", userId).maybeSingle();
      if (error) throw error;
      return parseAnswers(data?.answers);
    },
  });
  const saved = useQuery({
    queryKey: ["saved", userId, "full"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_opportunities")
        .select("opportunity_id, opportunities(id, kind, title, organization, summary, location, deadline, apply_url)");
      if (error) throw error;
      return data.flatMap((r) => (r.opportunities ? [r.opportunities] : []));
    },
  });
  const items = useQuery({
    queryKey: ["portfolio-items", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("portfolio_items").select("id, title, description, link").eq("user_id", userId).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const answers = assessment.data ?? null;
  const topAreas = answers ? rankAreas(answers) : [];
  const recommended = ACTIVITIES.filter((a) => topAreas.includes(a.area) && !completed.includes(a.id)).slice(0, 4);
  const percent = Math.round((completed.length / ACTIVITIES.length) * 100);

  // Profile form
  const [form, setForm] = useState({ full_name: profile.full_name, headline: profile.headline, bio: profile.bio });
  useEffect(() => setForm({ full_name: profile.full_name, headline: profile.headline, bio: profile.bio }), [profile.full_name, profile.headline, profile.bio]);
  const saveProfile = useMutation({
    mutationFn: async (patch: Partial<Profile>) => {
      const { error } = await supabase.from("profiles").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(t("Saved", "Imehifadhiwa"));
      return qc.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => toast.error(t("We could not save. Please try again.", "Hatukuweza kuhifadhi. Tafadhali jaribu tena.")),
  });

  // Portfolio items
  const [item, setItem] = useState({ title: "", description: "", link: "" });
  const addItem = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("portfolio_items").insert({ user_id: userId, title: item.title.trim(), description: item.description.trim(), link: item.link.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      setItem({ title: "", description: "", link: "" });
      return qc.invalidateQueries({ queryKey: ["portfolio-items"] });
    },
    onError: () => toast.error(t("We could not add this item.", "Hatukuweza kuongeza kazi hii.")),
  });
  const removeItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portfolio-items"] }),
  });

  const deleteAll = useMutation({
    mutationFn: async () => {
      const results = await Promise.all([
        supabase.from("skill_assessments").delete().eq("user_id", userId),
        supabase.from("completed_activities").delete().eq("user_id", userId),
        supabase.from("saved_opportunities").delete().eq("user_id", userId),
        supabase.from("mentor_requests").delete().eq("user_id", userId),
        supabase.from("profiles").delete().eq("id", userId), // portfolio items go with the profile
      ]);
      const failed = results.find((r) => r.error);
      if (failed?.error) throw failed.error;
      await supabase.auth.signOut();
    },
    onSuccess: () => {
      qc.clear();
      toast.success(t("Your saved information was deleted.", "Taarifa zako zilizohifadhiwa zimefutwa."));
      void navigate({ to: "/" });
    },
    onError: () => toast.error(t("We could not delete everything. Please try again.", "Hatukuweza kufuta kila kitu. Tafadhali jaribu tena.")),
  });

  const shareUrl = typeof window === "undefined" ? "" : `${window.location.origin}/portfolio/${userId}`;

  return (
    <Section className="grid gap-6 lg:grid-cols-2">
      <div className={card}>
        <h2 className="text-2xl font-bold">{t("Skill progress", "Maendeleo ya ujuzi")}</h2>
        <p className="mt-3 font-semibold">{completed.length} / {ACTIVITIES.length} {t("activities completed", "shughuli zimekamilika")}</p>
        <Progress value={percent} className="mt-2 h-3" />
        {topAreas.length ? (
          <>
            <h3 className="mt-5 font-bold">{t("Your strongest areas", "Maeneo yako imara")}</h3>
            <ul className="mt-2 space-y-1">
              {topAreas.map((id) => <li key={id} className="flex items-center gap-2"><Check className="size-5 text-success" />{tl(AREAS[id].name)}</li>)}
            </ul>
            <Link to="/careers" search={{ areas: topAreas.join(","), edu: answers?.education ?? "secondary" }} className="mt-4 inline-block font-bold text-primary underline">
              {t("See careers that match", "Ona kazi zinazolingana")}
            </Link>
          </>
        ) : (
          <div className="mt-5 rounded-xl bg-sun-soft p-4">
            <p className="font-medium">{t("You have not taken the skills questionnaire yet.", "Bado hujajibu dodoso la ujuzi.")}</p>
            <Link to="/discover" className="mt-2 inline-block font-bold text-primary underline">{t("Discover Your Skills", "Gundua Ujuzi Wako")}</Link>
          </div>
        )}
      </div>

      <div className={card}>
        <h2 className="text-2xl font-bold">{t("Recommended for you", "Tunakupendekezea")}</h2>
        {recommended.length ? (
          <ul className="mt-4 space-y-3">
            {recommended.map((a) => (
              <li key={a.id} className="rounded-xl bg-secondary p-4">
                <p className="font-bold">{tl(a.title)}</p>
                <Link to="/skills" search={{ area: a.area }} className="text-[0.95rem] font-semibold text-primary underline">{tl(AREAS[a.area].name)}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-muted-foreground">
            {topAreas.length
              ? t("You have completed every activity in your top areas. Explore other areas next.", "Umekamilisha kila shughuli katika maeneo yako makuu. Angalia maeneo mengine sasa.")
              : t("Take the questionnaire to get activities chosen for you.", "Jibu dodoso ili upate shughuli zilizochaguliwa kwa ajili yako.")}{" "}
            <Link to="/skills" className="font-bold text-primary underline">{t("All activities", "Shughuli zote")}</Link>
          </p>
        )}
      </div>

      <form
        className={card}
        onSubmit={(e: FormEvent) => { e.preventDefault(); saveProfile.mutate({ full_name: form.full_name.trim(), headline: form.headline.trim(), bio: form.bio.trim() }); }}
      >
        <h2 className="text-2xl font-bold">{t("My profile", "Wasifu wangu")}</h2>
        <div className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="p-name" className="text-base">{t("Name", "Jina")}</Label>
            <Input id="p-name" value={form.full_name} maxLength={120} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="h-12 text-base" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-headline" className="text-base">{t("What you do, in one line", "Unachofanya, kwa mstari mmoja")}</Label>
            <Input id="p-headline" value={form.headline} maxLength={160} placeholder={t("e.g. Tailor and fashion designer", "mf. Mshonaji na mbunifu wa mitindo")} onChange={(e) => setForm({ ...form, headline: e.target.value })} className="h-12 text-base" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-bio" className="text-base">{t("About you", "Kuhusu wewe")}</Label>
            <Textarea id="p-bio" rows={4} value={form.bio} maxLength={1500} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="text-base" />
          </div>
        </div>
        <Button type="submit" disabled={saveProfile.isPending} className="mt-5 h-12 rounded-full px-7 text-base font-bold">{t("Save profile", "Hifadhi wasifu")}</Button>
      </form>

      <div className={card}>
        <h2 className="text-2xl font-bold">{t("My portfolio", "Jalada langu la kazi")}</h2>
        <p className="mt-1 text-muted-foreground">{t("Add finished work, references or achievements — your proof of skill.", "Ongeza kazi zilizokamilika, mapendekezo au mafanikio — ushahidi wa ujuzi wako.")}</p>
        <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-secondary p-4">
          <Label htmlFor="share" className="text-base font-semibold">{t("Share my portfolio with a link", "Shiriki jalada langu kwa kiungo")}</Label>
          <Switch id="share" checked={profile.portfolio_public} onCheckedChange={(v) => saveProfile.mutate({ portfolio_public: v })} />
        </div>
        {profile.portfolio_public ? (
          <p className="mt-2 break-all text-[0.95rem]">
            <Link to="/portfolio/$userId" params={{ userId }} className="font-semibold text-primary underline">{shareUrl}</Link>
          </p>
        ) : null}

        <ul className="mt-4 space-y-3">
          {(items.data ?? []).map((i) => (
            <li key={i.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-xl border border-border p-4">
              <div className="min-w-0">
                <p className="font-bold">{i.title}</p>
                {i.description ? <p className="text-[0.95rem] text-muted-foreground">{i.description}</p> : null}
                {i.link ? <p className="truncate text-sm text-primary">{i.link}</p> : null}
              </div>
              <Button variant="ghost" size="icon" aria-label={t("Remove", "Ondoa")} onClick={() => removeItem.mutate(i.id)}><Trash2 /></Button>
            </li>
          ))}
        </ul>

        <form className="mt-4 space-y-3" onSubmit={(e: FormEvent) => { e.preventDefault(); addItem.mutate(); }}>
          <Input aria-label={t("Title", "Kichwa")} placeholder={t("Title, e.g. School uniforms for 12 children", "Kichwa, mf. Sare za shule za watoto 12")} required maxLength={140} value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} className="h-12 text-base" />
          <Textarea aria-label={t("Description", "Maelezo")} placeholder={t("What did you do and what was the result?", "Ulifanya nini na matokeo yalikuwa nini?")} rows={2} maxLength={1500} value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} className="text-base" />
          <Input aria-label={t("Link", "Kiungo")} type="url" placeholder={t("Link to a photo or page (optional)", "Kiungo cha picha au ukurasa (si lazima)")} maxLength={500} value={item.link} onChange={(e) => setItem({ ...item, link: e.target.value })} className="h-12 text-base" />
          <Button type="submit" variant="outline" disabled={addItem.isPending} className="h-11 rounded-full px-5 text-base">{t("Add to portfolio", "Ongeza kwenye jalada")}</Button>
        </form>
      </div>

      <div className={`${card} lg:col-span-2`}>
        <h2 className="text-2xl font-bold">{t("Saved opportunities", "Fursa ulizohifadhi")}</h2>
        {saved.data?.length ? (
          <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {saved.data.map((o) => <OpportunityCard key={o.id} item={o} />)}
          </div>
        ) : (
          <p className="mt-3 text-muted-foreground">
            {t("You have not saved any opportunities yet.", "Bado hujahifadhi fursa yoyote.")}{" "}
            <Link to="/opportunities" className="font-bold text-primary underline">{t("Open the Opportunity Hub", "Fungua Kituo cha Fursa")}</Link>
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-destructive/40 p-6 lg:col-span-2">
        <h2 className="text-xl font-bold">{t("Delete my information", "Futa taarifa zangu")}</h2>
        <p className="mt-1 text-muted-foreground">{t("This removes your profile, answers, progress, saved opportunities and portfolio. It cannot be undone.", "Hii inaondoa wasifu wako, majibu, maendeleo, fursa ulizohifadhi na jalada. Haiwezi kutenduliwa.")}</p>
        <Button
          variant="destructive"
          disabled={deleteAll.isPending}
          onClick={() => { if (window.confirm(t("Delete everything you have saved?", "Futa kila kitu ulichohifadhi?"))) deleteAll.mutate(); }}
          className="mt-4 h-11 rounded-full px-5 text-base"
        >
          {t("Delete everything", "Futa kila kitu")}
        </Button>
      </div>
    </Section>
  );
}
