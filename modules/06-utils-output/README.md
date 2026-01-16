# Shmøergh Moduleur / Utils & Output

Combined analog bitcrusher, LFO and an output interface with overdrive in a single Eurorack compatible module.

## Features

- Analog bitcrusher
- External trigger of analog bitcrusher, which allows sample & hold usage
- Analog LFO with square and triangle output
- LFO works from about 0.1Hz to 200Hz audio range
- LED indicator for LFO
- Output module to interface line level audio
- LED based overdrive in output module
- Optional dual-mono headphones output
- 12HP Eurorack compatible design
- Reverse polarity protection

## Boards

- [Core board](./electronics/core/) — Contains all active circuitry and handles the complete audio, CV, and logic processing for the module.
- [UI board](./electronics/ui/) — Hosts all panel-mounted controls and connectors, providing the physical interface to the module’s Core PCB.

## ✨ IMPROVEMENT FOR v1.0 UI BOARDS

**Sympthom:** The LED of the LFO blinks a bit dimmed and gets more dimmed if the LFO is turned all the way up. 

**Solution:** Add a 100kΩ feedback resistor between Q1's collector and base (pin 2 & 3) to bias the LFO LED. This makes the LED go very smooth along with the triangle waveshape of the LFO.

<img width="2522" height="1768" alt="CleanShot 2026-01-16 at 09 32 22@2x" src="https://github.com/user-attachments/assets/3e09e2dc-4403-414f-af4d-04b1fa08d458" />

<img width="2918" height="2208" alt="CleanShot 2026-01-16 at 09 37 14@2x" src="https://github.com/user-attachments/assets/40952028-f7cf-4530-a445-c676e3d9876a" />

If you ordered the board before 16 Jan 2026 we recommend soldering this manually to the Q1 transistor on the back of the UI board (see 3D render above). Note that the module works perfectly without this tweak, it's just an improvement on the LED. This improvement is included in the UI board version v1.1 and above. 


## How to build

[**Follow the build guide &rarr;**](https://github.com/shmoergh/moduleur/wiki)

<br>

## Module specific instructions

### LFO pot value

The range of the LFO depends on the value of the frequency pot. The recommended pot value goes from 200kΩ (higher minimum frequency) to 1M (lower minimum frequency). We recommend using a logarithmic pot so that you have more control on low frequencies. We found the sweet spot by using a 500kΩ pot.

### Setting the minimum LFO frequency

In order to charge the main cap of the LFO you'll need to make sure there's _some_ input current on the integrator (U201B). This is the role of the R206 resistor. The lower the value of this resistor the lower frequencies you can achieve with the LFO. Too low values however can make the output latch, we found the sweet spot at around 220Ω.

### Setting the maximum output level

1. Turn drive all the way down
2. Use RV_LINE_OUT_LVL1 trimmer on the Core board to set the maximum output level. You typically want to set it so that it works well with external gear on line level. [More info about line level values](https://en.wikipedia.org/wiki/Line_level)

### Selecting between line out or headphones out

You can use the main output to connect to line out or headphones out using the JP1 jumper on the Core board.

**⚠️ Use stereo cable on the output if you're using headphones** The output is dual-mono, which means that the right and left channel are connected. If you use a mono cable for the output then you'll esentially ground both output channels.

<br>

## Photos

<img width="514" height="1026" alt="image" src="https://github.com/user-attachments/assets/a37591e3-6dfc-4b86-a04c-dddc251890db" />


## 🧪 License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur/blob/main/DISCLAIMER.md)
