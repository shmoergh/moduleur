# Hog Moduleur / Sidechain Mixer

4 channel Eurorack compatible mixer and sidechain compressor.

## Features

- 4 input audio or CV mixer (DC coupled)
- Channel 4 can be used as the control input for a VCA based sidechain compressor that acts on the output mix. Channel 4 can be individually added to the output mix or can remain silent, while the compressor still operates.
- Gain control for channel 4 which allows to amplify line level signals to Eurorack level, allowing to mix external instruments with Eurorack sound sources
- Dedicated output volume control
- Separate core and UI PCBs for reusability and custom UI builds
- Gerber files for JLCPCB order
- Designed from very common electronic components

## Status

**MODULE IS IN EXPERIMENTAL STATE! ASSUME WEIRD BEHAVIORS** 


## How to build

[**Follow the build guide &rarr;**](https://github.com/shmoergh/moduleur/wiki)

<br>

## Module specific instructions

### Core circuit block diagram

<img src="https://github.com/user-attachments/assets/3bc5f3e0-9084-4cd1-a43a-e63cb768a7e0" />

**How does it work?**

1. INPUT 1-3 is mixed with a DC coupled mixer. The output is inverted.
2. The output of the INPUT 1-3 mixer goes in the audio input of a VCA.
3. INPUT 4 goes in an amp which enables amplifying the [audio] signal from line level to Eurorack level if needed.
4. The gained INPUT 4 goes in a peak detector
5. The output of the peak detector goes in a subtractor (comparator) circuit. This generates a _negative_ control voltage if the peak volume of the audio signal is above a certain threshold (ie. the peak audio signal goes in the `-` input of the subtractor circuit and the threshold [pot] voltage goes in the `[+]` input).
6. The output of the subtractor is used as the control voltage of the VCA. A diode in reverse polarity makes sure that only negative control voltages are "accepted" on the CV input of the VCA, resulting in gain reduction.
7. The output of the VCA goes in a the (output) inverting mixer. This way INPUT 1-3 is inverted back to normal polarity.
8. In order to be able to use INPUT 4 as a regular channel on the mixer, the [gained] INPUT 4 goes through an inverter and then in the output mixer (which inverts it back to normal polarity). Because the gained INPUT 4 is mixed in the final output mixer you can mix line level things with the Moduleur voices.

Some notes:

### Stereo VS mono jack on INPUT 4

The main use case of the sidechain compressor is to split the output of a drum machine and use it to make the Moduleur "pump". Typically you would want to use a [standard split cable](https://www.amazon.com/Belkin-Speaker-Headphone-Audio-Splitter/dp/B000067RC4/ref=sr_1_7?crid=322H9VY64QFQ6&dib=eyJ2IjoiMSJ9.JKiM0hsbkAbHJnVxQ--sDtrMvlYMhbrhscIhc2c0I6-34d86Jjk1Hgikp4eddNsld6ku-ZsYR9zFwfgZvZ8IMOMlRnxxvRKRNIDfyJCwDlOsBuYdlxcXaBljcTRbsI_B-Q0rOWQ3gZKPkeCDBKJxWBO52ILfSfubesq3MSNahHnT7K0cQHhZADSjQOeVQcWXwM1DvOUxwi_pYcxFxPlKgVL9XaCahfy3dSsicRRmk4k.ixmCgWtmYXxPbSyR8c_oGohuy_Qv5whHOkmA6-Fr9Ww&dib_tag=se&keywords=audio+split+cable&qid=1766163751&sprefix=audio+split+ca%2Caps%2C508&sr=8-7) for this.

You want to consider whether to use mono or stereo Jacks for INPUT 4 (J_IN4 on the UI board).

- Option 1: Mono jack ([PJ398SM](https://www.thonk.co.uk/shop/thonkiconn/)) — This allows you to use the default input of INPUT 4 so you can use it on the default patch PCB. However this means that - because of the physical construction of the jack - you'll ground one of the channels of stereo cables. So if you used a split cable to connect up your stereo drum machine then you'll mute one of the channels.
- Option 2: Stereo jack ([PJ366ST](https://www.thonk.co.uk/shop/3-5mm-jacks/)) – If you use a stereo cable then the above problem goes away. But then you'll not be able to use the default input in your default patch PCB.


### Build one of the Experimental options on the UI board

The current version of the UI circuit allows you to choose from two different setups to control the sidechain ratio. This is marked in an **_Experimental_** block in the schematics:

<img src="https://github.com/user-attachments/assets/c5ac3d0f-e253-441f-a008-c33a5bb1fa2b" />

**Option 1: the gain pot sets the gain of INPUT 4**

It allows you to increase line levels to Eurorack. To build this option:

1. Connect pins 2+3 of JP1 and JP2
2. R1 = 10kΩ resistor
3. R2 = DO NOT SOLDER

**Option 2: the gain pot sets the ratio of the subtractor (comparator) circuit**

This option makes a fix gain for INPUT 4, so you won't be able to amplify line levels on INPUT 4 to Eurorack level. This directly sets the ratio of the comparator/subtractor circuit so it's a bit more direct manipulation of the CV input of the VCA. To build this option:

1. Connect pins 1+2 of JP1 and JP2
2. R2 = short
3. R1 = DO NOT SOLDER

**⚠️ Notes**

- You need to build one from the above options to make the sidechain compressor work.
- Option 1 is the recommended option to build, but feel free to experiment with Option 2 too.
- If you're more interested how the above options work, examine the Core circuit
- **R3 is 20kΩ on the UI board, however we found that simply shorting R2 instead makes the threshold work more reliably (essentially allows absolutely turning off compression)**

### Tuning

**Sidechain compressor attack and release times**

The current version of this module allows you to only set a fixed attack and release time for the compressor. Use the RV_ATTACK1 and RV_RELEASE1 trimmers to set these times.

**VCA bias**

The output of the subtractor/comparator controls the gain reduction of the VCA by a negative voltage. Because of this, you need to bias (ie. preset a gain for) the VCA that amplifies the input signal to it's normal level, essentially making the VCA transparent when there's not gain reduction. Here's how to set the bias:

1. Connect a known voltage source such as a VCO or a DC CV signal to INPUT 1
2. Turn up the INPUT 1 channel volume and the MAIN output volume to maximum
3. Connect a jack to the mixer output
4. Connect a multimeter (if used in a DC CV) or oscilloscope (if you used a VCO) to the output jack
5. Use the RV_BIAS1 trimmer to set the output level to exactly the same as the input level

This makes sure that if there's not sidechain compression, the mixer works transparently (ie. what comes in goes out) 

<br>

## Photos

<img width="514" height="1026" alt="image" src="https://github.com/user-attachments/assets/4ea768fc-9d2d-4bcb-8eba-64f1a004cd3c" />


## License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur/blob/main/DISCLAIMER.md)
