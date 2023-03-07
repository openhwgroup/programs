# OpenHW Project Concept And Project Launch
# FORCE-RISCV ISG
*This template is divided into two parts:*
- *The **Project Concept (PC)** required fields are shown in the first part.*
- *The additional **Project Launch (PL)** required and optional fields are shown in the second part.*

*Delete any sections not needed for your proposal*

*The normal proposal flow is:*
- ***The PC proposal*** *is prepared and presented to TWG. The PC proposal introduces the project and explains the market drivers and the "why"* 
  - *TWG grants PC gate with feedback, or rejects PC gate with feedback*
  - *If PC granted, additional work is carried out to prepare the **PL proposal***. 
- *The **PL proposal** contains updates to the PC fields and adds additional fields. The PL proposal explains the "what" of the project.* 
  - *For software porting projects, the PL should contain the feature list*
  - *For IP core or other complex projects, the PL should contain a high level feature list (the user manual with feature specification is developed for the Plan Approved gate).*


<hr/>

***Part 1, PC fields:***
*The PC proposal introduces the project and explains the market drivers and the "why"* 

# "FORCE-RISCV ISG"
# Project Concept Proposal
## Date of proposal 
- 2023-03-6

## Author(s) 
- Binguang.Zhao/Ethan

## High Level Summary of project, project components, and deliverables
FORCE-RISCV is a powerful verification tool for RISC-V based cpu design.
It has been developed in Futurewei Technologies and delivered to OpenHW Group on June 12 2020. 
With the 1st stage work from Futurewei Technologies, FORCE-RISCV has made built a good isg framework.
But lots of features need to be updated or upgraded with the booming development of riscv architecture. For example, new extensions need to be supported or existing extensions should be updated.

Albaba T-HEAD XuaTie team (XuanTie team for short) takes charge of the stage 2 development work of FORCE-RISCV with the open source community.

FORCE-RISCV currently supports 64-bit/32bit version of RISC-V with RV64I, M, A, Zicsr, F, D, C extensions, Machine, Supervisor, User modes, dynamic ISS interaction, dynamic Virtual Memory management, loops, configurable state transition, powerful and extensible Python scriptable test template writing framework etc. Vector extension 1.0 support, full paging exception control, basic MP/MT support and advanced resource dependency are also supported right now.

Many of the current OpenHW Group member's verification need can be satisfied with the powerful features provided by FORCE-RISCV.

## Summary of market or input requirements
### Known market/project requirements at PC gate
- No additional resource requirements yet identified

### Potential future enhancements
New features requested by OpenHW Group memebers and broader open source community.

## Who would make use of OpenHW output
CORE-V Vision APU project will be able to start using FORCE-RISCV with vector extension support.
OpenHW Group members working on 64-bit and/or 32-bit RISC-V processor designs will directly benefit from the FORCE-RISCV with both 64-bit and 32-bit support in the long term.

## Initial Estimate of Timeline
TODO:


## Explanation of why OpenHW should do this project
The following strengths of FORCE-RISCV are in comparison to other open source ISGs where FORCE-RISCV does it better: 
      �    High degree of test configurability via extensive Python front-end APIs.
      �    High quality of randomness with generate-and-step using the linked ISS library, able to achieve high density of interesting test features and reach high micro-architecture coverage requirements.
      �    Generates ELF files directly, no dependency on external toolchain compilation, simplifies the simulation work-flow.
      �    Great test generation speed, able to scale well for heavy MP/MT processor verification.  Due to the origin of FORCE-RISCV from server-class CPU projects.

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

## OpenHW Members/Participants committed to participate
1. Alibaba T-HEAD
2. Futurewei Technologies.
3. Additional member support to be confirmed.

## Project Leader(s)
### Technical Project Leader(s)
Binguang.Zhao/Ethan

### Project Manager, if a PM is designated
- Binguang.Zhao/Ethan
- Duncan Bees / Mike Thompson  - program management oversight

## Next steps/Investigation towards Project Launch (**PC only**)
### To investigate the project maintain policy
TODO:
### To investigate what document categories should be added
1. Usage guides (a usage guide is ready, though updates are necessary)
2. Developers guide (some tutorial for adding new instructions, memory/register file guide are ready, but more force internal or basic flow is needed)
3. Testbench/checker handcar integration guide

### To investigate the feature gaps about infra:
1. Seperate force-riscv/handcar repos to ease handcar development
2. Handcar (integrated with spike) need to be update to the latest
3. More friendly configuration system
4. Memory attribute configuration APIs optimization
5. Zone based multi processing framework support
6. Testbench handshake scheme needs to be added
7. Internal memory mapped device support
8. ...

### To investigate the extensions needed to be added or updated
1. Extension list to be added, like svpbmt, zicbo, zihintntl, zawrs, zfa, hypervisor .etc.
2. Extension list to be updated, like priviledge, vector .etc.

### To investigate startup template suites requirements
1. To make sure whether there is any people who is willing for the donation work
2. To make a feature list for startup

### Target Date for PL
TODO:

<hr/>


***Part 2, PL fields:***
*The PL proposal explains the "what". Some of it can be updated directly from the PC proposal* 

# FORCE-RISCV ISG
# Project Launch Proposal
## Date of proposal 
- 2023-03-6
## Author(s)
- Binguang.Zhao/Ethan


## Summary of project
FORCE-RISCV is a powerful verification tool for RISC-V based cpu design.
It has been developed in Futurewei Technologies and delivered to OpenHW Group on June 12 2020. 
With the 1st stage work from Futurewei Technologies, FORCE-RISCV has made built a good isg framework.
But lots of features need to be updated or upgraded with the booming development of riscv architecture. For example, new extensions need to be supported or existing extensions should be updated.

Albaba T-HEAD XuaTie team (XuanTie team for short) takes charge of the stage 2 development work of FORCE-RISCV with the open source community.

FORCE-RISCV currently supports 64-bit/32bit version of RISC-V with RV64I, M, A, Zicsr, F, D, C extensions, Machine, Supervisor, User modes, dynamic ISS interaction, dynamic Virtual Memory management, loops, configurable state transition, powerful and extensible Python scriptable test template writing framework etc. Vector extension 1.0 support, full paging exception control, basic MP/MT support and advanced resource dependency are also supported right now.

Many of the current OpenHW Group member's verification need can be satisfied with the powerful features provided by FORCE-RISCV.

### Components of the Project
TODO:

*Components are major project components or groups of features.*
- *A project may have, for example, 1-10 components.*
- *Components detail the "The what" at high level, not detailed level*
- *Components don't consider timeline.*
- *For example* 
  - *Component 1 "Compiler changes for standard instructions."* 
  - *Component 2 "Compiler changes for custom instructions"* 
  - *Component 3 "Updates to compiler tools".*

#### Component 1 Description
#### Component 2 Description


## Summary of market or input requirements
- No additional resource requirements yet identified
### Known market/project requirements at PL gate
- No  resource requirements yet identified
### Potential future enhancements for future project phases
TODO:

## Who would make use of OpenHW output
CORE-V Vision APU project will be able to start using FORCE-RISCV with vector extension support.
OpenHW Group members working on 64-bit and/or 32-bit RISC-V processor designs will directly benefit from the FORCE-RISCV with both 64-bit and 32-bit support in the long term.

## Summary of Timeline
TODO:
*High level view of timeline, for example timeframe for each component*

## Explanation of why OpenHW should do this project
The following strengths of FORCE-RISCV are in comparison to other open source ISGs where FORCE-RISCV does it better: 
- High degree of test configurability via extensive Python front-end APIs.
- High quality of randomness with generate-and-step using the linked ISS library, able to achieve high density of interesting test features and reach high micro-architecture coverage requirements.
- Generates ELF files directly, no dependency on external toolchain compilation, simplifies the simulation work-flow.
- Great test generation speed, able to scale well for heavy MP/MT processor verification.  Due to the origin of FORCE-RISCV from server-class CPU projects.

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


## OpenHW Members/Participants committed to participate
1. Alibaba T-HEAD
2. Futurewei Technologies.
3. Additional member support to be confirmed.


## Project Leader(s)
Binguang.Zhao/Ethan

### Technical Project Leader(s)
Binguang.Zhao/Ethan

### Project Manager, if a PM is designated
- Binguang.Zhao/Ethan
- Duncan Bees / Mike Thompson  - program management oversight

## Project Documents
### Project Planning Documents
The following project documents will be created:
- Preliminary Project Proposal (this document)
- Project Launch
- Build and Delivery Description
- TODO:
### Project Output Documents
TODO:


## List of project technical outputs
*This is a list of technical artifacts produced by the project*
TODO:

### Feature Requirements
*Features are more granular than Components.* 
*For SW porting projects, this list serves as the detailed project reference for features*
*For IP Cores or more complext projects, a user manual with requirements specification is produced at the PA gate, which may supercede this list of features*
TODO:

#### Feature 1
#### Feature 2


## External dependencies
*These are external factors on which the project depends, such as external standards ratification, external technology input, etc.*
TODO:

## OpenHW TGs Involved
*Which TG will be involved, such as SW, HW, Verification, etc.*
TODO:verification TG? which TGs?

## Resource Requirements
*This is a list of major resources/people required to implement the project and indication of whether the resources are available*
TODO:

### Engineering resource supplied by members - requirement and availability
#TODO:
### OpenHW engineering staff resource plan: requirement and availability
#TODO:
### Marketing resource  - requirement and availability
#TODO:
### Funding for project aspects - requirement and availability 
#TODO:

## Architecture and/or context diagrams 
*Architecture (internal blocks and interconnections), and context (depiction of the the project content within its operational context), are both encouraged where appropriate to depict functionality to both subject matter experts and to non-experts*
TODO:

## Project license model
The project code will be using Apache 2.0 license.

## Description of initial code contribution, if required
Initial code contribution has happened on June 12, 2020 from Futurewei Technologies.

## Repository Requirements
Current code repository: https://github.com/openhwgroup/force-riscv

## Project distribution model
Distribute via OpenHW Group GitHub repository.

## Preliminary Project plan
*A full project plan is not required at PL. A preliminary plan, which can be for instance the schedule for completion of component or feature list, together with responsible resource, should be provided. Full details should be provided at PA gate.*
TODO:

## Risk Register
*A list of known risks, for example external dependencies, and any mitigation strategy*
TODO:

