// src/components/DockNav.jsx
import { useRef } from "react";
import { useI18n } from "../i18n.jsx";

export default function DockNav({ onAdd, onImport, onExport }) {
  const fileRef = useRef(null);
  const { t } = useI18n();

  return (
    <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center" aria-label="Floating action dock">
      <div
        className="flex items-center gap-3 rounded-2xl border px-3 py-2 backdrop-blur
                   border-black/10 bg-white/80 shadow-sm
                   dark:border-white/10 dark:bg-gray-900/80"
      >
        {/* Import */}
        <button
          onClick={() => fileRef.current?.click()}
          className="rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100
                     dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label={t("import_csv")}
          title={t("import_csv")}
        >
          📥 Import
        </button>

        {/* Add */}
        <button
          onClick={onAdd}
          className="rounded-full px-4 py-3 text-base font-semibold text-white
                     bg-cyan-600 hover:bg-cyan-700 shadow"
          aria-label={t("add_application")}
          title={t("add_application")}
        >
          ➕ Add
        </button>

        {/* Export */}
        <button
          onClick={onExport}
          className="rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100
                     dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label={t("export_csv")}
          title={t("export_csv")}
        >
          📤 Export
        </button>

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f) {
              await onImport(f, { replace: false });
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}
