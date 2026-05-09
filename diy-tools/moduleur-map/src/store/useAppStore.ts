import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category, Pass } from "../types";

type State = {
  pass: Pass;
  selectedSlot: number;
  selectedKey: string | null;
  search: string;
  category: Category;
  showSmd: boolean;

  setPass: (p: Pass) => void;
  setSelectedSlot: (i: number) => void;
  setSelectedKey: (k: string | null) => void;
  setSearch: (s: string) => void;
  setCategory: (c: Category) => void;
  setShowSmd: (v: boolean) => void;
};

export const useAppStore = create<State>()(
  persist(
    (set) => ({
      pass: "core",
      selectedSlot: 0,
      selectedKey: null,
      search: "",
      category: "All",
      showSmd: false,

      setPass: (pass) => set({ pass, selectedKey: null }),
      setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
      setSelectedKey: (selectedKey) => set({ selectedKey }),
      setSearch: (search) => set({ search }),
      setCategory: (category) => set({ category, selectedKey: null }),
      setShowSmd: (showSmd) => set({ showSmd }),
    }),
    { name: "bommap-state" }
  )
);
