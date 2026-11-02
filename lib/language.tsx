"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Dictionary, type Locale } from "./dictionary";

type LanguageContextValue = {
  locale: Locale;
  localeReady: boolean;
  dir: "rtl" | "ltr";
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "albandary-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [localeReady, setLocaleReady] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("lang");
    if (query === "en" || query === "ar") {
      setLocaleState(query);
    } else {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ar") {
        setLocaleState(saved);
      }
    }
    setLocaleReady(true);
  }, []);

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.dataset.locale = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.title = dictionary[locale].meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", dictionary[locale].meta.description);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      locale,
      localeReady,
      dir: locale === "ar" ? "rtl" : "ltr",
      t: dictionary[locale] as Dictionary,
      setLocale: setLocaleState,
      toggleLocale: () => setLocaleState((prev) => (prev === "ar" ? "en" : "ar")),
    };
  }, [locale, localeReady]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return ctx;
}
