# Shmøergh Moduleur

A fully analog, DIY-friendly modular synthesizer system derived from the original [Shmøergh Hog](https://www.shmoergh.com/hog). The instrument is built from discrete modules — oscillators, filters, VCAs, utilities, and a digital Brain — usable either in their default pre-patched configuration or in any Eurorack system.

The project targets builders who want a reproducible, open, and hackable analog instrument. All circuits, PCBs, firmware, and mechanical designs are published here, including schematics, Gerbers, BOMs, and panel files. Each module is self-contained and can be assembled or modified independently.

Moduleur follows standard Eurorack conventions (±12 V rails, reverse polarity protection, 10-pin power, 1 V/oct where applicable). Designs emphasize robustness, available components, and clear signal flow. Simulation files and test notes are included for further study or modification.

This repository reflects ongoing hardware and firmware development, and module revisions may change over time.

Follow progress at [shmoergh.com](https://www.shmoergh.com/moduleur/)

![moduleur-bp](https://github.com/user-attachments/assets/bd80d225-350d-44ae-b68d-8cad4bbadadd#gh-light-mode-only)
![moduleur-bp](https://github.com/user-attachments/assets/a9fdfeb7-7ad8-4782-806b-18bf5c98be53#gh-dark-mode-only)

## Community

Join the [Shmøergh Discord server](https://discord.gg/2q7EmK3H).

## Building

[Read the build guide &rarr;](https://github.com/shmoergh/moduleur/wiki)

## Modules

- [Power supply](https://github.com/shmoergh/moduleur/tree/main/modules/01-psu)
- [VCO](https://github.com/shmoergh/moduleur/tree/main/modules/02-vco)
- [Mixer + sidechain compressor](https://github.com/shmoergh/moduleur/tree/main/modules/03-sidechain-mixer)
- [VCF](https://github.com/shmoergh/moduleur/tree/main/modules/04-vcf)
- [ADSR & VCA](https://github.com/shmoergh/moduleur/tree/main/modules/05-adsr-vca)
- [Analog Bitcrusher / S&H + LFO + Output](https://github.com/shmoergh/moduleur/tree/main/modules/06-utils-output)
- [Brain](https://github.com/shmoergh/moduleur/tree/main/modules/07-brain)
- [Default patch](https://github.com/shmoergh/moduleur/tree/main/modules/08-default-patch)


## Enclosure

- [Moduleur enclosure by Shmøergh](https://github.com/shmoergh/moduleur/tree/main/enclosure)
- [Eurorack frame](https://github.com/shmoergh/moduleur/tree/main/eurorack/frame)
- [Eurorack faceplates](https://github.com/shmoergh/moduleur/tree/main/eurorack/faceplates)

## Roadmap

We're working on improving modules, and adding firmwares to Brain as we go. You can see our loosely held ideas in the [Roadmap](./ROADMAP.md) file.

## Contribution & Bug Reports

Contributions are much appreciated, especially in areas where community experience can improve the reliability and longevity of the system.

[Contributing guidelines](./CONTRIBUTING.md)

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
