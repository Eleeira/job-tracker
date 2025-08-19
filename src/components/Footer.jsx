import { useI18n } from "../i18n.jsx";

const REPO_URL = "https://github.com/Eleeira/job-tracker"; 

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 w-full border-t bg-stone-50 text-sm text-zinc-600
                  border-black/10 dark:bg-gray-900 dark:text-gray-400 dark:border-white/10">
  <div className="mx-auto w-full max-w-[2400px] px-6 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-zinc-800 dark:text-gray-100">{t("title")}</span>
          <span>·</span>
          <span>© {year}</span>
          <span>·</span>
          <span>{t("all_rights_reserved")}</span>
        </div>
    
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("github_repo")}
            className="hover:underline"
          >
            {t("github_repo")}
          </a>
          <span className="hidden sm:inline text-zinc-400">·</span>
          <span>{t("built_with")}: React + Vite + Tailwind</span>
        </nav>
      </div>
    </footer>
  );
}
