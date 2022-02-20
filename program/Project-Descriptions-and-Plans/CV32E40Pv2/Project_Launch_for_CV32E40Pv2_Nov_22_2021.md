# OpenHW Project Launch Proposal: CV32E40Pv2

# Title of Project - "CV32E40Pv2"
# Project Launch Proposal
## Date of proposal - 2021-11-22
## Author(s) - Pascal Gouedo (Dolphin Design), Olivier Montfort (Dolphin Design), Yoann Pruvost (Dolphin Design)


## Summary of project
This proposal is about verifying PULP basic instructions disabled during CV32E40Pv1 phase.
The goal of these instructions is to improve performance, power consumption and even code size depending of application programs.

### Components of the Project

This project will start from CV32E40P RTL freeze tag cv32e40p_v1.0.0 made in December 10, 2020.

To be fully compliant with RISC-V ISA, re-encode all PULP instructions in custom-0 to 3 RISC-V extensions (today disseminated in standard extensions)
and verify all re-encoded [PULP instructions](https://github.com/openhwgroup/cv32e40p/blob/master/docs/source/instruction_set_extensions.rst):
* Post-increment and register-register indexed load/store
* Hardware loops
* General ALU extensions
* Immediate branch
* Multiply-accumulate
* Bit manipulation
* SIMD (16 and 8-bit data) 
* Event load

Single Precision Floating Point support
* Keep Floating Point instructions decoding inside the Core and dispatch their execution to APU interface.
* Use ETHZ FPnew as FP execution unit (or FPnew moved to CV-FPU OpenHW Group project?)
* Verify RISC-V F extension instructions with coupled Core-FPnew (in both Zfinx and non-Zfinx modes?)
* Keep it optional with a parameter

For Multicore cluster area reduction
* Verify PULP Zfinx
* Keep it optional with a parameter to be able to use standard SW toolchain not supporting Zfinx (comment: not mandatory for Dolphin but anyone else?)

User Manual

Verification plans and reports

Implementation reports (PPA)

#### Component 1 - RTL design

Same RTL delivery than CV32E40Pv1 but with following parameters settings:
* Support of PULP ISA Extension (incl. custom CSRs and hardware loop, excl. p.elw)
  PULP_XPULP   = 1
* Support of PULP Cluster specific features (Event Load, global clock gating,...)
  PULP_CLUSTER = 1
* Optional Support of RISC-V F extension (interfaced via APU interface)
  FPU          = 0 or 1
* Optional support of PULP Zfinx if FPU = 1
  PULP_ZFINX   = 0 or 1

So 3 different configurations will be verified:
* PULP_XPULP = 1, PULP_CLUSTER = 1, FPU = 0
* PULP_XPULP = 1, PULP_CLUSTER = 1, FPU = 1, PULP_ZFINX = 0
* PULP_XPULP = 1, PULP_CLUSTER = 1, FPU = 1, PULP_ZFINX = 1

#### Component 2 - Documentation
See "Project Documents" section

## Summary of market or input requirements
### Known market/project requirements at PL gate


### Potential future enhancements for future project phases

## Who would make use of OpenHW output
Companies needing more performances, less power consumption or smaller code size for standard control or DSP-like computing applications.

## Summary of Timeline
All tasks and their estimated workload are listed in [CV32E40pv2 task list](https://github.com/openhwgroup/core-v-docs/blob/master/program/Project%20Descriptions%20and%20Plans/CV32E40Pv2/CV32E40P%20v2%20task%20list.xlsx).

Whole project is estimated between 14 and 20 person.months

With 2 verification and 1 architecture/documentation/design resources, given the project would start in January 2022, RTL freeze and release would be expected end of Q2 2022.

## Explanation of why OpenHW should do this project
* Finalize CV32E40 as originally intended in the [CV32E40 Features and Parameters](https://github.com/openhwgroup/core-v-docs/blob/master/cores/cv32e40p/CV32E40P_and%20CV32E40_Features_Parameters.pdf) to propose a more powerful/optimized version of CV32E40.

## Industry landscape: description of competing, alternative, or related efforts in the industry
ARM Cortex M4

## OpenHW Members/Participants committed to participate
* Dolphin Design - Design & Verification

## Project Leader(s)
### Technical Project Leader(s)
* Pascal Gouedo, Dolphin Design 

### Project Manager, if a PM is designated
* Markus Roesch, Dolphin Design

## Project Documents
### Project Planning Documents
Planning tools will be setup using OpenHW Group recommendations and Dolphin practices (gantt chart using free ganttproject software?, spreadsheet ...).

### Project Output Documents
1. User Manual
* New encoding for all PULP instructions
* Re-factored FPU chapter with information imported from FPnew documentation
* Integration chapter with additional section about Core + FPU wrapping
2. Verification Architecture (same as CV32E40Pv1)
3. Verification Plans
4. Verification Reports
5. Implementation Reports
* PPA analysis on different technologies and use cases (e.g. either targetting low area or high frequency)

## List of project technical outputs
* Verified RTL (3 defined configurations?)
* Verification environment including test cases
* Instruction Set Simulator (ISS)
* Documentation (See Project Documents)

### Feature Requirements
*Features are more granular than Components.* 
*For SW porting projects, this list serves as the detailed project reference for features*
*For IP Cores or more complex projects, a user manual with requirements specification is produced at the PA gate, which may supersede this list of features*

#### Feature 1
#### Feature 2


## External dependencies
1. SW tooclhain including
* Re-encoded PULP instructions
* PULP Zfinx support
* Floating Point support

2. Imperas ISS including same features as SW toolchain

## OpenHW TGs Involved
* Cores TG
* Verification TG
* Software TG

## Resource Requirements
*This is a list of major resources/people required to implement the project and indication of whether the resources are available*

### Engineering resource supplied by members - requirement and availability
Dolphin Design  
* Pascal Gouedo (architecture/documentation) - xxx %
* Yoann Pruvost (design/documentation) - xxx %
*               (design) - xxx %
* Yoann Pruvost (verification lead) - xxx %
*               (verification) - 100 %
*               (verification) - 100 %

### OpenHW engineering staff resource plan: requirement and availability
* Davide Schiavone - Technical support
* Mike Thompson    - Verification environment lead and Technical support

### Marketing resource  - requirement and availability
### Funding for project aspects - requirement and availability 

## Architecture and/or context diagrams 
*Architecture (internal blocks and interconnections), and context (depiction of the the project content within its operational context), are both encouraged where appropriate to depict functionality to both subject matter experts and to non-experts*

## Project license model

Solderpad License, Version 2.0

## Description of initial code contribution, if required

Core RTL
* Initial code contribution is from the existing CV32E40Pv1 release already approved by the IP team. 
* Does PULP instructions and Features need to be reviwed by IP Team?
FPU RTL
* Initial FPU code contribution is from the existing ETHZ FPnew RTL.
* Does it need to be reviewed by IP Team?

Verification based on core-v-verif uvm environment.

## Repository Requirements
* Design and Documentation will use https://github.com/openhwgroup/cv32e40p
* Verification and Reports will use https://github.com/openhwgroup/core-v-verif

## Project distribution model
* OpenHW GitHub Repository

## Preliminary Project plan
*A full project plan is not required at PL. A preliminary plan, which can be for instance the schedule for completion of component or feature list, together with responsible resource, should be provided. Full details should be provided at PA gate.*

## Plan toward PA gate
When are the planned milestones?
* PA – Plan approved – a fully detailed project plan and an agreed requirements specification as component of the User Manual
e/o Q4 2021

* PF – Project Freeze – Code released, all project checklists completed , and project completed
e/o Q2 2022

## Risk Register
* Avaibility of SW toolchain supporting all PULP instructions and PULP Zfinx
* Avaibility of ISS supporting all PULP instructions and PULP Zfinx
* Avaibility of OneSpin RISC-V app supporting Zfinx
