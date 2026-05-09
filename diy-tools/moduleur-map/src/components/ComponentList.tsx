import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useMemo } from "react";
import boards from "../data/boards.json";
import { SLOTS } from "../data/slots";
import {
  aggregateForPass,
  categoryOf,
  CATEGORY_OPTIONS,
  isSmdFootprint,
} from "../lib/aggregate";
import { useAppStore } from "../store/useAppStore";
import type { BoardsJson, Category } from "../types";

export function ComponentList() {
  const pass = useAppStore((s) => s.pass);
  const selectedKey = useAppStore((s) => s.selectedKey);
  const setSelectedKey = useAppStore((s) => s.setSelectedKey);
  const search = useAppStore((s) => s.search);
  const setSearch = useAppStore((s) => s.setSearch);
  const category = useAppStore((s) => s.category);
  const setCategory = useAppStore((s) => s.setCategory);
  const showSmd = useAppStore((s) => s.showSmd);
  const setShowSmd = useAppStore((s) => s.setShowSmd);

  const rows = useMemo(
    () => aggregateForPass(boards as BoardsJson, SLOTS, pass),
    [pass]
  );

  // Rows minus SMD if the toggle is off — used as the base for both the
  // category counts and the displayed list.
  const visibleRows = useMemo(
    () => (showSmd ? rows : rows.filter((r) => !isSmdFootprint(r.footprint))),
    [rows, showSmd]
  );

  // Count groups in each category for the dropdown labels (after the SMD
  // filter so the numbers reflect what the user sees).
  const counts = useMemo(() => {
    const c: Record<Category, number> = {
      All: visibleRows.length,
      Caps: 0, Connectors: 0, Diodes: 0, LEDs: 0, Misc: 0,
      Pots: 0, Resistors: 0, Transistors: 0,
    };
    for (const r of visibleRows) c[categoryOf(r.value, r.footprint)]++;
    return c;
  }, [visibleRows]);

  const filtered = useMemo(() => {
    let out = visibleRows;
    if (category !== "All") {
      out = out.filter((r) => categoryOf(r.value, r.footprint) === category);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      out = out.filter(
        (r) =>
          r.value.toLowerCase().includes(q) ||
          r.footprint.toLowerCase().includes(q) ||
          r.perSlot.some((p) =>
            p.refs.some((ref) => ref.toLowerCase().includes(q))
          )
      );
    }
    return out;
  }, [visibleRows, search, category]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded border border-line bg-panel">
      <div className="flex items-center gap-2 border-b border-line-soft px-3 py-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="filter value, footprint, ref…"
          className="flex-1 min-w-0 rounded bg-surface px-2 py-1 text-sm text-ink placeholder:text-muted outline-none focus:ring-1 focus:ring-accent"
        />
        <span className="shrink-0 text-xs text-muted">{filtered.length}</span>
        <CategoryMenu
          category={category}
          setCategory={setCategory}
          counts={counts}
          showSmd={showSmd}
          setShowSmd={setShowSmd}
        />
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

function CategoryMenu({
  category,
  setCategory,
  counts,
  showSmd,
  setShowSmd,
}: {
  category: Category;
  setCategory: (c: Category) => void;
  counts: Record<Category, number>;
  showSmd: boolean;
  setShowSmd: (v: boolean) => void;
}) {
  const isFiltered = category !== "All" || showSmd;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="View options"
          title="View options"
          className={
            "shrink-0 grid h-7 w-7 place-items-center rounded border text-ink transition " +
            (isFiltered
              ? "border-accent bg-accent-soft"
              : "border-line bg-surface hover:bg-line-soft")
          }
        >
          <span
            className="-mt-0.5 leading-none"
            style={{ fontSize: "0.4rem", letterSpacing: "1px" }}
          >
            •••
          </span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-50 min-w-[200px] rounded border border-line bg-panel p-1 text-sm text-ink shadow-lg outline-none"
        >
          <DropdownMenu.Label className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted">
            Category
          </DropdownMenu.Label>
          {CATEGORY_OPTIONS.map((c) => (
            <DropdownMenu.CheckboxItem
              key={c}
              checked={category === c}
              onCheckedChange={() => setCategory(c)}
              className="relative flex cursor-pointer select-none items-center justify-between gap-3 rounded px-2 py-1 pl-7 outline-none data-[highlighted]:bg-surface"
            >
              <DropdownMenu.ItemIndicator className="absolute left-2 inline-flex">
                ✓
              </DropdownMenu.ItemIndicator>
              <span>{c}</span>
              <span className="text-xs text-muted">{counts[c]}</span>
            </DropdownMenu.CheckboxItem>
          ))}
          <DropdownMenu.Separator className="my-1 h-px bg-line-soft" />
          <DropdownMenu.CheckboxItem
            checked={showSmd}
            onCheckedChange={(v) => setShowSmd(!!v)}
            onSelect={(e) => e.preventDefault()}
            className="relative flex cursor-pointer select-none items-center gap-3 rounded px-2 py-1 pl-7 outline-none data-[highlighted]:bg-surface"
          >
            <DropdownMenu.ItemIndicator className="absolute left-2 inline-flex">
              ✓
            </DropdownMenu.ItemIndicator>
            <span>Show SMD components</span>
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
