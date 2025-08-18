import { useTheme } from "../theme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      className="
        fixed z-50
        right-3 top-3
        md:top-auto md:bottom-20 md:right-20

        /* mobile: icon-only, borderless */
        inline-flex items-center justify-center
        w-10 h-10 p-0 rounded-full
        bg-transparent border-0 shadow-none
        text-2xl text-zinc-700 dark:text-gray-100

        /* desktop: your pill style */
        md:w-auto md:h-auto md:px-3 md:py-2
        md:bg-white/70 md:border md:border-black/10 md:shadow md:backdrop-blur
        md:text-lg md:text-inherit
        md:dark:border-white/10 md:dark:bg-gray-800/70

        hover:bg-transparent md:hover:bg-white/90 md:dark:hover:bg-gray-800/90
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
      "
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
