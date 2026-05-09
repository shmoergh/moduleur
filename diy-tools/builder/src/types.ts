export type Pass = "core" | "ui";
export type Tab = "core" | "ui" | "calibration";

export type ModuleId =
  | "01-psu"
  | "02-vco"
  | "03-sidechain-mixer"
  | "04-vcf"
  | "05-adsr-vca"
  | "06-utils-output"
  | "07-brain";

export type Slot = {
  index: number;
  // 0 / 1 are the rig's two main rows; 2 is the PSU strip below the grid.
  row: 0 | 1 | 2;
  col: 0 | 1 | 2 | 3;
  label: string;
  module: ModuleId;
  // Unique per physical board. Two slots can share a `module` (e.g. VCO 1 +
  // VCO 2) but their `slug` is always distinct so the iBom iframe instance
  // gets its own localStorage namespace and "Placed" state.
  slug: string;
  // Render the tile spanning all 4 columns (used by the PSU row).
  fullWidth?: boolean;
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

export type Category =
  | "All"
  | "Caps"
  | "Connectors"
  | "Diodes"
  | "LEDs"
  | "Misc"
  | "Pots"
  | "Resistors"
  | "Transistors";

export type AggregatedRow = {
  key: string;
  value: string;
  footprint: string;
  perSlot: { slotIndex: number; refs: string[] }[];
  totalRefs: number;
};
