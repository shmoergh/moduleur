# Hog Moduleur / Utils & Output

Combined analog bitcrusher, LFO and an output interface with overdrive in a single Eurorack compatible module.

## Features

- Analog bitcrusher
- External trigger of analog bitcrusher, which allows sample & hold usage
- Analog LFO with square and triangle output
- LFO works from about 0.1Hz to 200Hz audio range
- LED indicator for LFO
- Output module to interface line level audio
- LED based overdrive in output module
- Optional dual-mono headphones output
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
