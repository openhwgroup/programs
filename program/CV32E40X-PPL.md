# OpenHW Preliminary Project Proposal
This is a combined proposal for PPL and PL gates of the CV32E40X project

# Title of Project
CV32E40X

## Summary of project
This project involves the creation and verification of the CV32E40X core. This is an evolution of the CV32E40P core.
CV32E40X is a 4-stage RISC-V core aimed at compute intensive applications supporting the RV32IM[A]C[B][P]XZce_Zicount_Zicsr_Zifencei instruction set
Key features: P, B, general purpose accelerator interface.

Key application areas
* Medium performance compute intensive applications
* Accelerator interfacing

High level compute features
* P, B extensions
* Accelerator interface (X)

### Components

The project builds on CV32E40P as a baseline and it shares the following new features with CV32E40S:

* PMA
* Zce extension
* Extended debug functionality
* Simplified pipeline and controller
* Smarter prefetch unit (fewer unneeded prefetches)
* Register file optimization (remove 2nd write port, 3rd read port; except when P/B included)
* ALU/MUL clean up
* Faster (mulh*) multiply
* fence.i interface
* mtval support
* Bus error support
* RVFI interface (bound to RTL, not part of actual RTL)

The scope of project is similar to CV32E40P. It consists of design enhancements, verification, and documentation.

Software compiler support will be handled in related OpenHW projects, not yet defined. No custom instructions will be added and as such software compiler support is expected to be minimal (if not zero). Tool chain support is however required for the deliverable in which we will show how an example instruction can be added in an accelerator connected to the extension interface; this example will also describe and provide the related modifications to assembler/disassembler, etc.

As of yet any plans to develop OpenHW hardware reference designs such as FPGA or SoC have not been defined.

#### Component 1 - RTL design

The following design aspects of the project are required:

* PMA
* Zce extension
* A extension
* B extension
* P extension
* X interface
* Extended debug functionality
* Simplified pipeline and controller
* Smarter prefetch unit (fewer unneeded prefetches)
* Register file optimization (remove 2nd write port, 3rd read port; except when P/B included)
* ALU/MUL clean up
* Faster divide
* Faster (mulh*) multiply
* fence.i interface
* mtval support
* Interruptible div/divu/rem/remu
* Bus error support
* RVFI interface (bound to RTL, not part of actual RTL)

#### Component 2 

The verification approach is based on that developed for the CV32E40P.

The same verification approach as for the CV32E40P will be used (UVM, lock step ISS, formal techniques, random code generation, etc.) with the major improvement being a bound RVFI interface to ease the integration of the core with the verification environment (the RVVI->RVFI scoreboard/adapter is outside the scope of this project).

#### Component 3 - Documentation
See "Project Documents" section

### Summary of Timeline

RTL Freeze and release of this core is expected in 2022.

## OpenHW Members/Participants committed to participate 

Silicon Labs
Embecosm 

## Technical Project Leader(s) (TPLs)

Oystein Knauserud 

## Project Manager (PM)

Oivind Ekelund

## Project Documents
The following project documents will be created:

1. Requirements (Feature) Specification (first section of User Manual)
2. User Manual
3. Verification Architecture (same as CV32E40P)
4. Verification Plans
5. Verification Reports

## Summary of requirements

Improved performance for compute intensive applications using standard RISC-V extensions plus accelerator interface for external custom accelerators.

### Detailed Feature Requirements

CV32E40X key features
* RV32IM[A]C[B][P]XZce_Zicount_Zicsr_Zifencei
* 4-stage pipeline
* M-mode
* PMA
* CLINT
* OBI

No custom instructions

General purpose eXtension itf
* Generic (applicable to ALU type instructions, loads/stores)
* Tightly integrated (e.g. providing read and write access to register file)
* Low latency (instructions same latency as can be expected when adding the custom instruction directly into the core)
* F+Zfinx support (only) via extension interface (FPU is not part of this project)
* Aim for compatibility with https://github.com/ganoam/accelerator-interface

Code size reduction extension (Zce)

Bound RVFI interface
* Formal verification
* Enable standard ISS lock step compare

Extended Debug Trigger (0.14)
* Multiple breakpoints, 
* Data interface related breakpoints
* Support for etrigger
* Optional exception instead of halt for triggers

Bus error support

Simplified pipeline and controller
* Debug FSM simplification
* Removal of custom (PULP) features

Performance, area and power optimizations 
* Smarter prefetch
* Register file optimization (if P, B excluded)
 * Remove 2nd registerfile write port
 * Remove 3rd read port
* Faster divide
* Faster (mulh*) multiply
* ALU/MUL clean up

Lower worst case interrupt latency
* Interruptable div/divu/rem/remu
* Improve by ~32 cycles

Other improvements
* fence.i interface
* mtval support

Lint cleanup + System Verilog style cleanup

Dependencies and scope
* Zce, P, B, 0.14 of Debug pending on timely ratification

## Explanation of why OpenHW should do this project

Enables benefiting from standard RISC-V tool support plus allows for custom extensions without the need to change the core. Beneficial for member companies (enables a business/support model for members as Embecosm, Imperas and OneSpin; allows for (non-public) vendor specific extensions) as well as wider ecosystem (e.g. custom accelerator design matching standardized interface).

## Industry landscape: description of competing, alternative, or related efforts in the industry

CV32E40P, ARM Cortex-M4/M7

## External dependencies

Zce, P, B, 0.14 Debug specifications have not been ratified yet by RISC-V. Will be deconfigured or postponed if needed.

## List of project outputs

## TGs Impacted/Resource requirements

Cores TG, Verification TG, Software TG. Resource requirements covered within Silicon Labs and Embecosm.

## OpenHW engineering staff resource plan: requirement and availability

* Consultancy (answering questions from Project Team on existing RTL or verification infrastructure; likely very minimal)
* Metrics CI support (in principle Project Team will stick mostly to the Cadence world; here we request any Metrics CI work as was done for the 40P)
* Core independent ISS adapter (design of the RVFI->RVVI scoreboard/adapter. The assumption is that a bound RVFI interface is added to the CV32E40P first and that the RVFI->RVVI scoreboard/adapter is specified and designed in the CV32E40P project as well. ). The RVFI->RVVI scoreboard/adapter should then be re-usable as-is for the CV32E40X and the Project Team only needs to add a bound RVFI interface to the CV32E40X)
* X interface implementation (optionally to be done by OpenHW Staff, if not by Project Team)

## Engineering resource supplied by members - requirement and availability

Silicon Labs  

Arjan Bink (architecture) 
Oivind Ekelund (TPL, PM) 
Oystein (design) 
Halfdan (design)
Steve (verification architecture) 
Marton Teilgard (verification) 
Robin (verification) 
Henrik (verification)

Embecosm (Jeremy, Jessica) 

Approving commits within https://github.com/openhwgroup/core-v-verif/tree/*/cv32e40x can be approved by Steve Richmond, Mike Thompson, Oystein Knauserud or Arjan Bink. Marton Teilgard will be added to this list as soon as he can be elected as committer. Approving commits outside of cv32e40x can be done by Steve Richmond or Mike Thompson.

Approving commits within https://github.com/openhwgroup/cv32e40x can be approved by Steve Richmond, Oystein Knauserud or Arjan Bink. Oivind Ekelund will be added to this list as soon as he can be elected as committer.

## OpenHW marketing resource - requirement and availability

## Marketing resource supplied by members - requirement and availability

## Funding supplied by OpenHW - requirement and availability 

## Funding supplied by members - requirement and availability

## Architecture diagram

## Who would make use of OpenHW output

Semiconductor companies, SoC designers.

## Project license model

Solderpad License, Version 2.0

## Description of initial code contribution, if required

Design/verification based on CV32E40P.

## Repository Structure

Verification will use https://github.com/openhwgroup/core-v-verif. Most work will be done in https://github.com/openhwgroup/core-v-verif/tree/*/cv32e40x

Design and design documentation will use https://github.com/openhwgroup/cv32e40x with reduced content compared to cv32e40p (e.g. example_tb is removed).

## Project distribution model
* OpenHW GitHub Repository

## Preliminary Project plan
Project will be run according to agile methodology and working prototypes will be available throughout the project. Back log (priorities) will be discussed with active contributors. No detailed project plan will be made available. Base architecture (excluding P, B, Zce) functional completeness is targeted in Q4 2021. RTL freeze is targeted in 2022.

Risks
* Zce specification has not yet been ratified by RISC-V (will be deconfigured or postponed if needed)
* B specification has not yet been ratified by RISC-V (will be deconfigured or postponed if needed)
* P specification has not yet been ratified by RISC-V (will be deconfigured or postponed if needed)
* 0.14 Debug specifications specification has not yet been ratified by RISC-V (will be deconfigured or postponed if needed)

Expected sequence of activities (sequence can be changed at any time during Agile sprint planning)
* ALU/MUL clean up
* Removal of custom features (PULP, APU)
* Smarter prefetch
* Register file optimization
* Lint cleanup + System Verilog style cleanup
* PMA
* Instruction Bus error support
* Bound RVFI interface
* Data Bus error support
* fence.i interface
* mtval support
* Simplified controller
* Extended Debug Trigger
* Debug FSM simplification
* Interruptible div/divu/rem/remu
* eXtension interface
* B extension
* Zce extension
* A extension
* P extension
