# Moduleur BOMmap

Soldering companion for the [Moduleur](../../modules) modular synth. Aggregates the iBom files of 8 boards (one rig pass) into a single screen so you can place a given component across all of them at once.

## Layout

The 2×4 minimap matches the physical 8-slot rig:

```
┌─────────┬─────────┬─────────┬─────────┐
│  VCO 1  │  VCO 2  │  Mixer  │   VCF   │
├─────────┼─────────┼─────────┼─────────┤
│ VCA/En1 │ VCA/En2 │  Utils  │  Brain  │
└─────────┴─────────┴─────────┴─────────┘
```

Use the **Core** / **UI** toggle to switch which 8-board pass you're working on.

## Workflow

1. Pick **Core** or **UI**.
2. Browse the aggregated component list on the right. Components are grouped by `value + footprint` and merged across all 8 boards.
3. Click a row → minimap lights up the slots that contain that component, with a per-slot ref count badge. Pick up the part once, place on every highlighted board.
4. Tick the checkbox to mark the row done. Progress is per-pass and persists in `localStorage`.
5. Click a slot to open its full iBom in the centre viewer.

**Keyboard shortcuts:** `1`–`8` switch slots, `C` / `U` switch pass.

## Local dev

```bash
npm install
npm run dev
```

`npm run dev` first runs `scripts/extract-iboms.mjs`, which reads the canonical iBoms from `../../modules/<module>/electronics/<core|ui>/bom/ibom.html`, copies them into `public/iboms/`, and writes the parsed BOM data to `src/data/boards.json`. Re-run `npm run extract` after re-generating any iBom.

## Data flow

```
modules/<module>/electronics/<core|ui>/bom/ibom.html
        │
        ▼  scripts/extract-iboms.mjs (runs LZString.decompressFromBase64)
        │
public/iboms/<module>-<core|ui>.html   (verbatim copy, used by viewer iframe)
src/data/boards.json                   (parsed BOM groups for the React app)
```

## Build & deploy

```bash
npm run build      # extract + tsc -b + vite build → dist/
```

### Vercel

Set the **Root Directory** of the Vercel project to `diy-tools/bommap`. Vercel clones the full monorepo and runs the build inside that subfolder, so `extract-iboms.mjs` can still reach `../../modules/`.

- Build command: `npm run build`
- Output directory: `dist`
- No env vars or runtime needed — pure static.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- Zustand (`persist` middleware → `localStorage` key `bommap-state`)
- `lz-string` to decompress iBom payloads at build time
