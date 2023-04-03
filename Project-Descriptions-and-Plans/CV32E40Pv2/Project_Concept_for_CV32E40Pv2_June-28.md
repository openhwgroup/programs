# OpenHW Project Concept Proposal: CV32E40Pv2
*The PC proposal introduces the project and explains the market drivers and the "why"* 

# Title of Project - "CV32E40Pv2"
# Project Concept Proposal
## Date of proposal - 2021-06-28
## Author(s) - Olivier Montfort (Dolphin Design), Pascal Gouedo (Dolphin Design), Yoann Pruvost (Dolphin Design)

## High Level Summary of project, project components, and deliverables
This proposal is about verifying XPULP, RVF, and Zfinx ISA extensions that were disabled during CV32E40P v1 phase improving performances, power consumption and even code size depending of application programs.

## Summary of market or input requirements




### Known market/project requirements at PC gate

Re-encode in Custom extension and Verify following PULP "basic" instructions:
* Post-increment and register-register indexed load/store
* Hardware loops
* General ALU extensions
* Immediate branch
* Multiply-accumulate

Re-encode in Custom extension and Verify following PULP instructions:
* Bit manipulation
* SIMD (16 and 8-bit data) 
* Event load

For Multicore cluster area reduction,
* Verify PULP Zfinx?
* or Re-Design (if needed) and Verify Zfinx as described in [zfinx-spec-20210511-0.41](https://github.com/riscv/riscv-zfinx/blob/main/zfinx-spec-20210511-0.41.pdf)
* Make it optional with a parameter? 

Floating Point Unit
* Keep FPU instructions decoding inside the Core and dispatch to APU interface and
  Verify RISC-V standard F extension instructions (Zfinx and non-Zfinx) with coupled Core-FPnew?
* or Merge ETH CV-X-IF and only Verify this interface?

### Potential future design enhancements
* Conversion of PULP Bit Manipulation & SIMD instruction to ratified RISC-V B and P extensions.
* Add Zce extension for further code-size reduction (not required for Multicore cluster).
* Add bus attributes and errors.

## Who would make use of OpenHW output
Companies needing more performances, less energy consumption or smaller code size for standard control or DSP-like computing applications.


## Initial Estimate of Timeline
At Project Concept:
* Preliminary RTL release in 2021 Q4
* Implementation of the test plan is assumed to be started in July/August 2021
* Verification is expected to complete in 2022 Q1



## Explanation of why OpenHW should do this project
* Finalize CV32E40 as originally intended in the [CV32E40 Features and Parameters](https://github.com/openhwgroup/core-v-docs/blob/master/cores/cv32e40p/CV32E40P_and%20CV32E40_Features_Parameters.pdf) to propose a more powerful/optimized version of CV32E40.


## Industry landscape: description of competing, alternative, or related efforts in the industry
ARM Cortex M4


## OpenHW Members/Participants committed to participate
* Dolphin Design - Design & Verification


## Project Leader(s)
### Technical Project Leader(s)
At of Project Concept, led by
* Pascal Gouedo, Dolphin Design 

### Project Manager, if a PM is designated
None designated

## Next steps/Investigation towards Project Launch (**PC only**)

* Verification to be assessed in detail
  * Google ISG
  * Imperas reference model
  * SW GCC toolchain support

* More granular component breakdown
* Confirmation of Resources
* Confirmation of Schedule
* Initial view of Risk Register
* List of Project Outputs
* Etc.



### Item2 to investigate
Finer grained schedule


### Target Date for PL
July TWG (July 26)



<hr/>


***Part 2, PL fields:***
*The PL proposal explains the "what". Some of it can be updated directly from the PC proposal* 

# Title of Project - "CORE-V CoresProject XYZ"
# Project Launch Proposal
## Date of proposal - 2021-01-01
## Author(s) - Joe Smith, Mary Jones


## Summary of project

### Components of the Project

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
### Known market/project requirements at PL gate
### Potential future enhancements for future project phases

## Who would make use of OpenHW output

## Summary of Timeline
*High level view of timeline, for example timeframe for each component*

## Explanation of why OpenHW should do this project
*What is the impact of doing/not doing this project on the OpenHW ecosystem. Why is OpenHW best suited to do this project*

## Industry landscape: description of competing, alternative, or related efforts in the industry


## OpenHW Members/Participants committed to participate


## Project Leader(s)
### Technical Project Leader(s)
### Project Manager, if a PM is designated

## Project Documents
### Project Planning Documents
### Project Output Documents


## List of project technical outputs
*This is a list of technical artifacts produced by the project*

### Feature Requirements
*Features are more granular than Components.* 
*For SW porting projects, this list serves as the detailed project reference for features*
*For IP Cores or more complext projects, a user manual with requirements specification is produced at the PA gate, which may supercede this list of features*

#### Feature 1
#### Feature 2


## External dependencies
*These are external factors on which the project depends, such as external standards ratification, external technology input, etc.*

## OpenHW TGs Involved
*Which TG will be involved, such as SW, HW, Verification, etc.*

## Resource Requirements
*This is a list of major resources/people required to implement the project and indication of whether the resources are available*

### Engineering resource supplied by members - requirement and availability
### OpenHW engineering staff resource plan: requirement and availability
### Marketing resource  - requirement and availability
### Funding for project aspects - requirement and availability 

## Architecture and/or context diagrams 
*Architecture (internal blocks and interconnections), and context (depiction of the the project content within its operational context), are both encouraged where appropriate to depict functionality to both subject matter experts and to non-experts*



## Project license model

## Description of initial code contribution, if required

## Repository Requirements

## Project distribution model

## Preliminary Project plan
*A full project plan is not required at PL. A preliminary plan, which can be for instance the schedule for completion of component or feature list, together with responsible resource, should be provided. Full details should be provided at PA gate.*

## Risk Register
*A list of known risks, for example external dependencies, and any mitigation strategy*
