
# OpenHW Preliminary Project Proposal: CV32E41P TRL3 prototype

## Summary of project

This proposal is for a new core based on the CV32E40P. The modifications are small and as it is only a prototype it will not require full verification. The primary purpose for CV32E41P is to be a proof-of-concept (PoC) for the Zce extension, and it is also a proof of concept for the (soon to be) FROZEN Zfinx specification.

Zce offers better code-size reduction than only using the C extension. It includes 16-bit and 32-bit encodings.
Zfinx shares the integer and floating point register files, primarily to save area but also to reduce context switch time.

It will not require full verification as it targets TRL-3.

The intention is to assess the area, timing, power and complexity of implementing these two extensions in RTL.

What follows is a description of the different work items to be included in the CV32E41P.

### Add prototype Zce extension

Implement Zce v0.41.x which is the version also used for the prototype toolchain (LLVM and GCC) and simulators (QEmu and Spike) work by the PLCT group in the China Academy of Science. This work was commissioned by RISC-V International.

### Change from PULP_Zfinx to standard RISC-V Zfinx

Update the Zfinx implementation to match the (soon to be) FROZEN standard specification. This is expected to be a very simple task.

### Summary of Timeline

The work should happen during Q3 2021.

## OpenHW Members/Participants committed to participate in CV32E41P project

Huawei, Bristol (UK)

## Technical Project Leader(s) (TPLs)

Tariq Kurd, Huawei

## Project Manager (PM)

Tariq Kurd (if required)

## Project Documents

## Summary of requirements

Implement Zce and Zfinx, and measure the difference in timing, area, power and complexity compared to CV32E40P.

### Introduction

### Initial project requirements

### Future enhancements:

## Explanation of why OpenHW should do this project

Zce is critically important for the success of RISC-V in the embedded space. Building a proof-of-concept is a requirement for ratification, and the feedback it will give will be invaluable.

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
