# Shmøergh Moduleur / VCO

Eurorack compatible VCO for the Shmøergh Moduleur.

## Features

- Raw saw generator with classic waveshaper circuits. Triangle, saw and square outputs
- Sub oscillator and noise circuit (can be selected with a jumper)
- Pulse width voltage control for square wave
- Precision for about 7 octaves
- Hard sync input
- FM input
- Two temperature compensation options for flexible DIY build (one is THT only)
- Designed from very common electronic components

## Boards

- [Core board](./electronics/core/) — Contains all active circuitry and handles the complete audio, CV, and logic processing for the module.
- [UI board](./electronics/ui/) — Hosts all panel-mounted controls and connectors, providing the physical interface to the module’s Core PCB.

## How to build

[**Follow the build guide &rarr;**](https://github.com/shmoergh/moduleur/wiki)

<br>

## Module specific instructions

### Q3 vs Q4 transistor (J111)

As commented on the Core board, **you only need either Q3 or Q4**: if you got Q4 assembled by JLCPCB then do not solder Q3. The J111 JFET is not a super-common component and sometimes it's out of stock at JLCPCB — to prepare for the potential shortage we added a THT footprint too so you can source and solder it manually easily.

<img src="https://github.com/user-attachments/assets/68fe3f13-9a6b-495f-b3b6-4341b9d74848" />

### Temperature compensation

All analog VCOs have a way to compensate temperature drifts. You can read about the background of this in this fantastic series of posts on Xonik.no: [part 1](https://www.xonik.no/theory/vco/expo_converter_1.html), [part 2](https://www.xonik.no/theory/vco/expo_converter_2.html), [part 3](https://www.xonik.no/theory/vco/reference_current.html).

We had quite some trouble in the past finding components for temperature compensation (the classic tempco resistors are almost impossible to obtain). So we designed the Moduleur VCO in a way that there are two ways for temperature compensation, **but you need to build only one of them**.

#### Option 1: Using a PTS120601B100RP100 temperature sensor
The PTS1206 is an SMD component so be prepared with your soldering skills. For this the following resistors and trimmers should be soldered (find these in the KiCAD file):

- R_FB: 91kΩ resistor
- R_W1: 20kΩ multiturn trimmer pot
- R_D1: short (with a piece of wire)
- TH1: do not place component
- R_D2: 6.2kΩ (50PPM) resistor
- R_D3: 4.22Ω (50PPM) resistor
- TH2: PTS120601B100RP100 (https://mou.sr/4g7SsGi) temperature sensor
- R_W2: do not place component

#### Option 2: Using a NTCLE203E3103FB0 NTC thermistor
This is a through hole component, very widely available. For this setup, you need to use the following values/components:

- R_FB: 22kΩ resistor
- R_W1: short (with a piece of wire)
- R_D1: 11kΩ resistor
- TH1: NTCLE203E3103FB0 (https://mou.sr/4nM5nSy)
- R_D2: 27kΩ resistor
- R_D3: 2.7kΩ resistor
- TH2: do not place component
- R_W2: 500Ω trimmer

<img width="2886" height="462" alt="CleanShot 2025-12-15 at 21 54 36@2x" src="https://github.com/user-attachments/assets/11ce48d1-4398-466c-8a67-4195195a958e" />


**Which one should you choose?**
The two setups are almost identical but **option 1** (using the PTS) is a little bit more accurate. If you can solder SMD components and you have a bit more budget then we recommend that option.

**Temperature compensation component help**

To make soldering a bit easier, the alternate names of the temp.co. components are marked on the PCB:

<img src="https://github.com/user-attachments/assets/84030754-7be8-41ba-bbeb-c32182ff3850" />


### Tuning

You'll need to tune the wave shapes and the oscillator frequency to be musically in tune.

### Tuning the wave shapes

First we'll set the correct bias to all waveforms as well as the shape of the triangle wave. There are two trimmers you'll need to use: RV_SAW_BIAS1 ("SAW BIAS" on the Core board silkscreen), and RV_TRI_BIAS1 ("TRI BIAS" on the board.). You'll need an oscilloscope for this.

1. Connect the oscilloscope to the Triangle output. Make sure your oscilloscope is in DC coupling.
2. The triangle is generated from the sawtooth wave. In order to have a nice symmetric triangle you need to adjust the saw bias. Use the SAW BIAS trimmer to adjust the symmetry of the Triangle waveshape (and implicitly the bias of the saw wave).
3. The triangle now should be symmetric but most likely not centered around 0V. To move it on the Y axis, use the TRI BIAS trimmer.

You should be good once the triangle output is:

- A nice triangle
- Oscillates around 0V

<img src="https://github.com/user-attachments/assets/f98bb0a7-5077-434a-8b48-4e402b2187b3" />


#### Frequency tuning

As with all analog VCO you need to go through a tuning process to make sure it tracks with 1V/octave. Here's how:

0. Turn the Octave (main tune) knob all the way down and the Fine tune knob in the middle.
1. Connect a keyboard with CV output to the VCO. We recommend an Arturia Keystep, Beatstep Pro, Korg NT1 or similar.
2. Turn HI-FREQ pot all the way down. You can play a very high pitch note on the keyboard and turn the knob until the pitch goes down.
3. Play C1 on keyboard. Use the BIAS trimmer to set the frequency to C1 (32.703Hz)
4. Play C4 and use BIAS trimmer to set the frequency to C4 (261.63Hz)
5. Play C1 and use WIDTH trimmer to tune it to 32.703Hz
6. Loop steps 3 + 4
7. When C1 and C4 are in tune, play C7 and use the HI-FREQ trimmer to make up the pitch for higher frequencies.
8. Go back to step 3 & 4 to adjust tuning for lower frequencies, then go to step 6 again, until you get to a reasonable end result.

Note that the tuning of the VCO is limited to about 7 or 8 octaves.

<br>

## Photos

<img width="514" height="1026" alt="image" src="https://github.com/user-attachments/assets/495d5f72-3f07-4e4c-9331-40a09e54a261" />


## 🧪 License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur/blob/main/DISCLAIMER.md)
