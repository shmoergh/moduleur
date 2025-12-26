#include <pico/stdlib.h>
#include <stdio.h>

#include "brain-common/brain-common.h"
#include "brain-io/audio-cv-out.h"
#include "brain-ui/button.h"
#include "brain-ui/led.h"

const uint LED_PIN = PICO_DEFAULT_LED_PIN;

using brain::io::AudioCvOut;
using brain::io::AudioCvOutChannel;
using brain::ui::Led;

const uint LED_PINS[] = {
	BRAIN_LED_1, BRAIN_LED_2, BRAIN_LED_3, BRAIN_LED_4, BRAIN_LED_5, BRAIN_LED_6};

int main() {
	stdio_init_all();

	int voltage = 0;
	AudioCvOut g_dac;
	brain::ui::Led leds[6] = {brain::ui::Led(LED_PINS[0]), brain::ui::Led(LED_PINS[1]),
		brain::ui::Led(LED_PINS[2]), brain::ui::Led(LED_PINS[3]), brain::ui::Led(LED_PINS[4]),
		brain::ui::Led(LED_PINS[5])};

	brain::ui::Button buttonDown = brain::ui::Button(BRAIN_BUTTON_1, 50, 500);
	brain::ui::Button buttonUp = brain::ui::Button(BRAIN_BUTTON_2, 50, 500);
	buttonDown.init();
	buttonUp.init();

	sleep_ms(1000);

	// Reset all LEDs to off
	printf("Resetting all LEDs to OFF\n");
	for (uint i = 0; i < 6; i++) {
		leds[i].init();
		leds[i].off();
	}
	sleep_ms(200);

	// Setup button callbacks
	buttonDown.setOnRelease([&]() {
		int nextVoltage = voltage - 1;
		if (nextVoltage < 0) {
			nextVoltage = 10;
		}
		voltage = nextVoltage;
	});

	buttonUp.setOnRelease([&]() {
		int nextVoltage = voltage + 1;
		if (nextVoltage > 10) {
			nextVoltage = 0;
		}
		voltage = nextVoltage;
	});

	// Init DAC
	if (!g_dac.init()) {
		printf("DAC init failed\n");
	}

	// Set DC coupling on both outputs
	printf("Setting DC coupling on both outputs\n");
	g_dac.setCoupling(
		brain::io::AudioCvOutChannel::kChannelA, brain::io::AudioCvOutCoupling::kDcCoupled);
	g_dac.setCoupling(
		brain::io::AudioCvOutChannel::kChannelB, brain::io::AudioCvOutCoupling::kDcCoupled);

	sleep_ms(1000);

	// Set voltage output to 10V
	printf("Setting output voltage to 10V on both outputs\n");
	g_dac.setVoltage(brain::io::AudioCvOutChannel::kChannelA, float(voltage));
	g_dac.setVoltage(brain::io::AudioCvOutChannel::kChannelB, float(voltage));

	printf("Setting all LEDs to ON\n");
	for (uint i = 0; i < 6; i++) {
		leds[i].on();
	}
	sleep_ms(1000);

	printf("Setting all LEDs to OFF\n");
	for (uint i = 0; i < 6; i++) {
		leds[i].off();
	}
	sleep_ms(200);

	while (true) {
		buttonDown.update();
		buttonUp.update();
		g_dac.setVoltage(brain::io::AudioCvOutChannel::kChannelA, float(voltage));
		g_dac.setVoltage(brain::io::AudioCvOutChannel::kChannelB, float(voltage));

		// Set LED (binary) to actual voltage
		for (uint i = 0; i < 6; i++) {
			if (voltage & (1 << i)) {
				leds[i].on();
			} else {
				leds[i].off();
			}
		}
	}

	return 0;
}
