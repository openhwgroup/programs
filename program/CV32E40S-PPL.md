# OpenHW Preliminary Project Proposal
This is a combined proposal for PPL and PL gates of the CV32E40S project

# Title of Project
CV32E40S

## Summary of project
This project involves the creation and verification of the CV32E40S core. This is an evolution of CV32E40P aimed at applications with requirements for security functionality.

CV32E40S is a 4-stage secure RISC-V core supporting the RV32IMCXsecureZce_Zicsr_Zifencei instruction set (see Detailed Feature Requirements).

Compared to CV32E40P, CV32E40S adds the following key features
* Support for User mode 
* Enhanced PMP (ePMP)
* PMA
* Anti-tampering features
  * Protection against glitch attacks
  * Control flow integrity
  * Autonomous (hardware-based, low latency) response mechanisms
* Reduction of side channel leakage

### Components of the Project

The project builds on CV32E40P as a baseline and it shares the following new features with CV32E40X:

* PMA
* Zce extension
* Extended debug functionality
* Simplified pipeline and controller
* Smarter prefetch unit (fewer unneeded prefetches)
* Register file optimization (remove 2nd write port, 3rd read port)
* ALU/MUL clean up
* Faster (mulh*) multiply
* fence.i interface
* mtval support
* Bus error support
* RVFI interface (bound to RTL, not part of actual RTL)

The scope of project is similar to CV32E40P. It consists of design enhancements, verification, and documentation.

Software compiler support will be handled in related OpenHW projects, not yet defined. However, apart for some custom CSRs, no custom instructions will be added and as such software compiler support is expected to be minimal (if not zero).

Support for the (not-yet-ratified) Zce extension would be very welcome from the Software TG, but this PPL/PL does not assume that this will happen.

As of yet any plans to develop OpenHW hardware reference designs such as FPGA or SoC have not been defined.

#### Component 1 - RTL design

The following design aspects of the project are required:

* User mode
* Xsecure (configurable all or nothing)
  * Anti-tampering features
    * Protection against glitch attacks
    * Control flow integrity
    * Autonomous (hardware-based, low latency) response mechanisms
  * Reduction of side channel leakage
* ePMP (configurable number of regions)
* PMA (configurable number of regions)
* Zce extension
* Extended debug functionality
* Simplified pipeline and controller
* Smarter prefetch unit
* Register file optimization (remove 2nd write port, 3rd read port)
* ALU/MUL clean up
* fence.i interface
* mtval support
* Bus error support
* RVFI interface (bound to RTL, not part of actual RTL)

#### Component 2 - Verification

The verification approach is based on that developed for the CV32E40P.

A similar verification approach as for the CV32E40P will be used (UVM, lock step ISS, formal techniques, random code generation, etc.) with the major improvement being a bound RVFI interface to the RTL and an RVVI interface towards the ISS to ease the integration of the core with the verification environment (the RVFI->RVVI scoreboard/adapter is outside the scope of this project). The Imperas ISS will be extended with the new (software visible) features once ratified or deemed stable enough (e.g. User mode, ePMP, Zce, bus error support).

#### Component 3 - Documentation
See "Project Documents" section

### Summary of Timeline

RTL Freeze and release of this core is expected by end of Q4 2021

## OpenHW Members/Participants committed to participate 

Silicon Laboratories

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

CV32E40S: Standard RISC-V security related features (user mode + ePMP), anti-tampering features and reduction of side channel leakage.

### Detailed Feature Requirements

CV32E40S key features
* RV32IMCXsecureZicsr_Zifencei_Zce
* 4-stage pipeline
* M/U-mode
* Enhanced PMP (ePMP) (see https://lists.riscv.org/g/tech-tee/ for details)
* CLINT
* OBI

Security features (Xsecure)
* Security alert outputs (Minor and major alert pins that hardware can use e.g. to trigger reset or erase. See https://ibex-core.readthedocs.io/en/latest/03_reference/security.html)
* Data independent timing (Branches and div/divu/rem/remu will be made fixed latency. See https://ibex-core.readthedocs.io/en/latest/03_reference/security.html)
* Dummy instruction insertion (Randomly insert dummy instructions without functional impact to disrupt timing and power profiles. See https://ibex-core.readthedocs.io/en/latest/03_reference/security.html)
* Register file ECC (Add checksum or parity to register file words to detect (not correct) certain errors. See https://ibex-core.readthedocs.io/en/latest/03_reference/security.html)
* Hardened PC (Check that PC increments as expected for sequential code. See https://ibex-core.readthedocs.io/en/latest/03_reference/security.html)
* Hardened CSRs (Add shadow registers for critical CSRs to detect certain glitch attacks. See https://ibex-core.readthedocs.io/en/latest/03_reference/security.html)
* Control flow hardening (Sanity check that branches are (not) taken as they should)
* Functional unit and FSM hardening (Encode critical signals and FSM state such that certain glitch attacks can be detected)
* Bus interface hardening (Check that bus protocol is not violated)
* Reduction of profiling infrastructure (Prevent User mode from seeing Machine mode statistics)
* Etc.

Code size reduction extension (Zce) (see https://lists.riscv.org/g/tech-code-size/ for details)

Bound RVFI interface (see https://github.com/SymbioticEDA/riscv-formal/blob/master/docs/rvfi.md for details)
* Formal verification
* Enable standard ISS lock step compare

Bus error support

Extended Debug Trigger (0.14) (see https://lists.riscv.org/g/tech-debug for details)
* Multiple breakpoints 
* Data interface related breakpoints
* Support for etrigger
* Optional exception instead of halt for triggers

Simplified pipeline and controller
* Debug FSM simplification
* Complete removal of non-security related custom features (PULP, APU)

Performance, area and power optimizations 
* Smarter prefetch unit (fewer unneeded prefetches)
* Register file optimization
  * Remove 2nd registerfile write port
  * Remove 3rd read port
* Faster (mulh*) multiply
* ALU/MUL clean up

Other improvements
* fence.i interface
* mtval implementation

Lint cleanup + System Verilog style cleanup

Dependencies and scope
* **Zce, ePMP, 0.14** of Debug pending on timely ratification

## Explanation of why OpenHW should do this project

Security is of key importance in IoT. No secure core is present yet in OpenHW roadmap. The CV32E40S could for example be used in a security engine, which can be part of larger SoCs. The CV32E40P does not provide any security related feature and offers no protection at all with resepct to glitch attacks and side channel leakage attacks.

## Industry landscape: description of competing, alternative, or related efforts in the industry

* CV32E40S: Ibex (lower performance, fewer security features, not aligned to core-v-verif verification methodology/standards), 
* ARM SecurCore SC300 
* ARM Cortex-M35P (state of the art, not open source).

## External dependencies

Zce, ePMP, 0.14 Debug specifications have not been ratified yet by RISC-V. Will be deconfigured or postponed if needed.

## List of project outputs

* Verified RTL
* Verification environment including test cases
* Instruction Set Simulator (ISS)
* Documentation (See Project Documents)

## TGs Impacted/Resource requirements

Cores TG 
Verification TG. 
Resource requirements covered within Silicon Labs.

## OpenHW engineering staff resource plan: requirement and availability

* Consultancy (answering questions from Project Team on existing RTL or verification infrastructure; likely very minimal)
* Metrics CI support (in principle Project Team will stick mostly to the Cadence world; here we request any Metrics CI work as was done for the 40P)
* Core independent ISS adapter (design of the RVFI->RVVI scoreboard/adapter. The assumption is that a bound RVFI interface is added to the CV32E40P first and that the RVFI->RVVI scoreboard/adapter is specified and designed in the CV32E40P project as well.). The RVFI->RVVI scoreboard/adapter should then be re-usable as-is for the CV32E40S and the Project Team only needs to add a bound RVFI interface to the CV32E40S)

## Engineering resource supplied by members - requirement and availability

* Silicon Labs  
  * Arjan Bink (architecture) 
  * Oivind Ekelund (TPL, PM) 
  * Oystein (design) 
  * Halfdan (design)
  * Steve (verification architecture) 
  * Marton Teilgard (verification) 
  * Robin (verification) 
  * Henrik (verification)
* Imperas
  * (names to be provided)

Approving commits within https://github.com/openhwgroup/core-v-verif/tree/*/cv32e40s can be done by Steve Richmond, Mike Thompson, Oystein Knauserud or Arjan Bink. Marton Teilgard will be added to this list as soon as he can be elected as committer. Approving commits outside of cv32e40s can be done by Steve Richmond or Mike Thompson.

Approving commits within https://github.com/openhwgroup/cv32e40s can be done by Steve Richmond, Oystein Knauserud or Arjan Bink. Oivind Ekelund will be added to this list as soon as he can be elected as committer.

## OpenHW marketing resource - requirement and availability
## Marketing resource supplied by members - requirement and availability
## Funding supplied by OpenHW - requirement and availability 
## Funding supplied by members - requirement and availability

## Architecture diagram

## Who would make use of OpenHW output

## Project license model

Solderpad License, Version 2.0

## Description of initial code contribution, if required

Design/verification based on CV32E40P.

## Repository Structure

Verification will use https://github.com/openhwgroup/core-v-verif. Most work will be done in https://github.com/openhwgroup/core-v-verif/tree/*/cv32e40s

Design and design documentation will use https://github.com/openhwgroup/cv32e40s with reduced content compared to cv32e40p (e.g. example_tb is removed).

## Project distribution model
* OpenHW GitHub Repository

## Preliminary Project plan

Project will be run according to agile methodology and working prototypes will be available throughout the project. Back log (priorities) will be discussed with active contributors. No detailed project plan will be made available. RTL freeze is targeted in Q4 2021.

Risks
* Zce specification has not yet been ratified by RISC-V (will be deconfigured or postponed if needed)
* ePMP specification has not yet been ratified by RISC-V (will be deconfigured or postponed if needed)
* 0.14 Debug specifications specification has not yet been ratified by RISC-V (will be deconfigured or postponed if needed)

Expected sequence of activities (sequence can be changed at any time during Agile sprint planning)
* ALU/MUL clean up
* Removal of custom features (PULP, APU)
* Smarter prefetch
* Register file optimization
* Lint cleanup + System Verilog style cleanup
* PMA
* ePMP
* Instruction Bus error support
* Security features (Xsecure)
* Bound RVFI interface
* Data Bus error support
* fence.i interface
* mtval support
* Simplified controller
* Extended Debug Trigger
* Debug FSM simplification
* Zicount removal
* Zce extension

