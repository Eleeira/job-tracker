import { useState, useMemo } from "react";
import { STATUSES } from "../db";

const STATUS_ALIASES = {
  applied: "Applied",
  applying: "Applied",
  interview: "Interviewing",
  interviewing: "Interviewing",
  phone: "Interviewing",
  offer: "Offer",
  offered: "Offer",
  reject: "Rejected",
  rejected: "Rejected",
  decline: "Rejected",
};

function parseInput(text) {
  const t = (text || "").trim();

  // tags: #remote #junior
  const tags = Array.from(t.matchAll(/#([a-z0-9\-]+)/gi)).map((m) => m[1]);

  // link: link:https://...  or plain URL
  const linkMatch =
    t.match(/link:\s*(https?:\/\/\S+)/i) ||
    t.match(/\bhttps?:\/\/\S+/i);
  const link = linkMatch ? linkMatch[1] || linkMatch[0] : "";

  // status keywords
  let status = "Applied";
  for (const k of Object.keys(STATUS_ALIASES)) {
    const re = new RegExp(`\\b${k}\\b`, "i");
    if (re.test(t)) {
      status = STATUS_ALIASES[k];
      break;
    }
  }

  // role/company/location (heuristics)
  // “Applied to Spotify for Frontend Developer in Stockholm”
  const toRe = /(?:to|at)\s+([A-Za-z0-9&.\-_' ]{2,})/i;
  const forRe = /(?:for|as)\s+([A-Za-z0-9&.\-_' ]{2,})/i;
  const inRe = /(?:in|@)\s+([A-Za-z0-9&.\-_' ]{2,})/i;

  const company = (t.match(toRe)?.[1] || "").trim();
  const role = (t.match(forRe)?.[1] || "").trim();
  const location = (t.match(inRe)?.[1] || "").trim();

  // createdAt: today by default; accept “on 2025-08-12” or dd/mm/yyyy
  let createdAt = Date.now();
  const onIso = t.match(/\bon\s*(\d{4}-\d{2}-\d{2})\b/i)?.[1];
  const onEu = t.match(/\bon\s*(\d{1,2}\/\d{1,2}\/\d{2,4})\b/i)?.[1];
  if (onIso) createdAt = Date.parse(onIso) || Date.now();
  else if (onEu) createdAt = Date.parse(onEu) || Date.now();

  return {
    company: company || "",
    role: role || "",
    location: location || "",
    status,
    link,
    tags,
    createdAt,
  };
}

export default function QuickAddAssistant({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const parsed = useMemo(() => parseInput(input), [input]);

  const canAdd =
    (parsed.company || parsed.role) &&
    STATUSES.includes(parsed.status);

  async function handleAdd() {
    if (!canAdd) return;
    await onCreate({
      ...parsed,
      order: 0,
    });
    setInput("");
    setOpen(false);
  }

  return (
    <>
      {/* Floating button bottom-left (non invade dock/toggles) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Quick Add Assistant"
        className="fixed bottom-20 left-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full
                   bg-cyan-600 text-white shadow hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        title="Quick Add"
      >
        ✨
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/10
                          dark:bg-gray-900 dark:text-gray-100 dark:ring-white/10">
            <header className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Quick Add</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                ✕
              </button>
            </header>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Example:
Applied to Spotify for Frontend Developer in Stockholm on 2025-08-12 link:https://jobs/123 #remote #junior`}
              className="h-28 w-full resize-none rounded-lg border border-black/10 bg-white p-3 text-sm
                         placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400
                         dark:border-white/10 dark:bg-gray-800"
            />

            {/* Preview */}
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Field label="Company" value={parsed.company} />
              <Field label="Role" value={parsed.role} />
              <Field label="Location" value={parsed.location} />
              <Field label="Status" value={parsed.status} />
              <Field label="Link" value={parsed.link} isLink />
              <div>
                <div className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-gray-400">Tags</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {parsed.tags.length ? parsed.tags.map((t) => (
                    <span key={t} className="rounded bg-cyan-50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-cyan-700
                                             dark:bg-cyan-900/40 dark:text-cyan-300">
                      {t}
                    </span>
                  )) : <span className="text-sm text-zinc-400">—</span>}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <small className="text-zinc-500 dark:text-gray-400">
                Hints: use <code>to/at</code>, <code>for/as</code>, <code>in</code>, <code>on YYYY-MM-DD</code>, <code>link:</code>, <code>#tags</code>
              </small>
              <button
                onClick={handleAdd}
                disabled={!canAdd}
                className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white
                           hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to Board
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, value, isLink }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-gray-400">{label}</div>
      <div className="mt-1 text-sm text-zinc-700 dark:text-gray-200 break-words">
        {value
          ? isLink
            ? <a href={value} target="_blank" rel="noreferrer" className="underline">{value}</a>
            : value
          : <span className="text-zinc-400">—</span>}
      </div>
    </div>
  );
}
