cmake_minimum_required(VERSION 3.22)
project(output-tuner)
add_executable(output-tuner main.cpp)
target_link_libraries(output-tuner
	pico_stdlib
	brain-common
	brain-ui
	brain-io)
pico_enable_stdio_usb(output-tuner 1)
pico_enable_stdio_uart(output-tuner 1)
pico_add_extra_outputs(output-tuner)
