
# OpenHW Preliminary Project Proposal: CV32E41P TRL3 prototype

## Summary of project

This proposal is for a new core based on the Cv32E40P. The modifications are small and as it is only a prototype it will not require full verification. The primary purpose for CV32E41P is to be a proof-of-concept (PoC) for the Zce extension, and it is also a proof of concept for the (soon to be) FROZEN Zfinx specification.

What follows is a description of the different work items to be included in the CV32E41P.

### Add prototype Zce extension

Implement Zce v0.41.x which is the version also used for the prototype toolchain and simulator work by the PLCT group in the China Academy of Science.

### Change from PULP_Zfinx to standard RISC-V Zfinx

Update the Zfinx implementation to match the (soon to be) FROZEN standard specification. This is expected to be a very simple task.

### Summary of Timeline

The work should happen during Q3 2021.

## OpenHW Members/Participants committed to participate in CV32E41P project

Huawei, Bristol (UK)

## Technical Project Leader(s) (TPLs)

Tariq Kurd, Huawei

## Project Manager (PM)

Davide Schiavone

## Project Documents

## Summary of requirements

### Introduction

### Initial project requirements

### Future enhancements:

## Explanation of why OpenHW should do this project

Zce is criticially important for the success of RISC-V in the embedded space. Building a proof-of-concept is a requirement for ratification, and the feedback it will give will be invaluable.

## Industry landscape: description of competing, alternative, or related efforts in the industry

Huawei have a proprietary code-size reduction extension. Andes have CoDense. PULP has many custom instructions, some of which reduce code size. Alibaba also have custom instructions for performance and code-size.

The purpose of Zce is to have a standard extension for everyone to use.

### Related efforts to be described

## External dependencies

## List of project outputs

RTL and basic tests.

## TGs Impacted/Resource requirements

## OpenHW engineering staff resource plan: requirement and availability

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

