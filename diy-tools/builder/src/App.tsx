import { useEffect } from "react";
import {
  CalibrationCenter,
  CalibrationSidebar,
} from "./components/CalibrationView";
import { ComponentList } from "./components/ComponentList";
import { Minimap } from "./components/Minimap";
import { PassSwitcher } from "./components/PassSwitcher";
import { ResetAll } from "./components/ResetAll";
import { Viewer } from "./components/Viewer";
import { useAppStore } from "./store/useAppStore";

function App() {
  const setSelectedSlot = useAppStore((s) => s.setSelectedSlot);
  const setTab = useAppStore((s) => s.setTab);
  const tab = useAppStore((s) => s.tab);

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
        setTab("core");
      } else if (e.key === "u" || e.key === "U") {
        setTab("ui");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSelectedSlot, setTab]);

  const isSoldering = tab === "core" || tab === "ui";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] gap-3 bg-surface p-3 text-ink">
      <header className="grid grid-cols-3 items-center">
        <h1 className="text-lg text-ink">
          Moduleur <span className="text-accent">BUILDER 3000™</span>
        </h1>
        <div className="justify-self-center">
          <PassSwitcher />
        </div>
        <div className="justify-self-end">
          {isSoldering && <ResetAll />}
        </div>
      </header>

      <div className="grid min-h-0 grid-cols-[300px_1fr_360px] gap-3">
        <div className="flex flex-col gap-3 min-h-0">
          <Minimap />
          <div className="text-[11px] leading-relaxed text-muted">
            {isSoldering ? (
              <>
                Click a board to view it. Select a component on the right to
                highlight the boards that contain it. Keys: <kbd>1</kbd>–
                <kbd>9</kbd> slots, <kbd>C</kbd>/<kbd>U</kbd> pass.
              </>
            ) : (
              <>
                Click a board to jump to its calibration steps. Keys:{" "}
                <kbd>1</kbd>–<kbd>9</kbd> slots.
              </>
            )}
          </div>
        </div>
        {isSoldering ? <Viewer /> : <CalibrationCenter />}
        {isSoldering ? <ComponentList /> : <CalibrationSidebar />}
      </div>
    </div>
  );
}

export default App;
