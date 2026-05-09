import { useMemo } from "react";
import { SLOTS } from "../data/slots";
import { useAppStore } from "../store/useAppStore";
import boards from "../data/boards.json";
import { aggregateForPass } from "../lib/aggregate";
import type { BoardsJson } from "../types";

export function Minimap() {
  const pass = useAppStore((s) => s.pass);
  const selectedSlot = useAppStore((s) => s.selectedSlot);
  const selectedKey = useAppStore((s) => s.selectedKey);
  const setSelectedSlot = useAppStore((s) => s.setSelectedSlot);

  const highlightedSlots = useMemo(() => {
    if (!selectedKey) return new Map<number, string[]>();
    const rows = aggregateForPass(boards as BoardsJson, SLOTS, pass);
    const row = rows.find((r) => r.key === selectedKey);
    if (!row) return new Map<number, string[]>();
    return new Map(row.perSlot.map((p) => [p.slotIndex, p.refs]));
  }, [pass, selectedKey]);

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2">
      {SLOTS.map((slot) => {
        const isActive = slot.index === selectedSlot;
        const refs = highlightedSlots.get(slot.index);
        const isHighlighted = !!refs;
        return (
          <button
            key={slot.index}
            onClick={() => setSelectedSlot(slot.index)}
            className={
              "relative rounded border px-2 py-2 text-left transition whitespace-nowrap " +
              (isActive
                ? "border-secondary bg-secondary-soft "
                : "border-line bg-panel hover:bg-line-soft ") +
              (isHighlighted ? "ring-2 ring-accent " : "")
            }
          >
            <div className="text-[10px] uppercase tracking-wider text-muted">
              {slot.row + 1}-{slot.col + 1}
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
