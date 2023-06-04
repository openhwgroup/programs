# OpenHW Plan Approval Proposal: Verilator Modeling for CORE-V for Software Applications: CV32E40Pv2 Target

| Gate                     | Status                                                     |
| -------------------------| ---------------------------------------------------------- |
| PC gate: Project Concept | Approved on 2021-02-078as Preliminary Project Launch (PPL) |
| PL gate: Project Launch  | Presented to Software TG on 2023-06-05                     |
| PA gate: Project Launch  | Presented to Software TG on 2023-06-05                     |

Author: Jeremy Bennett

## Summary of project

This document should be read in the context of the overall Verilator Modeling for CORE-V for Software Applications project project launch proposal.  It does not duplicate information from that document.

This plan is to Verilator modeling support for software applications for the CV32E40Pv2 core.  For this plan, there is no plan to create a standalone softare model.

### Summary of Timeline

Much of this project is already complete.  Full completion is anticipated by 31 July 2023.

## OpenHW Members/Participants committed to participate in this project

- Embecosm - debug server, standalone model and initial customer using for tool chain CI.
- Dolphin Design - support for Embecosm for use with the CV32E40Pv2.
- Davide Schiavione - provision of X-Heep infrastruture.

## Project Leader(s)

- Jeremy Bennett

## Project Planning Documents

The progress towards the milestones will be tracked during progress meetings, usually every week.

A monthly report will be provided to the Software Task Group.

## Summary of requirements

### Feature list: debug server

These are the same set of features specified in the Project Launch document.

### Feature list: standalone model

No standalone model is being created.

### Project features

- Components supported:
    - (Component 1) debug server for CV32E40Pv2 target.

- Components not supported:
  - (Component 2) standalone software model for CV32E40Pv2 target.

### License scheme

The licensing is as described in the Project Launch document.

### Verification

The model will be verified by using it as a target for GCC regression testing (CV32E40Pv2 target), which includes tests for all CV32E40Pv2 ISA extensions.

Because this takes too long to run under GitHub CI, we will use Embecosm Jenkins server to provide CI.  The RISC-V subset of the GCC regression tests will be added to Github CI.

The model will also be benchmarked using the Embench IoT benchmark suite [embench.org](https://www.embench.org/).  This will aos be added to GitHub CI.

## Explanation of why OpenHW should do this project

This document should be read in the context of the overall project launch proposal.  It does not duplicate information from that document.

## Industry landscape: description of competing, alternative, or related efforts in the industry
This document should be read in the context of the overall project project launch proposal.  It does not duplicate information from that document.

### Market differentiators

## External dependencies

In addition to those specified in the project launch document:
- X-Heep configured for CV32E40Pv2 with memory and de ug unit.

## List of project outputs

1. Guidance on producing a Verilator model library for CV32E40Pv2 using X-Heep.
2. Debug server (program) for CV32E40Pv2  suitable for connection to GDB or LLDB

### Documentation:

All components include software, test framework, system documentation and user documentation.

### Design

The overall structure is as per the project launch document, but duplicated here for convenience:

```
+-------------+           +---------------+             +-------------+
|             |           |               |           +-+             |
|     GDB     |    RSP    |   Embdebug    |           |J|    X-Heep   |
|     or      |<--------->|---------------|   JTAG    |T|    Model    |
|     LLDB    |           |   Embdebug    |<--------->|A|             |
|             |           | target module |  S/W I/F  |G|             |
+-------------+           +---------------+           +-+-------------+
```

The Embdebug target module is the main component to be created, the others are all generic.  This is created as a DLL or SO implmeneting the Embedbug `ITarget` interface.  The X-Heep Model at the top level exports the clock and reset signals and the 5 standard JTAG ports (TCK, TDI, TDO, TMS, TRST).

The target module software has the following hierarchy:
```
+---------------------------------+
|   Embedebug ITarget interface   |
+---------------------------------+
|      RISC-V DMI abstraction     |
+---------------------------------+
|      RISC-V DTM abstration      |
+---------------------------------+
| RISC-V DTM for JTAG abstraction |
+---------------------------------+
|       JTAG TAP abstraction      |
+---------------------------------+
|      X-Heep Verilator model     |
+---------------------------------+
```
### Verification

A standard configuration for GCC verification is a target presenting a Remote Serial Protocol (RSP) debug interface.  We can thus run GCC regression through the Verilator model of CV32E40P.  The following criteria must be met.
- The only additional failures compared to generic RISC-V testing using QEMU must be timeouts due to the slower speed of the Verilator model
- All CORE-V execution tests for CV32E40Pv2 must pass.

### Benchmarking

A standard configuration for Embench is through a target presenting a RSP debug interface.  We can thus benchmark the CV32E40Pv2 via the Verilator model.  We will verify that these are consistent with the results obtained using the same core on an FPGA.

### OpenHW engineering staff resource plan: requirement and availability

- Davide Schiavione to assist as needed with X-Heep.

### Engineering resource supplied by members - requirement and availability

- Embecosm: Jeremy Bennett to develop all the software.
- Dolphin Design: Evaluation of the debug server.

### Marketing resource - requirement and availability

None required.

### Funding for project aspects - requirement and availability

This project is funded by Dolphin Design and Embecosm.

## Architecture and/or context diagrams

See [Design](#design) above.

## Who would make use of OpenHW output

Compiler tool chain developers (primarily Embecosm and PLCT) will use the model to verify and optimize the GCC and LLVM tool chains.

Software developers will use the model to develop and benchmark software for CV32E40Pv2 before silicon is available.

## Project license model

See the Project Launch document

## Description of initial code contribution, if required

See the Project Launch document

## Repository Structure

See the Project Launch document.  The code for the CV32E40Pv2 Embdebug target module is held in the [`embdebug-target-core-v`](https://github.com/openhwgroup/embdebug-target-core-v) repository.

## Project distribution model

See the Project Launch document.

## Project plan

The project is largely complete. These are the key tasks and timeline.

- GDB/LLDB server interface to the CORE-V debug unit modeled in Verilator.
  - COMPLETE.
- Creation of a Verilator model of the target core(s) with associated debug unit and memory subsystem for CV32E40Pv2.
  - COMPLETE.
- Integration of the Verilator model with the GDB/LLDB server interface to create a fully functional debug server.
  - IN PROGRESS, target date end June 2023.
- Modification of the model to make the location of boot files absolute, allowing the model to be run anywhere.
  - IN PROGRESS, target date end June 2023.
- Validation of the debug server using GCC regression testing.
  - IN PROGRESS, target date end June 2023.
- Accelleration of the debug server through use of DPI for direct memory writing.
  - NOT STARTED, target date end July 2023.
- Benchmark CV32E40Pv2 using Embench IoT.
  - NOT STARTED, target date end July 2023.

### Risk register

Risk is scored as likelihood (1-10) x impact (1-3) with mitigation required for any risk with score of 10 or more, of with an impact of 3 (project killer).  See the Project Launch document for generic risks.

| Risk                          |   L |   I |   R | Mitigation                 |
|:----------------------------- | ---:| ---:| ---:|:---------------------------|
| DPI writing of memory requires further work to guarantee coherency |2|4|8| |
