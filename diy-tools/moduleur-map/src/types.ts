export type Pass = "core" | "ui";

export type ModuleId =
  | "02-vco"
  | "03-sidechain-mixer"
  | "04-vcf"
  | "05-adsr-vca"
  | "06-utils-output"
  | "07-brain";

export type Slot = {
  index: number;
  row: 0 | 1;
  col: 0 | 1 | 2 | 3;
  label: string;
  module: ModuleId;
};

export type ComponentGroup = {
  value: string;
  footprint: string;
  refs: string[];
};

export type BoardData = {
  title: string;
  revision: string;
  components: ComponentGroup[];
};

export type BoardsJson = Record<Pass, Record<ModuleId, BoardData>>;

export type AggregatedRow = {
  key: string;
  value: string;
  footprint: string;
  perSlot: { slotIndex: number; refs: string[] }[];
  totalRefs: number;
};
