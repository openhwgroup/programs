# OpenHW Preliminary Project Proposal: Verilator verification for CORE-V MCU SoC


[[_TOC_]]

## SUMMARY OF PROJECT
This project aims to provide a stable and reasonably reliable Verilator verification flow:
a. capable of verifuing the CORE-V MCU SoC RTL 
b. capable of supporting a SW developmetn flow that would yield an RTOS booting on an FPGA implementation of the CORE-V MCU SoC . 

Verilator is a free and open-source software tool capable of converting Synthesizable Verilog/SystemVerilog to a cycle-accurate cycle-accurate, 2-state behavioral model in C++ or SystemC.

##  COMPONENTS
The project has two parts:

### Component 1 - Verification plan(s) and documentation
Including verification strategy, clear documentation of what is not verified with Verilator but instead done with commercial verification tools.

### Component 2 - Verification environment
Including clear documentation of verification tool chain, automation scripts and alignment with the CORE-V MCU SoC RTL (upstream) and the SW tool chain (downstream)

## WHY OPENHW GROUP SHOULD DO THIS PROJECT 
Modeling OSHW is a required activity that is may seem difficult for SW designers and architects unfamiliar with the required tool chain. For example:

* embedded-processor software development tools (SW tool chain) may include the GNU C Compiler (GCC) toolchain, a debugger cable driver and a GUI-based Integrated Development Environment (IDE).
* embedded processor hardware development (HW tool chain) may include a hardware description language (HDL) compiler and cycle-accurate or fast HW models to execute SW.

### Technological uncertainties targeted to be overcome
* time to setup working verification environment
* time between: (a) decision to do detailed CORE-V MCU SoC evaluation with commercial verification tool (b) ability to run SW to study features and architecture
* stability of Verilator-based verification environment, i.e. operating system, tool chain and processor IP-cores interoperability
* quality and predictability of initial results for novice users of RISC-V-based processors
* repeatability of results between users and across environment