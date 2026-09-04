import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

export type SiteLanguage = "en" | "ms";

const languageCopy = {
  en: {
    menu: "Menu",
    close: "Close",
    book: "Book on WhatsApp",
    enquiry: "Start an enquiry on WhatsApp",
    launch: "Ask Long Taa",
    guideKicker: "Long Taa journey companion",
    guideTitle: "Plan your visit",
    guideWelcome: "Ask a question, or build a complete trip brief that Clement can review without repeating the basics.",
    guideStart: "Choose a starting point",
    guidePlaceholder: "Ask a question or prepare an enquiry",
    send: "Send",
    stop: "Stop",
    clear: "Clear chat",
    footer: "Planning support by Kimi AI. Please do not share sensitive information. Confirm availability and final prices with Long Taa.",
    thinking: "Finding the best next step…",
    you: "You",
    companion: "Long Taa companion",
    guide: "Long Taa Guide",
    continuePlanning: "Continue planning",
    dismiss: "Dismiss",
    footerTagline: "Nature · Culture · Adventure · Living Heritage",
    footerNote: "A respectful visit begins with listening to the people and place that welcome you.",
    visitRespectfully: "Visit with respect",
    mobileBooking: "Book on WhatsApp",
    rights: "All rights reserved.",
  },
  ms: {
    menu: "Menu",
    close: "Tutup",
    book: "Tempah melalui WhatsApp",
    enquiry: "Mulakan pertanyaan di WhatsApp",
    launch: "Tanya Long Taa",
    guideKicker: "Teman perjalanan Long Taa",
    guideTitle: "Rancang kunjungan anda",
    guideWelcome: "Tanya soalan, atau sediakan ringkasan perjalanan lengkap untuk semakan Clement tanpa mengulangi maklumat asas.",
    guideStart: "Pilih titik permulaan",
    guidePlaceholder: "Tanya soalan atau sediakan pertanyaan",
    send: "Hantar",
    stop: "Berhenti",
    clear: "Kosongkan chat",
    footer: "Sokongan perancangan oleh Kimi AI. Jangan kongsi maklumat sensitif. Sahkan ketersediaan dan harga akhir dengan Long Taa.",
    thinking: "Mencari langkah terbaik seterusnya…",
    you: "Anda",
    companion: "Teman Long Taa",
    guide: "Panduan Long Taa",
    continuePlanning: "Teruskan perancangan",
    dismiss: "Tutup",
    footerTagline: "Alam · Budaya · Pengembaraan · Warisan Hidup",
    footerNote: "Kunjungan yang penuh hormat bermula dengan mendengar orang dan tempat yang mengalu-alukan anda.",
    visitRespectfully: "Kunjungi dengan hormat",
    mobileBooking: "Tempah di WhatsApp",
    rights: "Hak cipta terpelihara.",
  },
} as const;

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
  copy: (typeof languageCopy)[SiteLanguage];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: Readonly<{ children: ReactNode }>) {
  // Keep the first client render aligned with SSR. Apply a saved preference
  // after hydration so a Bahasa visitor does not hit a React mismatch.
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const [hasLoadedPreference, setHasLoadedPreference] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("long-taa-language") === "ms") {
      setLanguage("ms");
    }
    setHasLoadedPreference(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "ms" ? "ms" : "en";
    if (hasLoadedPreference) {
      window.localStorage.setItem("long-taa-language", language);
    }
  }, [hasLoadedPreference, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, copy: languageCopy[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used within LanguageProvider");
  return value;
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-toggle" role="group" aria-label="Website language">
      <button type="button" className={language === "en" ? "is-active" : ""} aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
      <button type="button" className={language === "ms" ? "is-active" : ""} aria-pressed={language === "ms"} onClick={() => setLanguage("ms")}>BM</button>
    </div>
  );
}
