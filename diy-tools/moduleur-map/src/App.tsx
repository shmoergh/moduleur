import { useEffect } from "react";
import { ComponentList } from "./components/ComponentList";
import { Minimap } from "./components/Minimap";
import { PassSwitcher } from "./components/PassSwitcher";
import { ResetAll } from "./components/ResetAll";
import { Viewer } from "./components/Viewer";
import { SLOTS } from "./data/slots";
import { useAppStore } from "./store/useAppStore";

function App() {
  const setSelectedSlot = useAppStore((s) => s.setSelectedSlot);
  const setPass = useAppStore((s) => s.setPass);
  const pass = useAppStore((s) => s.pass);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key >= "1" && e.key <= "9") {
        setSelectedSlot(parseInt(e.key, 10) - 1);
      } else if (e.key === "c" || e.key === "C") {
        setPass("core");
      } else if (e.key === "u" || e.key === "U") {
        setPass("ui");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSelectedSlot, setPass]);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] gap-3 bg-surface p-3 text-ink">
      <header className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <h1 className="text-lg text-ink">
            Moduleur <span className="text-accent">BOMmap</span>
          </h1>
          <span className="text-xs text-muted">
            {SLOTS.length} boards · {pass} pass
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ResetAll />
          <PassSwitcher />
        </div>
      </header>

      <div className="grid min-h-0 grid-cols-[300px_1fr_360px] gap-3">
        <div className="flex flex-col gap-3 min-h-0">
          <Minimap />
          <div className="text-[11px] leading-relaxed text-muted">
            Click a board to view it. Select a component on the right to highlight
            the boards that contain it. Keys: <kbd>1</kbd>–<kbd>9</kbd> slots,{" "}
            <kbd>C</kbd>/<kbd>U</kbd> pass.
          </div>
        </div>
        <Viewer />
        <ComponentList />
      </div>
    </div>
  );
}

export default App;
