import { createContext, useContext, useEffect, useState } from "react";

const messages = {
  en: {
    title: "Job Application Tracker",
    add_application: "Add Application",
    import_csv: "Import CSV",
    export_csv: "Export CSV",
    replace_existing: "Replace existing",
    privacy: "Privacy",
    github_repo: "GitHub repo",
    built_with: "Built with",
    all_rights_reserved: "Created by Adina. All rights reserved",
    lp_title: "Track your job applications, privately.",
  lp_subtitle: "Offline-first, CSV import/export, EN/SV, light/dark. Your data stays in your browser.",
  lp_cta_open: "Open App",
  lp_cta_repo: "GitHub Repo",
  lp_feat_privacy_t: "Private by default",
  lp_feat_privacy_d: "Data is stored locally in your browser (IndexedDB).",
  lp_feat_offline_t: "Offline-first",
  lp_feat_offline_d: "Works without an internet connection.",
  lp_feat_csv_t: "CSV Import/Export",
  lp_feat_csv_d: "Bring your existing data or back it up anytime.",
  lp_feat_ui_t: "Clean UI",
  lp_feat_ui_d: "Dark/Light mode and English/Swedish.",
  lp_note: "Tip: You can toggle theme and language from the buttons on screen.",
  },
  sv: {
    title: "Jobbansökningstracker",
    add_application: "Lägg till ansökan",
    import_csv: "Importera CSV",
    export_csv: "Exportera CSV",
    replace_existing: "Ersätt befintliga",
    privacy: "Integritet",
    github_repo: "GitHub-repo",
    built_with: "Byggt med",
    all_rights_reserved: "Skapad av Adina. Alla rättigheter förbehållna",
    lp_title: "Spåra dina jobbansökningar – privat.",
  lp_subtitle: "Offline först, CSV import/export, EN/SV, ljust/mörkt. Dina data stannar i din webbläsare.",
  lp_cta_open: "Öppna appen",
  lp_cta_repo: "GitHub-repo",
  lp_feat_privacy_t: "Privat som standard",
  lp_feat_privacy_d: "Data lagras lokalt i din webbläsare (IndexedDB).",
  lp_feat_offline_t: "Offline först",
  lp_feat_offline_d: "Fungerar utan internetuppkoppling.",
  lp_feat_csv_t: "CSV-import/-export",
  lp_feat_csv_d: "Ta med din data eller säkerhetskopiera när som helst.",
  lp_feat_ui_t: "Ren UI",
  lp_feat_ui_d: "Mörkt/ljust läge och engelska/svenska.",
  lp_note: "Tips: Du kan växla tema och språk via knapparna på skärmen.",
  },
};

const I18nCtx = createContext({ lang: "en", t: (k) => k, setLang: () => {} });

export function I18nProvider({ children }) {
  const initial = () => localStorage.getItem("lang") || (navigator.language?.startsWith("sv") ? "sv" : "en");
  const [lang, setLang] = useState(initial);
  useEffect(() => localStorage.setItem("lang", lang), [lang]);
  const t = (key) => messages[lang]?.[key] ?? key;
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
