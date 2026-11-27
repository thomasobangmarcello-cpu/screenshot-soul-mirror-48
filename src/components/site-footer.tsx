import { Link } from "@tanstack/react-router";

import { LogoMark } from "@/components/logo";
import { useLang } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-9" />
            <span className="font-display text-lg font-bold">Kakuma Skills to Success</span>
          </div>
          <p className="mt-3 max-w-sm text-ink-foreground/80">
            {t("Discover Your Skills. Build Your Future.", "Gundua Ujuzi Wako. Jenga Maisha Yako ya Baadaye.")}
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-ink-foreground/85">
          <Link to="/discover" className="hover:text-accent">{t("Discover your skills", "Gundua ujuzi wako")}</Link>
          <Link to="/skills" className="hover:text-accent">{t("Skills development", "Kukuza ujuzi")}</Link>
          <Link to="/careers" className="hover:text-accent">{t("Career guidance", "Mwongozo wa kazi")}</Link>
          <Link to="/opportunities" className="hover:text-accent">{t("Opportunity hub", "Kituo cha fursa")}</Link>
        </nav>
        <nav className="flex flex-col gap-2 text-ink-foreground/85">
          <Link to="/entrepreneurship" className="hover:text-accent">{t("Entrepreneurship hub", "Kituo cha ujasiriamali")}</Link>
          <Link to="/mentorship" className="hover:text-accent">{t("Mentorship", "Ushauri")}</Link>
          <Link to="/about" className="hover:text-accent">{t("About us", "Kuhusu sisi")}</Link>
          <Link to="/privacy" className="hover:text-accent">{t("Privacy notice", "Taarifa ya faragha")}</Link>
        </nav>
      </div>
    </footer>
  );
}
