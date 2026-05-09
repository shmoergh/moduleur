import type { AggregatedRow, BoardsJson, Pass, Slot } from "../types";

export function aggregateForPass(
  boards: BoardsJson,
  slots: Slot[],
  pass: Pass
): AggregatedRow[] {
  const merged = new Map<string, AggregatedRow>();
  for (const slot of slots) {
    const board = boards[pass][slot.module];
    if (!board) continue;
    for (const c of board.components) {
      const key = `${c.value}|${c.footprint}`;
      let row = merged.get(key);
      if (!row) {
        row = {
          key,
          value: c.value,
          footprint: c.footprint,
          perSlot: [],
          totalRefs: 0,
        };
        merged.set(key, row);
      }
      row.perSlot.push({ slotIndex: slot.index, refs: c.refs });
      row.totalRefs += c.refs.length;
    }
  }
  return [...merged.values()].sort((a, b) => {
    const fp = a.footprint.localeCompare(b.footprint);
    if (fp !== 0) return fp;
    return naturalValueSort(a.value, b.value);
  });
}

// "1k" < "4.7k" < "10k" < "100k" < "1M". Falls back to lexicographic.
function naturalValueSort(a: string, b: string): number {
  const na = parseSiNumber(a);
  const nb = parseSiNumber(b);
  if (na !== null && nb !== null && na !== nb) return na - nb;
  return a.localeCompare(b);
}

function parseSiNumber(s: string): number | null {
  const m = s.match(/^([\d.]+)\s*([kKmMRuUnNpPgG]?)/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (!isFinite(n)) return null;
  const suffix = m[2];
  const mult: Record<string, number> = {
    "": 1, R: 1, u: 1e-6, U: 1e-6, n: 1e-9, N: 1e-9, p: 1e-12, P: 1e-12,
    k: 1e3, K: 1e3, M: 1e6, m: 1e-3, g: 1e9, G: 1e9,
  };
  return n * (mult[suffix] ?? 1);
}
