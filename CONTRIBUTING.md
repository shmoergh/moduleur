# Contributing to Shmøergh Moduleur

First of all: thank you for even thinking about contributing. 🐷
Moduleur is an open hardware project that we want to keep **hackable, reproducible, and buildable** for other people. Good contributions help us keep it that way.

This document explains how we work on the project and how you can get changes merged.

---

## TL;DR

- **Small fix (typo, BOM update, docs):**
  - Branch from `main`
  - Make the change
  - Open a PR into `main`

- **New features / module revisions / Brain stuff:**
  - Branch from `next`
  - Open a PR into `next`

- **Not sure where it belongs?**
  - Open an issue first and we’ll figure it out together.

---

## Repository layout

At the [top level](https://github.com/shmoergh/moduleur) you’ll find:

- `modules/` – all analog + digital modules (power, VCO, VCF, ADSR, VCA, Brain, etc.)
- `enclosure/` – Moduleur enclosure and related mechanical parts
- `eurorack/` – generic Eurorack frame / rails / faceplates
- `accessories/` – extra tools and add-ons
- `lib/` – KiCad components and footprints

Each module directory is intended to be **self-contained**:
- KiCad project and schematics
- Gerbers / production files
- BOM(s) for different vendors
- Panel / mechanical files
- A short module-level `README.md` (what it does, status, quirks)

If you add or change anything, please keep this structure intact.

---

## Branches & releases

We use **branches**, not folders, to separate stable and in-progress work.

- **`main`**
  - Always points to the **latest stable, buildable release**.
  - What the website and build guide assume.
  - Safe for people who just want to build the synth.

- **`next`**
  - Ongoing development for the **next** hardware/firmware revisions.
  - New modules, Brain features, bigger refactors.

- **Tags**
  - We tag releases as `vX.Y` (e.g. `v1.0`, `v1.1`).
  - Tags capture the state of the whole system at a given release:
    - module revisions,
    - enclosure version,
    - Brain firmware version.

### Which branch should I target?

- Target **`main`** if:
  - You’re fixing a bug or typo in the current build docs
  - You’re updating a BOM for the currently recommended module revision
  - You’re correcting silkscreen notes, simple wiring diagrams, etc.

- Target **`next`** if:
  - You’re working on a new module revision (revB, revC…)
  - You’re changing circuit topology
  - You’re adding or changing Brain firmware / SDK APIs
  - You’re adding new accessories, utilities, or enclosure variants

If you opened a PR to the "wrong" branch, no stress — we can help retarget it.

---

## Types of contributions

Useful things people can help with:

- **Hardware**
  - Improvements to module schematics or layouts
  - Better protection, noise performance, or reliability
  - Fixes for known issues (please document measurements)

- **Firmware / Brain / SDK**
  - New Brain programs (sequencers, utilities, weird digital voices)
  - Improvements to the Brain SDK and examples
  - Better documentation for the API and build setup

- **BOMs & production files**
  - Replacing obsolete parts with drop-in alternatives
  - Fixing quantities or part numbers
  - Adding notes about supply issues or known good substitutes

- **Docs**
  - Clarifying build steps
  - Adding module-specific notes or troubleshooting tips
  - Fixing broken links, typos, or unclear wording

If you have a wild idea (new module, expansion, etc.), open an issue and pitch it.

---

## How to report a bug

Before opening an issue:

1. **Check existing issues** to see if it’s already reported.
2. Make sure you are:
   - On the latest release (or clearly state if you’re not)
   - Using the documented build guide and BOMs

When opening a new issue, please include:

- **Module name and revision**
  - e.g. `02-vco revA`, `01-power revB`
- **Branch / tag**
  - e.g. `main@v1.0`, `next` as of `2025-12-10`
- **Power & environment**
  - Supply voltage(s)
  - What other modules are connected
- **What you expected vs what you see**
  - Audio / scope screenshots if possible
- **Steps to reproduce**
  - The simpler the better

For firmware issues, add:

- Brain firmware version / commit
- Host toolchain (OS, compiler version, etc.)
- Exact steps to trigger the bug

The more detail you give, the easier it is for us (or someone else) to reproduce and fix.

---

## How to submit a pull request

1. **Fork** the repo on GitHub.
2. **Create a branch** from the correct base:
   - `main` for small docs/BOM fixes
   - `next` for new features or hardware/firmware changes
3. **Make focused changes**
   - One logical change per PR if possible.
   - If you’re changing both circuits and docs, keep them in the same PR if they’re tightly related.
4. **Keep style & structure**
   - Don’t rename files or move folders around unless it’s the point of the PR.
   - Follow existing KiCad and code conventions where possible.
5. **Update docs**
   - If you change how something works, update:
     - module `README.md`
     - any relevant top-level docs or links
6. **Open the PR**
   - Give it a clear title
   - In the description:
     - Explain **why** you’re making the change
     - Link any related issue(s)
     - Call out breaking changes or migration steps for builders

We’ll review, maybe ask questions, and merge or request changes.

---

## Hardware guidelines

Because this is open hardware people will build at home:

- **Don’t silently break footprints or pinouts**
  - If you change connector pinouts, supply rails, or control ranges:
    - Document it in the module `README.md`
    - Note it in the PR description
- **Keep modules self-contained**
  - All files needed to manufacture and build a module should live in its directory:
    - KiCad project
    - Gerber / production zip(s)
    - BOMs for at least one major vendor (JLCPCB, Mouser, etc.)
- **BOM changes**
  - Prefer drop-in replacements (same footprint / orientation).
  - If electrical behaviour changes, add a short note (e.g. “slightly higher noise floor, but easier to source”).
- **Test notes are gold**
  - If you improve or modify a circuit:
    - Add measurements (scope shots, frequency response, noise floor, etc.) when you have them.
    - Even rough notes are better than nothing.

We’d rather have a slightly “boring” but well-documented circuit than something magical that nobody can debug.

---

## Firmware / Brain / SDK guidelines

For code in `lib/` and Brain-related modules:

- **Language & style**
  - C/C++ code should follow the existing style in the repo as much as possible.
  - Use clear naming and plenty of comments for hardware-touching code.
- **APIs**
  - Be conservative with breaking changes to public SDK APIs.
  - If you *do* need to break something:
    - Note it clearly in docs
    - Consider keeping a compatibility layer or deprecated path for one release.
- **Examples**
  - If you add a new feature, try to add or update at least one example firmware that uses it.
- **Platform assumptions**
  - Mention any assumptions about clock rates, core usage, or specific MCU features.

---

## Coding standards & tools

We don’t have a heavy rulebook, but a few simple things help:

- Keep lines reasonably short and readable.
- Prefer clear variable names over clever ones.
- Avoid adding big binary files (renders, huge images, etc.) to the repo.
- If you use a formatter or linter, apply it project-wide, not just to a few random files.

If you’re unsure about tooling, just open a PR and we can bikeshed it there.

---

## Behaviour & community

Short version: **be nice**.

- No harassment, hate speech, or personal attacks.
- Respect that people build these projects in their free time.
- If something bothers you, raise it constructively in issues or PRs.

We want this to stay a friendly place for people who like **music, design, and hacking** — in whatever order.

---

## Questions?

If you’re not sure where to start:

- Open an issue with your idea or question.
- Or ping us with:
  - what you want to do,
  - which module / part of the repo it touches,
  - and whether you’re thinking hardware, firmware, or docs.

We’re happy to help you shape a contribution that fits the project.

Thanks again for helping us make this weird modular synth better. 🐷🧪