import { useI18n } from "../i18n.jsx";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const next = lang === "en" ? "sv" : "en";
  return (
    <button
      onClick={() => setLang(next)}
      aria-label={`Language: ${lang.toUpperCase()}`}
      title={`Language: ${lang.toUpperCase()}`}
      className="
        fixed z-50
        right-3 top-14
        md:top-auto md:bottom-20 md:right-4  /* a sinistra del theme (right-20) */

        /* mobile: chip borderless */
        inline-flex items-center justify-center
        w-10 h-10 p-0 rounded-full
        bg-transparent border-0 shadow-none
        text-xs font-bold uppercase
        text-zinc-700 dark:text-gray-100

        /* desktop: pill */
        md:w-auto md:h-auto md:px-4 md:py-3
        md:bg-white/70 md:border md:border-black/10 md:shadow md:backdrop-blur
        md:text-sm md:font-semibold
        md:dark:border-white/10 md:dark:bg-gray-800/70

        hover:bg-transparent md:hover:bg-white/90 md:dark:hover:bg-gray-800/90
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
      "
    >
      {lang.toUpperCase()}
    </button>
  );
}
