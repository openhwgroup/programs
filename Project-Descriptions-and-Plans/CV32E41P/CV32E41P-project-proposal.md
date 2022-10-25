
# OpenHW Project Plan: CV32E41P TRL3 prototype

# Summary of project

This proposal is for a new core based on the CV32E40P. The modifications are small and as it is only a prototype it will not require full verification. The primary purpose for CV32E41P is to be a proof-of-concept (PoC) for the [Zc\*](https://github.com/riscv/riscv-code-size-reduction/) extension, and it is also a proof of concept for the frozen Zfinx specification.

Zce offers better code-size reduction than only using the C extension. It includes 16-bit and 32-bit encodings. Zfinx shares the integer and floating point register files, primarily to save area but also to reduce context switch time.

The project will not require full verification as it targets TRL-3, the intention is to assess the area, timing, power and complexity of implementing these two extensions in RTL.

## Summary of the project goals 
### Stage 1  (Complete)

1. Implement Zc\* [version 0.50.x](https://github.com/riscv/riscv-code-size-reduction/releases/download/V0.50.1-TOOLCHAIN-DEV/Zce_spec.v0.50.1.toolchain.release.pdf) matching the current prototype toolchains (LLVM and GCC) and simulators (QEmu and Spike)
2. Write targeted tests for Zc\* and verify the implementation functionality
3. Update PULP_Zfinx to the standard RISC-V Zfinx
### Stage 2
1. Update the implementation of Zc\* to [version 0.70.x](https://github.com/riscv/riscv-code-size-reduction/releases/download/V0.70.1-TOOLCHAIN-DEV/Zc_0_70_1.pdf) tracking the specs and the toolchain implementation
2. Measure the Area, Timing and Power Overhead

## Summary of Timeline

Stage 1 of the work was completed during Q4 2021, and stage 2 should be completed during Q2 of 2022.

## OpenHW Members/Participants committed to participate in CV32E41P project

Huawei, Bristol (UK)

## Technical Project Leader(s) (TPLs)

Mark Hill, Huawei

## Project Manager (PM)

Mark Hill, Huawei

## Project Documents

## Summary of requirements

Implement Zce and Zfinx, and measure the difference in timing, area, power and complexity compared to CV32E40P.

### Introduction

### Initial project requirements

### Future enhancements:

## Explanation of why OpenHW should do this project

Zc\* is critically important for the success of RISC-V in the embedded space. Building a proof-of-concept is a requirement for ratification, and the feedback it will give will be invaluable.

OpenHW allows the implementation relative to an already verified core (the CV32E40P) and allows the resulting core to be available as open source, which will be a huge advantage in promoting the adoption of Zce (and to a lesser extent Zfinx).

The prototype implementation can be directly reused in other open sourced projects, either in OpenHW or elsewhere.

## Industry landscape: description of competing, alternative, or related efforts in the industry

Huawei have a proprietary code-size reduction extension. Andes have CoDense. PULP has many custom instructions, some of which reduce code size. Alibaba also have custom instructions for performance and code-size.

The purpose of Zce is to have a standard extension for everyone to use.

### Related efforts to be described

## External dependencies

## List of project outputs

RTL design of the ISA extensions in the CV32E41P repository and a list of basic tests

## TGs Impacted/Resource requirements

## OpenHW engineering staff resource plan: requirement and availability

Davide Schiavone will contribute to the project as director and helping with design issues

## Engineering resource supplied by members - requirement and availability

## OpenHW marketing resource - requirement and availability

## Marketing resource supplied by members - requirement and availability

## Funding supplied by OpenHW - requirement and availability

## Funding supplied by members - requirement and availability

## Architecture diagram

## Who would make use of OpenHW output

CAS/PLCT want an FPGA platform to test the toolchain. It's possible that a follow-on project is required to complete the verification, but the intention is that they are able to use CV32E41P @ TRL3.

## Project license model

## Description of initial code contribution, if required

## Repository Structure

## Project distribution model

## Preliminary Project plan

### Risk Register

More complete verification is required for the FPGA platform to be usable.
