import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { languageOptions, translations, type Language, type Translations } from "./translations";

const storageKey = "yurlz-language";

function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "pt" || saved === "en" || saved === "es") return saved;
  } catch {
    // Language selection still works when browser storage is unavailable.
  }
  return "pt";
}

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useLayoutEffect(() => {
    document.documentElement.lang = languageOptions.find((option) => option.value === language)!.locale;
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // Keep the current language even if the preference cannot be saved.
    }
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
