# Output tuner for Brain module

To stay in tune when using the Brain module as a MIDI to CV converter, it's essential to generate precise CV output voltages. It's possible to fine tune the output voltages of the module with the `RV_CV_GAIN1` and `RV_CV_GAIN2` trimmers.

This simple program generates 0-10V on both output which allows fine tuning the output voltages of the Brain module.

## Install

Flash the u2f file from the program root to the Pico board.

## Usage

- Connect your multimeter to Output 1 or 2.
- Use the two buttons on Brain to set the output voltages of both channels 0-10V in whole values (0V, 1V...10V).
- The LEDs show you the actual voltage (in binary 🤓)
- Tune the output voltages using `RV_CV_GAIN1` and `RV_CV_GAIN2` trimmers on the Core board.

## Tuning VCOs

Once you tuned the output voltages you can use this program to tune your VCOs.

## Future improvements

- MIDI Channel selector
- Duophonic mode
- Velocity on Out 2
- Modwheel on Out 2
- Glide / portamento setting
