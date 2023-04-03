# Title of Project - "Taiga CORE-V CV32???5"
# Project Concept Proposal
## Date of proposal - 2021-07-26
## Author(s) - Eric Matthews, Lesley Shannon

## Project Summary
This proposal is about bringing the Taiga FPGA-based soft-processor into the OpenHW ecosystem.

The Taiga processor is a highly-configurable, and high performance, single-issue, FPGA-optimized RISC-V soft-processor.  It currently supports the RV32I[M][A] extensions as well as the 1.11 Privileged ISA.

As an FPGA-optimized design, it provides high operating frequency on FPGAs in addition to high instruction throughput per cycle.  Thus, it can provide leading runtime performance for applications and high performance/resource efficiency.

In contrast to the majority of FPGA-based soft-processors, which feature fixed-pipeline designs, Taiga has been designed with a parallel execution pipeline.  It features a fixed interface for execution units, that allows for integrating custom instructions as first-class operations.  Furthermore, its design facilitates extracting high Instruction-Level-Parallelism (ILP) from custom instructions through support for out-of-order execution and variable latency operation.

This project will bring to OpenHW a performance leading FPGA-optimized soft-processor with a broad range of use cases.  As the final steps in this work we plan to bring up Linux support along with the completion of debug support for the processor.  In this release we are targeting a TRL of 3 or 4.  This is the range that we believe Taiga will reach with our own testing and verification.  If other parties are interested in additional verification efforts, we are open to collaboration.

## Project Components and Deliverables
Our deliverables can be broken down into: the processor itself, the build/testing environment, verification efforts and documentation.

### Taiga Processor
* RV32I[M][A]
* Optional Privileged ISA 1.11
  * M
  * M/U
  * M/S/U
* Support for multiple memory sources
  * Tightly-coupled memory
  * Peripheral bus (AXI 4 lite, Avalon, Wishbone)
  * Caches
    * Custom L2 Arbiter for multicore/coherence
    * L2 Arbiter interface to AXI 4
* Xilinx and Intel support
* Custom Instruction support
* Interrupts (currently proprietary, willing to support other/any interface)

Planned/In-progress
* Linux support
* RISC-V Debug support (0.13 Instruction insertion)

### Taiga Environment
* Verilator-based simulation environment
  * Supports tightly-coupled and cache memory configurations
* Board support for FPGAs/Verilator (UART and memory mapping)
  * Compliance tests and common benchmarks supported

### Verification
* Continuous Integration (CI) for self-checking benchmarks
  * RISC-V compliance tests
  * Embench
  * Coremark
  * Dhrystone
* Internal formal verification process

### Documentation
* User guide for Verilator test environment
* User guides for FPGA environment
* User guide for custom instruction integration
* Basic pipeline-breakdown documentation

## Summary of Input Requirements
### Known market/project requirements at PC gate
In an FPGA environment, a high level of configurability allows users to customize/tailor their design to their required use case(s).  To be useful to a broad range of users we require the processor to have:
* cross-vendor support
* high configurability
* documentation
* test environment
* Linux support
* RISC-V Debug interface

Of these, it is the last two, along with additional verification that are still required to be completed.

Currently, the number of FPGA-based soft-processors that support Linux is limited to the vendor cores and the VexRISC-V processor.  For academic researchers, Linux support enables a much broader range of use cases for the system and is not something that is readily available today.

Debug support is of particular relevance for an FPGA-based designs, not simply for debugging purposes, but for program loading into either local memory or DDR for bare-metal software environments.  Without a debug module, applications must be pre-loaded at synthesis time (for local, tightly-coupled memory), or loaded into DDR by an external source.  As such, the addition of a debug module provides significant extra flexibility in the operation of the system.  Furthermore, debug support, being a non-research focused component is an uncommon feature among soft-processors developed in academic environments.

Providing all the aforementioned functionality will lead to a processor environment that should meet the requirements of a broad range of users, both academic and industry based.

### Potential future enhancements
The following is a short list of the possible future enhancements that could be made.  Some of which, such as the L2 cache and FPU, are already under way in our research lab at SFU.

* L2 cache
* FPU
* ISA additions
    * Compressed instruction support
    * Bit manipulation instructions
    * FPU / Vector extension
    * 64-bit support
* Performance enhancements
    * Multi-issue
    * Improved branch prediction
* Other implementation targets
    * ASICs
    * Other FPGA vendors (Microchip)
* Additional verification
  * Exploration of core-v-verif
* Increased board/platform support

## Who would make use of OpenHW output
Potential users of this project would include both academic and industry users.

### Academics
For academics, both FPGA-focused researchers, and more generally, computer architecture/systems researchers can benefit from this work.

Advantages include:
* Open-source nature
* FPGA-optimized
* Potential for custom instruction / accelerator research
* Facilitates research into more complex systems
  * Multicore/Asymmetric
  * Heterogenous

### Industry
Advantages Taiga has for industry uses:
 * Cross vendor support
 * FPGA-optimized
 * Higher performance, performance/resource compared to existing soft-processors
 * Highly extendable through 1st class custom instruction support


## Initial Estimate of Timeline
Most key components already exist outside of: additional verification, Linux bring-up and debug support.  We could see a possible release this fall (October - November) with the Linux bring-up and debug support arriving later in the winter or early spring (February - May).

## Explanation of why OpenHW should do this project
Taiga is currently, to the best of our knowledge, the highest performance (measured in application runtime) soft-processor for FPGAs.  It is also highly competitive in performance/resource compared to existing soft-processor designs.

While OpenHW currently has a range of ASIC-optimized RISC-V cores, it does not have any specifically targeting FPGAs.  Due to the more limited building blocks of FPGAs, ASIC-optimized designs often do not map well to FPGAs.  This is particularly the case for memory blocks and multiplexer usage.  In order to target a design for FPGAs, these constraints should be applied during the initial design phase for best results.  

As a simple comparison with existing OpenHW IP, Taiga has an operating frequency over 2.5x higher than the CV32E40P on a Xilinx FPGA, while at the same time providing high per-cycle instruction throughput.  Having an FPGA-optimized design in the OpenHW ecosystem will open up new use cases for designs not targeting ASICs.

## Industry landscape: description of competing, alternative, or related efforts in the industry
Vendor provided FPGA-optimized cores, such as the MicroBlaze and Nios II are closed-source and tied to their corresponding vendor (Xilinx and Intel respectively).  This limits their usage in a wide range of cases, particularly for researchers due to their closed source nature.

Open-source, FPGA-optimized, cores are not common, even among academic researchers.  Only with the introduction of the RISC-V ISA has the number started to increase.  From our own analysis, and from experiments conducted by external, independent researchers, we believe that Taiga offers the highest performance (application runtime) of existing soft-processors on FPGAs.  Providing higher performance than other FPGA-optimized designs such as VexRISC-V and ORCA as well as the vendor cores.  Additionally, with its parallel execution units, Taiga is well positioned to allow for the exploration of custom accelerators.

## OpenHW Members/Participants committed to participate
Simon Fraser University

We welcome collaboration, particularly with any parties interested in Linux bring-up or additional verification.  Additional areas could include more industry aligned functionality such as (interrupt standards, security, etc.).

## Project Leader(s)
### Technical Project Leader(s)
Eric Matthews
### Project Manager, if a PM is designated
Eric Matthews and Lesley Shannon

## Next steps/Investigation towards Project Launch (**PC only**)
Our current plan is to begin an internal formal verification project for Taiga along with Linux bring-up and completion of RISC-V debug support.

### Internal formal verification project
This project should help in the verification of the components of the design, such as the privileged ISA, that are not well covered by existing RISC-V test frameworks.

### Linux bring-up
We plan to explore the approaches taken by both CVA6 and VexRISC-V in supporting Linux to bring-up Linux support for Taiga in both a Verilator and Xilinx FPGA environment.

### Debug support
An instruction insertion based method is being explored to support debug integration for Taiga.  An external (to Taiga) debug core has been developed with Xilinx JTAG support.  The remaining work will be within the processor to connect to the debug core.  (In an FPGA-based environment the debug core is commonly used to load programs into both local memory and DDR memory.)

### Additional verification
In general, FPGA-based soft-processors tend to be highly-configurable designs.  This leads to additional complexity in verification due to the number of possible design configurations.  For example, Taiga has many configuration options in addition to the ISA extensions it supports.  These include large flexibility in memory sources, bus protocols, and micro-architecture features.  Furthermore, we expect as Taiga develops in the future, new design variants will likely exist within Taiga itself rather than as separate core-v projects.  This approach is common for FPGA-based designs including the FPGA vendor designs.  As such, we expect verification to be an ongoing and evolving process for Taiga.  For this initial project proposal, we are planning on a Technical Readiness Level of 3 or 4.  If any other OpenHW member is interested, we welcome any collaboration in this area.  In an initial examination of the core-v-verif framework, the Phase 2 Environment (random instruction generator testing) is something we may look into running with Taiga.

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


