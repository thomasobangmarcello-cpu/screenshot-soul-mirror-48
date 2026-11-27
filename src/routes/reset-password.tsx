import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Choose a new password — Kakuma Skills to Success" }, { name: "robots", content: "noindex" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const { t } = useLang();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return void toast.error(error.message);
    toast.success(t("Password changed", "Nenosiri limebadilishwa"));
    void navigate({ to: "/dashboard" });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">{t("Choose a new password", "Chagua nenosiri jipya")}</h1>
      {!loading && !user ? (
        <p className="mt-4 text-muted-foreground">{t("This link has expired or was already used. Ask for a new reset link from the sign-in page.", "Kiungo hiki kimeisha muda au kimeshatumika. Omba kiungo kipya kwenye ukurasa wa kuingia.")}</p>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="new-password" className="text-base">{t("New password", "Nenosiri jipya")}</Label>
            <Input id="new-password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" className="h-12 text-base" />
          </div>
          <Button type="submit" disabled={busy || loading} className="h-12 w-full rounded-full text-base font-bold">{t("Save password", "Hifadhi nenosiri")}</Button>
        </form>
      )}
    </div>
  );
}
