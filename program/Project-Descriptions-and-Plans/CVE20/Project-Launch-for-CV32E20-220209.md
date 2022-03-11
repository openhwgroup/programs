# Title of Project - "CV32E20"
# Project Launch Proposal
## Date of proposal - 2021-07-26, Revised 2022-01-21, 2022-02-09
## Author(s) - Joe Circello (NXP), Lee Hoff (Intrinsix)

## Summary of project
  The CV32E20 proposed project develops a TRL5, area-efficient 2-stage microcontroller core based on Ibex 
as part of the CORE-V family of cores, along with a core complex (aka "coreplex") supporting Arm AMBA AHB-5 32-bit bus interfaces, 
debug and interrupts.
  The scope of the project consists of detailing which of the Ibex parameters are being removed, or verified, or neither verified or removed (left for future work). Completing design enhancements and integration of the interfaces into the core complex. Completing verification and documentation.

## Components of the Project
### Component 1a "RTL design of the core".
      RTL design of the Core starting from Ibex with the following features:
      E - Base Integer Instruction Set (embedded) with 16, 32-bit general-purpose registers
      I - Base Integer Instruction Set, with 32, 32-bit general-purpose registers
      M - Standard Extension for Integer Multiplication and Division
      C - Standard Extension for Compressed 16-bit Instructions
      User Mode and Machine Mode
      Harvard memory OBI bus interfaces
      CV32E40P-like interrupt interface (Open Titan CLIC)
      Cleaning Ibex RTL of unused parameters 
      Exposing privilege pins (privilege CSR bits are exposed as bus attribute signals)
      Modification to make OBI-compliant bus interfaces.
      Adding and extending the rvfi interface
      Expose privilege pins as bus address phase attributes
      CV32E40P-like Sleep unit

### Component 1b "RTL design of the core complex".
      Integrating interrupt controller - (Open Titan CLIC).
      Integrating debug interface - similar to E40P
      Integrating OBI2AHB bus bridges

### Component 2 "Documentation".
     - Create core spec from existing Ibex documentation
     - Create core complex specification
     - Create verification plan and reports
  
### Component 3 "Verification of core complex"
     - Based on core-v-verif environment 
     - Verification of the Core ISA configurations: RV32IMC, RV32EMC
     - Verification of the Core Complex: DUT0 with RV32IMC, DUT1 with RV32EMC


## Summary of market or input requirements:
This project is intended to support embedded applications where, for example, 
a state machine based implementation might otherwise be used. Additionally, this core
is targeted for use in applications requiring a small 32-bit processing element.
The core supports the RV32{E,I}MC instruction sets.

### Known market/project requirements at PL gate
### Potential future enhancements for future project phases
* Zce static code size reduction opcode extension
* Supporting 2 pin compressed JTAG (CJTAG) debug interface
* Investigation of a "tiny FPU " implemention
  * Targeted at sensor computations at the edge 
  * Having FP would be useful for these and other computations
* Low granularity Physical Memory Protection (PMP) module

## Who would make use of OpenHW output

Companies developing microcontroller-based embedded (sub)systems or devices.

## Summary of Timeline

 * Start: 2021Q4
 * Use Ibex Core Specification 
 * Create Core Complex Specification - End of 2022Q1 
 * Complete design / integration - End of 2022Q2
 * Create Core Complex Verification plan and verification spec - End of 2022Q2
 * Execute verification plan to completion - 2022Q4
 * Document detailed completion including reviews - 2022Q4
 

## Explanation of why OpenHW should do this project

* A 32 bit microcontroller is viewed as the appropriate low-end programmable core to replace state machine based implementations. 
* It is the smallest RISC-V core design and includes standard Debug and ISA, with access to all the software enablement tools included in the CORE-V ecosystem.
* Small size and low power are the key hardware metrics.
* The starting point is Ibex, but Ibex does not include everything needed, such as OBI. It also includes many unneeded paramemters, 
  which may cause unnecessary verification and maintenance complications. 
* The use of Arm AMBA-AHB buses supports the (re)use of many existing 32-bit IP modules, including peripherals, such as crytography devices.
* It is important for OpenHW members to exert control over the features as part of the CORE-V family.

Overall, the CVE20 core augments the CORE-V family of 32 bit cores with a needed low-end microcontroller. 

## Industry landscape: description of competing, alternative, or related efforts in the industry

Ibex            - from LowRISC
SNITCH          - from ETH Zurich - single pipeline, low complexity meant to offload to vector units
Arm Cortex-M0+  - from Arm

## OpenHW Members/Participants committed to participate

* Intrinsix     - Design and Verification of core-complex, Core Verification
* NXP           - Architecture definition, Core Design, Core Verification 
* Imperas       - Supply Imperas reference model, engineering support and expertise
* Embecosm      - Provide tool enablement (SW tools: compilers, assembler/linker, etc.)
* ETH Zurich    - (Davide Schiavone) Provide design guidance and contribute RTL design edits

## Project Leader(s)
### Technical Project Leader(s)
At Project Launch, co-led by
* Lee Hoff, Intrinsix 
* Joe Circello, NXP

### Project Manager, if a PM is designated
None designated.

## Project Documents
### Project Planning Documents
 Detailed project plan 
 RTL Freeze checklist

### Project Output Documents
 Core specification
 Core complex specification
 Verification plan
 Verification report 


## List of project technical outputs
 Verified RTL for Core and Core Complex (RV32IMC and RV32EMC)
 Verification environment including test cases
 Documentation

### Feature Requirements
*Features are more granular than Components.* 
*For SW porting projects, this list serves as the detailed project reference for features*
*For IP Cores or more complext projects, a user manual with requirements specification is produced at the PA gate, which may supercede this list of features*

#### Feature 1
 Decide on features available to user and not available
 Configuration of parameters (what is being verified in this project)
 Future considerations of what is carried forward 
#### Feature 2


## External dependencies
*These are external factors on which the project depends, such as external standards ratification, external technology input, etc.*
*None currently identified*

## OpenHW TGs Involved
*Cores TG, Verification TG*

## Resource Requirements
*This is a list of major resources/people required to implement the project and indication of whether the resources are available*

Core Design RTL 
-> NXP and Intrinsix resources would need guidance from Davide Schiavone

Core Complex RTL 
-> 1-2 resources for 3 months until end of 2Q
-> Core Complex is to be handled by NXP and Intrinsix


Core Verification 
Core Complex Verification 

.> 3-4 FTE resources for (3Q + 4Q) of 2022
-> Intrinsix (USA) and NXP (Europe) resources

Documentation
-> covered as per deliverables above

Technical Project Management
-> potentially covered through NXP and Intrinsix especially by a verification leader
-> A committer would be needed, and the above person could do that


### Engineering resource supplied by members - requirement and availability
### OpenHW engineering staff resource plan: requirement and availability
discussed above

### Marketing resource  - requirement and availability
### Funding for project aspects - requirement and availability 

## Architecture and/or context diagrams 
*Architecture (internal blocks and interconnections), and context (depiction of the the project content within its operational context), are both encouraged where appropriate to depict functionality to both subject matter experts and to non-experts*
Nice to have but not yet available

## Project license model
   Solderpad License
   
## Description of initial code contribution, if required
  For the core, Initial RTL to be forked or cloned from Ibex. This decision is not yet made. 
  A CQ will be generated on the Ibex code. 
  For the core complex, 
-- Interrupt (CLIC or CLINT) controller from OpenTitan
-- OBI to AHB bus gaskets from Intrinsix
-- not decided yet if we need a CQ on these elements.
  Verification based on core-v-verif uvm environment


## Repository Requirements
  Design and Documentation will use github under cv32e20
  Verification will use github under core-v-verif

## Project distribution model
Project artifacts will be released under CORE-V Cores and available on openhw github 


## Preliminary Project plan
*A full project plan is not required at PL. A preliminary plan, which can be for instance the schedule for completion of component or feature list, together with responsible resource, should be provided. Full details should be provided at PA gate.*

see the timeline section above


## Steps to get to PA gate

Get the repo in place

Committer/contributor/repo/Git training for the teams at NXP and Intrinsix (2 hour session)

Technical teams need to be named and start engaging

Internal teams to NXP and Intrinsix should understand how to contribute code and navigate their company's policies to make contributions

Target the April 2022 PA gate to have
- requirements specificaiton for both Core and Complex
- project plan and risk register with task list, names, start and stop dates AND/OR detailed backlog register


## Risk Register
*A list of known risks, for example external dependencies, and any mitigation strategy*
