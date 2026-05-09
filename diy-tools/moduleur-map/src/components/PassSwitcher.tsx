import { useAppStore } from "../store/useAppStore";
import type { Pass } from "../types";

const PASSES: { id: Pass; label: string }[] = [
  { id: "core", label: "Core" },
  { id: "ui", label: "UI" },
];

export function PassSwitcher() {
  const pass = useAppStore((s) => s.pass);
  const setPass = useAppStore((s) => s.setPass);
  return (
    <div className="inline-flex rounded border border-line overflow-hidden">
      {PASSES.map((p) => (
        <button
          key={p.id}
          onClick={() => setPass(p.id)}
          className={
            "px-4 py-1 text-sm transition " +
            (pass === p.id
              ? "bg-ink text-panel"
              : "bg-panel text-ink hover:bg-surface")
          }
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
