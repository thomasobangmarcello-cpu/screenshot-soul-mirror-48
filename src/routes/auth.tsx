import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { POST_AUTH_KEY, useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: seo("Sign in — Kakuma Skills to Success", "Sign in or create a free account to save your skills results, track progress and build a portfolio.") }),
  component: AuthPage,
});

function GoogleLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="!size-[18px]">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}

function AuthPage() {
  const { t } = useLang();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (user) void navigate({ to: "/dashboard" });
  }, [user, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setNotice("");
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin, data: { full_name: name.trim() } },
        });
        if (error) throw error;
        if (!data.session) setNotice(t("Check your email and open the link we sent to confirm your account. Then come back and sign in.", "Angalia barua pepe yako na ufungue kiungo tulichotuma ili kuthibitisha akaunti yako. Kisha rudi uingie."));
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setNotice(t("If that email has an account, a reset link is on its way.", "Kama barua pepe hiyo ina akaunti, kiungo cha kubadilisha nenosiri kimetumwa."));
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("Something went wrong.", "Hitilafu imetokea."));
    } finally {
      setBusy(false);
    }
  };

  const social = async (provider: "google" | "lovable") => {
    window.sessionStorage.setItem(POST_AUTH_KEY, "1");
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    if (result.error) {
      window.sessionStorage.removeItem(POST_AUTH_KEY);
      toast.error(t("Sign-in did not work. Please try again.", "Kuingia hakukufanikiwa. Tafadhali jaribu tena."));
    }
  };

  const title = { signin: t("Welcome back", "Karibu tena"), signup: t("Create your free account", "Fungua akaunti yako ya bure"), forgot: t("Reset your password", "Badilisha nenosiri lako") }[mode];

  return (
    <div className="bg-secondary">
      <div className="mx-auto max-w-md px-4 py-12 md:py-16">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">
            {t("An account keeps your results, progress and portfolio. Before anything is saved, we will ask for your agreement.", "Akaunti huhifadhi matokeo, maendeleo na jalada lako. Kabla ya kuhifadhi chochote, tutaomba ridhaa yako.")}{" "}
            <Link to="/privacy" className="font-semibold text-primary underline">{t("Privacy notice", "Taarifa ya faragha")}</Link>
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" ? (
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-base">{t("Your name", "Jina lako")}</Label>
                <Input id="name" value={name} maxLength={120} onChange={(e) => setName(e.target.value)} autoComplete="name" className="h-12 text-base" />
              </div>
            ) : null}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-base">{t("Email", "Barua pepe")}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="h-12 text-base" />
            </div>
            {mode !== "forgot" ? (
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-base">{t("Password", "Nenosiri")}</Label>
                <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} className="h-12 text-base" />
                {mode === "signup" ? <p className="text-sm text-muted-foreground">{t("At least 8 characters.", "Angalau herufi 8.")}</p> : null}
              </div>
            ) : null}
            {notice ? <p role="status" className="rounded-xl bg-sun-soft p-4 font-medium">{notice}</p> : null}
            <Button type="submit" disabled={busy} className="h-12 w-full rounded-full text-base font-bold">
              {{ signin: t("Sign in", "Ingia"), signup: t("Create account", "Fungua akaunti"), forgot: t("Send reset link", "Tuma kiungo") }[mode]}
            </Button>
          </form>

          {mode !== "forgot" ? (
            <>
              <div className="my-6 flex items-center gap-3 text-sm text-muted-foreground"><span className="h-px flex-1 bg-border" />{t("or", "au")}<span className="h-px flex-1 bg-border" /></div>
              <div className="space-y-3">
                <Button type="button" variant="outline" onClick={() => void social("google")} className="google-btn h-12 w-full rounded-full text-sm font-medium">
                  <GoogleLogo /> {t("Continue with Google", "Endelea na Google")}
                </Button>
                <Button type="button" variant="outline" onClick={() => void social("lovable")} className="h-12 w-full rounded-full text-sm font-medium">
                  <LovableMark className="!size-[18px]" /> {t("Continue with Lovable", "Endelea na Lovable")}
                </Button>
              </div>
            </>
          ) : null}

          <div className="mt-6 space-y-2 text-center">
            {mode === "signin" ? (
              <>
                <button type="button" onClick={() => { setMode("signup"); setNotice(""); }} className="block w-full font-bold text-primary underline">{t("New here? Create an account", "Mgeni? Fungua akaunti")}</button>
                <button type="button" onClick={() => { setMode("forgot"); setNotice(""); }} className="block w-full text-muted-foreground underline">{t("Forgot your password?", "Umesahau nenosiri?")}</button>
              </>
            ) : (
              <button type="button" onClick={() => { setMode("signin"); setNotice(""); }} className="font-bold text-primary underline">{t("I already have an account", "Tayari nina akaunti")}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
