// src/pages/Landing.jsx
import { useI18n } from "../i18n.jsx";

export default function Landing({ onStart, repoUrl = "#" }) {
  const { t } = useI18n();

  return (
    <section className="w-full bg-gradient-to-b from-white to-zinc-50 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {t("lp_title")}
          </h1>
          <p className="mt-3 text-zinc-600 dark:text-gray-400 text-base md:text-lg">
            {t("lp_subtitle")}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onStart}
              className="rounded-xl bg-cyan-600 px-5 py-3 text-white font-semibold hover:bg-cyan-700"
            >
              {t("lp_cta_open")}
            </button>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg-zinc-50
                         dark:border-white/10 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              {t("lp_cta_repo")}
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🔒", title: t("lp_feat_privacy_t"), desc: t("lp_feat_privacy_d") },
            { icon: "📶", title: t("lp_feat_offline_t"), desc: t("lp_feat_offline_d") },
            { icon: "📥📤", title: t("lp_feat_csv_t"), desc: t("lp_feat_csv_d") },
            { icon: "🌙/☀️", title: t("lp_feat_ui_t"), desc: t("lp_feat_ui_d") },
          ].map((f) => (
            <article key={f.title} className="rounded-2xl border border-black/10 bg-white p-5
                                              dark:border-white/10 dark:bg-gray-900">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-2 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-gray-400">{f.desc}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500 dark:text-gray-400">
          {t("lp_note")}
        </p>
      </div>
    </section>
  );
}
