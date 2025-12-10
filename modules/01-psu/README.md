# Hog Moduleur / PSU – ±12V Eurorack Power Supply

Eurorack compatible power supply unit for the Shmøergh Moduleur.

## Features

- ±12V power. Works with any of the following Mean Well regulators:
    - [NSD10-12D12](https://mou.sr/3ZpECrS)
    - [DKM10A-12](https://mou.sr/450kLTV)
    - [DKMW20F-12](https://mou.sr/44G5aaH)
    - [DKMW30F-12](https://mou.sr/450gwaT)
- Requires **center positive** 12V DC input
- Built in DC barrel jack input and power switch
- Optional +/- input headers for off-board DC & switch placement. Just make sure you know what you're doing if you're using it.
- Open source hardware

There are two board variations available:

1. [8 output for Eurorack](./electronics/eurorack-8-out/). Designed for small Eurorack cases and standalone synth builds. Output current depends on the regulator used (see above).
2. [4 output for Moduleur enclosure](./electronics/moduleur-enclosure/). Designed for the Shmøergh Moduleur enclosure

## Boards

There's a single board for each version, the boards have only through-hole (THT) components.

## How to Build

- Gerber files for JLCPCB ordering are in the `production` folders
- BOM is also available in the `production` folders. All components are available at Mouser, no assembly required from JLCPCB
- Use the KiCad schematic and PCB layout for soldering reference
- **Before connecting any modules**, always make sure there are no shorts between ±12V and ground.

[Build guide](https://www.shmoergh.com/moduleur-build-guide)

## Photos

![IMG_2939](https://github.com/user-attachments/assets/093e68c2-3c0d-4f67-8883-82444be80754)


## 🧪 License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur)
