OpenHW Plan Approve Proposal Document






# Title of Project


Design and Fabrication of CORE-V MCU System on Chip (MCU project).  
 
## Summary of project




This project builds upon the OpenHW CV32E40P core, the core-v-mcu FPGA implementation, and embedded FPGA components to design and fabricate an evaluation SoC. The MCU will be at the heart of an open source tools and IP ecosystem under which commercial SoC devices and their associated software applications can be rapidly brought to market. 


The CORE-V MCU project is one of three related project:
* CORE-V MCU (this project) delivers the MCU SoC with initial testing on a bench test board with limited test software.
* CORE-V Dev-Kit delivers, manufactures and distributes a development board that integrates the MCU together with the SDK.
* CORE-V SDK delivers the out-of-box software stack to support the Dev-Kit.


These three projects together will as a whole provide a real-world development environment. 


Key aspects of the MCU project are: 
* Bring-up OpenHW CV32E40P core within an updated MCU platform on a bench test board and FPGA.
* Achieve test software bringup on FPGA and SoC implementations of the CORE-V MCU.
* Incorporate eFPGA that enables people to use configurable accelerators for AI-type applications. The eFPGA block itself is not open source, but it can be programmed using an open source tool flow that will be delivered as a component of the SDK project.
* Provide a starting point for the design of commercial SoC devices based on CV32E40P.
* The MCU is not in itself meant as a product; rather, it provides a proof-of-concept and evaluation instantiation of the CV32E40P within an MCU architecture.
* The MCU project will bring the CV32E40P IP to TRL6 from a starting point at TRL5. 
* The MCU will de-risk and accelerate others to adopt the CV32E40P in their own SoC. 






## Components
The project comprises two main components
1) - Emulation (FPGA board) Release of CORE-V MCU
2) - Design, Fabrication and Initial Test of the CORE-V MCU SoC Device


### Component 1 - Emulation Release (FPGA)


The emulation release provides a development platform for OpenHW tools developers and an initial evaluation platform for 3rd parties
* The FPGA design takes as input the completed design and verification of the CV32E40P core (Release 1.0.0 from December 2020)
* RTL Freeze version for the FPGA 
* GDS Freeze update version for FPGA
* Updated user guide for the FPGA - CMC, Quicklogic
* Prototype CORE-V MCU software based on test software used for the MCU SoC Device - Quicklogic


### Component 2 - Design and Fabrication of the SoC Device


#### 2A - Front end SoC design 


The Front-end SoC design is primarily resourced by or through QuickLogic. Key aspects
* Starting from CORE-V FPGA design.
* Integrate eFPGA (logic array, fixed function blocks for accelerators, and configuration controller) from QuickLogic 
* Integrate technology specific elements required by ASIC implementation
  * I/O
  * Memory
  * PLL
* Ensure DFT compatibility
* Basic functional verification
  * Emulation
  * Simulation






#### 2B- Backend SoC design 
The Back-end SoC design is primarily resourced by CMC
* Leading to GDS2 netlist
* External bias generator


#### 2C- Wafer Fabrication
The Wafer fabrication is at Global Foundries and is managed by CMC.
* Built on 22FDX on the 2245 shuttle run[resourced by Global Foundries]
* The MCU project will initially manufacture a limited number (50-100) devices that will be used for bring-up testing and to supply an initial batch of Dev-Kit
* Note that for the purpose of Dev-Kit manufacture, not within this project, several thousand devices will be manufactured on a shuttle run to be determined




#### 2D - MCU Chip Package Design and Assembly
The chip packaging plan is by Quicklogic.
* Packing plan will be created [Anthony Le - Quicklogic]
* Package selection - a standard package will be used [CMC - Feng]
* The chips will be assembled in standard package with footprint that can be used with mainstream PCBs 
* Package assembly will be carried out by a CMC subcontractor [CMC - Feng]
* First batch of packaged chips will be used for device characterization on Test PCB and first batch of Dev-Kit


#### 2E - Test PCB (AKA Bench Board) and Device Testing
The Test PCB design is by Quicklogic, and device characterization and testing by Quicklogic.
The manufacturing of the test PCB is by CMC.
* Testing approach within this project is based on a bench test board and chip characterization tests defined within this project
* Bench test PCB will be designed by Quicklogic [Anthony Le]
* Test PCB requirements will be documented 
* PCB Schematic design
* PCB Part selection
* PCB Layout
* PCB Manufacture
* Small volume of PCB will be manufactured by CMC subcontractor
* Initial testing of PCB without MCU will be handled by Quicklogic [Anthony Le]
* Characterization plan to test MCU within Test PCB will be written by Quicklogic [Anthony Le]
* PCB/MCU testing will be done in two phases - quick bringup testing and full characterization testing including basic software for emulation




*Move the following to DeV-Kit Project*
#### Design and Build of the Evaluation (Eval) Kit (Board + Enabling Tools and Software)
Elements are:


* Specify and design board oard based on standard form factor for microcontroller-class SoCs so that existing, readily-accessible add-on peripheral boards can be connected (e.g. Adafruit Feather, Arduino Uno, etc)
* Package and SDK based on FreeRTOS
* Enable/document the use of FOSS FPGA tools to configure the eFPGA )
* Documentation: lightweight user guide of the device such that a competent hardware or software engineer can evaluate the device on the Eval Kit.
* Develop the test methodology for the Eval Kit
    - Initial test of first run
    - Mass production (MP) testing


#### Define and Implement Distribution Model for the Eval Kit
As of PL, further discussion needed to: 
* Define the responsible person/entity for contracting manufacture
    - Board manufacture and assembly 
    - Production test
* Develop the distribution model (including cost and price aspects) for the Eval Kit






### Summary of Timeline




See PA Planning Spreadsheet for detailed breakdown


As of PA, the following major phases are identified and approximate timelines for completion are indicated as follows:


* Initial FPGA emulation as build - May 2021
* Prototype FreeRTOS/MCU integration - June 2021
* Emulation release and updated user guide for FPGA board - January 2022
* Front-End SoC Design - design finalization in November 2021
* Back-End SoC Design - November until January  2022
* Design Submission to Global Foundries - January 2022
* SoC Packaging Design - January 2022
* Final design submission deadline - mid February 2022
* Test PCB Design complete - Feb 2022
* Devices back from GF - TBD (check on this)
* PCB Manufacture and assembly complete - March 2022
* Device characterization plan complete - May 2022
* Device packaging complete - June 30 2022 (check on this)
* PCB + MCU initial bringup - July 20 2022
* PCB + MCU full characterization test result - TBD












## OpenHW Members/Participants committed to participate in CORE-V MCU project


* CMC
* QuickLogic
* GLOBALFOUNDRIES




## Technical Project Leader(s) (TPLs)
* Front end: Greg Martin (QuickLogic)
* Backend: Gayathri Singh (CMC)
* Test PCB: Anthony Le (QuickLogic) 
 (devkit)
* Test software CORE-V MCU SDK: Greg Martin (Quicklogic) 






## Project Manager (PM)
* Front end: Jasper Lin
* Back end: Hugh Pollitt-Smith




## Project Documents
The following project documents will be created:




* PA document (this document)
* Project plan spreadsheet
* CORE-V MCU  User Manual(read the docs)
* CORE-V MCU Datasheet include operating conditions, AC/DC parameters, basic timing information (*)
* Test PCB Specification
* Whole product test specification including SoC SW testing
* Verification plan
* Device characterization plan
* FPGA user guide for CORE-V MCU emulation platform
* Chip package design








Verification and Testing


Functional FPGA based SW package to do full verification of the peripherals - using as test vectors for RTL verification
"Whole Product Test" spec (SoC benchboard SW/s/w testing - preRTOS, FreeRTOS)
Static timing requirements/test logs
Logic equivalence verification, post P&R)
Characterization plan (testing first received board + chip)
        
(*) These documentation will be created as markdown documents 




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




### OpenFPGA
Reference to OpenFPGA concerning comparable initiative to open source eFPGA flow
https://openfpga.readthedocs.io/en/master/overview/motivation/




### Potentially comparable (RISC-V) industry platforms
* NXP Vega board
* SiFive: HiFive board (check if open source)






### Related efforts to be described
The foundational elements of this project are described in this related effort concerning the Arnold Device: https://arxiv.org/pdf/2006.14256.pdf


The SDK-Dev-Kit has passed Project Concept as of the CORE-V MCU Plan Approved Gate. 






## External dependencies




* GF22 PDK: GLOBALFOUNDRIES
Overview https://www.globalfoundries.com/sites/default/files/22fdx-product-brief.pdf    
- standard cells libraries: Synopsys/GLOBALFOUNDRIES 
    - memory macros: Synopsys/GLOBALFOUNDRIES 
    - I/O: Synopsys/GLOBALFOUNDRIES 
* PLL: Has been selected (QL) and request has been put in to GF (CMC) 
* eFPGA & FOSS Tools: QuickLogic
* ASIC design tools: Cadence
















## List of project outputs




Cores-TG:




* Core documentation
* Configurable RTL source code




Verification:
* Verification plan 
* Test sequences
* Functional FPGA based SW package to do full verification of the peripherals - using as test vectors for RTL verification
* Static timing requirements/test logs
* Logic equivalence verification, post P&R)
* Verification results
* Bug reports
* Verification report




HW:


* Tested SoC assembled in package
* Test PCB
* eFPGA gateware associated with accelerating added-value SW application of TensorFlow Lite for Microcontroller
* Documentation




SW: 


* Initial open-source test SW suite (compliant with sustainable open-source solution expectations)
* Open-source bare metal BSP compatible with dev kit
* Open source RTOS port (FreeRTOS)
* FOSS FPGA Tools that supports RTL-to-bitstream




Potential additional outputs (not committed):
* Added-value SW SDK for TensorFlow Lite for Microcontroller
* Example application of eFPGA-accelerated Tensorflow Lite for Microcontroller-created visual wake word




## TGs Impacted/Resource requirements


* Work is carried out by HW T




## OpenHW engineering staff resource plan: requirement and availability


* Overall architecture guidance: Florian Zaruba
* Project management coaching: Duncan Bees
* Verification coaching: Mike Thompson






## Engineering resource supplied by members - requirement and availability


* As of PA, sufficient resources are available within project companies for components other than simulation.




## OpenHW marketing resource - requirement and availability
## Marketing resource supplied by members - requirement and availability




## Funding supplied by OpenHW - requirement and availability 
n/a




## Funding supplied by members - requirement and availability
n/a




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
* The Test PCB kit design files (i.e. schematics) are open source
* The Test PCB Gerber files related to the Eval kit are open source




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














## Project distribution model
* OpenHW GitHub Repository




## Project plan
See PA spreadsheet




## ISSUES AND RISKS


* Who will  pay for the manufacture of required tests boards
* Licensing of PLL still needs to be completed
* Delivery schedule from GF of fabricated devices and timeline for packaging needs more care and attention
* Achieving handoff of front-end RTL for commencing of back-end place and route needs careful attention