# FIXLOG

This document tracks known issues found in specific PCB revisions and how to correct them.
If you are building from anything other than the latest revision in this repository, review this file before starting your build.

## 🐛 Feb 22, 2026 FIX

**If you ordered the Core board before Feb 22, 2026 you need to apply the following fix manually.** The bug is fixed on the Core boards on Feb 22, 2026.

#### Sympthom 
The VCA output is not protected against input currents.

#### Solution
Add a 1kΩ resistor between the output jack and the output connection on the UI board.

1. Cut the VCA OUT trace. It's the trace on the top layer of the UI board, coming from the tip of the J_VCA_OUT1 jack. The safest is to just cut it at the base of the jack. Once cut, check with a multimeter short circuit mode that there's no connection between the jack's tip and the VCA_OUT pin of the J3 header.
2. Solder a 1kΩ resistor between the tip of the J_VCA_OUT1 jack and the VCA_OUT of the J3 header. The jack's tip is accessible from the _bottom_ of the board, while the VCA_OUT pin of the J3 header is accessible on the _top_ of the board, so you'll need to use some **insulated wire** to get from the jack to the header.

<img width="3060" height="2482" alt="image" src="https://github.com/user-attachments/assets/d6c7ec7c-0c0c-4858-8497-bb75c18beaf0" />


## 🐛 Dec 30, 2025 FIX

**If you ordered the UI board before Dec 30, 2025 (v1.0) you need to apply the following fix manually.** The bug is fixed for UI boards, ordered after Dec 30, 2025 (specifically [this commit](https://github.com/shmoergh/moduleur/commit/2fd56e93e86553611255dfd17caee376619ceb9c)).

#### Sympthom

The VCA output is "too hot", ie. it is too sensitive to control voltages.

#### Solution

The VCA_CV input needs a 200kΩ resistor from the UI board.

1. On the VCA UI board, cut the VCA CV trace. It's the one coming from TIP of the J_VCA_CV1 jack. Probably the safest place to cut it is at the base of the jack. Once cut, check with a multimeter that there's no connection between the tip of the J_VCA_CV1 and the VCA_CV of the J3 header.

<img src="https://github.com/user-attachments/assets/c4105803-19e4-4e3a-b95b-53b676e1ee90" />

2. Solder a 200kΩ resistor between the tip of J_VCA_CV1 and VCA_CV (of the J3 header)

<img src="https://github.com/user-attachments/assets/d79271df-40e7-47ce-917c-6b64e254b99e" />

<img src="https://github.com/user-attachments/assets/75719988-aabc-424d-b65a-0702a5363710" />
