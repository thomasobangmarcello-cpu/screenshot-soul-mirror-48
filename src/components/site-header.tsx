import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";

const NAV = [
  { to: "/", en: "Home", sw: "Mwanzo" },
  { to: "/about", en: "About", sw: "Kuhusu" },
  { to: "/discover", en: "Discover", sw: "Gundua" },
  { to: "/skills", en: "Skills", sw: "Ujuzi" },
  { to: "/careers", en: "Careers", sw: "Kazi" },
  { to: "/opportunities", en: "Opportunities", sw: "Fursa" },
  { to: "/entrepreneurship", en: "Business", sw: "Biashara" },
  { to: "/mentorship", en: "Mentors", sw: "Washauri" },
] as const;

function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t("Language", "Lugha")} className="inline-flex shrink-0 rounded-full border border-input p-0.5 text-sm font-semibold">
      {(["en", "sw"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-3 py-1.5 transition-colors ${lang === code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {code === "en" ? "English" : "Kiswahili"}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useLang();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const account = user ? (
    <Button asChild size="sm" className="h-10 rounded-full px-5">
      <Link to="/dashboard" onClick={() => setOpen(false)}>{t("My dashboard", "Dashibodi yangu")}</Link>
    </Button>
  ) : (
    <Button asChild size="sm" className="h-10 rounded-full px-5">
      <Link to="/auth" onClick={() => setOpen(false)}>{t("Sign in", "Ingia")}</Link>
    </Button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <LogoMark className="size-9 shrink-0" />
          <span className="truncate font-display text-lg font-bold leading-none text-foreground">
            Kakuma <span className="text-primary">Skills to Success</span>
          </span>
        </Link>

        <nav aria-label={t("Main", "Kuu")} className="ml-auto hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3 py-2 text-[0.95rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "bg-secondary !text-secondary-foreground" }}
            >
              {t(item.en, item.sw)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-2">
          <div className="hidden sm:block"><LanguageToggle /></div>
          <div className="hidden xl:block">{account}</div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-11 xl:hidden" aria-label={t("Open menu", "Fungua menyu")}>
                <Menu className="!size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto">
              <SheetTitle className="font-display text-xl">{t("Menu", "Menyu")}</SheetTitle>
              <div className="mt-4"><LanguageToggle /></div>
              <nav className="mt-4 flex flex-col">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-lg font-medium text-foreground"
                    activeProps={{ className: "bg-secondary text-secondary-foreground" }}
                  >
                    {t(item.en, item.sw)}
                  </Link>
                ))}
              </nav>
              <div className="mt-4">{account}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
