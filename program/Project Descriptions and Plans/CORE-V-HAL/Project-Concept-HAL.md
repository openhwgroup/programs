# OpenHW Project Concept Proposal: Hardware Abstraction Layer (HAL)
*The PC proposal introduces the project and explains the market drivers and the "why"* 



# Title of Project - "CORE-V HAL"
# Project Concept Proposal
## Date of proposal - 2021-06-28
## Author(s) - Vincent Cui (Alibaba)


## High Level Summary of project, project components, and deliverables
The Hardware Abstract Layer (HAL) project for Core-V-MCU aims to define and release a set of specifications for the Core-V HAL.

It also will provide a reference implementation of the specified HAL which will comprise a part of the Core-V-MCU Software Development Kit (SDK), which involves HAL driver of such peripherals Core-V-MCU supports.

By defining a HAL specification applicable to Core-V cores, we can benefit from the HAL-based SDK as follows: 
- Offer a common approach to development of driver-level software for Core-V cores in order to simplify software reuse and reduce cost;
- Make consistent system startup code for system initialization and software access to chip and board level peripherals;
- Enable software developers to develop hardware independent application code as well as firmware developers to communicate with new and customized hardware components under a consistent framework; 
- Allows end-users to tailor and extend the HAL to address their own platform requirements according to well defined procedures.

## Summary of market or input requirements

### Known market/project requirements at PC gate
- Significantly reduce cost in SoC driver development, by defining an approach to enable driver reuse according to an accepted framework;
- Make consistent the upper layer software across different SoC. This requires standard HAL APIs to isolate hardware and software resources in such a manner that makes it easy to migrate software across platforms.


| Category     	  		| Req #		| Requirement                  |
|----------	  		|------		|-----------------------------	|
| *Technical Reqmtns*	| T-1     	|HAL MUST support API for core features | 
| 			  	| T-2     	|HAL MUST support API for on-chip peripheral features | 
| 			  	| T-3     	|HAL MUST support both RTOS and bare-metal scenarios |
| 			  	| T-4     	|HAL MUST be able to support bare metal libc |
| 			  	| T-5     	|HAL MUST be able to be extended to support all CORE-V cores for the purpose of RTOS (not Linux) support |
| 			  	| T-6     	|HAL MUST support a description of the chip using a standardized syntax |
| 			  	| T-7     	|HAL SHOULD define a configuration file that can indicate to the IDE low level chip parameters such as memory space and allow it to display/read/write the registers of peripherals |
| 			  	| T-8     	|HAL MAY be able to be extended to support the CORE-V X Coprocessor Interface (CV-X-IF) |
| 			  	| T-9     	|HAL MAY be able to be extended to support the CV-VEC coprocessor | 
| *Industry Adoption Rqmtns*	| IA-1     	|HAL SHOULD be adopted/implemented for other RISC-V devices | 	
| *Specification Rqmtns*	| S-1     	|HAL Specification License for CORE-V MUST be open-source or freely licensed | 			  	| T-2     		| 
| 				| S-2     	|Proprietary extensions to the HAL Specification and Implementation, such as for custom ISA extensions or proprietary chip, MUST be supportable/allowable under open-source license|
| 				| S-3     	|HAL Specification, user documentation, and system implementation documentation for CORE-V HAL MUST be available in English |
| 				| S-4     	|HAL Specification MUST be published and managed by an industry open source or standards body, such as OpenHW, RISC-V International, or FOSSi |
| *Implementation Rqmtns* 	| IM-1     	|A complete open source reference implementation of the HAL for CORE-V MUST be a project deliverable |
| 				| IM-2     	|FreeRTOS SHOULD be supported in the open source reference implementation of HAL for CORE-V |
| 				| IM-3     	|Newlib SHOULD be supported in the open source reference implementation  of HAL for CORE-V |
| 				| IM-3     	|The HAL reference implementation for CORE-V SHOULD be published by the body publishing the Specification (see above) |
  	


### Potential future design enhancements
- Support new peripherals or other Hardware components.
- Create and provide reference designs on application areas such as Neural Network, DSP, Debug & Trace and Security.

## Who would make use of OpenHW output
CORE-V HAL will be used by firmware, middleware and application developers who are developing code supporting Core-V based hardware designs.

It will be a key component of a Core-V MCU SDK.

 
## Initial Estimate of Timeline
HALs take many years to develop. For example, Arm's CMSIS is around 15 years old. At this stage we propose a 3-month period to agree the approach and develop detailed plans for Project Launch. At that time we shall have a more accurate understanding of the deliverables and the timescale over which they can be completed.

During this 3-month period, objectives are:

- To agree the key technical requirements for a CORE-V HAL that will be re-used for all CORE-V Cores
- To agree the technical approach
- To agree the approach for specification 

Once the HAL approach is agreed, Project Launch will be sought.  Steps that will then be taken include:
   - To implement basic peripherals (UART, TIME, INT...) on CORE-V MCU.
   - To have FreeRTOS run  on CORE-V MCU in conjunction with HAL


## Explanation of why OpenHW should do this project

- The HAL is needed to establish a baseline approach for addressing the Core-V Cores and peripherals under a consistent approach. It is a cornerstone of all Core-V SDK and software work.

- There are some challenges for Core-V MCU users to develop application bases on adopted PULP SDK due to the complexity of the development configuration environment. The PULP SDK is not viewed as a basis for future development work. 

- There should be an out-of-box SDK solution offered by OpenHW supporting Core-V MCU platform developer.

- An easy-to-use SDK enhances the Core-V MCU development environment by reducing the barrier on software development and enabling to create reusable application code.

- There are some requirement from system tools (such as compiler) to help verify their design's performance and correctness using HAL SDK.

## Industry landscape: description of competing, alternative, or related efforts in the industry
There are also some similar standards in market currently, the most representative HAL is below:
   1. CMSIS for ARM cortex A and M architecture
   https://www.arm.com/why-arm/technologies/cmsis
   
   2. NMSIS for RISC-V architecture
   https://doc.nucleisys.com/nmsis/
   
   3. CSI for RISC-V architecture
   English translation is in progress
   
   4. FreeRTOS CommonIO specification https://developer.amazon.com/acs-devices

### Table showing how existing solutions map against requirements at Project Concept gate

| Items | CMSIS | NMSIS | CSI | CommonIO | 
| --- | --- | --- | --- | --- |
| Core | Support | Support | Support | Support |
| Driver | Device x13 | - | Device x 23 | |
| RTOS | FreeRTOS | - | FreeRTOS, Rhino | |
| NN | Support | Support | Support | |
| DSP | Support | Support | Support | |
| Coding Rule | MISRA | MISRA | MISRA, TUeV61508 | |
| Validation | Support | Support | Support | |
| License | Apache 2.0 | Apache 2.0 | Apache 2.0 | |
| Software pack | Support | Support | Support | |
| **Numbered Requirements**| Y/N/Maybe |  |  | |
| T1 |  |  |  |  |
| T2 |  |  |  |  |
| T3 |  |  |  |  |
| T4 |  |  |  |  |
| T5 |  |  |  |  |
| T6 |  |  |  |  |
| T7 |  |  |  |  |
| T8 |  |  |  |  |
| T9 |  |  |  |  |
| IA1 |  |  |  |  |
| S1 |  |  |  |  |
| S2 |  |  |  |  |
| S3 |  |  |  |  |
| S4 |  |  |  |  |
| IM1 |  |  |  |  |
| IM2 |  |  |  |  |
| IM3 |  |  |  |  |
| IM4 |  |  |  |  |

## OpenHW Members/Participants committed to participate
| Company | Participants or Contributor |
| --- | --- |
| Alibaba | Vincent Cui, Yunhai Shang, Linfei Chen, Zhixing Chen, Wenmeng Zhang, Devid Chen |
| CMC | Olive |


## Project Leader(s)
### Technical Project Leader(s)
* Vincent Cui
* Can we write Olive Zhao?


### Project Manager, if a PM is designated
* Can we write Yunhai Shang?


## Next steps/Investigation towards Project Launch
* Investigation of Solution Alternatives
* Comparison against requirements
* Selection of approach
* Feature specification (for S/W projects, we create Feature Specification at Project Launch)
* High level schedule/component map, assessing if initial 3 month estimate can be met
* repository needs
* Discussion of initial contribution
* Selection of industry group to publish the specification and open source reference codes
* Selection of Open Source license for both specifation and open source reference codes
* Discussion of project methodology for specification
* HAL Implementation considerations/timelinefor CORE-V MCU project SDK
* Clarification of how HAL forms a component of SDK

