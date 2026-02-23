# 🐛 Dec 30, 2025 FIX

**If you ordered the UI board before Dec 30, 2025 (v1.0) you need to apply the following hack.** The bug is fixed for v1.1 boards, ordered after Dec 30, 2025 (specifically [this commit](https://github.com/shmoergh/moduleur/commit/2fd56e93e86553611255dfd17caee376619ceb9c)).

_Sympthom:_ the VCA is too hot.
_Solution:_ the VCA_CV input needs a 200kΩ resistor from the UI board.

1. Cut the VCA CV trace. It's the one coming from TIP of the J_VCA_CV1 jack. Probably the safest place to cut it is at the base of the jack. Once cut, check with a multimeter that there's no connection between the tip of the J_VCA_CV1 and the VCA_CV of the J3 header.

<img src="https://github.com/user-attachments/assets/c4105803-19e4-4e3a-b95b-53b676e1ee90" />

2. Solder a 200kΩ resistor between the tip of J_VCA_CV1 and VCA_CV (of the J3 header)

<img src="https://github.com/user-attachments/assets/d79271df-40e7-47ce-917c-6b64e254b99e" />

<img src="https://github.com/user-attachments/assets/75719988-aabc-424d-b65a-0702a5363710" />
