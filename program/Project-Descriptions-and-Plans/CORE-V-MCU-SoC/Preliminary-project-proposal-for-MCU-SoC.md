# OpenHW Preliminary Project Proposal
https://mattermost.openhwgroup.org/

# Title of Project

Design and Fabrication of Core-V MCU System on Chip
 
## Summary of project

This project builds upon the OpenHW CV32E40P core, the core-v-mcu FPGA implementation, and embedded FPGA components to design and fabricate an evaluation SoC that will be delivered in an evaluation kit.
Key goals of this project are 
1. Get the OpenHW CV32E40P 'out there' so people can see it is real-world
2. Get it done fast because being able to see that it *really* works is a gate to adoption
3. Leverage existing work on core-v-mcu to minimize barriers to evaluation
4. Enable people to evaluate the capabilities of FDSOI
5. Incorporate eFPGA that enables people to use configurable accelerators for AI-type applications
6. Provide starting point for accelerating commercial SoC devices based on CV32E40P

The SoC to be produced is not in itself meant as a product, but it provides a proof-of-concept and evaluation device of the CV32E40P architecture in order to de-risk and accelerate others to adopt the CV32E40P in their own SoC. The Core-V MCU SoC and evaluation platform, together with the OpenHW software toolchain and IDE being developed under the SW and HW technical working groups, will provide a real-world development environment. The Core-V MCU SoC design is expected to enable an open source tools and IP ecoystem under which commercial SoC devices and their associated software applications can be rapidy brought to market. 

## Components
The project comprises two main components

### Component 1 - Design and Fabrication of the SoC Device
* Design and verification of the CV32E40P core 
    - RTL freeze targted for October
* Front end SoC design [primarily resourced by or through QuickLogic]
    - starting from core-v-mcu FPGA design
    - integrate eFPGA (logic array, fixed function blocks for accelerators, and configuration controller) from QuickLogic (exact same that was used in ETH Zurich Arnold test chip)
    - integrate technology specific elements required by ASIC implementation
        - I/O
        - Memory
        - FLL/PLL
    - ensure DFT compatibility
    - basic functional verification
* Backend SoC design [primarily respourced by CMC]
    - leading to GDS2 netlist
    - test insertion
    - external bias generator
* Wafer Fabrication
    - built on 22FDX [resourced by GLOBALFOUNDRIES]
    - several thousand devices created 
    - level of testing to be discussed
* Assembly
    - assembled in standard package with footprint that can be used with mainstream PCBs [resourced by TBD]
    - level of testing to be discussed

### Component 2- Design and Build of the Evaluation Kit
Details and start time deferred, but must be in time to meet silicon (early Q2).  Elements are:

* board based on standard form factor for microcontroller-class SoCs so that existing, readily-accessible add-on peripheral boards can be connected (e.g. Adafruit Feather, Arduino Uno, etc)
* SDK based on open source Real Time Operating System (e.g. Zephyr, FreeRTOS, etc)
* FOSS FPGA tools for the eFPGA (e.g. SymbiFlow, nexpnr, etc)
* Documentation: lightweight user guide of the device such that a competent hardware or software engineer can evaluate the device on the dev kit.

### Summary of Timeline

Target to have eval boards released to developers in early Q2 
 
* Requires being included in the GLOBALFOUNDRIES January MPW.
* Improvement vis a vis Arnold. 
* Win-win between OpenHW (prove the part) and QuickLogic (prove eFPGA use cases).

## OpenHW Members/Participants committed to participate in CORE-V MCU project

* CMC
* QuickLogic
* GLOBALFOUNDRIES

## Technical Project Leader(s) (TPLs)
* Front end: QuickLogic (TBD-- Tim Saxe until then)
* Backend: CMC
* Dev Kit: QuickLogic (TBD -- Tim Saxe until then)
* SDK: TBD
* FOSS FPGA Tools: QuickLogic (Lalit Sharma <LSharma@quicklogic.com>)

## Project Manager (PM)
Front end: QuickLogic (TBD -- Tim Saxe until then)

## Project Documents
The following project documents will be created:

* Lightweight specification for the test chip
* Lightweight user guide of the device such that a competent hardware or software engineer can write software to evaluate/measure the device capabilities.
* Lightweight datasheet include operating conditions, AC/DC parameters, basic timing information, booting instructions, pin muxing tables, register definitions, etc.
* Ideally, this documentation would be auto-created using a Sphinx-like tool.

## Summary of requirements
Create an SoC that is suitable for evaluation:

* Use CV32E40P
* Leverage existing core-v-MCU FPGA
* Same peripheral set as core-v-MCU
* eFPGA for acceleration and I/O processing
* FOSS SDK for CV32E40P
* FOSS tool chain for eFPGA
* Enable people to evaluate FDSOI

Tradeoffs

| Rank  | Item              | Quality   | Notes |
| :---: | ----------------- | :------:  | -------------------------------------- |
| 1     | CPU correctness   |  A        | |
| 2     | TTM	            |  A        | No part, no evaluation |
| 3     | Test              |  B+       | Defective parts = poor UX |
| 4     | Clock tree        |  B+       | No clock, no function |
| 5     | Peripherals       |  C        | Must perform basic functions |
| 6     | Performance       |  C        | Show the potential; let commercial implementors wring out the last MHz |
| 7     | Power             |  B        | Show the potential; let commercial implementors wring out the last microwatts |
| 8     | Area              |  C        | Volume is low, die is small so silicon cost not an issue |

### Introduction

### Initial project requirements 

### Future enhancements:
Future enhancements may include the following:

1. Validating new processor cores or significant enhancements to the current processor core(s)
2. Validating heterogeneous systems with multiple processor cores that have high degree of interaction
3. Validating new memory IP that is tightly coupled with processor cores (e.g. MRAM)
4. Validating new integration techniques that impact how the processor cores interact with the system (e.g. chiplets)
5. Validating tools enhancements that automate the modification or configuration of processor cores
6. Implementation using other fabrication processes or packaging types

## Explanation of why OpenHW should do this project
Key objectives:

1. Creates a 'proof point' for CV32E40P core to reduce risk of adoption when being used in commercialized SoCs
2. Enables interested parties to evaluate suitability of CV32E40P core
3. Demonstrates performance/power/energy-efficiency capabilities of CV32E40P on GF22FDX
4. Demonstrates how eFPGA accelerators can signficantly enhance the performance/power/energy-efficiency capabilities when tightly coupled with RISC-V processor
5. Demonstrates that OpenHW can be used to enable rapid, and inexpensive Proof-of-Concept for new IP and tools
6. Opportunity to quickly create a commercial deriviative that shows CV32E40P has real-world value

## Industry landscape: description of competing, alternative, or related efforts in the industry
* ARM: Cortex-M4
* SiFive: E Series
* CHIPS Alliance / Western Digital: TBD
* ANDES: V5 (32-bit)

### Related efforts to be described
The foundational elements of this project are described in this related effort: https://arxiv.org/pdf/2006.14256.pdf

To differentiate from the competition, marketing can stress the:

* open-source availability,
* the permissive licence scheme,
* the low exposition to export control (OpenHW Group Membership Agreement, section 4.1).

## External dependencies
- GF22 PDK: GLOBALFOUNDRIES
- standard cells libraries: Synopsys/GLOBALFOUNDRIES (need to confirm)
- memory macros: Synopsys/GLOBALFOUNDRIES (need to confirm)
- I/O: Synopsys/GLOBALFOUNDRIES (need to confirm)
- FLL or PLL: [TBD]
- eFPGA & FOSS Tools: QuickLogic
- ASIC design tools: Cadence
- dev kit: QuickLogic
- open source: GCC, LLVM
- Eclipse Foundation, Github

## List of project outputs
Cores-TG:

- Specification
- Core documentation
- Configurable RTL source code

Verification-TG:

- Test sequences
- Verification results
- Including code coverage and functional coverage
- Option: formal verification
- Verification plan
- Bug reports
- Verification report

HW-TG:

- Tested SoC assembled in package
- Dev Kit PCB with SoC mounted, power supplies, connectors and other components required to enable evaluation of the CV32E40P
- eFPGA gateware associated with accelerating added-value SW application of TensorFlow Lite for Microcontroller
- Documentation

SW-TG: 

- Full open-source SW suite (compliant with sustainable open-source solution expectactions)
- Open-source baremetal BSP compatible with dev kit
- Open source RTOS port (e.g. Zephyr or FreeRTOS)
- FOSS FPGA Tools that supports RTL-to-bitstream
- Added-value SW SDK for TensorFlow Lite for Microcontroller
- Example application of eFPGA-accelerated Tensorflow Lite for Microcontroller-created visual wake word

## TGs Impacted/Resource requirements

## OpenHW engineering staff resource plan: requirement and availability

## Engineering resource supplied by members - requirement and availability

## OpenHW marketing resource - requirement and availability

## Marketing resource supplied by members - requirement and availability

## Funding supplied by OpenHW - requirement and availability 

## Funding supplied by members - requirement and availability

## Architecture diagram
![Arnold2, arch diagram](./Arnold2-arch.png)
Architecture

## Who would make use of OpenHW output
1. Any developer and/or researcher that wants to commercialize an implementation of the CV32E40P core, be it FPGA-based or in an new SoC.  This could include an OEM, a semiconductor company, etc.
2. Any developer and/or researcher that is interested in evaluating the performance and power tradeoffs of an SoC implementation on FDSOI processes
3. Any developer and/or researcher that wants to develop AI-based applications using a hybrid RISC-V/eFPGA implementation
4. Current OpenHW Group Members
5. Future OpenHW Group ActiveProjects

## Project license model
The project artefacts and outputs will be licensed under Apache 2.0 for SW code and Solderpad 2.0 for HW/RTL codes.

Third-party open-source contributions will generally retain their own licence model. The starting point is the open source core-v-MCU FPGA emulation, but the nature of ASIC PDKs, libraries and IPs means that the ASIC version will not be open. Modifications to core-v-MCU RTL will be made available to the core-v-MCU FPGA repo. SDK and FOSS FPGA tools for the SoC will be open source.  The Dev Kit design files will be open source.  

"Viral" licences, such as GPL, will be avoided.  To the extent possible, all open source licenses should be permissive.

## Description of initial code contribution, if required
The existing code contribution will be come from a combination of the OpenHW group, the RTL that is able to be distributed publicy from ETH Zurich Github repository, and the FOSS Tools from the QuickLogic Github repository.

## Repository Structure
* TBD

## Project distribution model
* OpenHW GitHub Repository

## Preliminary Project plan


