# Shmøergh Moduleur / VCF

Dual mode Eurorack compatible diode filter based on the famous Synthacon Steiner-Parker circuit.

## Features

- Classic diode filter with extremely drippy character
- Low pass and high pass filter inputs
- Fine-tunable maximum resonance control — can go smooth to crazy
- Two external CV inputs with logarithmic attenuverters
- Optional EMC shielding to isolate external noise
- Separate core and UI PCBs for reusability and custom UI builds
- Gerber files for JLCPCB order
- Designed from very common electronic components

## Boards

- [Core board](./electronics/core/) — Contains all active circuitry and handles the complete audio, CV, and logic processing for the module.
- [UI board](./electronics/ui/) — Hosts all panel-mounted controls and connectors, providing the physical interface to the module’s Core PCB.

## How to Build

Follow the [Build guide](https://www.shmoergh.com/moduleur-build-guide)

**TLDR;**
- Gerber files for JLCPCB ordering are in each board's `production` folder
- BOM is also available in the respective `production` folder.
- The full BOM is in the module's root dir. All THT components are available at Mouser
- Use the KiCad schematic and PCB layout for soldering reference
- **Before connecting any modules**, always make sure there are no shorts between ±12V and ground.

## Photos

<img width="2050" height="2050" alt="image" src="https://github.com/user-attachments/assets/690c2f28-b742-4235-9632-a4d1070735f8" />


## 🧪 License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur)
