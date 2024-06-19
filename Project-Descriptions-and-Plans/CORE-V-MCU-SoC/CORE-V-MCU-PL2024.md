# OpenHW Project ReLaunch 2024: CORE-V MCU and CORE-V MCU Devkit 

***Part 2, PL fields:***
<!--- The PL proposal explains the "what". Some of it can be updated directly from the PC proposal
---> 
 

# Title of Project - "CORE-V CoresProject XYZ"
# Project ReLaunch Proposal: CORE-V MCU and CORE-V MCU Devkit
## Date of proposal - 2025-05-08
## Author(s) - Duncan Bees (editor), Hugh Pollitt-Smith, Mao Wang, Joe Julicher, Chris 


## Summary of project

This document describes the proposed re-launch of the CORE-V MCU project.
The original MCU project was taped-out in 2023, and the DevKit was designed and initial boards produced, but a metal layer short circuit prevented the chip from booting. The members involved have discussed options and propose to re-launch the project leading to a a new tapeout.
The MCU itself is slightly modified. The DevKit is mostly the same, but exact scope of functions is still under discussion. 

This proposal builds on top of the previous CORE-V MCU PC and PL, as well as the previous CORE-V MCU PC. Only the new mods are described in detail.


### Components of the Project

<!---Components are major project components or groups of features.
- A project may have, for example, 1-10 components.
- Components detail the "The what" at high level, not detailed level
- Components don't consider timeline.
- For example* 
  - Component 1 "Compiler changes for standard instructions." 
  - Component 2 "Compiler changes for custom instructions" 
  - Component 3 "Updates to compiler tools".
--->


The components of the project re-launch are re-design of the MCU, re-design of the DevKIt, Software, Hardware Integration

#### MCUv2 Component ####


1. Root cause determination of the 2023 tape-out failure
2. Re-design of the MCU RTL to replace the existing Quicklogic eFPGA withan updated Quicklogic eFPGA
3. Documentation of CORE-V MCU. The existing documentation still has major holes
4. Digital synthesis of the MCU and hand off to back-end designers
5. Back-end re-design including place and route, timing, and production of GDSII files
6. Export control and other paperwork for Global Foundries 
7. Initial testing of MCU prior to incurring package expense (if possible)
8. Packaging of MCU parts

#### eFPGA design tools ####
1. Collateral supporting example designs of the eFPGA - supplement to MCU document  
2. Quicklogic supported design tools and/or open source design tools. 

#### Distribution planning ####
1. Determine demand for boards by OpenHW members
2. Plan board quantities and secure manufacturing arrangements (working assumption is that GroupGets will manufacture under contract)


#### DevKitv2 Design Component ####
The DevKitv2 will not be distributed to the public, but will be made available to OpenHW members.
We need to check the list of Devkit features to ensure it is suits the purpose.

1. Feature determination
2. Update board schematic
3. Complete DevKit User Manual
4. Update bill of materials


#### Software Components ####
1. Complete integration of FreeRTOS with the SDK

#### Hardware Integration Component ####
1. Manufacture of first articles
2. Testing of first articles
3. Completion of manufacture and test. 


## Summary of market or input requirements

These use cases were identified by members in a survey in April 2024

- Education / Demos showcasing Eclipse IoT projects on CORE-V
- Demo platform for RISC-V cores for research use in Canada
- We would use it mostly for demo and R&D purposes
- Demo/verification platform for Ashling's debug tools/products
- Testing for radiation effects.
  - Evaluate electrical and radiation performances
- We would place it in the CI for FreeRTOS to ensure RISC-V continued to be fully tested.
- GroupGets would only use DevKits for sale, marketing, and distribution
- Demo platform.

To abstract the above, the use cases of the CORE-V MCU and DevKit are the following

1. Development and evaluation platform for CORE-V platform software (SDK, FreeRTOS, other OS) and application software including performance on CV32E40P
2. Testing for reliabilty/radiation/electrical performance of CORE-V MCU
3. Demo platform for OpenHW members and staff to showcase the verified core working with peripherals and software
4. Use as educational platform
5. Starting point for industrial product development based on CV32E40P and CORE-V MCU



### Known market/project requirements at PL gate

For overall experience, from the survey
- Ease of use for SDK.
- A clear on-boarding experience to inform a user how their SOC will operate when using the MCU-V2 IP.

The DevKit v1 feature set below will be used as the basis for DevKit v2, but may be refined or simplified. 

- CORE-V MCU
  - CV32E40P processor core
  - Quicklogic ArticPro 2 eFPGA (to be replaced by a smaller and more up to date eFPGA)
  - 4 MB flash memory
- Ashling Opella-LD onboard JTAG debug module
- USB-C for terminal and onboard debug access
- JTAG connector for external debug access
- Espressif AWS IoT ExpressLink Module for AWS IoT cloud interconnect
- mikroBUS onboard socket, allowing access to a vast range of mikroBUS modules
- Himax HM01B0 Ultralow Power CMOS Image Sensor
- I2C temperature sensor
- Several LEDs
- Reset button and general purpose button
- Dimensions 75 mm x 100 mm
- Power supply via USB-C or barrel connector (5V - 18V in)

SDK Features 
- Clean and well-documented SDK with examples, including both FreeRTOS and bare metal programming 




### Potential future enhancements for future project phases

- Root of Trust MCU
- CV32E40Pv2



## Who would make use of OpenHW output

In the original project, the DevKit was to be distributed to external customers using the Groupgets and Digikey channels. That objective has been removed.
The current plan is to distribute only to OpenHW members. That of course reduces the volume requirement for the DevKit. 

It will be important to estimate the quantity needed and to estimate DevKit cost accordingly. The per-board cost may be substantial given the lower volume anticipated. 



## Summary of Timeline
<!---High level view of timeline, for example timeframe for each component
--->

Rough schedule for planning purpose

 Item										| Responsible						| Target date							|      
| --------------------    					| --------------------    			| -------------------- 					|
| RTL Design Start	    					| 	QL			  					|	July 1 2024							|
| RTL integration eFPGA2, FCB, and E40	    | 	QL			  					|										|
| Simplification of TCDM if for eFPGA   	| 	QL		  						|										|
| Pinout map to SoC   	 					| 	QL		  						|										|
| Clocking/timing closure eFPGA /entire SoC | 	QL		  						|										|
| RTL-level integration testing	complete   	| 	QL		  						|										|
| RTL Synthesis	    						| (QL for V1)	  					|										|
| Handoff of Netlist to back-end team	    | (QL did for V1)  					|	end September 2024						|
| LEC 1	(RTL vs synthesis)					| CMC								|									|
| Floorplanning	(FP)						| CMC								|										|
| Initial Place and Route	(PnR)			| CMC								|										|
| Revisit Floorplanning						| CMC								|										|
| LEC3 (FP vs PnR)							| CMC								|										|
| Initial Static Timing Analysis (STA)		| CMC								|										|
| Initial Clock Tree Synthesis (CTS)		| CMC								|	end October 2024									|
| Back-annotated timing simulation			| (QL did for V1)  					|										|
| LEC4 (PnR vs CTS)							| CMC								|										|
| Timing-driven PnR							| CMC								|										|
| LEC5 (CTS vs TD-PnR)						| CMC								|										|
| LVS										| CMC								|										|
| PEX										| CMC								|										|
| Final STA									| CMC								|										|
| ECO Checkpoint							| CMC								|										|
| LVS with IO								| CMC								|										|					
| Preliminary GDS submission				| CMC								|	end November 2024									|
| DRC/DP									| CMC								|										|
| Dummy Fill								| CMC								|										|
| DRC/DFM									| CMC								|										|
| Final GDS Submission						| CMC								|	mid December 2024									|
| Receive parts from Foundry 				| 									|										|
| Parts tested and packaged					| 									|										|
| SDK Integration with FreeRTOS				| 									|										|
| MCU User Manual							| 									|										|
| DevKit User manual						| 									|										|
| DevKit first articles						| 									|										|
| DevKit to end customer (OpenHW members).	| 									|										|



## Explanation of why OpenHW should do this project
<!---What is the impact of doing/not doing this project on the OpenHW ecosystem. Why is OpenHW best suited to do this project
--->

The original MCU had fairly high demand and the initial allocation on GroupGets was sold out. 
However, without external customers, we should carefully decide if OpenHW should proceed with a limited distribution DevKit.

Advantages of doing so:
- Positive impression made on potential OpenHW members who will see live hardware with verified processor
- Spur software partners to invest in the OpenHW ecosystem
- Avoid negative impression of leaving MCU project "hanging" after MCU bringup failure
- Potential support gaps by wide distribution will be avoided
 
Cost of doing so:
- The effort of this project will be substantial regardless of number of boards distributed
- package and manufacturing costs will still be substantial




## Industry landscape: description of competing, alternative, or related efforts in the industry


## OpenHW Members/Participants committed to participate

Committed
- Quicklogic
- CMC
- University of Saskatchewan
- Ashling

Likely to participate
- AWS
- 


## Project Leader(s)
### Technical Project Leader(s)




### Project Manager, if a PM is designated

## Project Documents
### Project Planning Documents
### Project Output Documents


## List of project technical outputs
<!---This is a list of technical artifacts produced by the project
--->

### Feature Requirements
<!---Features are more granular than Components.
- For SW porting projects, this list serves as the detailed project reference for features
- For IP Cores or more complex projects, a user manual with requirements specification is produced at the PA gate, which may supersede this list of features
--->

MCU Features will not change - consult MCU User Manual



## External dependencies
<!---These are external factors on which the project depends, such as external standards ratification, external technology input, etc.
--->

## OpenHW TGs Involved
<!---Which TG will be involved, such as SW, HW, Verification, etc.
--->

## Resource Requirements
<!---This is a list of major resources/people required to implement the project and indication of whether the resources are available
--->

### Engineering resource supplied by members - requirement and availability
### OpenHW engineering staff resource plan: requirement and availability

### Marketing resource  - requirement and availability


## Architecture and/or context diagrams 
<!---Architecture (internal blocks and interconnections), and context (depiction of the the project content within its operational context), are both encouraged where appropriate to depict functionality to both subject matter experts and to non-experts
--->



## Project license model

## Description of initial code contribution, if required

## Repository Requirements

## Project distribution model

## Preliminary Project plan
<!---A full project plan is not required at PL. A preliminary plan, which can be for instance the schedule for completion of component or feature list, together with responsible resource, should be provided. Full details should be provided at PA gate.
--->

## Risk Register
<!---A list of known risks, for example external dependencies, and any mitigation strategy
--->

- The MCUv1 metal layer bug may not be the only bug causing short circuits as observed
  - To mitigate, USASK continues to work to prove that the observed short, once eliminated, removes the short circuit
 
- The original PLL was provided by Verisilicon under free license via CMC. As far as we understand, this license continues to be valid for MCU V2
  - CMC owns this issue as only they have access to the license. 
 
- Back-end design license may not be available
  - CMC and OpenHW staff are working with EDA vendors to acquire a license for the back-end work by CMC

- As there are many different components, we are vulnerable if a member decided to pull out and work on a major component like DevKit board design or SDK integration with FreeRTOS
  - Ideally we should forma  bigger team of interested OpenHW members to mitigate this risk.
  
 - Identification of Synthesis Design owner
  
  
