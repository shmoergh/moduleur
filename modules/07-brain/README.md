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

## Programs

As of today the following programs are available for the Brain module:

- [Basic MIDI2CV](https://github.com/shmoergh/brain-basic-midi2cv) - Basic MIDI to CV converter with selectable MIDI and output channels
- [Output tuner](https://github.com/shmoergh/brain-output-tuner) - Helper program to fine tune the outputs of the Brain module. Also can be used to tune VCOs.

## Boards

- [Core board](./electronics/core/) — Contains all active circuitry and handles the complete audio, CV, and logic processing for the module.
- [UI board](./electronics/ui/) — Hosts all panel-mounted controls and connectors, providing the physical interface to the module’s Core PCB.


## How to build

[**Follow the build guide &rarr;**](https://github.com/shmoergh/moduleur/wiki)

<br>

## Module specific instructions

### Soldering the Raspberry Pi Pico board

You can solder the Pico to the Core board directly or using pin headers. If you solder directly then you'll need a very thin USB cable to be able to connect to the original micro USB port of the Pico.

### USB-C connection — EXPERIMENTAL

As it's listed on page 7 of the [Pico data sheet](https://pip-assets.raspberrypi.com/categories/610-raspberry-pi-pico/documents/RP-008307-DS-1-pico-datasheet.pdf?disposition=inline), you can use test points to connect to the board's USB, as well as control the BOOTSEL button remotely. This allowed us to add an USB-C connection and a dedicated BOOTSEL button, available without taking the enclosure backplate off.

To connect the external USB-C connector and BOOTSEL button to the Pico you have two options:

<img src="https://github.com/user-attachments/assets/ee17834d-8982-42ac-9f7f-c02c82b4da5b" />

**Option 1:** Solder the Pico using pin headers and use wires to connect up TP1, TP2, TP3 and TP6 (BOOTSEL) between the Core board and the Pico. In this case you can lead through wires on the PCB hole as you can see on this photo:

![IMG_8047](https://github.com/user-attachments/assets/a706d4bb-ffdc-42f1-ae92-0723b7452b8a)

**Option 2:** You can also use pin headers and sockets to connect the Pico to the Core board. Make sure you use low profile sockets and matching headers in this case, otherwise if you're building for the Moduleur enclosure, the brain module won't fit the height of the case. (Example [socket](https://mou.sr/48U4sKo) and [header](https://mou.sr/4p6XDd6) — Note: this is UNTESTED)
  
**Option 3:** Solder the Pico directly to the Core board directly and _solder through_ the dedicated TP1, TP2, TP3 and TP6 plated holes. If you choose this option, make sure you solder the Pico to the bottom side of the Core board like shown here: 

<img src="https://github.com/user-attachments/assets/e214a1a2-473b-4ac0-83c0-41b2918bc2f9" />


⚠️ **NOTE — So far only Option 1 is tested.**


### Tuning the CV output

The DAC outputs of the Brain module can directly generate maximum 4095mV. These are amplified to maximum 10V — to match Eurorack voltage ranges — using the U4A and U5A op-amps. To get a precise output (e.g. for pitch CV control) you need to tune the Brain outputs using the [Output tuner](https://github.com/shmoergh/moduleur/tree/main/modules/07-brain/brain-sdk/programs/output-tuner) program (see more in its readme).

### Development with Picoprobe

The most efficient and probably the cheapest way to develop firmware for the brain is to use a second Pico board as a debug probe, as described in the [official documentation](https://pip-assets.raspberrypi.com/categories/610-raspberry-pi-pico/documents/RP-008276-DS-1-getting-started-with-pico.pdf?disposition=inline) (from page 17). To connect up the PicoProbe board to the Pico on the Core board you need to solder pin headers to the Pico board's DEBUG connections (SWCLK, GND, SWDIO) and also use the J_DEV1 pin header, which is directly connected to the UART RX and TX on pins 1 and 2. If you're housing the Brain module in the Moduleur enclosure we recommend (1) using right angle pin headers and (2) soldering the Pico board's DEBUG headers _oriented to the inside_ of the board, so it fits the space:

![picoprobe](https://github.com/user-attachments/assets/dcca157c-cd6d-4622-b6da-d79ba3f59b40)

<br>

## Firmware development with the Brain SDK

The Brain SDK is a firmware and library collection for the Raspberry Pi Pico/Pico 2, designed to speed up the development. It provides reusable components for I/O, UI, DSP, and more, along with example programs and scripts to streamline project setup and prototyping.

[Brain SDK](https://github.com/shmoergh/brain-sdk)

## Photos

<img width="514" height="1026" alt="image" src="https://github.com/user-attachments/assets/4a3b6dea-2e2e-4952-b58d-fd4deb45d461" />



## 🧪 License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur/blob/main/DISCLAIMER.md)
