import type { AggregatedRow, BoardsJson, Category, Pass, Slot } from "../types";

// Bucket a row into a coarse category. Connectors are matched on `value`
// (e.g. "Conn_01x06") because their footprint is just the physical socket
// shape (PinSocket_…, PinHeader_…). Everything else is matched on footprint
// prefix. All checks are case-insensitive.
export function categoryOf(value: string, footprint: string): Category {
  if (value.toLowerCase().startsWith("conn_")) return "Connectors";
  const fp = footprint.toLowerCase();
  if (fp.startsWith("c_") || fp.startsWith("cp_")) return "Caps";
  if (fp.startsWith("d_")) return "Diodes";
  if (fp.startsWith("r_")) return "Resistors";
  if (fp.startsWith("led_")) return "LEDs";
  if (fp.startsWith("potentiometer_") || fp.startsWith("trim_")) return "Pots";
  if (fp.startsWith("to-92_")) return "Transistors";
  return "Misc";
}

// Footprint prefixes that we treat as SMD. Keep this in sync with the same
// list in scripts/extract-iboms.mjs (they can't share an import since the
// build script is Node-only).
export const SMD_FOOTPRINT_PREFIXES = [
  "C_0603",
  "R_0603",
  "D_SOD",
  "SOIC-",
  "SOT-",
  "R_1206",
  "SOP-",
  "USB_C",
  "Gyeszno",
  "CP_Elec",
] as const;

export function isSmdFootprint(footprint: string): boolean {
  if (!footprint) return false;
  for (const p of SMD_FOOTPRINT_PREFIXES) {
    if (footprint.startsWith(p)) return true;
  }
  return false;
}

export const CATEGORY_OPTIONS: Category[] = [
  "All",
  "Resistors",
  "Diodes",
  "Transistors",
  "Caps",
  "Connectors",
  "LEDs",
  "Pots",
  "Misc",
];

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
