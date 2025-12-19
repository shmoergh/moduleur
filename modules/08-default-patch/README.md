# Hog Moduleur / Default Patch

An optional passive PCB which connects the modules of the Shmøergh Moduleur. This essentially creates a default patch which makes the Moduleur playable without patch cables.


## How to Build

[**Follow the build guide &rarr;**](https://www.shmoergh.com/moduleur-build-guide)

<br>

## Module specific instructions

### 🐛 3D model bug in schematics

The current version of the 3D model has two bugs: 

1. It incorrectly uses dual row headers. Single row, **long** pin headers should be used on the BACK side of the PCB so that it can connect to the UI board through the holes on the Core board.
2. The side of the ADSR+VCA1, ADSR+VCA2 and UTILS pin headers are wrong. All pin headers should be soldered on the BACK side of the PCB.

<img src="https://github.com/user-attachments/assets/41d169da-db7a-4718-b9bb-7f0591f9bb7a" />

<br>


## License

Open source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Feel free to fork, build, and tweak.

[Disclaimer](https://github.com/shmoergh/moduleur)
