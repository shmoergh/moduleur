import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category, Pass, Tab } from "../types";

type State = {
  tab: Tab;
  selectedSlot: number;
  selectedKey: string | null;
  search: string;
  category: Category;
  showSmd: boolean;
  // Calibration checkbox state, keyed by "<section-id>/<item-id>".
  calibrationDone: Record<string, boolean>;
  // Component-list checkbox state, keyed by "<pass>|<row.key>".
  componentDone: Record<string, boolean>;

  setTab: (t: Tab) => void;
  setSelectedSlot: (i: number) => void;
  setSelectedKey: (k: string | null) => void;
  setSearch: (s: string) => void;
  setCategory: (c: Category) => void;
  setShowSmd: (v: boolean) => void;
  toggleCalibrationItem: (key: string) => void;
  resetCalibration: () => void;
  toggleComponentItem: (key: string) => void;
  resetComponents: () => void;
};

export const useAppStore = create<State>()(
  persist(
    (set) => ({
      tab: "core",
      selectedSlot: 0,
      selectedKey: null,
      search: "",
      category: "All",
      showSmd: false,
      calibrationDone: {},
      componentDone: {},

      setTab: (tab) => set({ tab, selectedKey: null }),
      setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
      setSelectedKey: (selectedKey) => set({ selectedKey }),
      setSearch: (search) => set({ search }),
      setCategory: (category) => set({ category, selectedKey: null }),
      setShowSmd: (showSmd) => set({ showSmd }),
      toggleCalibrationItem: (key) =>
        set((s) => ({
          calibrationDone: {
            ...s.calibrationDone,
            [key]: !s.calibrationDone[key],
          },
        })),
      resetCalibration: () => set({ calibrationDone: {} }),
      toggleComponentItem: (key) =>
        set((s) => ({
          componentDone: {
            ...s.componentDone,
            [key]: !s.componentDone[key],
          },
        })),
      resetComponents: () => set({ componentDone: {} }),
    }),
    { name: "bommap-state" }
  )
);

// Treat the tab as a Pass when reading boards/iBom data. Components that call
// this only render in the soldering view, so the "calibration" branch never
// hits at runtime.
export function tabAsPass(tab: Tab): Pass {
  return tab === "calibration" ? "core" : tab;
}
