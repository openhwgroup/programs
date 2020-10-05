
# OpenHW Preliminary Project Proposal: CV32E40P Second RTL Freeze (v2)

## Summary of project

This proposal is for a second RTL freeze or release of the CV32E40P, henceforth referred to as CV32E40Pv2. This release may include verification of additional parameter options, bug fixes, re-enabled RTL and/or new RTL and additional verification as required. This release should not remove features or otherwise break compatibility with the previous RTL freeze. Such changes should be reserved for the CV32E40 or a fork/variant.

During initial development of the CV32E40P, some features were disabled, skipped, implemented in a minimal fashion or inadequately verified. Most notably, the PULP instructions were removed via a parameter. This was due to insufficient toolchain support and verification. The original intent of the CV32E40P is to include these PULP instructions as described in the [CV32E40* Features and Parameters](https://github.com/openhwgroup/core-v-docs/blob/master/cores/cv32e40p/CV32E40P_and%20CV32E40_Features_Parameters.pdf).

What follows is a description of the different work items to be included in the CV32E40Pv2.

### Add Selected PULP Extensions (Verification)

These are the existing PULP instructions minus the bit manipulation (superseded by the draft B Extension) and SIMD (superseded by the draft P Extension).

* Hardware loop (`Xcorevhwl`)
* Multiply accumulate (`Xcorevmac`)
* Post-increment and register-indexed load/store (`Xcorevpostinc`)
* Direct branches (`Xcorevbi`)
* General ALU operations (`Xvorevalu`)

These instructions generally improve the power/performance point as well as reduce code size in selected applications, producing a core with compelling open source advantages.

### Instruction Encoding (OPCODE) changes to align with RISC-V standard (RTL and Verification)

As described in issue [#452](https://github.com/openhwgroup/cv32e40p/issues/452), the RTL needs to be updated to match RISC-V standard. Without correcting the instruction encodings to fit within the custom space defined by the RISC-V standard, the toolchain can't be completed, upstreamed and maintained.

### Conversion to Draft Standard Extensions (RTL and Verification)

The bit manipulation and SIMD PULP instructions are to be superseded by the draft B and P extensions respectively. Due to the overlap with the draft standard extensions as well as resource constraints, the CORE-V GNU compiler toolchain will not support these instructions. Without toolchain support these instructions cannot be verified or used by software. Due to the instruction encoding differences the PULP instructions in CV32E40Pv2 will not be binary compatible or supported by the existing PULP toolchain and therefore will not be usable for existing PULP users.

For these reasons the existing instructions will be updated or replaced with draft standard compliant variants. This approach will keep the bit manipulation and SIMD features in the CV32E40P, albeit in a different form. Switching to the draft standard extension instructions will allow OpenHW to leverage existing toolchain support and modeling software for verification.

####  Bit Manipulation (more important)
Can be useful for e.g. cryptographic application

#### SIMD
Can be useful for signal processing

### Debug Trigger Enhancement (RTL and Verification)

Current debug trigger (hardware breakpoint) implementation only supports a single instruction breakpoint. The RISC-V Debug Specification provides a richer set of features like multiple breakpoints, data related breakpoints, etc.

The debug trigger implementation should be extended with the following additional features:
* Parameterizable number of breakpoints (such as 2 or 4 instead of 1)
* Load/store address breakpoints (break when you access a certain memory address with a load/store instruction)
* Option to configure the triggers to throw an exception instead of halting the core

### FPU (RTL, Verification, Documentation)

The CV32E40P has RTL to instantiate the FPU from the `fpnew` project from ETH. This project remains in the ETH GitHub. It is an implementation of the RISC-V standard FPU extension specification (F extension). It is not supported in the current version of the CV32E40P. The RTL may have become stale; however, the majority of the work will be in the verification and documentation.

### Summary of Timeline

To be checked

## OpenHW Members/Participants committed to participate in CV32E40Pv2 project

EM Microelectronic

## Technical Project Leader(s) (TPLs)

## Project Manager (PM)

## Project Documents

## Summary of requirements

### Introduction

### Initial project requirements

### Future enhancements:


## Explanation of why OpenHW should do this project

## Industry landscape: description of competing, alternative, or related efforts in the industry

### Related efforts to be described

## External dependencies

### Ownership of fpnew

ETH owns this repository and we have not engaged with them to understand if OpenHW could take over support, to instantiate, fork, etc.

### Ownership of ETH Debug Module

ETH owns this repository but it is not active. We have not engaged with them to understand if OpenHW could take over support, to instantiate, fork, etc.

## List of project outputs

## TGs Impacted/Resource requirements

## OpenHW engineering staff resource plan: requirement and availability

## Engineering resource supplied by members - requirement and availability

## OpenHW marketing resource - requirement and availability

## Marketing resource supplied by members - requirement and availability

## Funding supplied by OpenHW - requirement and availability

## Funding supplied by members - requirement and availability

## Architecture diagram

## Who would make use of OpenHW output

## Project license model


## Description of initial code contribution, if required

## Repository Structure

## Project distribution model

## Preliminary Project plan

### Risk Register

