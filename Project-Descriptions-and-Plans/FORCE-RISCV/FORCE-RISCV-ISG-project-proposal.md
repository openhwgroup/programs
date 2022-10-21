# OpenHW Project Proposal
# FORCE-RISCV ISG


## Summary of project
FORCE-RISCV ISG has been developed in Futurewei Technologies and delivered to OpenHW Group on June 12 2020.

FORCE-RISCV is a powerful verification tool for RISC-V based CPU design,  currently supports 64-bit version of RISC-V with RV64I, M, A, Zicsr, F, D, C extensions, Machine, Supervisor, User modes, dynamic ISS interaction, dynamic Virtual Memory management, loops, configurable state transition, powerful and extensible Python scriptable test template writing framework etc.  Vector extension 0.9 support, full paging exception control and advanced memory sub-system verification features are in the work and nearly finished.

Note that support for 32-bit RISC-V is not there yet, but it will be a major part of this project proposal and will be supported very soon.  With 32-bit RISC-V support, many of the current OpenHW Group member's verification need will be satisfied with the powerful features provided by FORCE-RISCV.

Additional features like MP/MT support and advanced resource dependency is also on the near term plan.

### Summary of Timeline
- Preliminary Project Launch (PPL) in the OpenHW Group process is proposed for end September 2020 TWG.
- Project Launch (PL) in the OpenHW Group process is proposed for October 2020 TWG.
- Project Plan Available (PPA) is proposed for October 2020 TWG.
- 32-bit version support should be useable by end-of-year
- Fully functional 32-bit RISC-V ISG by end of Q1 2021.
- On-going feature additions will continue afterwards.

## OpenHW Members/Participants committed to participate in FORCE-RISCV project
1. Futurewei Technologies.
2. Thales Group
3. Additional member support to be confirmed.

## Technical Project Leader(s) (TPLs)
Jingliang (Leo) Wang

## Project Manager (PM)
- Jingliang (Leo) Wang
- Duncan Bees / Mike Thompson  - program management oversight

## Project Documents
The following project documents will be created:
- Preliminary Project Proposal (this document)
- Project Proposal, an updated version of this document
- Project Plan
- Feature Description
- Build and Delivery Description

## Summary of requirements
The present document gives a present snapshot of requirements and Preliminary Project Proposal.  More detailed requirements will be available with Project Proposal.

### Introduction
32-bit RISC-V support and additional new features for both 64-bit and 32-bit RISC-V.

### Project requirements 
1. Support for 32-bit RISC-V instructions.
2. Support for 32-bit RISC-V registers.
3. Support for 32-bit RISC-V virtual memory system.
4. Support for 32-bit RISC-V exception handling.
5. Support for 32-bit RISC-V front-end framework.
6. Support 32-bit RISC-V ISS standalone and shared library.
7. MP/MT support for both 32-bit and 64-bit RISC-V.
8. Advanced resource dependency for both 32-bit and 64-bit RISC-V.

### Future enhancements:
9. Support for new RISC-V extensions and updates.
10. New features requested by OpenHW Group memebers and broader open source community.

## Explanation of why OpenHW should do this project

The following strengths of FORCE-RISCV are in comparison to other open source ISGs where FORCE-RISCV does it better, if we implement support for 32-bit RISC-V, your 32-bit RISC-V design will also benefit from the high quality test generation.
      •    High degree of test configurability via extensive Python front-end APIs.
      •    High quality of randomness with generate-and-step using the linked ISS library, able to achieve high density of interesting test features and reach high micro-architecture coverage requirements.
      •    Generates ELF files directly, no dependency on external toolchain compilation, simplifies the simulation work-flow.
      •    Great test generation speed, able to scale well for heavy MP/MT processor verification.  Due to the origin of FORCE-RISCV from server-class CPU projects.

Additional advanced features like MP/MT and resource dependency will meet the need of more complicated processor design that OpenHW Group might tackle in the future.

## Industry landscape: description of competing, alternative, or related efforts in the industry

RISCV-DV from Google is currently a very popular test generator for RISC-V designs.

### Related efforts to be described
- Google's RISCV-DV released in Jan 23, 2019, 1 year and half before Futurewei Technologies' FORCE-RISCV open source and there is no other open source choices availabe.
- RISCV-DV has all/most basic functionalities that a open source RISC-V 64-bit/32-bit processor project would need.
- RISCV-DV lacks highly fine-grained control that FORCE-RISCV provide and due to not emulating generated instructions test generated are much too coarse to reach high coverage as the processor design get more complicated.
- RISCV-DV would be not possible to be extended further in features beyond certain point.
- Dependency on (customized) GCC toolchain.
- Needs commercial license for System Verilog compile/simulating tools to contribute.
- OpenHW Group don't have much influence on the project direction.

## External dependencies
- Third party open source libraries/projects with BSD/Apache like/compatible license would need to be updated periodically (quarterly or bi-yearly) to keep up with upstream.

## List of project outputs
- Buildable working source code supporting both 64-bit and 32-bit RISC-V.
- User manual.
- Examples and tutorials.
- Regression system.

## TGs Impacted/Resource requirements
- This work will be planned and discussed in the Verification TG. The project plan will be produced by the project manager with assistance of Verification TG, and reviewed/approved in TWG.

## OpenHW engineering staff resource plan: requirement and availability
- Duncan Bees / Mike Thompson - program management oversight

## Engineering resource supplied by members - requirement and availability
- Futurewei Technologies will lead the engineering effort.
- We believe this project will benefit OpenHW CPU verification and the ecosystem as a whole. Other members can be involved as follows and increase their involvement as value of the project become more apparent to them:
  •    Setting requirements and feature requests
  •    Help with ISG development.
  •    Help with ISG frontend test template and library development.
  •    Use FORCE-RISCV in OpenHW Group projects, develop test templates for verification purpose and provide feedback.

## OpenHW marketing resource - requirement and availability
- No additional resource requirements yet identified

## Marketing resource supplied by members - requirement and availability
- No  resource requirements yet identified

## Funding supplied by OpenHW - requirement and availability 
- No funding requirements yet identified

## Funding supplied by members - requirement and availability
- No funding requirements yet identified

## Architecture diagram
- Slides presented to TWG on 09/07/2020 contains architecgture diagram: https://github.com/openhwgroup/core-v-docs/blob/master/TWG/MeetingPresentations/2020-09-07%20FORCE-RISCV%20ISG%20-%20status.pdf

## Who would make use of OpenHW output
CVA6 project will be able to start using FORCE-RISCV 64-bit version.
OpenHW Group members working on 64-bit and/or 32-bit RISC-V processor designs will directly benefit from the FORCE-RISCV with both 64-bit and 32-bit support in the long term.

## Project license model
The project code will be using Apache 2.0 license.

## Description of initial code contribution, if required
Initial code contribution has happened on June 12, 2020 from Futurewei Technologies.

## Repository Structure
Current code repository: https://github.com/openhwgroup/force-riscv

## Project distribution model
Distribute via OpenHW Group GitHub repository.

## Project plan
More detailed project plan is available in a seperate file "FORCE-RISCV Feature Descriptions and Project Plan"


