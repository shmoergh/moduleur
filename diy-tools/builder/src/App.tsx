import { useEffect, useState } from "react";
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
  const selectedSlot = useAppStore((s) => s.selectedSlot);
  const selectedKey = useAppStore((s) => s.selectedKey);

  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

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
      } else if (e.key === "Escape") {
        setLeftOpen(false);
        setRightOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSelectedSlot, setTab]);

  // Close drawers when the user makes a selection — on small screens the user
  // expects to see the centre view after picking a board or component.
  useEffect(() => {
    setLeftOpen(false);
    setRightOpen(false);
  }, [selectedSlot]);
  useEffect(() => {
    setRightOpen(false);
  }, [selectedKey]);

  const isSoldering = tab === "core" || tab === "ui";
  const drawerOpen = leftOpen || rightOpen;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] gap-3 bg-surface p-3 text-ink">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <DrawerToggle
            label="Boards"
            onClick={() => {
              setRightOpen(false);
              setLeftOpen((v) => !v);
            }}
          />
          <h1 className="truncate text-lg text-ink">
            Moduleur <span className="text-accent">BUILDER 3000™</span>
          </h1>
        </div>
        <div className="justify-self-center">
          <PassSwitcher />
        </div>
        <div className="justify-self-end flex items-center gap-2">
          {isSoldering && <ResetAll />}
          <DrawerToggle
            label={isSoldering ? "Components" : "Calibration"}
            onClick={() => {
              setLeftOpen(false);
              setRightOpen((v) => !v);
            }}
          />
        </div>
      </header>

      <div className="grid min-h-0 grid-cols-1 gap-3 xl:grid-cols-[300px_1fr_360px]">
        <aside
          className={
            "flex flex-col gap-3 min-h-0 " +
            "fixed inset-y-0 left-0 z-40 w-[320px] max-w-[88vw] overflow-y-auto bg-surface p-3 shadow-2xl transition-transform duration-200 " +
            (leftOpen ? "translate-x-0" : "-translate-x-full") +
            " xl:static xl:z-auto xl:w-auto xl:max-w-none xl:translate-x-0 xl:overflow-visible xl:bg-transparent xl:p-0 xl:shadow-none xl:transition-none"
          }
        >
          <div className="flex items-center justify-end xl:hidden">
            <button
              onClick={() => setLeftOpen(false)}
              className="grid h-7 w-7 place-items-center rounded border border-line bg-panel text-ink"
              aria-label="Close boards panel"
            >
              ✕
            </button>
          </div>
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
        </aside>
        <div className="min-h-0">
          {isSoldering ? <Viewer /> : <CalibrationCenter />}
        </div>
        <aside
          className={
            "flex flex-col min-h-0 " +
            "fixed inset-y-0 right-0 z-40 w-[360px] max-w-[88vw] bg-surface p-3 shadow-2xl transition-transform duration-200 " +
            (rightOpen ? "translate-x-0" : "translate-x-full") +
            " xl:static xl:z-auto xl:w-auto xl:max-w-none xl:translate-x-0 xl:bg-transparent xl:p-0 xl:shadow-none xl:transition-none"
          }
        >
          <div className="mb-2 flex items-center justify-start xl:hidden">
            <button
              onClick={() => setRightOpen(false)}
              className="grid h-7 w-7 place-items-center rounded border border-line bg-panel text-ink"
              aria-label="Close panel"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 min-h-0">
            {isSoldering ? <ComponentList /> : <CalibrationSidebar />}
          </div>
        </aside>
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 xl:hidden"
          onClick={() => {
            setLeftOpen(false);
            setRightOpen(false);
          }}
          aria-hidden
        />
      )}
    </div>
  );
}

function DrawerToggle({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid h-8 w-8 shrink-0 place-items-center rounded border border-line bg-panel text-ink hover:bg-line-soft xl:hidden"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M2 4h12M2 8h12M2 12h12" />
      </svg>
    </button>
  );
}

export default App;
