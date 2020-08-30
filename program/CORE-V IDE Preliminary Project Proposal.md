# OpenHW Preliminary Project Proposal
# CORE-V IDE



## Summary of project
This  project proposal is for the CORE-V IDE project. CORE-V IDE will develop an open-source CORE-V version of the Eclipse CDT (C/C++ Development Tools) based IDE (Integrated Developmnent Environmnent). CORE-V IDE will provide the baseline capabilities for a C/C++ IDE suitable for both 32 and 64 bit CORE-V devices. Specific CORE-V IDEs will be able to be instantiated from the CORE-V IDE. 

CORE-V IDE builds upon Eclipse CDT 10.0, Eclipse Embedded CDT, and potentially other projects. CORE-V IDE can be thought of as an OpenHW branded layer on top of those foundation layers, which integrates CORE-V technical tools (OpenHW reference tool chain, CORE-V libraries, CORE-V debugger) to provide the capabilities for a full IDE. As versions of the CORE-V tool chain become available, they can be integrated with CORE-V IDE package. 

Note that alternative tool chains, libraries and debuggers must also be integratable with CORE-V IDE.

This project will provides a foundation for IDEs for all versions of CORE-V device. 
Although instantiations of the complete IDE may be specific for particular devices, the initial OpenHW distribution would be a base/foundation package for all devices. 

Note that it is thought that C/C++ is the most immediate programming language requirement for CORE-V applications. However, this project also seeks to provide underpinning for future language support in CORE-V IDE, such as Java (building on Eclipse JDT).

The present preliminary project proposal is prepared for the OpenHW TWG (Technical Working Group) meeting of August 31 2020 and has been prepared by members of the OpenHW SW TG (Software Task Group). The project proponents seek a "Preliminary Project Launch" gate approval.

Additional aspects of this project:
- The first target instantiation of the CORE-V IDE will be for the CV32E40P core implementation for the Genesis FPGA board by the OpenHW HW Group. The OpenHW HW Group is considered the "lead customer".
- A real-world application to exercise the IDE on the above target board will also need to be developed.  - 
- It is thought that IDE can be an aspect of the verification of the CORE-V RTL. 

**Summary of Timeline**

- Preliminary Project Launch (PPL) in the OpenHW Group process is proposed for end August 2020
- Project Launch (PL) in the OpenHW Group process is proposed for mid-September 2020. The project would also be launched at this time as an Eclipse Foundation process. 
- Project Plan Available (PPA) is proposed for mid-October 2020
- **First Integration at the end of 2020** with the aim to bring up a first prototype. The first prototype would enable the creation of a "hello world application."  The CORE-V IDE may be demonstratable at that point.
- As the project progresses, the intent is to release it on an ongoing basis the Eclipse Foundation cadence, i.e. 4x per year.
- The **First version to be released** could be 3Q of 2021.

## OpenHW Members/Participants committed to participate in CORE-V IDE project
1. Ashling. Ashling will contribute IDE expertise and coding resources (integration of embedded CDT with tool chain, debug support).
2. Alexander Fedorov will contribute overall architecture and technical leadership, release engineering, and collaboration with Eclipse IDE/CDT ecosystem.
3. Embecosm will contribute CORE-V compiler tool chain and packaging or stabilization if necessary
4. To be checked: Alibaba, CMC, Thales

## Technical Project Leader(s) (TPLs)
The following persons will investigate and resolve overall technical issues related to the IDE
1. Alexander Fedorov  
2. Hugh O'Keeffe or an alternative person from Ashling  

## Project Manager (PM)
The following is tentative:
- Florian Zaruba of OpenHW staff will act as project manager
- Jeremy Bennett of Embecosm and Duncan Bees of OpenHW staff will act as project management mentors.
The project manager would be responsible, in conjuction with the TPLs, to create the project plan, collect requirements for features, track status and report status to the OpenHW TWG, and identify and resolve issues related to the successful outcome. 


## Project Documents
The following project documents will be created:
- Preliminary Project Proposal (this document)
- Project Proposal, an updated version of this document
- Project Plan
- Feature Description (initial version here: https://github.com/openhwgroup/core-v-sw/blob/master/planning/openhw-ide-requirement.md)
- Build and Delivery Description




## Virtual customer
The project team would like to expore the concept of virtual customer to help provide suggestions on feature requirements, participate in ongoing backlog grooming, and review and feedback on CORE-V IDE as it is released. It is suggested that CMC (Hugh Politt-Smith) can act in this role as the IDE is used with the FPGA implementation of CV32E40P


## Summary of requirements

The present document gives a present snapshot of requirements and Preliminary Project Proposal, the requirements document https://github.com/openhwgroup/core-v-sw/blob/master/planning/openhw-ide-requirement.md will be used as the reference going forward. 

### Introduction
Use case list would be useful

### Initial project requirements 

1. Support for 64 bit Windows only
2. Supplied as a ZIPped archive...no installer needed...just extract and ready to run
3. “OpenHW IDE” splash-screen and "about" box with openHW Group graphics. 
4. Set version to v0.0.1
5. Build on latest, released Eclipse, CDT and GNU MCU  plug-ins (now known as Eclipse Embedded CDT (C/C++ Development Tools))
6. Latest Embecosm CORE-V toolchain
7. OpenOCD (Open On-Chip Debugger, with JTAG support) for CORE-V
8. Simple Eclipse project ready-to-run on Genesys 2 board (e.g. LED toggle) including Opella-LD OpenOCD launch (Opella-LD is 	Ashling's low-cost, FTDI based probe not to be confused with the existing Opella-XD)
9. OpenHW IDE getting started guide documentation with Genesys 2 board 


### Future enhancements:

10. Adding Linux support
11. Automating the build to “pull” all the latest components from their respective repos etc
12. Improved documentation and more board examples
13. Various improvements



## Explanation of why OpenHW should do this project

The industry will require a Embedded CDT IDE tuned to CORE-V. 
- OpenHW is developing the CORE-V RTL, FPGA instantiations of the CORE-V RTL, and the s/w toolchain to support CORE-V.
- OpenHW has a close parternship with the Eclipse Foundation. 
- Building the CDT enhancements for CORE-V builds on the strengths of the OpenHW ecosystem. 

For the above reasons, OpenHW is best placed to do this needed work.

## Industry landscape: description of competing, alternative, or related efforts in the industry

### Related efforts to be described

- Eclipse CDT 
- (GNU MCU) Eclipse Embedded CDT (Describe support for existing RISC-V devices)
- Eclipse Theia

## External dependencies
 
The first build of CORE-V CDT builds on the following:
- Eclipse Platform 2020-09
- Eclipse CDT 10.0
- Other components from Eclipse SimRel 2020-09
- A suitable tool chain (see options below)

The CORE-V IDE will be capable of integration with the following tool chain options. As per the project requirements above, the main focus of the CORE-V IDE will be the OpenHW CORE-V reference toolchain.

### PULP Code Base As-Is

This is a research tool chain from ETHZ and U of Bologna which has the following attributes:
- It is updated often as research projects need.
- A precompiled version of that toolchain is available, compiled and tested from Embecosm, updated weekly.
- Drawbacks are that it is out of date (based on earlier release of GCC), doesn't meet coding standards, and lacks testing



### Standard RISC-V tool chain
This is the standard RISC-V GCC tool chain whose attributes include:
- The development is hosted by the FSF (Free software foundation). It is completely up to date with GCC and binutils. There are many commits per day.
- It has no Pulp features
- A precompiled version of that toolchain is available from Embecosm and possibly others. From Embecosm, the latest version is updated weekly. The latest table release is 10.2.0
- It is currently used in the Ashling IDE product.

### OpenHW CORE-V Reference Tool Chain
This is a separate project in OpenHW managed within the SW TG. 
- The project starts from the standard GCC tools (FSF) and adds CORE-V instructions
- The binutils-gdb repository in OpenHW github currently has 2 branches
 - Stable (currently, this repository is a mirror of FSF).
 - Development (first commits to this repository will have support for CORE-V hardware loop)




## List of project outputs

*Need a list of outputs, i.e.*
- *Documents to be produced*
- *Downloadable code to be produced*


## TGs Impacted/Resource requirements

This work will be planned and discussed in the SW TG. The project plan will be produced by the project manager with assistance of SW TG, and reviewed/approved in TWG


## OpenHW engineering staff resource plan: requirement and availability

- Florian Zaruba - technical contribution and project planning
- Duncan Bees - program management oversight

## Engineering resource supplied by members - requirement and availability

*The intent here is to write down specific time/person requirements. This is not yet available, and will be supplied in the project plan. As of Preliminary Project Proposal, the major gap identified is a resource for an initial application to test the IDE.*

## OpenHW marketing resource - requirement and availability

- Initial artwork suppplied by Publitek
- No additional resource requirements yet identified

## Marketing resource supplied by members - requirement and availability
- No  resource requirements yet identified

## Funding supplied by OpenHW - requirement and availability 
- No funding requirements yet identified


## Funding supplied by members - requirement and availability
- No funding requirements yet identified



## Architecture diagram
*Need diagram showing SW architecture and also real-world physical setup for intended use. Action to Alexander* 

## Who would make use of OpenHW output
CORE-V CDT will be used by developers created code for the following target platforms
- CV32E40P FPGA platform
- *expand/detail this list*

## Project license model

This project will be released under EPL 2.0
* Explain how the code under other licenses, such as GNU PL, will be incorporated *

## Description of initial code contribution, if required
* Explain initial source for all code contributions, and which initial code contributions will have Contribution Questionnaire generated *


## Repository Structure
* Explain the initial OpenHW repository structure and how it will be migrated to Eclipse Foundation management*.




## Project distribution model

The project code will be distributed using an Eclipse p2 repository and an archive for each target platform.

* To be discussed with Mikael Barbero and described here*


## Preliminary Project plan

The following are initial steps forming elements of a project plan. A full project plan is not yet available.

*Note, at Preliminary Project Launch we don't need a full project plan but we should enumerate key steps and timelines where available*

### Steps to First Integration at end of 2020 (not neccesarily in the following order)
1. Preliminay project proposal (this document)- Duncan Bees/SW TG members, first draft Aug 28 2020 
2. Project plan
3. OpenHW Project Approval
4. Eclipse Project Initiation and initial Contribution Questionnaires
5. CORE-V artwork for IDE (done) - Rick O'Connor/Alexander Fedorov
6. CORE-V branding text for IDE (done) - Rick O'Connor
7. Github repository structure created (done) - Jeremy Bennet /Alexander Fedorov/ Florian Zaruba 
8. Runnable stub IDE (done) - Alexander Fedorov
9. Simple hello world application to take from source to binary (not defined as yet, tester of entire toolchain). Could Sebastian from Thales help?
10. OpenHW Reference tools available - first repository created - binaries available from Embecosm
11. OpenOCD software (On Chip Debuggger) available from openOCD project, which supports RISC-V, binaries likely will be imported - Hugh O'Keeffe to comment
12. Hardware debugger connector JTAG<->USB  presumably from Ashling
13. Integration of toolchain and IDE
14. Integration of debugger to the IDE
15. Eclipse download mechanics definition 
- Assistance expected from Mikael Barbero
- Define build process using signed content for Java (presumably Eclipse Foundation)
- Define download area in Eclipse - OpenHW will organise the structure
- Write the Build and Delivery Process document
16. Setup kanban board/project backlog mechanism


### Additional steps to first downloadable version mid 2021
1. Longer term simulator integration - There are many (Verilator/GDB Simulator/QEMU Simulation/OVPSim). SW TG owns this ultimately, but not yet defined.
Remainder needs to be written down

#### Timeline 
* Needs to be sequenced and timelined in project plan*

