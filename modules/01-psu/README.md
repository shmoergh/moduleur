# Shmøergh Moduleur / PSU – ±12V Eurorack Power Supply

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

## How to build

[**Follow the build guide &rarr;**](https://github.com/shmoergh/moduleur/wiki)

## Module specific instructions

### Orientation guide for the Moduleur enclosure

If you're building for the Moduleur enclosure, you need to solder the power connectors on the _bottom_ side of the PCB (ie. the opposite of where the on/off switch and the DC/DC converter is), with the connector pointing to the large cutout on the PCB:

<img src="https://github.com/user-attachments/assets/16765d66-fab6-4d0c-b477-4db1ae6c498d" />

<img src="https://github.com/user-attachments/assets/c1de3578-8825-4b52-af8e-95f9a901c45f" />


![psu-orientation](https://github.com/user-attachments/assets/9a18d5d9-96bd-42d8-89b1-822f050a2927)


### Powering the PSU

Use a center positive 12V DC wall adapter to power the PSU.

### Wired DC input and ON/OFF switch

You can create connect your own ON/OFF switch and DC input components using the +/- terminals on the board. This is useful if you're building a custom enclosure and you want the ON/OFF switch and DC input on the enclosre, remote from the PSU. In this case, don't use the built-in DC jack socket and the ON/OFF button.

<img src="https://github.com/user-attachments/assets/8a47af6c-7f09-4a46-a498-9523f7f692ce" />

## License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur/blob/main/DISCLAIMER.md)

## Latest module version

v1.0

