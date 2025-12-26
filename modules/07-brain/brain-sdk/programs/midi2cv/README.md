# MIDI2CV

Basic MIDI to CV converter for the Brain module.

## Install

Flash the u2f file from the program root to the Pico board.

## Usage

- Connect MIDI device to the MIDI input of the Brain
- The Brain will listen to MIDI messages on MIDI Channel 1
- `Out 1` output will generate (and hold) 1V/oct voltages according to the played note
- `Pulse` will output a 5V gate signal on Note On events and reset to 0V on Note Off.

## Future improvements

- MIDI Channel selector
- Duophonic mode
- Velocity on Out 2
- Modwheel on Out 2
- Glide / portamento setting