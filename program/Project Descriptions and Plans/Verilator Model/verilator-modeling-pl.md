# OpenHW Project Launch Proposal: Verilator Modeling for CORE-V MCU and FPGA SoC

## Summary of project
This project aims to provide a Verilator system model for the CORE-V MCU SoC. The purposes are

a. Predominantly, to be capable of supporting software development flows for which cycle accurate modeling of the target is appropriate, such as OS bring up and tool chain testing and optimization.
b. A supplemental purpose is to be capable of a kicking the tires verification of the CORE-V MCU SoC RTL, including within continuous integration (CI) flows.

From the Verilator Wikipedia entry:
(https://www.veripool.org/wiki/verilator)

Verilator is a free and open-source software tool capable of converting Synthesizable Verilog/SystemVerilog to a cycle-accurate cycle-accurate, 2-state behavioral model in C++ or SystemC.

## Components
The project has three parts.

### Component 1 - standalone system model
Creation of a standalone executable taking a software program as argument, running to completion, and returning the return code of the program.

### Component 2 - software debug target
Creation of a component usable as either a standalone debug program or library implementing the remote serial protocol for connection by GDB or LLDB. The library version would be suitable for integration within an IDE.

### Component 3 - kick the tires verification model
Not meant for a full verification, but to allow to run sanity tests in-step with the verilator verification functionality available in the core-v-verification environment.

## Why openhw group should do this project
The main reason is that software tool chain and operating system developers working with Core-V reference MCU (both SoC and FPGA) need a system model. This allows people to begin development without having physical hardware, expanding the potential reach of software development on the MCU platform.

OpenHW is best placed to do this project due to our obvious knowledge of the MCU and the requirements.

The rapidity of creating Verilator models makes them highly suitable for "smoke test" verification. This is in addition to the conventional full chip verification flow.
* quality and predictability of initial results for novice users of RISC-V-based processors.
* repeatability of results between users and across environment.
* linting for use in environments where a full event-driven simulation is not available.

The Verilator model is useful for validating software components such as the Hardware Abstraction Layer (HAL).

### Summary of development

1. (Component 1) creating flow to generate model from RTL (in prototype as of 21 May 2021).
2. (Component 1) providing modified RTL files for non-synthesizable elements (in prototype as of 21 May 2021).
3. (Component 2) implementing a debug server for GDB/LLDB (started as of 21 May 2021).
4. (Component 3) creating flow to run verification using the Verilator model.
5. (Component 1) creating standalone executable for software use.
6. (Component 3) software models of UART, LED (may be several types, e.g simple loopback of UART or connection to system UART pins).

### Summary of timeline

To support software development on the CORE-V MCU project (independent of changes to MCU)
1. (component 1) initial Verilator model by end of May 2021 (was end of March 2021 at preliminary proposal)
2. (Component 2) initial debug server by end of June 2021
3. (Component 2) final debug server by end of July 2021 (was May 2021 in preliminary proposal)
4. (Component 1) initial standalone executable model by wrapping debug server by end of June 2021
5. (Component 1) optimized standalone executable model by end of August 2021 (was April 2021 in preliminary proposal).
6. (Component 3) software models of peripherals (timing TBD)

## OpenHW members/participants committed to participate

- aLean-Tec - initial development of the Verilator model.
- Florian Zaruba - completion of the Verilator model.
- Embecosm - debug server, standalone model and initial customer using for tool chain CI.
- QuickLogic - loop back tests and initial customer for "smoke test" verification.

## Technical Project Leader(s) (TPLs)

"Virtual" TPL of Florian Zaruba, Jeremy Bennett & Randy Oyadomari

## Project Manager (PM)

Separate PM not required, managed by TPL.

## Project documents

The following project documents will be created:

User Manual in 3 components:
1. Standalone software model;
2. Debug server; and
3. Creation of Verilator verification model included in the CORE-V MCU documentation.

**Note:** All manual components include a section on installation.

## Summary of requirements

### Feature list: debug server

- standard [Remote Serial Protocol](https://sourceware.org/gdb/current/onlinedocs/gdb/Remote-Protocol.html#Remote-Protocol) based debug server.
- support for Windows/MacOS/Linux operation.
- support for GDB and LLDB connection.
- the following `monitor` commands.

  - `monitor reset` to reset the simulator.
  - `monitor exit` to terminate the simulator.
  - `monitor cyclecount` to print count of cycles executed.
  - `monitor instrcount` to print count instructions executed.

- options to turn on the following traces:

  - VCD generation.

- peripheral simulation

  - LEDs as visual graphics
  - UART to physical interface on host

### Feature list: standalone model

- standard GNU style simulator.
- option to run for fixed time or count of cycles.
- options to turn on the following traces:

  - VCD generation;
  - (simulated) instruction trace;
  - register trace;
  - stack dump; and
  - memory dump.

### Feature list: "smoke test" verification

- loop back model of UART
- loop back model of GPIO

### Software

The model will be used in development of the following tool chains and operating system

- GCC
- Clang/LLVM
- FreeRTOS

###  Debug

Component 2 will use the Embecosm Debug Server, Embdebug. **Note:** There is no plan to use OpenOCD.

### Peripherals

- LED
- UART
- GPIO

## Industry landscape: description of competing, alternative, or related efforts in the industry

Fast models which are not cycle accurate

- QEMU
- OVPSim
- Renode

## External dependencies

External open source technology:

- Verilator (GPL or Perl Artistic License), which license does not impinge on generated models.
- Embdebug (GPL license with exception)
- Open Hardware Group CORE-V MCU

## List of project outputs

1. Debug server (program) suitable for connection to GDB or LLDB
2. Standalone simulator, capable of taking an executable and simulating it to completion.
3. Set of scripts to produce Verilator model library for the CORE-V MCU
4. A process flow for "smoke test" verification.

## Task Groups impacted/resource requirements

This project is under the auspices of the Hardware Task Group, with dotted line visibility to the Software Task Group.

## OpenHW engineering staff resource plan: requirement and availability

- Duncan Bees for general program support
- Florian Zaruba to complete Verilator modeling

## Engineering resource supplied by members - requirement and availability

- Embecosm staff to create components 1/2
- QuickLogic staff to create component 3
- TBD UART, GPIO & LED models

## OpenHW marketing resource - requirement and availability

N/A

## Marketing resource supplied by members - requirement and availability

N/A

## Funding supplied by OpenHW - requirement and availability

N/A

## Funding supplied by members - requirement and availability

N/A

## Architecture diagram

To be provided before Plan Approval stage.

## Who would make use of OpenHW output

See [WHY OPENHW GROUP SHOULD DO THIS PROJECT](#why-openhw-group-should-do-this-project)

## Project license model

See [External dependencies](#external-dependencies).

All components created for this project will use Apache 2 license.

- Generated Verilator models.
- Standalone model software wrapping the Verilator model.
- Target module for Embdebug.
- UART, LED and GPIO models.
- Scripts to drive "smoke test" flow and create Verilator models.

## Description of initial code contribution, if required

## Repository structure

- Verilator modeling is part of the [`core-v-mcu`](https://github.com/openhwgroup/core-v-mcu) repository.
- Embdebug target will need a separate repository.

## Project distribution model

Installation to be documented in the user manual.

- instructions on how to build from source code in repositories

Option for binary downloads to be provided by member companies

- cf OVPSim and Embecosm public buildbot for CORE-V tool chains

## Preliminary project plan

See [Summary of Development](#summary-of-development) above

## Preliminary risk register

Risk is scored as likelihood (1-10) x impact (1-3) with mitigation required for any risk with score of 10 or more, of with an impact of 3 (project killer).

| Risk                          |   L |   I |   R | Mitigation                 |
|:----------------------------- | ---:| ---:| ---:|:---------------------------|
| Insufficient resource available (LED/UART/GPIO models) | 5 | 2 | 10 | Socialize around OpenHW members to find expertise or funding. |
| Extent of rewriting RTL for Verilator is larger than expected |2|2|4| |
| Verilator does not support a particular construct (e.g. 2D arrays in interfaces) |2|2|4| |
