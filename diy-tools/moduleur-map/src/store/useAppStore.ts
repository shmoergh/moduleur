import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category, Pass } from "../types";

type State = {
  pass: Pass;
  selectedSlot: number;
  selectedKey: string | null;
  search: string;
  category: Category;

  setPass: (p: Pass) => void;
  setSelectedSlot: (i: number) => void;
  setSelectedKey: (k: string | null) => void;
  setSearch: (s: string) => void;
  setCategory: (c: Category) => void;
};

export const useAppStore = create<State>()(
  persist(
    (set) => ({
      pass: "core",
      selectedSlot: 0,
      selectedKey: null,
      search: "",
      category: "All",

      setPass: (pass) => set({ pass, selectedKey: null }),
      setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
      setSelectedKey: (selectedKey) => set({ selectedKey }),
      setSearch: (search) => set({ search }),
      setCategory: (category) => set({ category, selectedKey: null }),
    }),
    { name: "bommap-state" }
  )
);
