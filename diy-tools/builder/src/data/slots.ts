import type { Slot } from "../types";

export const SLOTS: Slot[] = [
  { index: 0, row: 0, col: 0, label: "VCO 1",     module: "02-vco",             slug: "vco-1" },
  { index: 1, row: 0, col: 1, label: "VCO 2",     module: "02-vco",             slug: "vco-2" },
  { index: 2, row: 0, col: 2, label: "Mixer",     module: "03-sidechain-mixer", slug: "mixer" },
  { index: 3, row: 0, col: 3, label: "VCF",       module: "04-vcf",             slug: "vcf"   },
  { index: 4, row: 1, col: 0, label: "VCA 1",     module: "05-adsr-vca",        slug: "vca-1" },
  { index: 5, row: 1, col: 1, label: "VCA 2",     module: "05-adsr-vca",        slug: "vca-2" },
  { index: 6, row: 1, col: 2, label: "Utils",     module: "06-utils-output",    slug: "utils" },
  { index: 7, row: 1, col: 3, label: "Brain",     module: "07-brain",           slug: "brain" },
  { index: 8, row: 2, col: 0, label: "PSU",       module: "01-psu",             slug: "psu",   fullWidth: true },
];
