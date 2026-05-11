import { useMemo } from "react";
import { SLOTS } from "../data/slots";
import { tabAsPass, useAppStore } from "../store/useAppStore";
import boards from "../data/boards.json";
import { aggregateForPass } from "../lib/aggregate";
import type { BoardsJson } from "../types";

export function Minimap() {
  const pass = useAppStore((s) => tabAsPass(s.tab));
  const selectedSlot = useAppStore((s) => s.selectedSlot);
  const selectedKey = useAppStore((s) => s.selectedKey);
  const setSelectedSlot = useAppStore((s) => s.setSelectedSlot);
  const experimental = useAppStore((s) => s.experimental);

  const highlightedSlots = useMemo(() => {
    if (!selectedKey) return new Map<number, string[]>();
    const rows = aggregateForPass(boards as BoardsJson, SLOTS, pass, experimental);
    const row = rows.find((r) => r.key === selectedKey);
    if (!row) return new Map<number, string[]>();
    return new Map(row.perSlot.map((p) => [p.slotIndex, p.refs]));
  }, [pass, selectedKey, experimental]);

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-4 flex h-12 items-center rounded border border-line bg-panel px-3">
        <img src="/logo.svg" alt="Shmøergh" className="h-4 w-auto" />
      </div>
      {SLOTS.map((slot) => {
        const isActive = slot.index === selectedSlot;
        const refs = highlightedSlots.get(slot.index);
        const isHighlighted = !!refs;
        return (
          <button
            key={slot.index}
            onClick={() => setSelectedSlot(slot.index)}
            className={
              "relative rounded border px-2 text-left transition whitespace-nowrap " +
              (slot.fullWidth
                ? "col-span-4 h-12 "
                : "h-[120px] flex flex-col py-2 ") +
              (isActive
                ? "border-[#0a0] bg-[#dceddb] "
                : "border-line bg-panel hover:bg-line-soft ") +
              (isHighlighted ? "ring-2 ring-accent " : "")
            }
          >
            <div className="text-[10px] uppercase tracking-wider text-muted">
              {slot.fullWidth ? `row ${slot.row + 1}` : `${slot.row + 1}-${slot.col + 1}`}
            </div>
            <div className="text-sm text-ink">{slot.label}</div>
            {isHighlighted && (
              <div className="absolute right-1.5 top-1.5 rounded-full bg-accent px-1.5 text-[10px] font-bold text-white">
                {refs!.length}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
