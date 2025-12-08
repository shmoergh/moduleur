# Shmøergh Moduleur

A fully analog, DIY-friendly modular synthesizer system derived from the original [Shmøergh Hog](https://www.shmoergh.com/hog). The instrument is built from discrete modules — oscillators, filters, VCAs, utilities, and a digital Brain — usable either in their default pre-patched configuration or in any Eurorack system.

The project targets builders who want a reproducible, open, and hackable analog instrument. All circuits, PCBs, firmware, and mechanical designs are published here, including schematics, Gerbers, BOMs, and panel files. Each module is self-contained and can be assembled or modified independently.

Moduleur follows standard Eurorack conventions (±12 V rails, reverse polarity protection, 10-pin power, 1 V/oct where applicable). Designs emphasize robustness, available components, and clear signal flow. Simulation files and test notes are included for further study or modification.

This repository reflects ongoing hardware and firmware development, and module revisions may change over time.

Follow progress at [shmoergh.com](https://www.shmoergh.com/moduleur/)

![moduleur-bp](https://github.com/user-attachments/assets/ad6fa67c-86e8-4ebe-b9d9-81f88d96dbc5#gh-light-mode-only)
![moduleur-bp](https://github.com/user-attachments/assets/0fbdfd7c-b418-4afc-9abd-d068e30c7268#gh-dark-mode-only)


## Build options

This repository contains only a brief overview of the build process. A full, detailed build guide is available at:  https://www.shmoergh.com/moduleur-build-guide

**Core boards** handle all analog and digital circuitry; **UI boards** contain only panel components. This separation allows the core electronics to be reused in alternative designs or custom enclosures.

BOM part numbers—especially SMD components—may become outdated. If you spot mismatches or unavailable parts, please open an issue or submit a pull request.

#### Recommended Build Sequence

1. **Assemble modules in the order listed in the Modules section.**
   Each module directory includes panel design files for 3D printing or other fabrication.
2. **Use modules individually if needed.**
   All analog modules follow Eurorack standards and can be installed in any Eurorack case.
3. **Moduleur enclosure (optional).**
   Design files are provided, but the enclosure is an advanced build. Pre‑built versions may be offered in 2026 depending on demand.

## Modules

- [01 — Power supply](https://github.com/shmoergh/moduleur/tree/main/01-psu)
- [02 — VCO](https://github.com/shmoergh/moduleur/tree/main/02-vco)
- [03 — Mixer + sidechain compressor](https://github.com/shmoergh/moduleur/tree/main/03-sidechain-mixer)
- [04 — VCF](https://github.com/shmoergh/moduleur/tree/main/04-vcf)
- [05 — ADSR & VCA](https://github.com/shmoergh/moduleur/tree/main/05-adsr-vca)
- [06 — Analog Bitcrusher / S&H + LFO + Output](https://github.com/shmoergh/moduleur/tree/main/06-utils-output)
- [07 — Brain](https://github.com/shmoergh/moduleur/tree/main/07-brain)
- [08 — Default patch](https://github.com/shmoergh/moduleur/tree/main/08-default-patch)


## Enclosure

- [Moduleur enclosure by Shmøergh](https://github.com/shmoergh/moduleur/tree/main/enclosure)
- [Eurorack frame](https://github.com/shmoergh/moduleur/tree/main/eurorack/frame)

## Contribution & Bug Reports

Contributions are welcome, especially in areas where community experience can improve the reliability and longevity of the system. Useful contributions include:

- Reporting electronics issues or unexpected behaviour in any module
- Suggestions for improving analog or mixed-signal circuits
- Updating outdated or unavailable part numbers in SMD or THT BOMs
- Providing alternative UI board designs, control layouts, or enclosure adaptations

If you encounter a bug or discrepancy, please open an issue in this repository and include as much detail as possible (module revision, measurements, test conditions, photos if relevant). Pull requests are encouraged for straightforward fixes such as BOM updates or documentation improvements.

## License

Shmøergh Hog Moduleur © 2025

Hardware is licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

Software is licensed under [MIT](https://opensource.org/license/mit).

Font used on PCBs: https://departuremono.com

Simulations made in [CircuitJS](https://www.falstad.com/circuit/circuitjs.html)

## Disclaimer

All electronic projects and designs presented on this web site, or associated web sites should be considered dangerous if not lethal if not used safely. When working on projects based on the designs on this site, use extreme care to ensure that you do not come into contact with mains AC voltages or high voltage DC. If you are not confident about working with mains voltages, or high voltages, or you are not legally allowed to work with mains voltages, or high voltages, you are advised not to attempt work on them. The author, host, and all people associated with these web pages disclaim any liability for damages should anyone be killed or injured while working on these projects, or projects based on these designs, or any other project or design presented on these web pages and any associated web pages. The author, host, and all people associated with these web pages also disclaim any liability for projects, or projects based on these designs, or any other project or design presented on these web pages and any associated web pages when used in such a way as to infringe relevant government regulations and by-laws.

All circuits, schematics, printed circuit board, panel design and associated data published on this site can be used for private use only.

We are not responsible for any errors in the PCB design or the parts list. All responsibility for ordering PCBs, components, and assembly services rests solely with you.
