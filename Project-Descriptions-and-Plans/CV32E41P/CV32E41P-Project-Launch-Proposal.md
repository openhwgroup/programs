# OpenHW Project Plan: CV32E41P TRL3 prototype

# Summary of project

This proposal is for a new core based on the CV32E40P. The modifications are small and as it is only a prototype it will not require full verification. The primary purpose for CV32E41P is to be a proof-of-concept (PoC) for the [Zc\*](https://github.com/riscv/riscv-code-size-reduction/) extension (1.0.0), and it is also a proof of concept for the ratified Zfinx (1.0.0) specification.

The Zc\* specification is a set of 16-bit instruction encodings which offer a better code-size reduction than using only the C extension. Zfinx shares the integer and floating point register files, primarily to save area but also to reduce context switch time.

The project will not require full verification as it targets TRL-3, the intention is to assess the area, timing, power and complexity of implementing these two extensions in RTL.

## Summary of the project goals 
### Stage 1  (Complete)

1. Implement Zc\* [version 0.50.x](https://github.com/riscv/riscv-code-size-reduction/releases/download/V0.50.1-TOOLCHAIN-DEV/Zce_spec.v0.50.1.toolchain.release.pdf) matching the current prototype toolchains (LLVM and GCC) and simulators (QEmu and Spike)
2. Write targeted tests for Zc\* [version 0.50.x]and verify the implementation functionality
3. Update PULP_Zfinx to the standard RISC-V Zfinx [version 1.0.0]

Note that the Floating Point Unit of the Cv32E40Pv1 (the starting point for the E41P core) is not verified. The Zfinx work in the project does not address the verification of the floating point functions of the FPU or the core.

As of creation of the PL document (Nov 2022) Stage 1 is complete.

### Stage 2
1. Update the implementation of Zc\* to [version 1.0.0](https://github.com/riscv/riscv-code-size-reduction/releases/tag/v1.0.0-RC5.7)
2. Measure the Area, Timing Overhead for the Zc\* functions

## Summary of Timeline


Stage 1 of the work was completed during Q4 2021, and stage 2 should be completed during Q1 of 2023.

## OpenHW Members/Participants committed to participate in CV32E41P project

Huawei, Bristol (UK)

## Technical Project Leader(s) (TPLs)

Mark Hill, Huawei

## Project Manager (PM)

Mark Hill, Huawei


## Project Documents

The User Manual is available at https://docs.openhwgroup.org/projects/openhw-group-cv32e41p/



## Summary of requirements

The requirements strictly concern ratification of the specifications. Hence they are to implement Zc\* and Zfinx, and measure the difference in timing, area and complexity compared to CV32E40P.

### Introduction

See above Summary

### Initial project requirements

See above Summary 

### Future enhancements:

There is no plan as of PL for the future enhancement of this core beyond the TRL3 achieved with this project. Possible paths for the use of this core could include
- Integration of the compressed instructions from this project into another E40 series core
- Full verification of the FPU within the E41P

## Explanation of why OpenHW should do this project

Zc\* is critically important for the success of RISC-V in the embedded space. Building a proof-of-concept is a requirement for ratification, and the feedback it will give will be invaluable.

OpenHW allows the implementation relative to an already verified core (the CV32E40P) and allows the resulting core to be available as open source, which will be a huge advantage in promoting the adoption of Zc\* (and to a lesser extent Zfinx).

As mentioned above under Future Enhancements, the prototype implementation can be directly reused in other open sourced projects, either in OpenHW or elsewhere.

## Industry landscape: description of competing, alternative, or related efforts in the industry

Huawei have a proprietary code-size reduction extension. Andes have CoDense. PULP has many custom instructions, some of which reduce code size. Alibaba also have custom instructions for performance and code-size.

The purpose of Zc\* is to have a standard extension for everyone to use.

### Related efforts to be described

n/a

## External dependencies

The RISC-V International specification Zc\* is currently (Q4 2022) in public review and there is some possibility that it would be updated. Zfinx is already frozen.

## List of project outputs

- RTL design of the ISA extensions in the CV32E41P repository 
- The OpenHW SW TG developed some tool-chain tests (which excercise both the tool chain and the RTL). 
- All tests used by the project uploaded to E41P repo along with a makefile to allow anybody to run the tests on the E41P RTL.


## TGs Impacted/Resource requirements

- The main effort is by Huawei and falls under both Verification and Cores TG.
- The SW TG developed tests for E41P
- The SW TG supported the tool chain by integrating features developed originally by PLCT.

## OpenHW engineering staff resource plan: requirement and availability

Davide Schiavone contributed to the project as director and helping with design issues during stage 1. He is expected to continue this role during stage 2.


## Engineering resource supplied by members - requirement and availability

- See above

## OpenHW marketing resource - requirement and availability

n/a

## Marketing resource supplied by members - requirement and availability

n/a
There may be public presentations coordinated with OpenHW and Huawei but that is not confirmed as of PL

## Funding supplied by OpenHW - requirement and availability

n/a

## Funding supplied by members - requirement and availability

n/a

## Architecture diagram

Ibrahim will insert an updated diagram, but this may not be available until after PL.

## Who would make use of OpenHW output

CAS/PLCT want an FPGA platform to test the toolchain. It's possible that a follow-on project is required to complete the verification, but the intention is that they are able to use CV32E41P @ TRL3.

## Project license model

Solerpad 0.51

## Description of initial code contribution, if required

The E40P repo was cloned to initiate the work.
All of the enhancements were then made by organic contribution/pull request.


## Repository Structure

THe work is developed in openhwgroup/cv32e41p

## Project distribution model

Because this project is TRL3, it will be released a lower level than 1.0.0. The release strategy will be developed before PF.


## Preliminary Project plan

No other plan than the staging listed in this document

### Risk Register

Major risk to completion of the technical work, manual, and release checklists are the availability of Huawei resources to complete this work. 

## Work required to move to Plan Approved gate

The following would be needed
- User manual feature specification section. Note there will quite some updates needed to the user manual itself.
- Release strategy including defining checklist to completion and release
- Defining release nomenclature (release number)

## Work required to move to Project Freeze
- Release the project under the decided nonemclature
- Signoff the agreed checklists
