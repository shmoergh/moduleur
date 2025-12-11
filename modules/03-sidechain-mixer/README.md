# Shmøergh Moduleur / Sidechain Mixer

4 channel Eurorack compatible mixer with sidechain compressor.

## Features

- 4 input audio or CV mixer (DC coupled)
- Channel 4 can be used as the control input for a VCA based sidechain compressor that acts on the output mix. Channel 4 can be individually added to the output mix or can remain silent, while the compressor still operates.
- Gain control for channel 4 which allows to amplify line level signals to Eurorack level, allowing to mix external instruments with Eurorack sound sources
- Dedicated output volume control
- Separate core and UI PCBs for reusability and custom UI builds
- Gerber files for JLCPCB order
- Designed from very common electronic components

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
