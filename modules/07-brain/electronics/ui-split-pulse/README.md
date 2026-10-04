# Alternative, split-pulse UI board for Brain

This is an alternative UI board for Brain, which allows you to use a second pulse out so you can e.g. drive both envelopes separately. It uses a stereo 3.5mm jack instead of the mono on the pulse connector And requires one cable to be soldered on the Core board and connected to the extra pulse out connector on the UI board.

## Assembly and usage

1. Solder a wire to PIN #29 (GPIO 22) to the Pico/Pico 2 on the Core board
2. Solder or connect the wire to the extra pulse out input on the UI board
3. Use a stereo to left and right split cable from pulse out. Left is the original pulse out, right is the extra pulse out.
4. Of course, in order to make this work, you need to update the firmware that you use on the Brain module. Currently the SDK doesn't support this, but you can simply set GPIO 22 as a digital output and drive according to your needs. Note that the circuitry inverts the pulse output, so in order to get a `high` on the output, you need to set the digital output to low.