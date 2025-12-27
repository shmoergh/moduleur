# Shmøergh Moduleur Roadmap

These are loosely held ideas for what's coming up in the next version of the Shmøergh Moduleur. Nothing is a promise here, we are experimenting constantly. If you have any ideas on how to improve this synth, please [open an issue](https://github.com/shmoergh/moduleur/issues) or [contribute](./CONTRIBUTING.md) in the [next branch](https://github.com/shmoergh/moduleur/tree/next).

## VCO ideas

#### Add a UI board with glide to VCOs
Create a separate UI for VCO1 and VCO2 so that there are more functions and variability that these modules can be used for. One of the features that is missing from this synth is glide. So instead of being able to set the pulse width of VCO1, introduce a glide option which has an extra glided pitch output. Here is how the two VCOs would look like after this change:

<img width="1525" height="1026" alt="image" src="https://github.com/user-attachments/assets/a42a6e21-b2d1-4f69-8e58-6fe61ae94192" />


#### Add a UI board with octave switch instead of pot to VCOs
Right now it's quite tedious to find the next octave with the current octave pot. Replace the pot with a rotary switch which enables to switch between octaves quickly. Also, this would mean that we need to update how the fine tune knob works so that it has a wider range. 

## ADSR + VCA ideas

#### Add a Bias pot for VCAs
Let's add a bias pot to the VCA. This would enable the VCA to be used as an attenuator – for example to attenuate the envelope or any other signal –, and it could be used for drones too. 

<img width="1525" height="1026" alt="image" src="https://github.com/user-attachments/assets/d6039073-23fe-4c6b-a674-52c2000b8da8" />

#### Add optional passive LPF on VCA CV input

Right now there's a subtle clicking noise when using very fast times on the VCA. Adding a 1ms (10kΩ + 100nF) LPF on the VCA's CV input makes it go away for the price of almost inaudibly slower attack/release times.

## Brain ideas

#### Use 2 pots and 3 buttons
Currently, the Brain module uses three pots and two buttons. Actually, the reversed version - two pots and three buttons - would have more flexibility for future modules like sequencers. Swap these in the next version.

<img width="1525" height="1026" alt="image" src="https://github.com/user-attachments/assets/4401a86f-ed1b-458b-bce5-370af8c2e509" />
