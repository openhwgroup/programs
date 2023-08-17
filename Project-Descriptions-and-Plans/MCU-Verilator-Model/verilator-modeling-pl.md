# OpenHW Project Launch Proposal: Verilator Modeling for CORE-V for Software Applications

| Gate                     | Status                                                     |
| -------------------------| ---------------------------------------------------------- |
| PC gate: Project Concept | Approved on 2021-02-078as Preliminary Project Launch (PPL) |
| PL gate: Project Launch  | Presented to Software TG on 2023-06-05                     |

Author: Jeremy Bennett

## Summary of project

This project aims to provide a Verilator system model CORE-V processors. The purpose is to support software development flows for which cycle accurate modeling of the target **implementation** is appropriate, such as OS bring up and tool chain testing and optimization.

Plan Approval reviews will be required for individual cores as targets.

From the Verilator Wikipedia entry:
(https://www.veripool.org/wiki/verilator)

Verilator is a free and open-source software tool capable of converting Synthesizable Verilog/SystemVerilog to a cycle-accurate cycle-accurate, 2-state behavioral model in C++ or SystemC.

### Changes since Project Concept

The overall focus has changed to purely software centric uses.

The following are the key changes:

1. the role of "kick-the-tires verification model" is dropped;
2. the use as a software debug target is given priority;
3. the scope is widened to all CORE-V processors;
4. the Verilator model is created through X-Heep, rather than CORE-V MCU; and
5. the project is moved to be purely under the Software Task Group.

## Components
The project has two parts.

### Component 1 - software debug target

Creation of a component usable as either a standalone debug program or library implementing the remote serial protocol for connection by GDB or LLDB. The library version would be suitable for integration within an IDE.

### Component 2 - standalone system model

A secondary goal is creation of a standalone executable taking a software program as argument, running to completion, and returning the return code of the program.  Not all targets will implement this second component.

## Why openhw group should do this project

The main reason is that software tool chain and operating system developers working with Core-V processors need a cycle accurate model of the core implementation.  In particular, optimization requires an exact model of the microarchitecture behavior, and an **implementation** model is essential for sign-off of such optimizations.

This work complements other **design** models, both high-level and cycle-accurate, which are available far earlier in the design cycle.

OpenHW is best placed to do this project due to our obvious knowledge of the processors and the requirements.

### Summary of development

The focus is on the processor core.  However, to be useable, this must be combined with a debug unit and memory, connected by a system bus.  For this reason, the work is based on the X-Heep project.

The overall framework for the debug interface is as follows.

```
+-------------+           +---------------+             +-------------+
|             |           |               |           +-+             |
|     GDB     |    RSP    |   Embdebug    |           |J|    X-Heep   |
|     or      |<--------->|---------------|   JTAG    |T|    Model    |
|     LLDB    |           |   Embdebug    |<--------->|A|             |
|             |           | target module |  S/W I/F  |G|             |
+-------------+           +---------------+           +-+-------------+
```
The standalone model is a wrapper around this.

The key development stages are:

1. (Component 1) implmentation of a GDB/LLDB server interface to the CORE-V debug unit modeled in Verilator (complete);
2. (Component 1) creation of a Verilator model of the target core(s) with associated debug unit and memory subsystem (in progress for CV32E40Pv2);
3. (Component 1) integration of the Verilator model with the GDB/LLDB server interface to create a fully functional debug server (in progress for CV32E40Pv2);
4. (Component 1) validation of the debug server;
5. (Component 1) accelleration of the debug server through use of DPI for direct memory writing;
6. (Component 2) creation of a standalone executable for general software use; and
7. (Component 2) validation of the standalone executable.

### Summary of timeline

The majority of the timeline is dependent on the specific core chosen, and thus appears in the Plan Approved document.  The following is however generic.

1. (component 1) implementation of a GDB/LLDB server interface to the CORE-V debug unit modeled in Verilator. Status: **COMPLETE**

## OpenHW members/participants committed to participate

- Embecosm - debug server, standalone model and initial customer using for tool chain CI.
- Dolphin Design - support for Embecosm for use with the CV32E40Pv2.
- Davide Schiavione - provision of X-Heep infrastruture.

## Technical Project Leader(s) (TPLs)

Jeremy Bennett

## Project Manager (PM)

Separate PM not required, managed by TPL.

## Project documents

The following project documents will be created:

User Manual in 3 sections:
1. creation of Verilator verification model using X-Heep;
2. debug server; and
3. standalone software model.

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

### Feature list: standalone model

- standard GNU style simulator.
- option to run for fixed time or count of cycles.
- options to turn on the following traces:

  - VCD generation;
  - (simulated) instruction trace;
  - register trace;
  - stack dump; and
  - memory dump.

### Software

The model will be used in development of the following tool chains and operating system

- GCC
- Clang/LLVM
- FreeRTOS

###  Debug

Component 1 will use the Embecosm Debug Server, Embdebug. **Note:** There is no plan to use OpenOCD.

## Industry landscape: description of competing, alternative, or related efforts in the industry

Fast design models with varying degrees of cycle accuracy.

- QEMU
- OVPSim
- Renode

Implementation models, all of which are event driven simulations

- Cadence Incisive
- Synopsys VCS
- Siemens Questasim
- Icarus Verilog

## External dependencies

External open source technology:

- Verilator (GPL or Perl Artistic License), which license does not impinge on generated models.
- Embdebug (GPL license with exception)
- Open Hardware Group cores (Eclipse Public License)
- X-Heep (Solderpad Hardware License)

These projects in turn will build on other open source tools.

## List of project outputs

1. Guidance on producing a Verilator model library for the core using X-Heep.
2. Debug server (program) suitable for connection to GDB or LLDB
3. Standalone simulator, capable of taking an executable and simulating it to completion.

All components include software, test framework, system documentation and user documentation.

## Task Groups impacted/resource requirements

This project is under the auspices of the Software Task Group.

## OpenHW engineering staff resource plan: requirement and availability

- Duncan Bees for general program support
- Davide Schiavione for X-Heep and SystemVerilog advice

## Engineering resource supplied by members - requirement and availability

- Embecosm staff to create components
- Dolphin design staff to evaluate components

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

All components created standalone for this project will use Apache 2 license.  All components which build on existing open source software will use the license of the source software.

- Generated Verilator models (Eclipse Public Licene).
- Standalone model software wrapping the Verilator model (Apache 2 License)
- Embdebug (GPLv3 with exception)
- Target module for Embdebug (Apache 2 License).

## Description of initial code contribution, if required

Embedebug is an open source debug server capable of supporting both GDB and LLDB and written by Embecosm.

## Repository structure

- X-Heep is a standalone project from the Embedded Systems Laboratory (ESL) at École Polytechnique Fédérale de Lausanne (EPFL) ([`x-heep`](https://github.com/esl-epfl/x-heep) repository).
- Embdebug is a standalone project from Embecosm ([`embdebug`](https://github.com/embecosm/embdebug) repository
- the Embedebug target modules for CORE-V are hosted by the OpenHW Group ([`embdebug-target-core-v`](https://github.com/openhwgroup/embdebug-target-core-v) repository).

## Project distribution model

Installation to be documented in the user manual.

- instructions on how to build from source code in repositories

Option for binary downloads to be provided by member companies

- cf OVPSim and Embecosm public buildbot for CORE-V tool chains

## Project plan

See [Summary of Development](#summary-of-development) above

Detailed project plans are target specific and provided in the Plan Approval document for the target.

## Risk register

Risk is scored as likelihood (1-10) x impact (1-3) with mitigation required for any risk with score of 10 or more, of with an impact of 3 (project killer).  These are generic risks, there will be more detailed risks for specific cores in the target Plan Approval document.

| Risk                          |   L |   I |   R | Mitigation                 |
|:----------------------------- | ---:| ---:| ---:|:---------------------------|
| Extent of rewriting RTL for Verilator for a particular target is larger than expected |2|2|4| |
| Verilator does not support a particular construct used in the code for a particular target (e.g. 2D arrays in interfaces) |2|2|4| |
