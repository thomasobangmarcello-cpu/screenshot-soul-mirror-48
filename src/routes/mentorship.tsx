import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState, PageHeader, Section } from "@/components/page-header";
import { RouteError, RouteNotFound } from "@/components/route-states";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { mentorsQuery, type Mentor } from "@/lib/queries";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/mentorship")({
  loader: ({ context }) => context.queryClient.ensureQueryData(mentorsQuery),
  head: () => ({ meta: seo("Mentorship — Kakuma Skills to Success", "Browse and connect with verified mentors, industry professionals and experienced community leaders.") }),
  component: Mentorship,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});

function Mentorship() {
  const { t } = useLang();
  const { user } = useAuth();
  const { data: mentors } = useSuspenseQuery(mentorsQuery);
  const requests = useQuery({
    queryKey: ["mentor-requests", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("mentor_requests").select("mentor_id");
      if (error) throw error;
      return data.map((r) => r.mentor_id);
    },
  });

  const steps = [
    { title: t("Browse", "Angalia"), body: t("Read each mentor's background and what they can help with.", "Soma historia ya kila mshauri na anachoweza kukusaidia.") },
    { title: t("Request", "Omba"), body: t("Send a short message about what you want to learn.", "Tuma ujumbe mfupi kuhusu unachotaka kujifunza.") },
    { title: t("Prepare", "Jiandae"), body: t("Bring one clear question and your portfolio to the first conversation.", "Leta swali moja lililo wazi na jalada lako kwenye mazungumzo ya kwanza.") },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("Mentorship", "Ushauri")}
        title={t("Learn from people who have walked the path", "Jifunze kutoka kwa watu waliopita njia hii")}
        intro={t("Every mentor shown here has been verified. Connect with professionals and experienced community leaders.", "Kila mshauri anayeonyeshwa hapa amethibitishwa. Ungana na wataalamu na viongozi wazoefu wa jamii.")}
      />
      <Section>
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-secondary p-6">
              <span className="grid size-10 place-items-center rounded-full bg-accent font-display text-lg font-extrabold text-accent-foreground">{i + 1}</span>
              <h2 className="mt-3 text-xl font-bold">{s.title}</h2>
              <p className="mt-1 text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 text-3xl font-bold">{t("Verified mentors", "Washauri waliothibitishwa")}</h2>
        <div className="mt-6">
          {mentors.length === 0 ? (
            <EmptyState
              title={t("No verified mentors yet", "Bado hakuna washauri waliothibitishwa")}
              body={t(
                "Mentors appear here only after their identity and experience have been confirmed. None have been added yet.",
                "Washauri huonekana hapa tu baada ya utambulisho na uzoefu wao kuthibitishwa. Bado hakuna aliyeongezwa.",
              )}
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {mentors.map((m) => (
                <MentorCard key={m.id} mentor={m} userId={user?.id ?? null} requested={(requests.data ?? []).includes(m.id)} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

function MentorCard({ mentor, userId, requested }: { mentor: Mentor; userId: string | null; requested: boolean }) {
  const { t } = useLang();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const send = useMutation({
    mutationFn: async () => {
      if (!userId) return;
      const { error } = await supabase.from("mentor_requests").insert({ user_id: userId, mentor_id: mentor.id, message: message.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      setOpen(false);
      toast.success(t("Request sent", "Ombi limetumwa"));
      return qc.invalidateQueries({ queryKey: ["mentor-requests"] });
    },
    onError: () => toast.error(t("We could not send your request.", "Hatukuweza kutuma ombi lako.")),
  });

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <span className="inline-flex items-center gap-1 text-sm font-bold text-success"><BadgeCheck className="size-4" />{t("Verified", "Amethibitishwa")}</span>
      <h3 className="mt-2 text-xl font-bold">{mentor.full_name}</h3>
      <p className="font-medium text-muted-foreground">{[mentor.role_title, mentor.organization].filter(Boolean).join(" · ")}</p>
      {mentor.expertise ? <p className="mt-2 font-semibold">{mentor.expertise}</p> : null}
      {mentor.bio ? <p className="mt-2 flex-1 text-muted-foreground">{mentor.bio}</p> : null}
      <div className="mt-4">
        {!userId ? (
          <Link to="/auth" className="inline-flex h-11 items-center rounded-full border border-input px-5 font-semibold">{t("Sign in to connect", "Ingia ili kuungana")}</Link>
        ) : requested ? (
          <p className="font-bold text-success">{t("Request sent", "Ombi limetumwa")}</p>
        ) : open ? (
          <div className="space-y-3">
            <Textarea value={message} maxLength={1000} onChange={(e) => setMessage(e.target.value)} placeholder={t("What would you like to learn?", "Ungependa kujifunza nini?")} aria-label={t("Message to mentor", "Ujumbe kwa mshauri")} />
            <Button disabled={!message.trim() || send.isPending} onClick={() => send.mutate()} className="h-11 rounded-full px-5 text-base">{t("Send request", "Tuma ombi")}</Button>
          </div>
        ) : (
          <Button onClick={() => setOpen(true)} className="h-11 rounded-full px-5 text-base">{t("Request to connect", "Omba kuungana")}</Button>
        )}
      </div>
    </article>
  );
}
