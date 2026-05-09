import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Pass } from "../types";

type State = {
  pass: Pass;
  selectedSlot: number;
  selectedKey: string | null;
  search: string;

  setPass: (p: Pass) => void;
  setSelectedSlot: (i: number) => void;
  setSelectedKey: (k: string | null) => void;
  setSearch: (s: string) => void;
};

export const useAppStore = create<State>()(
  persist(
    (set) => ({
      pass: "core",
      selectedSlot: 0,
      selectedKey: null,
      search: "",

      setPass: (pass) => set({ pass, selectedKey: null }),
      setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
      setSelectedKey: (selectedKey) => set({ selectedKey }),
      setSearch: (search) => set({ search }),
    }),
    { name: "bommap-state" }
  )
);
