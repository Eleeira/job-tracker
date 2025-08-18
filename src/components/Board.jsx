// src/components/Board.jsx
import { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { STATUSES } from "../db";
import Card from "./Card";

export default function Board({ apps, setApps, onEdit, onDelete, persistMove }) {
  const groups = useMemo(() => {
    const by = Object.fromEntries(STATUSES.map((s) => [s, []]));
    for (const a of apps) by[a.status]?.push(a);
    for (const s of STATUSES) {
      by[s].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0) || b.createdAt - a.createdAt
      );
    }
    return by;
  }, [apps]);

  async function handleDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    const from = source.droppableId;
    const to = destination.droppableId;
    if (from === to && source.index === destination.index) return;

    const id = Number(draggableId);
    const fromItems = Array.from(groups[from] || []);
    const toItems = from === to ? fromItems : Array.from(groups[to] || []);
    const [removed] = fromItems.splice(source.index, 1);
    toItems.splice(destination.index, 0, { ...removed, status: to });

    fromItems.forEach((it, idx) => (it.order = idx));
    toItems.forEach((it, idx) => (it.order = idx));

    const updated = apps.map((a) => {
      if (a.id === id) return { ...a, status: to, order: destination.index };
      if (a.status === from) {
        const m = fromItems.find((x) => x.id === a.id);
        return m ? { ...a, order: m.order } : a;
      }
      if (from !== to && a.status === to) {
        const m = toItems.find((x) => x.id === a.id);
        return m ? { ...a, order: m.order } : a;
      }
      if (from === to && a.status === to) {
        const m = toItems.find((x) => x.id === a.id);
        return m ? { ...a, order: m.order } : a;
      }
      return a;
    });
    setApps(updated);
    await persistMove(id, to, destination.index, fromItems, toItems);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* grid più fluida e centrata */}
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATUSES.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                 className={`min-h-[300px] rounded-xl p-3 ring-1
           bg-stone-50 ring-black/5   /* light: si fonde col body
                            dark:bg-gray-900/60 dark:ring-white/5
                            ${snapshot.isDraggingOver ? "ring-cyan-400/60 dark:ring-cyan-400" : ""}`}
              >
                <header className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-gray-100">
                    {status}
                  </h3>
                  <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600
                                   dark:bg-gray-800 dark:text-gray-400">
                    {(groups[status] || []).length}
                  </span>
                </header>

                <div className="flex flex-col gap-3">
                  {(groups[status] || []).map((app, index) => (
                    <Draggable key={app.id} draggableId={String(app.id)} index={index}>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`transition-shadow ${
        snapshot.isDragging ? "rounded-lg ring-2 ring-cyan-400 shadow-md" : ""
      }`}
    >
      <Card app={app} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )}
</Draggable>

                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}