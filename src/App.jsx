// src/App.jsx 
import { useEffect, useState } from "react";
import Board from "./components/Board";
import AddEditModal from "./components/AddEditModal";
import ThemeToggle from "./components/ThemeToggle"; // non toccare
import CsvBar from "./components/CsvBar.jsx";
import LanguageToggle from "./components/LanguageToggle.jsx";
import { useI18n } from "./i18n.jsx";
import Footer from "./components/Footer.jsx";
import DockNav from "./components/DockNav.jsx";
import Landing from "./pages/Landing.jsx";
import QuickAddAssistant from "./components/QuickAddAssistant.jsx";
import { toCsv, downloadText, parseCsvFile, normalizeRow } from "./utils/csv.js";
import {
  db,
  seedIfEmpty,
  STATUSES,
  createApplication,
  updateApplication,
  deleteApplication,
} from "./db";

export default function App() {
  const { t } = useI18n();

  const [apps, setApps] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showApp, setShowApp] = useState(false); // Landing → App

  async function load() {
    const all = await db.applications.toArray();
    setApps(all);
  }

  useEffect(() => {
    (async () => {
      await seedIfEmpty();
      await load();
    })();
  }, []);

  // apri direttamente l'app se URL contiene #app o ?app=1
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    if (window.location.hash === "#app" || qs.get("app") === "1") {
      setShowApp(true);
    }
  }, []);

  // Persist move from Board
  async function persistMove(id, to, index, fromItems, toItems) {
    await db.transaction("rw", db.applications, async () => {
      await db.applications.update(id, { status: to, order: index });
      for (const it of fromItems) {
        await db.applications.update(it.id, { order: it.order, status: it.status });
      }
      if (toItems) {
        for (const it of toItems) {
          await db.applications.update(it.id, { order: it.order, status: it.status });
        }
      }
    });
  }

  // CRUD
  async function handleAddSave(values) {
    await createApplication(values);
    setOpen(false);
    await load();
  }
  async function handleEditSave(values) {
    if (!editing) return;
    await updateApplication(editing.id, values);
    setEditing(null);
    await load();
  }
  async function handleDelete(id) {
    await deleteApplication(id);
    await load();
  }

  // CSV
  async function handleExportCSV() {
    const all = await db.applications.toArray();
    const csv = toCsv(all);
    downloadText("applications.csv", csv);
  }
  async function handleImportCSV(file, { replace }) {
    const rows = await parseCsvFile(file);
    const appsNorm = rows.map(normalizeRow);
    await db.transaction("rw", db.applications, async () => {
      if (replace) await db.applications.clear();
      const counts = {};
      for (const s of STATUSES) {
        counts[s] = await db.applications.where({ status: s }).count();
      }
      for (const a of appsNorm) {
        a.order = counts[a.status]++;
        await db.applications.add(a);
      }
    });
    await load();
  }

  // handler CTA della landing
  function openApp() {
    setShowApp(true);
    try { window.location.hash = "app"; } catch {}
  }

  return (
    // Grid full-bleed: 1 riga contenuto + 1 riga footer
    <div className="min-h-screen grid grid-rows-[1fr_auto] bg-white text-zinc-900 dark:bg-gray-950 dark:text-gray-100">
      {/* MAIN */}
      <main className="w-full">
        {showApp ? (
          // ======= APP =======
          <div className="mx-auto w-full max-w-[2400px] 4xl:max-w-[3200px] px-6 pt-10 pb-28">
            <header className="mb-8 grid gap-3 sm:flex sm:items-center sm:justify-between">
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                {t("title")}
              </h1>
              {/* Azioni visibili solo su desktop */}
              <div className="hidden lg:flex items-center gap-2">
                <CsvBar onImport={handleImportCSV} onExport={handleExportCSV} />
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-lg bg-cyan-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-cyan-700"
                >
                  + {t("add_application")}
                </button>
              </div>
            </header>

            <Board
              apps={apps}
              setApps={setApps}
              onEdit={(app) => setEditing(app)}
              onDelete={handleDelete}
              persistMove={persistMove}
            />

            {/* Modals */}
            <AddEditModal open={open} onClose={() => setOpen(false)} onSave={handleAddSave} />
            <AddEditModal
              open={Boolean(editing)}
              onClose={() => setEditing(null)}
              onSave={handleEditSave}
              initial={editing}
            />

            {/* Dock mobile (solo < lg) */}
            <div className="lg:hidden">
              <DockNav
                onAdd={() => setOpen(true)}
                onImport={handleImportCSV}
                onExport={handleExportCSV}
              />
            </div>
          </div>
        ) : (
          // ======= LANDING =======
          <div className="mx-auto w-full">
            <Landing onStart={openApp} repoUrl="#" />
          </div>
        )}
      </main>

      {/* FOOTER full-bleed */}
      <Footer />

      {/* Floating toggles (stile/posizione definiti nei componenti) */}
      {typeof ThemeToggle === "function" ? <ThemeToggle /> : null}
      <LanguageToggle />
      <QuickAddAssistant onCreate={handleAddSave} />
    </div>
  );
}
