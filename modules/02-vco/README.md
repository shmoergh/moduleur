# Hog Moduleur / VCO

Eurorack compatible VCO.

## Features

- Raw saw generator with classic waveshaper circuits. Triangle, saw and square outputs
- Sub oscillator and noise circuit (can be selected with a jumper)
- Pulse width voltage control for square wave
- High precision over about 10 octaves
- Hard sync input
- FM input
- Two temperature compensation options for flexible DIY build (one is THT only)
- Separate core and UI PCBs for reusability and custom UI builds
- Gerber files for JLCPCB order
- Designed from very common electronic components

## Boards

- [Core board](./electronics/core/) — Contains all active circuitry and handles the complete audio, CV, and logic processing for the module.
- [UI board](./electronics/ui/) — Hosts all panel-mounted controls and connectors, providing the physical interface to the module’s Core PCB.

## Build guide

Follow the [Build guide](https://www.shmoergh.com/moduleur-build-guide)

**TLDR;**
- Gerber files for JLCPCB ordering are in each board's `production` folder
- BOM is also available in the respective `production` folder.
- The full BOM is in the module's root dir. All THT components are available at Mouser
- Use the KiCad schematic and PCB layout for soldering reference
- **Before connecting any modules**, always make sure there are no shorts between ±12V and ground.

## Photos

<img width="514" height="1026" alt="image" src="https://github.com/user-attachments/assets/495d5f72-3f07-4e4c-9331-40a09e54a261" />


## 🧪 License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur/DISCLAIMER.md)
