import { useAppStore } from "../store/useAppStore";
import type { Tab } from "../types";

const TABS: { id: Tab; label: string }[] = [
  { id: "core", label: "Core" },
  { id: "ui", label: "UI" },
  { id: "calibration", label: "Calibration" },
];

export function PassSwitcher() {
  const tab = useAppStore((s) => s.tab);
  const setTab = useAppStore((s) => s.setTab);
  return (
    <div className="inline-flex rounded border border-line overflow-hidden">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={
            "px-4 py-1 text-sm transition " +
            (tab === t.id
              ? "bg-ink text-panel"
              : "bg-panel text-ink hover:bg-surface")
          }
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
