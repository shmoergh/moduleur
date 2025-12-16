# Shmøergh Moduleur Modules

This is a TLDR; version of the official Build Guide. For the full guide, visit [shmoergh.com/moduleur-build-guide](https://www.shmoergh.com/moduleur-build-guide)

## General module structure

All modules of the Moduleur consist of two boards: a Core board and a UI board. 

#### Core boards
- Contains all the circuitry for the module's functions
- These are SMD boards. Files for JLCPCB order are in the module's `production` folder including BOM and positions (CPL) files

### UI boards 
- Has all the interface elements like pots, jacks and buttons.
- These are through hole boards. Gerber zip file for JLCPCB order is in the module's `production` folder

## Board connections

The two boards are connected electrically via standard 2.54mm pitch pin headers and sockets. Mechanically, the two boards are connected via **M3x12mm spacers** and the module itself is connected to the frontplate via **M3x10mm spacers**. Make sure to mix and match the spacers, for example use female-male 12mm for board-board connection and female-female 10mm for module-frontplate connection. You can use either plastic or metal spacers, doesn't matter.

![IMG_2974](https://github.com/user-attachments/assets/45fe7d65-75ba-4da5-8974-eae64c340a32)

## Electrical components / BOM

Each board has a file called `[module-name]-full-bom.csv` which contains all the components of the module (for example, [here's the full bom of the VCF UI board](./04-vcf/electronics/ui/vcf-ui-full-bom.csv). This file lists **both the SMD components** (which is assembled by JLCPCB or other PCB manufacturer) **and the through-hole components** which you need to solder. So if you ordered the Core board using JLCPCB's SMD board assembly then you only need to order the through-hole components.

Through-hole components have a Mouser product ID and a link to them. Of course the availability of these components change all the time so if something is out of stock, you'll need to find a substitute for it.

#### Pots

We used **Bourns PTV-09A series** pots with 25mm shaft length for each module. However if availability is problematic, 20mm shaft length pots and/or **Alpha pots** with the same footprint will work just as well. 

Some pots have a value range: for example the Attack, Release and Decay pots have a A200k-1M value marked in the schematics. This means you can go safely with any pot in this range — but you need to consider the implications. For example the larger the value the longer the max time for Attack/Decay/Release.

On the original Moduleur design we use [Thonk Tall Trimmer Toppers](https://www.thonk.co.uk/shop/tall-trimmer-toppers/) for the small pots. They work on D-Shaft and Knurled Bourns/Alpha pots.

## Powering the modules

The [PSU board](./01-psu/) board provides 420mA current which is plenty for the 8 modules in the Moduleur. They are connected via 16x10 standard Eurorack cables. If you're planning to build the synth in the Moduleur enclosure you'll see that the [dedicated Moduleur PSU board](https://github.com/shmoergh/moduleur/tree/main/modules/01-psu/electronics/moduleur-enclosure) has only 4 power outputs. For these you need to create 4 custom power cables with two 2x5 headers on each. 

## Video guides

Some video guides are coming soon...
