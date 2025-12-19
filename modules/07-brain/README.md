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

  
**Option 2:** Solder the Pico directly to the Core board directly and _solder through_ the dedicated TP1, TP2, TP3 and TP6 plated holes

⚠️ **NOTE — So far the only tested method 1 which worked perfectly.**


### Tuning the CV output

The DAC outpus of the Brain module can output maximum 4095mV. These are amplified to maximum 10V — to match Eurorack voltage ranges — using the U4A and U5A op-amps. To get a precise output (e.g. for pitch CV control) you need to tune the Brain outputs:

1. Connect your MIDI controller to the Brain MIDI input
2. Plug a jack in OUT 1 and connect it to a multimeter (measure voltage)
3. Play a C10 note. This is supposed to output 10V on OUT 1
4. Use the trimmer RV_CV_GAIN1 to tune the output to exactly 10V

**⚠️ NOTE - firmware needs to be updated so that OUT 2 can also be tuned.**

<br>

## Firmware development

The Brain SDK is a firmware and library collection for the Raspberry Pi Pico, designed to speed up the development. It provides reusable components for I/O, UI, DSP, and more, along with example programs and scripts to streamline project setup and prototyping.

[Brain SDK](./brain-sdk/)

## Photos

<img width="514" height="1026" alt="image" src="https://github.com/user-attachments/assets/4a3b6dea-2e2e-4952-b58d-fd4deb45d461" />



## 🧪 License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur/blob/main/DISCLAIMER.md)
