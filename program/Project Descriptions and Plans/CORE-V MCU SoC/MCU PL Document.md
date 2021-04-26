# OpenHW Project Launch
https://mattermost.openhwgroup.org/


# Title of Project


Design and Fabrication of Core-V MCU System on Chip and Evaluation Kit
 
## Summary of project


This project builds upon the OpenHW CV32E40P core, the core-v-mcu FPGA implementation, and embedded FPGA components to design and fabricate an evaluation SoC that will be delivered in an evaluation kit.


Key goals of this project are 
1. Enable the evaluation of OpenHW CV32E40P core within an updated MCU platform
2. Achieve full software compatibility between the FPGA and SoC implementations of the CORE-V MCU
3. Incorporate eFPGA that enables people to use configurable accelerators for AI-type applications. The eFPGA block itself is not open source, but it can be programmed using an open source tool flow. 
4. Provide a starting point from system-on-chip and software perspectives for accelerating the design of commercial SoC devices based on CV32E40P


The SoC to be produced is not in itself meant as a product, but it provides a proof-of-concept and evaluation device of the CV32E40P architecture in order to de-risk and accelerate others to adopt the CV32E40P in their own SoC. The Core-V MCU SoC and evaluation platform, together with the OpenHW software toolchain and IDE being developed under the SW and HW technical working groups, will provide a real-world development environment. The Core-V MCU SoC design is expected to enable an open source tools and IP ecosystem under which commercial SoC devices and their associated software applications can be rapidly brought to market. 


## Components
The project comprises two main components


### Component 1 - Design and Fabrication of the SoC Device
* Design and verification of the CV32E40P core (Release 1.0.0 from December 2020)


* Front end SoC design [primarily resourced by or through QuickLogic]
    - starting from core-v-mcu FPGA design
    - integrate eFPGA (logic array, fixed function blocks for accelerators, and configuration controller) from QuickLogic 
    - integrate technology specific elements required by ASIC implementation
        - I/O
        - Memory
        - PLL
    - ensure DFT compatibility
    - basic functional verification
        - emulation
        - simulation
* Backend SoC design [primarily respourced by CMC]
    - leading to GDS2 netlist
    - test insertion
    - external bias generator
* Wafer Fabrication
    - built on 22FDX [resourced by GLOBALFOUNDRIES]
    - several thousand devices created 
    - Testing approach being defined in conjunction with Eval Kit testing
* Assembly
    - assembled in standard package with footprint that can be used with mainstream PCBs [resourced by TBD]
    - Tlevel of testing approach being defined in conjunction with Eval Kit testing


### Component 2 - Emulation Release and Evaluation Kits
#### Component 2A- Emulation Release

The emulation release provides a development platform for OpenHW tools developers and an initial evaluation platform for 3rd parties
* RTL Freeze version for the FPGA 
* GDS Freeze update version for FPGA
* Updated user guide for the FPGA
* Prototype CORE-V MCU SDK 


#### Component 2B- Design and Build of the Evaluation (Eval) Kit (Board + Enabling Tools and Software)
Elements are:

* Specify and design board oard based on standard form factor for microcontroller-class SoCs so that existing, readily-accessible add-on peripheral boards can be connected (e.g. Adafruit Feather, Arduino Uno, etc)
* Package and SDK based on FreeRTOS
* Enable/document the use of FOSS FPGA tools to configure the eFPGA )
* Documentation: lightweight user guide of the device such that a competent hardware or software engineer can evaluate the device on the Eval Kit.
* Develop the test methodology for the Eval Kit
    - Initial test of first run
    - Mass production (MP) testing


### Component 3 - Define and Implement Distribution Model for the Eval Kit
As of PL, further discussion needed to: 
* Define the responsible person/entity for contracting manufacture
    - Board manufacture and assembly 
    - Production test
* Develop the distribution model (including cost and price aspects) for the Eval Kit



### Summary of Timeline


See PL Planning Spreadsheet for detailed breakdown

As of PL, the following major phases are identified and approximate timelines for completion are indicated as follows:

* Front-End SoC Design - July 2021
* Back-End SoC Design - September 2021
* Design Submission to Global Foundries - September 2021
* SoC Packaging and Test - April 2022 
* PCB Design and Manufacture - May 2022

* Prototype FreeRTOS/MCU integration - June 2021
* FreeRTOS Merge - TBD
* OpenHW HAL Integration - TBD
* Initial FPGA emulation as build - May 2021
* Eval Kit S/w Integration - TBD in 2022



## OpenHW Members/Participants committed to participate in CORE-V MCU project

* CMC
* QuickLogic
* GLOBALFOUNDRIES


## Technical Project Leader(s) (TPLs)
* Front end: Tim Saxe (QuickLogic)
* Backend: Gayathri Singh (CMC)
* Eval Kit: Anthony Le (QuickLogic) )
* Prototype CORE-V MCU SDK: Greg Martin (Quicklogic) 
* CORE-V SDK: (not directly produced by this project) OpenHW SW TG 
* FOSS FPGA Tools: QuickLogic (Lalit Sharma <LSharma@quicklogic.com>)


## Project Manager (PM)
* Front end: Tim Saxe
* Back end: Hugh Pollitt-Smith


## Project Documents
The following project documents will be created:


* PL document (this document)
	* Complete Project plan document/spreadsheet
	* SoC specification/user manual (*)


* Datasheet include operating conditions, AC/DC parameters, basic timing information (*)
	* "Whole Product Test" spec (SoC/s/w testing - preRTOS, FreeRTOS)
	* Evaluation kit specification/user guide (*)
	* Evaluation kit examples/demos
	* Characterization plan (testing first received board + chip)
	
(*) This documentation will be created using a Sphinx


## Summary of requirements


Importance for the Project of Key SoC Aspects
A = high importance
B = medium importance
C = low importance


| Item              | Importance   | Notes |
| ----------------- | :------:  | -------------------------------------- |
| CPU correctness   |  A        | |
| TTM                    |  A        | No part, no evaluation |
| Test              |  B+       | Defective parts = poor UX |
| Power             |  B        | Show the potential; let commercial implementeors wring out the last microwatts |
| Peripherals       |  C        | Must perform basic functions |
| Performance       |  C        | Show the potential; let commercial implementers wring out the last MHz |
| Area              |  C        | Volume is low, die is small so silicon cost not an issue |






### Future enhancements:
Future enhancements, which are not current CORE-V MCU project goals, may include the following:


* Redesigned MCU platform for all OpenHW cores 
    - Validating new processor cores or significant enhancements to the current processor core(s)
* Validating heterogeneous systems with multiple processor cores that have high degree of interaction
    -  E.g., CV-X-IF support
* Validating new memory IP that is tightly coupled with processor cores (e.g. MRAM)
* Validating new integration techniques that impact how the processor cores interact with the system (e.g. chiplets)
* Validating tools enhancements that automate the modification or configuration of processor cores
* Implementation using other fabrication processes or packaging types


## Explanation of why OpenHW should do this project
Key objectives:


OpenHW will bring a unique value to the industry by integrating a fully verified CV32E40P core with the MCU evaluation platform, including the industry’s widest set of software tools for RISC-V devices, with mainly open-source artifacts under a permissive license scheme with low exposure to export control. This effort will greatly enable the expansion of an ecosystem around the CORE-V devices. Specifically: 


* Creates a 'proof point' for CV32E40P core to reduce risk of adoption when being used in commercialized SoCs
* Enables interested parties to evaluate suitability of CV32E40P core
* Demonstrates baseline performance/power/energy-efficiency  of CV32E40P on GF22FDX, but without optimization
* Demonstrates how eFPGA accelerators can significantly enhance the performance/power/energy-efficiency capabilities when tightly coupled with RISC-V processor
* Demonstrates that OpenHW can be used to enable rapid, and inexpensive Proof-of-Concept for new IP and tools
* Enable implementers to quickly create  commercial derivatives from CV32E40P 


## Industry landscape: description of competing, alternative, or related efforts in the industry






Potentially comparable (RISC-V) industry platforms
* NXP Vega board
* SiFive: HiFive board (check if open source)






### Related efforts to be described
The foundational elements of this project are described in this related effort concerning the Arnold Device: https://arxiv.org/pdf/2006.14256.pdf




## External dependencies


* GF22 PDK: GLOBALFOUNDRIES
    - standard cells libraries: Synopsys/GLOBALFOUNDRIES 
    - memory macros: Synopsys/GLOBALFOUNDRIES 
    - I/O: Synopsys/GLOBALFOUNDRIES 
* PLL: [TBD]
* eFPGA & FOSS Tools: QuickLogic
* ASIC design tools: Cadence








## List of project outputs


Cores-TG:


* Core documentation
* Configurable RTL source code


Verification:

* Test sequences
* Verification results
* Including code coverage and functional coverage
* Option: formal verification
* Verification plan
* Bug reports
* Verification report


HW:

* Tested SoC assembled in package
* Dev Kit PCB with SoC mounted, power supplies, connectors and other components required to enable evaluation of the CV32E40P
* eFPGA gateware associated with accelerating added-value SW application of TensorFlow Lite for Microcontroller
* Documentation


SW: 

* Full open-source SW suite (compliant with sustainable open-source solution expectations)
* Open-source bare metal BSP compatible with dev kit
* Open source RTOS port (e.g. Zephyr or FreeRTOS)
* FOSS FPGA Tools that supports RTL-to-bitstream


Potential additional outputs (not committed):
* Added-value SW SDK for TensorFlow Lite for Microcontroller
* Example application of eFPGA-accelerated Tensorflow Lite for Microcontroller-created visual wake word


## TGs Impacted/Resource requirements


* Work is carried out by HW TG, but brings in inputs from other TG
* CORE-V SDK will reply upon work completed under SW TG projects


## OpenHW engineering staff resource plan: requirement and availability

* Overall architecture guidance: Florian Zaruba




## Engineering resource supplied by members - requirement and availability

* As of PL, sufficient resources are available within project companies for components other than simulation.


## OpenHW marketing resource - requirement and availability
## Marketing resource supplied by members - requirement and availability


## Funding supplied by OpenHW - requirement and availability 
Financial model for Eval Kit production has not been clarified as of PL


## Funding supplied by members - requirement and availability
Financial model for Eval Kit production has not been clarified as of PL


## Architecture diagram
![Arnold2, arch diagram](./Arnold2-arch.png)



## Who would make use of OpenHW output
* Any developer and/or researcher that wants to commercialize an implementation of the CV32E40P core, be it FPGA-based or in an new SoC.  This could include an OEM, a semiconductor company, etc.
* Any developer and/or researcher that is interested in evaluating the performance and power tradeoffs of an SoC implementation on FDSOI processes
* Any developer and/or researcher that wants to develop AI-based applications using a hybrid RISC-V/eFPGA implementation
* Current OpenHW Group Members
* Future OpenHW Group ActiveProjects


## Project license model
The project artefacts and outputs will be licensed under Apache 2.0 for SW code and Solderpad 0.51 or Solderpad 2.0 for HW/RTL codes.


Note about open source nature of the project
* The MCU itself, i.e., the RTL code required to build the emulation, is open source, and follows the project license above
* The SoC implementation based on the MCU, which includes commercial libraries, is built out of the public domain. The following components of synthesis specifically are private:
   * PLL
   * I/O
   * Standard cell library
   * Clock gating cells
   * Memories
   * ROM
   * eFPGA core
* The resulting GDS files are proprietary
* The EVAL kit design files (i.e. schematics) are open source
* The Gerber files related to the Eval kit are open source


Note on tools used
* eFPGA tools are open source
* The Eval design tools used are for further study. Some open source tools such as KiCad are candidates
 
* Third-party open-source contributions will generally retain their own licence model. The starting point is the open source core-v-MCU FPGA emulation, but the nature of ASIC PDKs, libraries and IPs means that the ASIC version will not be open. 


"Viral" licences, such as GPL, will be avoided.  To the extent possible, all open source licenses should be permissive.


## Description of initial code contribution, if required
The existing code contribution comes from a combination of the OpenHW group, the RTL that is able to be distributed publicly from ETH Zurich Github repository, and the FOSS Tools from the QuickLogic Github repository.


## Repository Structure


The contents of core-v-mcu are:
* MCU RTL 
* MCU documentation 
* Fpga build files


The contents of core-v-mcu-eval-kit are:
* Open source source files related to Eval kit
* Eval kit binary file used for basic board test 
* Open source Gerber file
* Eval kit documentation




## Project distribution model
* OpenHW GitHub Repository


## Preliminary Project plan
See PL spreadsheet