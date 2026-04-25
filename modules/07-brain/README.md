# Shmøergh Moduleur / Brain

Brain is a universal digital module for the Shmøergh Moduleur which enables the development of new functions like sequencers, MIDI features, digital voices and synths and whatever comes to mind. The module uses a Raspberry Pi Pico / Pico 2 so all features of the board are available in any language (Micropython, C++, Rust). To speed up development we provide an SDK that makes it easy to use the available pots, buttons, I/O and MIDI.

## FIX LOG

‼️ IF YOU ARE NOT BUILDING FROM THE LATEST PCB REVISION IN THIS REPOSITORY, PLEASE CHECK THE [FIX LOG](FIXLOG.md) (PCB ERRATA) BEFORE STARTING, AS EARLIER REVISIONS MAY CONTAIN ISSUES THAT REQUIRE CORRECTION.

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

&rarr; [Brain firmwares](https://github.com/shmoergh/brain-firmwares)

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

As it's listed on page 7 of the [Pico data sheet](https://pip-assets.raspberrypi.com/categories/610-raspberry-pi-pico/documents/RP-008307-DS-1-pico-datasheet.pdf?disposition=inline), you can use the test points on the Pico board to connect to its USB, as well as control the BOOTSEL button remotely. This allowed us to add an USB-C connection and a dedicated BOOTSEL button, available without taking the enclosure backplate off.

**To use the external USB-C connector and BOOTSEL button, you'll need to connect the Pico's TP1, TP2, TP3 and TP6 test points to dedicated pins of the USB-C and Bootsel button on the Brain's Core board.**

To do this, you have two options:

<img src="https://github.com/user-attachments/assets/ee17834d-8982-42ac-9f7f-c02c82b4da5b" />

**Option 1:**
- Solder the Pico to the Brain Core **using pin headers**. The point is to leave some gap between the Pico and the Brain Core board so that you can lead **wires** through the hole in the center of the Core board to connect up the Pico's TP1, TP2, TP3 and TP6 (BOOTSEL) testpoints:

![IMG_8047](https://github.com/user-attachments/assets/a706d4bb-ffdc-42f1-ae92-0723b7452b8a)

**Option 2:** You can also use pin headers and sockets to connect the Pico to the Core board — this way you can take replace the Pico board in the future, if you need to for some reason. Make sure you use low profile sockets and matching headers in this case, otherwise if you're building for the Moduleur enclosure, the brain module won't fit the height of the case. (Example [socket](https://mou.sr/48U4sKo) and [header](https://mou.sr/4p6XDd6) — Note: this is UNTESTED)

**Option 3:** Solder the Pico directly to the Core board directly and _solder through_ the dedicated TP1, TP2, TP3 and TP6 plated holes. If you choose this option, make sure you solder the Pico to the bottom side of the Core board like shown here:

<img src="https://github.com/user-attachments/assets/e214a1a2-473b-4ac0-83c0-41b2918bc2f9" />


⚠️ **NOTE — So far only Option 1 is tested.**

## Calibrating the CV outputs
The DAC outputs of the Brain module directly generate up to 4095 mV. These are amplified to 0–10 V — to match Eurorack voltage ranges — by the U4A and U5A op-amps. Because the output stage isn't built around precision components, every assembled Brain has small differences in gain and offset that need to be tuned out before the CV outputs can be trusted for pitch tracking or anything else that demands accuracy.

**Calibration happens in two stages, in this order:**

### 1. Hardware calibration

Adjusts the trimmers `RV_CV_GAIN1` and `RV_CV_GAIN2` that sets the overall gain of the output stages. The goal is to get roughly 1 V per step across the output range. This is a coarse, mechanical adjustment — turn a screw, watch a multimeter — and you typically only do it once per board (or again after any rework on the output op-amps or trimmers).

Use the [Brain diagnostics firmware](https://github.com/shmoergh/brain-diagnostics) for this. Flash it onto the Brain, press Button A to advance to Test 14 (CV output hardware-trimmer calibration), and follow the procedure in that repo's README. 

### 2. Software calibration

Once the analog gain is roughly right, software calibration compensates for the residual drift of op-amp offsets, DAC non-linearity, and the small per-step error that the trimmer can't reach. The result is a calibration table stored in a reserved sector of the Pico's flash. Firmwares **built on the Brain SDK** can load this table on boot and apply it to their CV outputs.

Use the [Brain CV tuner firmware](https://github.com/shmoergh/brain-cv-tuner) for this. Flash it onto the Brain after hardware calibration is done, follow its README to step through and measure each whole-volt point, and the resulting table gets written on the Pico board. Once that's done, you can flash your real firmware back; the calibration data survives subsequent flashes as long as the firmware uses the Brain SDK and reserves the storage sectors at link time (see the Brain SDK's ["Preserving calibration data"](https://github.com/shmoergh/brain-sdk/blob/main/docs/PRESERVING_CV_CALIBRATION.md) doc to learn more).

The order matters. If you run software calibration first and then turn the hardware trimmer, the software calibration numbers become stale and you'll have to redo them. Always trim the hardware first, then run software calibration on top.

After both stages, the Brain's CV outputs will hit the asked-for voltage to within a fraction of a millivolt across the full range — accurate enough for 1 V/octave pitch tracking and any other CV use you care about.

## Development with Picoprobe

The most efficient and probably the cheapest way to develop firmware for the brain is to use a second Pico board as a debug probe, as described in the [official documentation](https://pip-assets.raspberrypi.com/categories/610-raspberry-pi-pico/documents/RP-008276-DS-1-getting-started-with-pico.pdf?disposition=inline) (from page 17). To connect up the PicoProbe board to the Pico on the Core board you need to solder pin headers to the Pico board's DEBUG connections (SWCLK, GND, SWDIO) and also use the J_DEV1 pin header, which is directly connected to the UART RX and TX on pins 1 and 2. If you're housing the Brain module in the Moduleur enclosure we recommend (1) using right angle pin headers and (2) soldering the Pico board's DEBUG headers _oriented to the inside_ of the board, so it fits the space:

![picoprobe](https://github.com/user-attachments/assets/dcca157c-cd6d-4622-b6da-d79ba3f59b40)

<br>

## Firmware development with the Brain SDK

The Brain SDK is a firmware and library collection for the Raspberry Pi Pico/Pico 2, designed to speed up the development. It provides reusable components for I/O, UI, DSP, and more, along with example programs and scripts to streamline project setup and prototyping.

[Brain SDK](https://github.com/shmoergh/brain-sdk)


## License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur/blob/main/DISCLAIMER.md)

## Latest module version

v1.1
