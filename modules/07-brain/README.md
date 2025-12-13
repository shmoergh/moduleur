# Shmøergh Moduleur / Brain

Brain is a universal digital module for the Shmøergh Moduleur which enables the development of new functions like sequencers, MIDI features, digital voices and synths and whatever comes to mind. The module uses a Raspberry Pi Pico / Pico 2 so all features of the board are available in any language (Micropython, C++, Rust). To speed up development we provide an SDK that makes it easy to use the available pots, buttons, I/O and MIDI.

## Features

- Universal digital module based on Raspberry Pi Pico or Pico 2
- Three buttons, one of them with LED
- Two potmeters
- Dedicated MIDI input with input protection
- Six dimmable LED indicators
- Two audio or CV inputs
- Two audio or CV outputs
- One pulse input
- One pulse output
- USB-C connector
- Uses an actual Rpi Pico board under the hood
- Brain SDK for all UI components
- CV voltage output tuner trimmer pot
- Software based AC/DC coupling on audio/CV output
- Separate UI & core PCBs for reusability
- 12HP Eurorack compatible design
- Reverse polarity protection

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

## Firmware development

The Brain SDK is a firmware and library collection for the Raspberry Pi Pico, designed to speed up the development. It provides reusable components for I/O, UI, DSP, and more, along with example programs and scripts to streamline project setup and prototyping.

[Brain SDK](./brain-sdk/)

## Photos

<img width="514" height="1026" alt="image" src="https://github.com/user-attachments/assets/4a3b6dea-2e2e-4952-b58d-fd4deb45d461" />



## 🧪 License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur)
