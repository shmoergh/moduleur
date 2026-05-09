#!/usr/bin/env node
// Extracts BOM data from KiCad InteractiveHtmlBom (iBom) HTML files for the
// Moduleur sound modules and writes, per physical board (slot):
//   - public/iboms/<slug>-<core|ui>.html  (copy with isolated storagePrefix)
//   - src/data/boards.json                (clean BOM data, keyed by module)
//
// Two physical instances share a single source module (VCO 1 + VCO 2 use
// `02-vco`; VCA 1 + VCA 2 use `05-adsr-vca`). Each instance gets its own
// HTML file with the iBom storagePrefix patched so the "Placed" checkbox
// state lives in a separate localStorage namespace per board.

import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import LZString from "lz-string";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(ROOT, "..", "..");
const MODULES_DIR = path.join(REPO_ROOT, "modules");

// One entry per physical board. `slug` defines the iBom output filename and
// the localStorage namespace; `module` points at the source iBom directory.
const INSTANCES = [
  { slug: "vco-1", module: "02-vco" },
  { slug: "vco-2", module: "02-vco" },
  { slug: "mixer", module: "03-sidechain-mixer" },
  { slug: "vcf",   module: "04-vcf" },
  { slug: "vca-1", module: "05-adsr-vca" },
  { slug: "vca-2", module: "05-adsr-vca" },
  { slug: "utils", module: "06-utils-output" },
  { slug: "brain", module: "07-brain" },
  { slug: "psu",   module: "01-psu" },
];
const MODULES = [...new Set(INSTANCES.map((i) => i.module))];
const PASSES = ["core", "ui"];

const PCBDATA_RE =
  /var\s+pcbdata\s*=\s*JSON\.parse\(\s*LZString\.decompressFromBase64\(\s*"([^"]+)"\s*\)\s*\)/;

async function readPcbdata(html) {
  const m = html.match(PCBDATA_RE);
  if (!m) throw new Error("Could not find pcbdata blob in iBom HTML");
  const decompressed = LZString.decompressFromBase64(m[1]);
  if (!decompressed) throw new Error("LZString decompression returned empty string");
  return JSON.parse(decompressed);
}

// pcbdata.bom shape (KiCad InteractiveHtmlBom):
//   bom.both / bom.F / bom.B  : array of grouped entries; each entry is
//                                an array of [refDesignator, footprintIndex] tuples
//   bom.fields                 : object keyed by footprint index, value is array
//                                of field-strings ordered by config.fields
//   bom.skipped                : array of footprint indices excluded (DNP)
// We use bom.both as the source of truth (every component appears in exactly one
// of F/B/both and "both" is the union for through-hole boards). For these THT
// modules every component is in `both`.
function extractComponents(pcbdata) {
  const bom = pcbdata.bom;
  const fields = bom.fields || {};
  const skipped = new Set(bom.skipped || []);
  const groups = [...(bom.both || []), ...(bom.F || []), ...(bom.B || [])];

  // The first two field columns in iBom are always Value (index 0) and
  // Footprint (index 1). config.fields lists them too — we trust the convention.
  const out = [];
  for (const group of groups) {
    if (!Array.isArray(group) || group.length === 0) continue;
    const refs = [];
    let value = "";
    let footprint = "";
    let allSkipped = true;
    for (const tuple of group) {
      const [refStr, fpIndex] = tuple;
      if (!skipped.has(fpIndex)) allSkipped = false;
      refs.push(refStr);
      const fieldRow = fields[fpIndex];
      if (fieldRow && !value && !footprint) {
        value = fieldRow[0] ?? "";
        footprint = fieldRow[1] ?? "";
      }
    }
    if (allSkipped) continue;
    if (refs.length === 0) continue;
    out.push({ value, footprint, refs });
  }
  // Merge any duplicate (value, footprint) groups that came from F/B/both splits.
  const merged = new Map();
  for (const c of out) {
    const key = `${c.value}|${c.footprint}`;
    if (merged.has(key)) {
      merged.get(key).refs.push(...c.refs);
    } else {
      merged.set(key, { ...c, refs: [...c.refs] });
    }
  }
  return [...merged.values()].map((c) => ({
    ...c,
    refs: [...new Set(c.refs)].sort(naturalRefSort),
  }));
}

// Tweak iBom's `var config = {...}` defaults so the embedded viewer:
//   - drops the "Sourced" checkbox column (we only want "Placed")
//   - sets "Mark when checked" to "Placed" so ticking the in-iframe box
//     visually marks the component on the canvas
// iBom reads localStorage first and falls back to `config`, so this only
// applies on a fresh origin (which the bommap deploy is). Anyone who has
// previously fiddled with these settings in this browser would need to clear
// the `KiCad_HTML_BOM__*` keys from localStorage.
// Footprint prefixes that we treat as SMD on the Core boards. Pre-checked
// in iBom's "Placed" column on first load so the user only has to deal with
// the THT components manually. Case-sensitive starts-with match.
const SMD_PREFIXES = [
  "C_0603",
  "R_0603",
  "D_SOD",     // covers D_SOD-123, D_SOD-323, D_SOD27 etc.
  "SOIC-",
  "SOT-",
  "R_1206",
  "SOP-",
  "USB_C",
  "Gyeszno",
  "CP_Elec",
];

function isSmdFootprint(fp) {
  if (!fp) return false;
  for (const p of SMD_PREFIXES) {
    if (fp.startsWith(p)) return true;
  }
  return false;
}

function smdIndicesFromPcbdata(pcbdata) {
  const fields = pcbdata.bom?.fields || {};
  const out = [];
  for (const [idxStr, row] of Object.entries(fields)) {
    if (!Array.isArray(row)) continue;
    const fp = row[1] || "";
    if (isSmdFootprint(fp)) out.push(Number(idxStr));
  }
  return out.sort((a, b) => a - b);
}

function applyDefaults(html, opts = {}) {
  const { presetPlacedIndices = [] } = opts;
  let out = html
    .replace(/"checkboxes":\s*"Sourced,Placed"/, '"checkboxes": "Placed"')
    .replace(/"layer_view":\s*"[^"]*"/, '"layer_view": "F"');
  // `mark_when_checked` may exist with any value, or be absent on older iBom
  // versions. Replace the value if present; otherwise inject the field into
  // the `var config = {...}` object literal.
  if (/"mark_when_checked"\s*:/.test(out)) {
    out = out.replace(
      /"mark_when_checked":\s*"[^"]*"/,
      '"mark_when_checked": "Placed"'
    );
  } else {
    out = out.replace(
      /(var\s+config\s*=\s*\{[^}]*?)(\s*\})/,
      '$1, "mark_when_checked": "Placed"$2'
    );
  }
  // iBom reads from localStorage first, falling back to `config`. If a user
  // previously interacted with the iframe (toggling Sourced on, etc.), those
  // prefs sit in localStorage and override our new defaults. Wipe them right
  // after iBom defines `storagePrefix`, before window.onload runs init.
  const tag = "<!-- bommap-injection -->";
  if (out.includes(tag)) return out;
  const inject = `
${tag}
<style>
tr.bommap-hl { background: rgba(208, 64, 64, 0.18) !important; }
tr.bommap-hl:hover { background: rgba(208, 64, 64, 0.26) !important; }
tr.bommap-hidden { display: none !important; }

/* Hide the top/bottom toggle — top is visible by default. */
#toptoggle { display: none !important; }

/* Title, revision and date as compact mono. */
#title, #revision, #filedate {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace !important;
  font-size: 11px !important;
  font-weight: normal !important;
  letter-spacing: 0 !important;
  line-height: 1.4 !important;
}
#title {
  font-size: 13px !important;
  font-weight: 700 !important;
}

/* Small filter inputs, matched to toolbar button height; drop the ugly
   filter-icon background and tighten the left padding. */
#reflookup, #filter {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace !important;
  font-size: 11px !important;
  height: 28px !important;
  padding: 6px 10px !important;
  background-image: none !important;
  box-sizing: border-box !important;
}

/* Keep BOM table headers on a single line; widen Placed + Quantity. */
#bomtable th { white-space: nowrap !important; }
#bomtable th[col_name="bom-checkbox"],
#bomtable td.bom-checkbox {
  min-width: 60px !important;
  width: 60px !important;
}
#bomtable th[col_name="Quantity"] {
  min-width: 70px !important;
  width: 70px !important;
}

/* Hover dropdowns (settings, stats, save) in mono + smaller. */
.menu-content,
.menu-content * {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace !important;
  font-size: 11px !important;
}

/* Compact toolbar buttons (and the copy-to-clipboard button next to filters). */
#bomcontrols button,
button#copy {
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  padding: 0 !important;
  background-size: 22px 22px !important;
  background-position: center !important;
  font-size: 11px !important;
  line-height: 26px !important;
}
</style>
<script>
(function () {
  // 1. Force defaults on first load (when keys are absent). We avoid wiping
  //    here because iBom's init does
  //      settings.markWhenChecked = readStorage('markWhenChecked') || '';
  //    so a removed key falls back to '' (= "None"), not the patched config.
  //    Set-if-absent lets the default win on first load and preserves any
  //    explicit user changes on subsequent visits.
  if (typeof storagePrefix !== 'undefined') {
    try {
      var ckKey = storagePrefix + 'bomCheckboxes';
      if (localStorage.getItem(ckKey) === null) {
        localStorage.setItem(ckKey, 'Placed');
      }
      var mwKey = storagePrefix + 'markWhenChecked';
      if (localStorage.getItem(mwKey) === null) {
        localStorage.setItem(mwKey, 'Placed');
      }
      var clKey = storagePrefix + 'canvaslayout';
      if (localStorage.getItem(clKey) === null) {
        localStorage.setItem(clKey, 'F');
      }
      // One-shot migration: earlier extract scripts wiped this key on every
      // load, which made iBom store '' (= "None"). Replace that bad state
      // with our default once, then never touch it again.
      var migKey = storagePrefix + 'bommap-mwc-migrated-v1';
      if (localStorage.getItem(migKey) === null) {
        if (localStorage.getItem(mwKey) === '') {
          localStorage.setItem(mwKey, 'Placed');
        }
        localStorage.setItem(migKey, '1');
      }
    } catch (e) {}
  }

  // 1b. On the very first load (when 'checkbox_Placed' is absent), pre-tick
  //     all SMD components so the user only has to deal with THT manually.
  //     The list is precomputed at extract time as footprint indices.
  var SMD_PRESET = ${JSON.stringify(presetPlacedIndices)};
  if (typeof storagePrefix !== 'undefined' && SMD_PRESET.length) {
    try {
      var key = storagePrefix + 'checkbox_Placed';
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, SMD_PRESET.join(','));
      }
    } catch (e) {}
  }

  // 2. Cross-board highlight + SMD hide: parent posts the refs to highlight
  //    and a flag for whether SMD rows should be visible. We toggle
  //    .bommap-hl / .bommap-hidden on matching BOM rows.
  var refs = [];
  var showSmd = true; // default true so nothing is hidden until parent says so
  var SMD_PREFIXES = ${JSON.stringify(SMD_PREFIXES)};

  function getColIdx(name) {
    var head = document.getElementById('bomhead');
    if (!head) return -1;
    var ths = head.querySelectorAll('th');
    name = name.toLowerCase();
    for (var i = 0; i < ths.length; i++) {
      if (ths[i].textContent.trim().toLowerCase() === name) return i;
    }
    return -1;
  }

  function isSmdFp(fp) {
    if (!fp) return false;
    for (var i = 0; i < SMD_PREFIXES.length; i++) {
      if (fp.indexOf(SMD_PREFIXES[i]) === 0) return true;
    }
    return false;
  }

  function apply() {
    var body = document.getElementById('bombody');
    if (!body) return;
    var refsCol = getColIdx('references');
    var fpCol = getColIdx('footprint');
    var set = Object.create(null);
    for (var i = 0; i < refs.length; i++) set[refs[i]] = true;
    var rows = body.children;
    for (var r = 0; r < rows.length; r++) {
      var tr = rows[r];
      // Highlight matching refs
      var match = false;
      if (refsCol >= 0) {
        var refCell = tr.cells[refsCol];
        if (refCell) {
          var tokens = refCell.textContent.split(/[,\\s]+/);
          for (var t = 0; t < tokens.length; t++) {
            var tk = tokens[t].trim();
            if (tk && set[tk]) { match = true; break; }
          }
        }
      }
      tr.classList.toggle('bommap-hl', match);
      // Hide rows that don't match the active selection, OR SMD rows when
      // the toggle is off. When there's no selection (refs empty), only
      // the SMD rule applies.
      var hide = false;
      if (refs.length > 0 && !match) hide = true;
      if (!hide && !showSmd && fpCol >= 0) {
        var fpCell = tr.cells[fpCol];
        if (fpCell && isSmdFp(fpCell.textContent.trim())) hide = true;
      }
      tr.classList.toggle('bommap-hidden', hide);
    }
  }

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (!d) return;
    if (d.type === 'bommap:setRefs') {
      refs = Array.isArray(d.refs) ? d.refs : [];
      apply();
    } else if (d.type === 'bommap:setShowSmd') {
      showSmd = !!d.showSmd;
      apply();
    }
  });

  function observe() {
    var body = document.getElementById('bombody');
    if (!body) { setTimeout(observe, 80); return; }
    new MutationObserver(apply).observe(body, { childList: true, subtree: false });
    apply();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }
})();
</script>
`;
  const idx = out.lastIndexOf("</body>");
  if (idx === -1) return out + inject;
  return out.slice(0, idx) + inject + out.slice(idx);
}

function naturalRefSort(a, b) {
  const splitRef = (r) => {
    const m = r.match(/^([A-Za-z]+)(\d+)/);
    return m ? [m[1], parseInt(m[2], 10)] : [r, 0];
  };
  const [pa, na] = splitRef(a);
  const [pb, nb] = splitRef(b);
  return pa === pb ? na - nb : pa.localeCompare(pb);
}

// Append a slug into iBom's storagePrefix so each physical instance keeps
// its own "Placed" / "bomCheckboxes" state. Example:
//   'KiCad_HTML_BOM__' + ... + 'revision' + '__#'   (original)
// becomes
//   'KiCad_HTML_BOM__' + ... + 'revision' + '__bommap-vco-2__#'
function withInstanceStorage(html, slug) {
  return html.replace(
    /(pcbdata\.metadata\.revision\s*\+\s*)'__#'/,
    `$1'__bommap-${slug}__#'`
  );
}

async function main() {
  const out = { core: {}, ui: {} };
  const ibomsOutDir = path.join(ROOT, "public", "iboms");
  await fs.mkdir(ibomsOutDir, { recursive: true });

  // PSU is a single board with no core/ui split; its iBom lives under
  // electronics/bom/ibom.html. We mirror its data into both passes so it
  // shows up regardless of which pass the user is on.
  const sourcePath = (moduleId, pass) =>
    moduleId === "01-psu"
      ? path.join(MODULES_DIR, moduleId, "electronics", "bom", "ibom.html")
      : path.join(MODULES_DIR, moduleId, "electronics", pass, "bom", "ibom.html");

  // 1) Parse each source module once and capture both the BOM data and the
  //    raw HTML for later per-instance copies.
  const sources = {}; // sources[moduleId][pass] = { html, components, meta }
  for (const moduleId of MODULES) {
    sources[moduleId] = {};
    for (const pass of PASSES) {
      const src = sourcePath(moduleId, pass);
      let html;
      try {
        html = await fs.readFile(src, "utf8");
      } catch (e) {
        console.warn(`! missing: ${src}`);
        continue;
      }
      const pcbdata = await readPcbdata(html);
      const components = extractComponents(pcbdata);
      const meta = pcbdata.metadata || {};
      // Compute SMD indices for both passes — UI boards typically have no
      // SMD parts so this is empty, but the parent Reset relies on the list
      // (or its emptiness) for both Core and UI.
      const smdIndices = smdIndicesFromPcbdata(pcbdata);
      sources[moduleId][pass] = { html, components, meta, smdIndices };
      out[pass][moduleId] = {
        title: meta.title || moduleId,
        revision: meta.revision || "",
        components,
      };
      const refCount = components.reduce((n, c) => n + c.refs.length, 0);
      console.log(
        `  parse  ${pass.padEnd(4)} ${moduleId.padEnd(20)} groups=${String(components.length).padStart(3)}  refs=${refCount}`
      );
    }
  }

  // 2) Emit one HTML file per (instance, pass) with a slug-scoped
  //    storagePrefix so duplicated boards (VCO 1/2, VCA 1/2) track Placed
  //    state independently. Also build the presets manifest the parent
  //    Reset uses to rewrite localStorage.
  const presets = {};
  for (const inst of INSTANCES) {
    presets[inst.slug] = {};
    for (const pass of PASSES) {
      const src = sources[inst.module]?.[pass];
      if (!src) continue;
      // SMDs are only pre-checked on Core boards (UI panels are THT only).
      const presetPlacedIndices = pass === "core" ? src.smdIndices : [];
      const html = withInstanceStorage(
        applyDefaults(src.html, { presetPlacedIndices }),
        inst.slug
      );
      const outHtml = path.join(ibomsOutDir, `${inst.slug}-${pass}.html`);
      await fs.writeFile(outHtml, html);
      // The runtime storagePrefix iBom builds is
      //   'KiCad_HTML_BOM__' + title + '__' + revision + '__bommap-<slug>__#'
      const storagePrefix =
        "KiCad_HTML_BOM__" +
        (src.meta.title || "") +
        "__" +
        (src.meta.revision || "") +
        "__bommap-" +
        inst.slug +
        "__#";
      presets[inst.slug][pass] = {
        storagePrefix,
        smdIndices: presetPlacedIndices,
      };
      const presetNote = presetPlacedIndices.length
        ? ` smd-preset=${presetPlacedIndices.length}`
        : "";
      console.log(
        `  emit   ${pass.padEnd(4)} ${inst.slug.padEnd(8)} <- ${inst.module}${presetNote}`
      );
    }
  }

  const dataDir = path.join(ROOT, "src", "data");
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(
    path.join(dataDir, "boards.json"),
    JSON.stringify(out, null, 2)
  );
  await fs.writeFile(
    path.join(dataDir, "presets.json"),
    JSON.stringify(presets, null, 2)
  );
  console.log("\nwrote src/data/boards.json and src/data/presets.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
