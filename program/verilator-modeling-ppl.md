# OpenHW Preliminary Project Proposal: Verilator Modeling for CORE-V MCU and FPGA SoC

## SUMMARY OF PROJECT
This project aims to provide a stable and reasonably reliable Verilator system model for the CORE-V MCU (SoC and FPGA, comprising the cv32e40p). The purposes are
a. Predominantly, to be capable of supporting software development flows for which cycle accurate modeling of the target is appropriate, such as OS bring up and tool chain testing and optimization. 
b. A supplemental purpose is to be capable of a kicking the tires verification of the CORE-V MCU SoC RTL. 

From the Verilator Wikipedia entry: 
(https://www.veripool.org/wiki/verilator)

Verilator is a free and open-source software tool capable of converting Synthesizable Verilog/SystemVerilog to a cycle-accurate cycle-accurate, 2-state behavioral model in C++ or SystemC. 

##  COMPONENTS
The project has three parts:

### Component 1 - Standalone System Model
Creation of a standalone executable taking a software program as argument, running to completion, and returning the return code of the program (i.e. the same behaviour as a standalone GNU simulator).

### Component 2 - Software Debug Target
Creation of a component usable as either a standalone debug program or library implementing the remote serial protocol for connection by GDB or LLDB. The library version would be suitable for integration within an IDE.

### Component 3 - Kick the Tires Verification Model
Not meant for a full verification, but to allow to run sanity tests in-step with the verilator verification functionality available in the core-v-verification environment


## WHY OPENHW GROUP SHOULD DO THIS PROJECT 
The main reason is that software tool chain and operating system developers working with Core-V reference MCU (both SoC and FPGA) need a system model. This allows people to begin development without having physical hardware, expanding the potential reach of s/w dev on the MCU platform.
OpenHW is best placed to do this project due to our obvious knowledge of the MCU and the requirements.

Stability of Verilator-based verification environment, i.e. operating system, tool chain and processor IP-cores interoperability:
* quality and predictability of initial results for novice users of RISC-V-based processors
* repeatability of results between users and across environment

### Summary of Development

1. (Component 1) creating flow to generate model from RTL
2. (Component 1) providing modified RTL files for non-synthesiable elements
3. (Component 1) creating standalone executable for software use
4. (Component 2) implementing a debug server for GDB/LLDB
5. (Component 3) software models of UART, LED
6. (Component 3) creating flow to run verification using the Verilator model

### Summary of Timeline

To support s/w development on the CORE-V-MCU project
1. (component 1) initial Verilator model by end of March
2. (Component 1) standalone executable model by end of April
3. (Component 2) debug server by end of May
4. (Component 3) software models of peripherals (timing TBD)

## OpenHW Members/Participants committed to participate 

aLean-Tec - development of the Verilator model
Embecosm - debug server
QuickLogic - virtual customer to demonstrate that it works


## Technical Project Leader(s) (TPLs)
Combined wiht PM role
- Alfredo Herrera (aLean-Tec)

## Project Manager (PM)
- separate PM not required

## Project Documents
The following project documents will be created:

User Manual in 3 components
i. Standalone software model
ii. Debug server
iii. Verification model

## Summary of requirements

### Software 

The model will be used in development of the following tool chains

i. GCC
ii. LLVM
iii. FreeRTOS

###  Debug 

Component 2 will use the Embecosm Debug Server.
It is not the plan to use OpenOCD.

### Peripherals

i. LED
ii. UART

## Industry landscape: description of competing, alternative, or related efforts in the industry
Fast models which are not cycle accurate
- QEMU
- OVPSIM


## External dependencies
External open source technology:
- Verilator (GPL or Perl Artistic License)
- Embdebug (GPL license with exception)

QuickLogic embedded FPGA
- (hard cell - behavioural models - can't be modelled by Verilator - build a model in synthesizable verilog)

## List of project outputs



## TGs Impacted/Resource requirements

This project is under the auspices of the HW TG, with dotted line visibility to the SW TG

## OpenHW engineering staff resource plan: requirement and availability

## Engineering resource supplied by members - requirement and availability

## OpenHW marketing resource - requirement and availability

## Marketing resource supplied by members - requirement and availability

## Funding supplied by OpenHW - requirement and availability 

## Funding supplied by members - requirement and availability

## Architecture diagram


## Who would make use of OpenHW output
## Project license model

- Debug server is GPL with exception
- Verilog source in whatever license is used
- Embdebug - GLP with exception
- generated Verilator model - Solderpad 
 


## Description of initial code contribution, if required


## Repository Structure

Need a separate repo for the Verilator model

Embdebug target will need a separate repo


## Project distribution model
* OpenHW GitHub Repository
Need a fuller conversation 

## Preliminary Project plan

Alfredo needs to propose steps in consonance with timeline steps written above

debug server target library
work out license model


## Preliminary Risk Register

Risk is scored as likelihood (1-10) x impact (1-3) with mitigation required for any risk with score of 10 or more, of with an impact of 3 (project killer).

| Risk                          |   L |   I |   R | Mitigation                 |
|:----------------------------- | ---:| ---:| ---:|:---------------------------|
| time to setup working verification environment exceeds expectation | 3 | 3 | 15 | tbd |
| Insufficient resource available (c++ resource especially) | 3 | 3 | 15 | Socialize around OpenHW members to find expertise or funding. |
| Extent of rewriting RTL for Verilator is larger than expected |8|2|16| Treat developer RTL as golden, and provide substitute files as necessary, wherever possible generate automatically from the RTL. Verilator [configuration files](https://www.veripool.org/wiki/verilator/Manual-verilator#CONFIGURATION-FILES) can help.
| Verilator does not support a particular construct (e.g. 2D arrays in interfaces) |8|2|16| Provide a substitute  




