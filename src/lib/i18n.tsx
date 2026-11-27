import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "sw";
/** A piece of copy in both site languages. */
export type L = { en: string; sw: string };

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {} });
const STORAGE_KEY = "kss-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // The saved choice is read after hydration so server and first client render match.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "sw" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = useCallback((en: string, sw: string) => (lang === "sw" ? sw : en), [lang]);
  const tl = useCallback((l: L) => l[lang], [lang]);
  return { lang, setLang, t, tl };
}
