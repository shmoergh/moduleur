## 🐛 Oct 27, 2026 FIX

If you ordered the board before Oct 27, 2026 we recommend to apply this fix manually. Not critical. 
This bug is fixed on boards ordered after Oct 27, 2026 ([commit](https://github.com/shmoergh/moduleur/commit/97e3414bef1bd9e8f7707d201a752b88319704db)).

**Sympthom:** The main output of the Utils/Output module is not AC coupled correctly (ie. not oscillating around 0V).

**Problem**: C14 was supposed to block DC from the audio input, but DC offset was still appearing at the amplifier output.

**Cause:** The op-amp input had no connection to ground after C14, leaving it floating. When DC was present at the input, the capacitor transferred charge to this floating node. Without a path to discharge, the node could retain a DC voltage, which was then amplified by the op-amp.

**Solution:** Add a 100kΩ resistor between the (-) pole of C14 and ground. This provides a discharge path and keeps the input centered at 0V. Together with C14 (10µF), it forms a high-pass filter with a cutoff frequency of approximately 0.16Hz. (When applying the manual fix, make sure to avoid accidentally connecting TP1 to GND with the resistor wire.)

<img width="2142" height="1228" alt="CleanShot 2026-10-27 at 07 34 15@2x" src="https://github.com/user-attachments/assets/10346f56-9fc6-41ec-ac35-bc2cf4a0b8ad" />


## ✨ Jan 16, 2026 IMPROVEMENT

If you ordered the board before Jan 16, 2026 we recommend to add this improvement manually.

**Sympthom:** The LED of the LFO blinks a bit dimmed and gets more dimmed if the LFO is turned all the way up.

**Solution:** Add a 100kΩ feedback resistor between Q1's collector and base (pin 2 & 3) to bias the LFO LED. This makes the LED go very smooth along with the triangle waveshape of the LFO.

<img alt="CleanShot 2026-01-16 at 09 32 22@2x" src="https://github.com/user-attachments/assets/3e09e2dc-4403-414f-af4d-04b1fa08d458" />

<img alt="CleanShot 2026-01-16 at 09 37 14@2x" src="https://github.com/user-attachments/assets/40952028-f7cf-4530-a445-c676e3d9876a" />

Soldering the 100kΩ manually to the Q1 transistor on the back of the UI board (see 3D render above). Note that the module works perfectly without this tweak, it's just an improvement on the LED. This improvement is included in the UI board version v1.1 and above.
