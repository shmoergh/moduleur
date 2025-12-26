# Hog Moduleur / ADSR + VCA

TBD

## Status

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
