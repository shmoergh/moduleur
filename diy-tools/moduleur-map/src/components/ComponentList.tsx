import { useMemo } from "react";
import boards from "../data/boards.json";
import { SLOTS } from "../data/slots";
import { aggregateForPass } from "../lib/aggregate";
import { useAppStore } from "../store/useAppStore";
import type { BoardsJson } from "../types";

export function ComponentList() {
  const pass = useAppStore((s) => s.pass);
  const selectedKey = useAppStore((s) => s.selectedKey);
  const setSelectedKey = useAppStore((s) => s.setSelectedKey);
  const search = useAppStore((s) => s.search);
  const setSearch = useAppStore((s) => s.setSearch);

  const rows = useMemo(
    () => aggregateForPass(boards as BoardsJson, SLOTS, pass),
    [pass]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter(
      (r) =>
        r.value.toLowerCase().includes(q) ||
        r.footprint.toLowerCase().includes(q) ||
        r.perSlot.some((p) => p.refs.some((ref) => ref.toLowerCase().includes(q)))
    );
  }, [rows, search]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded border border-line bg-panel">
      <div className="flex items-center justify-between gap-2 border-b border-line-soft px-3 py-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="filter value, footprint, ref…"
          className="flex-1 rounded bg-surface px-2 py-1 text-sm text-ink placeholder:text-muted outline-none focus:ring-1 focus:ring-accent"
        />
        <span className="shrink-0 text-xs text-muted">{rows.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-line-soft">
          {filtered.map((row) => {
            const isSelected = row.key === selectedKey;
            return (
              <li
                key={row.key}
                className={
                  "cursor-pointer px-3 py-2 text-sm transition " +
                  (isSelected ? "bg-accent-soft " : "hover:bg-surface ")
                }
                onClick={() => setSelectedKey(isSelected ? null : row.key)}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-ink">
                    {row.value || <em className="text-muted">(no value)</em>}
                  </span>
                  <span className="truncate text-xs text-muted">
                    {row.footprint}
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-muted">
                  {row.totalRefs}× across {row.perSlot.length} board
                  {row.perSlot.length === 1 ? "" : "s"}
                  {": "}
                  {row.perSlot
                    .map((p) => `${SLOTS[p.slotIndex].label} (${p.refs.length})`)
                    .join(", ")}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
