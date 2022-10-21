# OpenHW Project Concept Proposal: CV32E20
*The PC proposal introduces the project and explains the market drivers and the "why"* 

# Title of Project - "CV32E20"
# Project Concept Proposal
## Date of proposal - 2021-06-28
## Author(s) - Joe Circello (NXP), Lee Hoff (Intrinsix)

## High Level Summary of project, project components, and deliverables
The CV32E20 proposed project develops an area-efficient 2-stage microcontroller core based on Ibex as part of the CORE-V family of cores, along with a core complex supporting AHB-5 bus interfaces. 

## Summary of market or input requirements
This project is intended to support embedded applications where, for example, a state machine based implementation might otherwise be used. 
The core will support the RV32{E,I}MC instructions set.

### Known market/project requirements at PC gate
*DESIGN*
First stage is RTL design of the Core starting from Ibex with the following features:
* E - Base Integer Instruction Set (embedded) with 16, 32-bit general-purpose registers
* I - Base Integer Instruction Set, with 32, 32-bit general-purpose registers
* M - Standard Extension for Integer Multiplication and Division
* C - Standard Extension for Compressed 16-bit Instructions
* User Mode and Machine Mode
* OBI bus interfaces
* CV32E40P-like interrupt interface
* Cleaning Ibex RTL of unused parameters 
* Exposing privilege pins (privilege CSR bits are exposed as bus attribute signals)
* CV32E40P-like Sleep unit

Second stage is core-complex comprising:
* Core as per above
* OBI to AHB-5 bridges which start from an Intrinsix IP
* Interrupt controller design; integrates existing INTC (interrupt controller either from OpenTitan or Pulp)
* Debug design - integrates debug unit from Pulp and/or implementation of ratified debug spec

*VERIFICATION*
Most of the effort is interfacing the E20 to the reference model

### Potential future design enhancements
* Supporting 2 pin compressed JTAG debug interface
* Zce code size reduction extension
* Investigation of a tiny FPU implemention
  * Targeted at sensor computations at the edge 
  * Having FP would be useful for these and other computations
* Low granularity Physical Memory Protection (PMP) module

## Who would make use of OpenHW output
Companies developing microcontroller-based embedded systems or devices.


## Initial Estimate of Timeline
At Project Concept: 
* Design target for completion of first and second stage is October 2021
* Implementation of the test plan is assumed to be started in June/July 2021 and verification is expected to complete in December 2021



## Explanation of why OpenHW should do this project

* A 32 bit microcontroller is viewed as the right low-end programmable core to replace state machine based implementations. 
* It is the smallest RISC-V core applicable and will include standard Debug and ISA, with access to all the s/w tools which come with CORE-V.
* Small size and low power are key.
* The starting point is Ibex, but Ibex does not include everything needed, such as OBI. It also has many unneeded paramemters, which may cause verification and maintenance headaches. 
* The use of AHB buses will support the use of many 32-bit peripherals, such as crytography devices.
* It is important for OpenHW members to exert control over the features as part of the CORE-V family.

Overall, the CVE20 core will augment the CORE-V family of 32 bit cores with a needed low-end microcontroller. 



## Industry landscape: description of competing, alternative, or related efforts in the industry
IBEX - from LowRISC
SNITCH - from ETH Zurich - single pipeline, low complexity meant to offload to vector units
Arm Cortex M0+


## OpenHW Members/Participants committed to participate

* Intrinsix - Design and Verification of core-complex, Core Verification
* NXP - Core Design, Core Verification 
* Imperas - interested so far, to be confirmed
* Embecosm - interested so far, to be confirmed



## Project Leader(s)
### Technical Project Leader(s)
At of Project Concept, co-led by
* Lee Hoff, Intrinsix 
* Joe Circello, NXP

### Project Manager, if a PM is designated
None designated

## Next steps/Investigation towards Project Launch (**PC only**)

* Verification to be assessed in detail
  * Google ISG - are there "hacks" for RVE needed?
  * How to work with Imperas reference model
  * Is Force-V ISG an option?

* More granular component breakdown
* Confirmation of Resources
* Initial view of Risk Register
* List of Project Outputs
* Repository structure
* Initial code contribution
* Etc.



### Item2 to investigate
Finer-grained schedule


### Target Date for PL
July TWG (July 26)



<hr/>


***Part 2, PL fields:***
*The PL proposal explains the "what". Some of it can be updated directly from the PC proposal* 

# Title of Project - "CORE-V Cores Project CV32E20"
# Project Launch Proposal
## Date of proposal - 2021-07-01
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
