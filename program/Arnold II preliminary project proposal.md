# OpenHW Preliminary Project Proposal
https://mattermost.openhwgroup.org/

# Title of Project

Design and Fabrication of Core-V MCU System on Chip (ARNOLD II)
 


## Summary of project

This project builds upon the OpenHW CV32E40P core, the core-v-mcu FPGA implementation, and embedded FPGA components to design and fabricate an evaluation device and an evaluation kit.
Key aspects of this design are 
- Low Power/Energy Efficiency
- Re-use of Pulpissimo architecture with certain modifications
- A configurable accerlator that can be tuned for special applications (machine learning, etc.)
- A device that targets the following (what do we want to say)
-- power
-- performance
-- energy efficiency)
- Fabrication on the 22FDX process of Global Foundries

The SoC to be produced is not in itself meant as a product, but it provides a proof-of-concept and evaluation device of the CV32E40P architecture. 
Together with the OpenHW software toolchain and IDE being developed under the SW and HW groups, the Core-V MUC SoC and evaluation platform provide a real-world development environment.
The Core-V MCU SoC design is expected to enable a open source ecoystem under which commercial SoC devices can be rapidy brought to market. 


The project comprises two main components

Component 1 - Design and Fabrication of the SoC Device

Design and verification of the core 
- assumed ready now

FRONT end SoC design
- eFPGA from Quicklogic (accelerator). Allows field upgradeable (commercial, military). Also wearable devices
- Design of the SoC - based on Core-V MCU (updated Pulpissimo with last core) 
-- key question: Peripheral connection model (uDMA vs AHB bus - does the OBI developed in CV32 which facilitates AHB connection need to be used)
* Sep 21 keep uDMA

-- shall we increase the SRAM (or MRAM for low power, density) or other compared to Arnold (512 kbyte)? Probably go to 1MByte. **What is the size/cost target of the device**
* Sep 21 should we move to MRAM with 100MHz memory access (smaller but slower, non volatile) (ok for TensorFlow but not critical performance)?
* Or dual memory architecture
- Verification: intermediate level of quality, this is not a  
--> assumed to be resourced primarily by QuickLogic

Backend SoC design
- leading to GDS2 netlist
--> assumed to be resourced primarily by CMC
- 
- test insertion
- on chip vs external body bias generator

Fabrication
- several thousand prototype
- 22FDX Global Foundries
- level of testing to be discussed


Component 2- Design and Build of the Evaluation Kit
- board 
- SDK
- customer can program the fpga to tune the accelerator



### Summary of Timeline

Fab submission in 2021 early part would be a preliminary goal. Market drivers - important to have devices in customers hands in mid 2021. Improvement vis a vis Arnold. Win-win between OpenHW (prove the part) and QuickLogic


## OpenHW Members/Participants committed to participate in CORE-V IDE project

CMC
Quicklogic
Global Foundries

## Technical Project Leader(s) (TPLs)

## Project Manager (PM)

## Project Documents
The following project documents will be created:



## Summary of requirements

* level of peripheral verification
-- core should be same industrial quality
-- what about peripherals such as I^2C - do they need the same level of verification


* Put the key "product manager" requirements in this section. More detailed technology choices can be outsourced to a requirements document

* fabrication requirements
- timing, area --> what is important. E.g. to what extent is performance a key goal. TWG should weigh in.

### Introduction

### Initial project requirements 

### Future enhancements:


## Explanation of why OpenHW should do this project

## Industry landscape: description of competing, alternative, or related efforts in the industry

### Related efforts to be described

## External dependencies
- onchip bias from Global Foundries
- MRAM memory? 
- standard cells libraries and memory macros (Synopsis)
- tools coming from Cadence
- FLL or PLL: does this come from ETHZ? All involved: Global Foundries, Cadence, ETHZ

## List of project outputs

## TGs Impacted/Resource requirements

## OpenHW engineering staff resource plan: requirement and availability

## Engineering resource supplied by members - requirement and availability

## OpenHW marketing resource - requirement and availability

## Marketing resource supplied by members - requirement and availability

## Funding supplied by OpenHW - requirement and availability 

## Funding supplied by members - requirement and availability

## Architecture diagram

## Who would make use of OpenHW output

## Project license model

FPGA from Quicklogic - proprietary, with open tools
RTL - open source
GDS2 - likely not open source (check with Rick)

Assumption that only MCU level changes would be on Github

(Concern from foundries about permissive licensing may prevent Global Foundries from open sourcing any aspect.
Even if they did open source would be only the PDK, but Synposis etc. wouldn't agree anyway)



## Description of initial code contribution, if required

## Repository Structure

## Project distribution model

## Preliminary Project plan


