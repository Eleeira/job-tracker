// src/components/Card.jsx
export default function Card({ app, onEdit, onDelete }) {
  const applied = new Date(app.createdAt).toLocaleDateString();

  return (
    <article
      className="rounded-xl border border-black/10 bg-white p-3 shadow
                 dark:border-white/5 dark:bg-gray-800 dark:shadow-black/40"
    >
      <header className="mb-1 flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-gray-100">
          {app.company}
        </h4>

        {app.location && (
          <span
            className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600
                       dark:bg-gray-700 dark:text-gray-300"
          >
            {app.location}
          </span>
        )}
      </header>

      <div className="text-sm text-zinc-700 dark:text-gray-200">{app.role}</div>

      <footer className="mt-2 flex items-center justify-between text-xs text-zinc-500 dark:text-gray-400">
        <span>Applied: {applied}</span>

        <div className="flex items-center gap-2">
          <a
            href={app.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Job
          </a>

          {onEdit && (
            <button
              onClick={() => onEdit(app)}
              title="Edit"
              aria-label="Edit"
              className="rounded px-1.5 py-0.5 text-zinc-600 hover:bg-zinc-100
                         dark:text-zinc-300 dark:hover:bg-gray-700"
            >
              ✏️
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(app.id)}
              title="Delete"
              aria-label="Delete"
              className="rounded px-1.5 py-0.5 text-red-600 hover:bg-red-50
                         dark:text-red-300 dark:hover:bg-red-900/40"
            >
              🗑️
            </button>
          )}
        </div>
      </footer>

      {app.tags?.length ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {app.tags.map((t) => (
            <span
              key={t}
              className="rounded bg-cyan-50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-cyan-700
                         dark:bg-cyan-900/40 dark:text-cyan-300"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
