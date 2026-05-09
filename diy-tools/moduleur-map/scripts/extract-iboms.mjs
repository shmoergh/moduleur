#!/usr/bin/env node
// Extracts BOM data from KiCad InteractiveHtmlBom (iBom) HTML files for the 6
// Moduleur sound modules and writes:
//   - public/iboms/<module>-<core|ui>.html  (verbatim copy for iframe embedding)
//   - src/data/boards.json                  (clean BOM data for the React app)

import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import LZString from "lz-string";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(ROOT, "..", "..");
const MODULES_DIR = path.join(REPO_ROOT, "modules");

const MODULES = [
  "02-vco",
  "03-sidechain-mixer",
  "04-vcf",
  "05-adsr-vca",
  "06-utils-output",
  "07-brain",
];
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
function applyDefaults(html) {
  let out = html
    .replace(
      /"checkboxes":\s*"Sourced,Placed"/,
      '"checkboxes": "Placed"'
    )
    .replace(
      /"mark_when_checked":\s*""/,
      '"mark_when_checked": "Placed"'
    );
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
</style>
<script>
(function () {
  // 1. Wipe stale prefs so the patched config defaults take effect.
  if (typeof storagePrefix !== 'undefined') {
    try {
      localStorage.removeItem(storagePrefix + 'bomCheckboxes');
      localStorage.removeItem(storagePrefix + 'markWhenChecked');
    } catch (e) {}
  }

  // 2. Cross-board highlight: parent posts the refs to highlight on this
  //    board, we add .bommap-hl to matching BOM rows.
  var refs = [];

  function getRefsCol() {
    var head = document.getElementById('bomhead');
    if (!head) return -1;
    var ths = head.querySelectorAll('th');
    for (var i = 0; i < ths.length; i++) {
      if (ths[i].textContent.trim().toLowerCase() === 'references') return i;
    }
    return -1;
  }

  function apply() {
    var body = document.getElementById('bombody');
    if (!body) return;
    var col = getRefsCol();
    if (col < 0) return;
    var set = Object.create(null);
    for (var i = 0; i < refs.length; i++) set[refs[i]] = true;
    var rows = body.children;
    for (var r = 0; r < rows.length; r++) {
      var tr = rows[r];
      var cell = tr.cells[col];
      var match = false;
      if (cell) {
        var tokens = cell.textContent.split(/[,\\s]+/);
        for (var t = 0; t < tokens.length; t++) {
          var tk = tokens[t].trim();
          if (tk && set[tk]) { match = true; break; }
        }
      }
      tr.classList.toggle('bommap-hl', match);
    }
  }

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (d && d.type === 'bommap:setRefs') {
      refs = Array.isArray(d.refs) ? d.refs : [];
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

async function main() {
  const out = { core: {}, ui: {} };
  const ibomsOutDir = path.join(ROOT, "public", "iboms");
  await fs.mkdir(ibomsOutDir, { recursive: true });

  for (const moduleId of MODULES) {
    for (const pass of PASSES) {
      const src = path.join(
        MODULES_DIR,
        moduleId,
        "electronics",
        pass,
        "bom",
        "ibom.html"
      );
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
      out[pass][moduleId] = {
        title: meta.title || moduleId,
        revision: meta.revision || "",
        components,
      };
      const outHtml = path.join(ibomsOutDir, `${moduleId}-${pass}.html`);
      await fs.writeFile(outHtml, applyDefaults(html));
      const refCount = components.reduce((n, c) => n + c.refs.length, 0);
      console.log(
        `  ${pass.padEnd(4)} ${moduleId.padEnd(20)} groups=${String(components.length).padStart(3)}  refs=${refCount}`
      );
    }
  }

  const dataDir = path.join(ROOT, "src", "data");
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(
    path.join(dataDir, "boards.json"),
    JSON.stringify(out, null, 2)
  );
  console.log("\nwrote src/data/boards.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
