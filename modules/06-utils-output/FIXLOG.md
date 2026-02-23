## ✨ 16, Jan 2026 IMPROVEMENT

If you ordered the board before 16 Jan 2026 we recommend to add this improvement manually.

**Sympthom:** The LED of the LFO blinks a bit dimmed and gets more dimmed if the LFO is turned all the way up. 

**Solution:** Add a 100kΩ feedback resistor between Q1's collector and base (pin 2 & 3) to bias the LFO LED. This makes the LED go very smooth along with the triangle waveshape of the LFO.

<img width="2522" height="1768" alt="CleanShot 2026-01-16 at 09 32 22@2x" src="https://github.com/user-attachments/assets/3e09e2dc-4403-414f-af4d-04b1fa08d458" />

<img width="2918" height="2208" alt="CleanShot 2026-01-16 at 09 37 14@2x" src="https://github.com/user-attachments/assets/40952028-f7cf-4530-a445-c676e3d9876a" />

Soldering the 100kΩ manually to the Q1 transistor on the back of the UI board (see 3D render above). Note that the module works perfectly without this tweak, it's just an improvement on the LED. This improvement is included in the UI board version v1.1 and above.
