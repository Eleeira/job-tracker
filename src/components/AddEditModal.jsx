import { useEffect, useRef, useState } from "react";
import { STATUSES } from "../db";

export default function AddEditModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(() => ({
    company: "",
    role: "",
    location: "",
    status: "Applied",
    link: "",
    tags: "",
  }));
  const firstRef = useRef(null);

  useEffect(() => {
    if (open) {
      setForm({
        company: initial?.company || "",
        role: initial?.role || "",
        location: initial?.location || "",
        status: initial?.status || "Applied",
        link: initial?.link || "",
        tags: (initial?.tags || []).join(", "),
      });
      setTimeout(() => firstRef.current?.focus(), 0);
    }
  }, [open, initial]);

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function submit(e) {
    e.preventDefault();
    onSave(form);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-xl bg-white p-4 text-sm text-zinc-900 shadow-xl dark:bg-gray-900 dark:text-gray-100"
      >
        <header className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold">
            {initial ? "Edit Application" : "Add Application"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded px-2 py-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <div className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Company *</span>
            <input
              ref={firstRef}
              required
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className="rounded border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400 dark:border-zinc-700 dark:bg-gray-800"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Role</span>
            <input
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className="rounded border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400 dark:border-zinc-700 dark:bg-gray-800"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span className="text-xs text-zinc-600 dark:text-zinc-400">Location</span>
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="rounded border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400 dark:border-zinc-700 dark:bg-gray-800"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-xs text-zinc-600 dark:text-zinc-400">Status</span>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="rounded border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400 dark:border-zinc-700 dark:bg-gray-800"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Job link</span>
            <input
              value={form.link}
              onChange={(e) => update("link", e.target.value)}
              className="rounded border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400 dark:border-zinc-700 dark:bg-gray-800"
              placeholder="https://..."
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Tags (comma separated)</span>
            <input
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              className="rounded border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400 dark:border-zinc-700 dark:bg-gray-800"
              placeholder="react, frontend"
            />
          </label>
        </div>

        <footer className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded px-3 py-1.5 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-cyan-500 px-3 py-1.5 font-semibold text-white hover:bg-cyan-600"
          >
            {initial ? "Save" : "Add"}
          </button>
        </footer>
      </form>
    </div>
  );
}
