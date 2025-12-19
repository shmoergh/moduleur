# Shmøergh Moduleur / VCF

Dual mode Eurorack compatible diode filter based on the famous Synthacon Steiner-Parker circuit.

## Features

- Classic diode filter with extremely drippy character
- Low pass and high pass filter inputs
- Fine-tunable maximum resonance control — can go smooth to crazy
- Two external CV inputs with logarithmic attenuverters
- Optional EMC shielding to isolate external noise
- Separate core and UI PCBs for reusability and custom UI builds
- Gerber files for JLCPCB order
- Designed from very common electronic components

## Boards

- [Core board](./electronics/core/) — Contains all active circuitry and handles the complete audio, CV, and logic processing for the module.
- [UI board](./electronics/ui/) — Hosts all panel-mounted controls and connectors, providing the physical interface to the module’s Core PCB.


## How to build

[**Follow the build guide &rarr;**](https://github.com/shmoergh/moduleur/wiki)

<br>

## Module specific instructions

### Shielding

Diode-ladder filters are extremely sensitive because they work in a very low voltage range. Any noise coming from the outside world can cause humming and buzzing, especially if the noise source is around the diodes. To overcome this, we highly recommend to put the module in a fully shielded enclosure or case. Additionally we added an optional EMI shield above the diodes using standard Harwin GMI shield clips and shield:

<img src="https://github.com/user-attachments/assets/74f0cb2a-2fbb-466b-859d-de37cedab7ed" />

- [Harwin GMI clips](https://mou.sr/44w0zrg) (2x)
- [15x20mm Harwin EMI shield can](https://mou.sr/44pU5KB) (1x)

_Note: we never needed to use the above shielding because the Moduleur is in a fully shielded enclosure. This part of the circuit is a non-tested fallback._

**What if my case is not shielded?**

You can still achieve great shielding by using a grounded copper plate that covers the Core module from the back (essentially a 3th layer in the PCB stack). 

### Taming the resonance

The resonance of the filter can be quite heavy. If you want to tame the resonance, crank the reso pot to the max and  use the RV_MAX_RESO1 trimmer on the Core board to set the maximum resonance.

### Balance

The RV_BALANCE1 trimmer might be needed to reduce the low-end hum of the filter. We never really needed it, it's there for safety reasons.

### Setting the curve of CV attenuverters

CV1 and CV2 has two attenuverters on their inputs. You can set the curve of the pots by using different values for certain resistors on the UI board. Recommended values range from 10kΩ (more logarithmic) to 1M (more linear):

- For CV1: R4 & R5
- For CV2: R10 & R11

### Setting the lower limit of cutoff

You can set the lowest control voltage of the Cutoff pot to 0V or -12V using the JP1 jumper. -12V can be cool if you know you'll want to use very strong control voltages, however we still recommend to use 0V.

<br>

## Photos

<img width="2050" height="2050" alt="image" src="https://github.com/user-attachments/assets/690c2f28-b742-4235-9632-a4d1070735f8" />


## License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur/blob/main/DISCLAIMER.md)
