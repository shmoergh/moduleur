# Shmøergh Moduleur / ADSR + VCA

A combined, Eurorack compatible envelope generator and voltage controlled amplifier module for the Shmøergh Moduleur.

## Features

- Combines a full ADSR envelope generator and VCA module in one
- Envelope times go up until 10sec (depending on the used pot values)
- The ADSR output can be normalized to the CV of the VCA
- Bias trimmer for VCA to set base amp level
- LED indicator for envelope
- 12HP Eurorack compatible design
- Reverse polarity protections

## Boards

- [Core board](./electronics/core/) — Contains all active circuitry and handles the complete audio, CV, and logic processing for the module.
- [UI board](./electronics/ui/) — Hosts all panel-mounted controls and connectors, providing the physical interface to the module’s Core PCB.

# 🐛 FIX FOR v1.0 UI BOARDS

There's a bug in the first released version of the UI board. 

_Sympthom:_ the VCA is too hot.
_Solution:_ the VCA_CV input needs a 200kΩ resistor from the UI board.

**If you've ordered the UI board before Dec 30, 2025 (v1.0) you need to apply the following hack.** The bug is fixed for v1.1 boards, ordered after Dec 30, 2025 (specifically [this commit](https://github.com/shmoergh/moduleur/commit/2fd56e93e86553611255dfd17caee376619ceb9c)).

1. Cut the VCA CV trace. It's the one coming from TIP of the J_VCA_CV1 jack. Probably the safest place to cut it is at the base of the jack. Once cut, check with a multimeter that there's no connection between the tip of the J_VCA_CV1 and the VCA_CV of the J3 header.

<img src="https://github.com/user-attachments/assets/c4105803-19e4-4e3a-b95b-53b676e1ee90" />

2. Solder a 200kΩ resistor between the tip of J_VCA_CV1 and VCA_CV (of the J3 header)

<img src="https://github.com/user-attachments/assets/d79271df-40e7-47ce-917c-6b64e254b99e" />

<img src="https://github.com/user-attachments/assets/75719988-aabc-424d-b65a-0702a5363710" />


## How to build

[**Follow the build guide &rarr;**](https://github.com/shmoergh/moduleur/wiki)

<br>

## Module specific instructions

### Setting the envelope output voltage

You can set the [maximum] output voltage of the envelope using the RV_OUT_GAIN1 trimmer on the Core board. Recommended value is 8V.

### Setting the base volume of the VCA

1. Plug in a VCO to the VCA input
2. Connect the output of the VCA to an oscilloscope. Alternatively you can also connect it to the input of the Output module
3. Use the RV_VCA_BIAS2 trimmer to set turn down the volume of the VCA just so that there's nothing on the output. This will make the VCA work in a way that even the smallest control voltages will cause audible gain increase without any crosstalk.

### What if I have crosstalk?

It's likely that you need to turn down the base volume of the VCA using the RV_VCA_BIAS2 trimmer on the Core board.

### Defaulting the ADSR output to VCA CV input

It's a very common way to use an ADSR together with a VCA. To save on cables you can default the ADSR's output to the VCA's CV input by shorting the JP_DEFAULT_ENV_TO_VCA1 jumper.

### R1 resistor should be a short

As marked in the schematics, in the current version the R1 resistor is included for testing/experimental purposes only. You need to short this connection:

<img src="https://github.com/user-attachments/assets/387a6766-47ae-4c9f-a614-88f580e55c90" />

<br>

## Photos

<img width="514" height="1026" alt="image" src="https://github.com/user-attachments/assets/2bb78d36-697c-4b73-af51-c886a1c99531" />



## 🧪 License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur/blob/main/DISCLAIMER.md)
