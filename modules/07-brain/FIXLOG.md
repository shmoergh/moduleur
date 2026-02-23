# FIXLOG

This document tracks known issues found in specific PCB revisions and how to correct them. If you are building from anything other than the latest revision in this repository, review this file before starting your build.

## 🐛 Feb 22, 2026 FIX

**If you ordered the UI board before Feb 22, 2026 you need to apply the above fix.** The is fixed for v1.2 boards, ordered after Feb 22, 2026.

#### Affected boards

v1.1 and earlier

#### Sympthom

The pulse output transistor is not protected from large incoming currents.

#### Solution

On the UI board:

1. Cut the trace coming from the TIP of the J_PULSE_OUT1 jack.
2. Solder a 1kΩ resistor between the TIP of J_PULSE_OUT1 jack and the PULSE_OUT pin of the J6 header. For this you'll need insulated wire coming from the back of the board (the jack's tip) to the front of the board (J6 header).

<img width="2964" height="2488" alt="image" src="https://github.com/user-attachments/assets/375dfb72-14e8-4153-816d-b0972ca14abd" />


## 🐛 Jan 1, 2026 FIX

**If you ordered the UI board before Jan 01, 2026 you need to apply the above fix.** The is fixed for v1.1 boards, ordered after Jan 1, 2026.

#### Affected boards

v1.0 and earlier

#### Sympthom

The Pulse output couples to the Pulse input resulting in instability of pulse input behavior.

#### Solution

Solder a 10kΩ pull down resistor to the Pulse input jack.

<img src="https://github.com/user-attachments/assets/d0e7c825-4237-4e8e-a309-a034532fa37a" />

<img src="https://github.com/user-attachments/assets/717245ce-1959-44ed-9e7c-6a81a40decfe" />

<img src="https://github.com/user-attachments/assets/e964bd6d-d200-4556-b2ce-c4ad18528d10" />
