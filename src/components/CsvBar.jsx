// src/components/CsvBar.jsx
import { useRef, useState } from "react";
import { useI18n } from "../i18n.jsx";

export default function CsvBar({ onImport, onExport }) {
  const { t } = useI18n();
  const fileRef = useRef(null);
  const [replace, setReplace] = useState(false);

  function openPicker() {
    fileRef.current?.click();
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={openPicker}
        className="rounded-lg border px-3 py-1.5 text-sm transition-colors
                   border-black/10 bg-white hover:bg-zinc-50
                   dark:border-white/10 dark:bg-gray-900/60 dark:hover:bg-gray-800"
      >
        {t("import_csv")}
      </button>

      <button
        onClick={onExport}
        className="rounded-lg bg-cyan-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
      >
        {t("export_csv")}
      </button>

      <label className="ml-2 inline-flex items-center gap-2 text-xs text-zinc-600 dark:text-gray-400">
        <input
          type="checkbox"
          className="accent-cyan-600 dark:accent-cyan-400"
          checked={replace}
          onChange={(e) => setReplace(e.target.checked)}
        />
        {t("replace_existing")}
      </label>

      <input
        ref={fileRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (f) {
            await onImport(f, { replace });
            e.target.value = ""; // reset
          }
        }}
      />
    </div>
  );
}
