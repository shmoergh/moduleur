# Hog Moduleur / ADSR + VCA

A combined, Eurorack compatible envelope generator and voltage controlled amplifier module for the Shmøergh Moduleur.

## Features

- Combines a full ADSR envelope generator and VCA module in one
- Envelope times go up until 10sec (depending on the used pot values)
- The ADSR output can be normalized to the CV of the VCA
- Bias trimmer for VCA to set base amp level
- LED indicator for envelope
- 12HP Eurorack compatible design
- Reverse polarity protection

## Boards

- [Core board](./electronics/core/) — Contains all active circuitry and handles the complete audio, CV, and logic processing for the module.
- [UI board](./electronics/ui/) — Hosts all panel-mounted controls and connectors, providing the physical interface to the module’s Core PCB.

## How to Build

- Gerber files for JLCPCB ordering are in each board's `production` folder
- BOM is also available in the respective `production` folder. All THT components are available at Mouser
- Use the KiCad schematic and PCB layout for soldering reference
- **Before connecting any modules**, always make sure there are no shorts between ±12V and ground.

[Build guide](https://www.shmoergh.com/moduleur-build-guide)

## Photos

TK


## 🧪 License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur)
