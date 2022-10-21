# OpenHW Project Proposal
# CORE-V IDE



## Summary of project
This project proposal is for the CORE-V IDE project. CORE-V IDE will develop an open-source CORE-V version of the Eclipse CDT (C/C++ Development Tools) based IDE (Integrated Developmnent Environmnent). CORE-V IDE will provide the baseline capabilities for a C/C++ IDE suitable for both 32 and 64 bit CORE-V devices. Specific CORE-V IDEs will be able to be instantiated from the CORE-V IDE. 

In line with the Software TG primary goal of developing a thriving commercial ecosystem, this implementation is intended to be the basis on which others will develop commercial products, both open source and proprietary.

Also in keeping with a Software TG goal, any open source tools will be contributed and maintained upstream. 

CORE-V IDE builds upon Eclipse CDT 10.0, Eclipse Embedded CDT, and potentially other projects. CORE-V IDE can be thought of as an OpenHW branded layer on top of those foundation layers, which integrates CORE-V technical tools (OpenHW reference tool chain, CORE-V libraries, CORE-V debugger) to provide the capabilities for a full IDE. As versions of the CORE-V tool chain become available, they can be integrated with CORE-V IDE package. 

Note that alternative tool chains, libraries and debuggers must also be integrate-able with CORE-V IDE.

This project will provides a foundation for IDEs for all versions of CORE-V device. 
Although instantiations of the complete IDE may be specific for particular devices, the initial OpenHW distribution would be a base/foundation package for all devices. 

Note that it is thought that C/C++ is the most immediate programming language requirement for CORE-V applications. However, this project also seeks to provide underpinning for future language support in CORE-V IDE, such as Java (building on Eclipse JDT).

The present preliminary project proposal is prepared for the OpenHW TWG (Technical Working Group) meeting of August 31 2020 and has been prepared by members of the OpenHW SW TG (Software Task Group). The project proponents seek a "Preliminary Project Launch" gate approval.

Additional aspects of this project:
- The first target instantiation of the CORE-V IDE will be for the CV32E40P core implementation for the Genesis FPGA board by the OpenHW HW Group. The OpenHW HW Group is considered the "lead customer".
- A real-world application to exercise the IDE on the above target board will also need to be developed.  - 
- It is thought that IDE can be an aspect of the verification of the CORE-V RTL. 

**Summary of Timeline**

- Preliminary Project Launch (PPL) in the OpenHW Group process is proposed for end August 202s
- Project Launch (PL) in the OpenHW Group process is proposed for mid-September 2020. The project would also be launched at this time as an Eclipse Foundation process. 
- Project Plan Available (PPA) is proposed for mid-October 2020
- **First Integration at the end of 2020** with the aim to bring up a first prototype. The first prototype would enable the creation of a "hello world application."  The CORE-V IDE may be demonstratable at that point.
- As the project progresses, the intent is to release it on an ongoing basis the Eclipse Foundation cadence, i.e. 4x per year.
- The **First version to be released** could be 3Q of 2021.

## OpenHW Members/Participants committed to participate in CORE-V IDE project
1. Ashling 
2. Arsysop (Alexander Fedorov) 
3. Embecosm 
4. To be checked: Alibaba, CMC, Thales

See Section "Engineering resource supplied by members - requirement and availability" for specifics of member involvement.

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
The project team would like to explore the concept of virtual customer to help provide suggestions on feature requirements, participate in ongoing backlog grooming, and review and feedback on CORE-V IDE as it is released. It is suggested that members of the HW group can act in this role as the IDE is used with the FPGA implementation of CV32E40P


## Summary of requirements

The present document gives a present snapshot of requirements and Preliminary Project Proposal, the requirements document https://github.com/openhwgroup/core-v-sw/blob/master/planning/openhw-ide-requirement.md will be used as the reference going forward. 

### Introduction
Use case list would be useful

### Initial project requirements 

1. Support for both Linux and 64 bit Windows 
2. Supplied as a ZIPped archive...no installer needed...just extract and ready to run
3. “OpenHW IDE” splash-screen and "about" box with openHW Group graphics. 
4. Set version to v0.0.1
5. Build on latest, released Eclipse, CDT and GNU MCU  plug-ins (now known as Eclipse Embedded CDT (C/C++ Development Tools))
6. Latest Embecosm CORE-V toolchain
7. OpenOCD (Open On-Chip Debugger, with JTAG support) for CORE-V
8. Simple Eclipse project ready-to-run on Genesys 2 board (e.g. LED toggle) including Opella-LD OpenOCD launch (Opella-LD is 	Ashling's low-cost, FTDI based probe not to be confused with the existing Opella-XD)
9. OpenHW IDE getting started guide documentation with Genesys 2 board 


### Future enhancements:


10. Automating the build to “pull” all the latest components from their respective repos etc
11. Improved documentation and more board examples
12. Support for PlatformIO
12. Various improvements



## Explanation of why OpenHW should do this project

Must of industrial software development is carried out within an IDE, commonly based on either Eclipse (especially Eclipse CDT) or Microsoft Visual Studio Code (especially PlatformIO). To be considered a serious player, OpenHW Group must be able to offer an IDE based on at least one of these architectures.

We have chosen to start with Eclipse CDT and focused on the embedded use case (which could also include CVA6 applications), because:

1. We have access to the necessary expertise through our members and the Eclipse Foundation;
2. Eclipse CDT, while quite old, is still the most widely used IDE in the embedded sector; and
3. Embedded products will be the primary users of CV32E40P, the first core from OpenHW Group

This work will tie in with other OpenHW Group work developing the GNU compiler tool chain and the reference FPGA platform.





## Industry landscape: description of competing, alternative, or related efforts in the industry

### Related efforts to be described

- Eclipse CDT 
- (GNU MCU) Eclipse Embedded CDT (Describe support for existing RISC-V devices)
- Eclipse Theia
- PlatformIO (based on MS Visual Code Studio)

## External dependencies
 
The first build of CORE-V CDT builds on the following:
- Eclipse Platform 2020-09
- Eclipse CDT 10.0
- Other components from Eclipse SimRel 2020-09
- A suitable tool chain (see options below)

The CORE-V IDE will be capable of integrating with any compliant tool chain, notably GNU and Clang/LLVM. A the time of writing, the following tool chains are available:


### PULP GNU tool chain as-is

This is a research tool chain from ETHZ and U of Bologna which has the following attributes:
- It is updated often as research projects need.
- A precompiled version is available, compiled and tested from Embecosm, updated weekly.
- Drawbacks are that it is out of date (based on earlier release of GCC), doesn't meet coding standards, and lacks testing



### Standard RISC-V GNU tool chain
This is the standard RISC-V GCC tool chain whose attributes include:
- The development is hosted by the FSF (Free software foundation). It is completely up to date with GCC and binutils. There are many commits per day.
- It has no Pulp features
- A precompiled version of that toolchain is available from Embecosm and possibly others. From Embecosm, the latest version is updated weekly. The latest stable release is 10.2.0
- It is currently used in the Ashling IDE product.

### Standard Clang/LLVM tool chain
The development is hosted by the LLVM Foundation. It is completely up to date with GCC and binutils. There are many commits per day.
￼- It has no Pulp features
￼- A precompiled version of that toolchain is available from Embecosm and possibly others. From Embecosm, the latest version is updated weekly. The latest stable release is 10.0.1

### OpenHW CORE-V Reference GNU tool chain
This is a separate project in OpenHW managed within the SW TG. 
- The project starts from the standard GCC tools (FSF) and adds CORE-V instructions
- The binutils-gdb repository in OpenHW github currently has 2 branches
 - Stable (currently, this repository is a mirror of FSF).
 - Development (first commits to this repository will have support for CORE-V hardware loop)
Although support for this tool chain is not a pre-requisite, the OpenHW IDE should support it when it is available.



## List of project outputs

*Need a list of outputs, i.e.*
- *Documents to be produced*
- *Downloadable code to be produced*


## TGs Impacted/Resource requirements

The software TG will be responsible for oversight of the planning and delivery of this project.


## OpenHW engineering staff resource plan: requirement and availability

- Florian Zaruba - technical contribution and project planning
- Duncan Bees - program management oversight

## Engineering resource supplied by members - requirement and availability


1. Ashling will contribute IDE expertise and coding resources (integration of embedded CDT with tool chain, debug support).
2. Alexander Fedorov (Arsysop) will contribute overall architecture and technical leadership, release engineering, and collaboration with Eclipse IDE/CDT ecosystem.
3. Embecosm will contribute CORE-V compiler tool chain and packaging or stabilization if necessary


## OpenHW marketing resource - requirement and availability

- Initial artwork suppplied by Publitek
- No additional resource requirements yet identified

## Marketing resource supplied by members - requirement and availability
- No  resource requirements yet identified

## Funding supplied by OpenHW - requirement and availability 
- Supply of CV32 FPGA development boards to be investigated


## Funding supplied by members - requirement and availability
- No funding requirements yet identified



## Architecture diagram
*Need diagram showing SW architecture and also real-world physical setup for intended use. Action to Alexander* 

## Who would make use of OpenHW output
Refer to "Explanation of why OpenHW should do this project"

## Project license model

This project will be distributed under EPL 2.0. 
License architecture to be reviewed with EF staff.


## Description of initial code contribution, if required
Need to describe initial CQ contents.


## Repository Structure

Refer to https://github.com/openhwgroup/core-v-ide-cdt/blob/master/README.md


## Project distribution model

The project code will be distributed using an Eclipse p2 repository and an archive for each target platform.




## Preliminary Project plan


A separate project plan document will be developed to detail and sequence project activities. 
The information here is meant to provide a sketch only.
See also timeline comments in the project summary section.


1. Organization of the Project
 - OpenHW PPL
 - OpenHW PL
 - OpenHW project plan
 - Eclipse Project Initiation and initial Contribution Questionnaires
 - Kanban board for ongoing features
 - Github repo creation
 - definition of any requirements related to P2 distribution

2. Stub IDE (done)
- Core-V artwork and branding for IDE

3. Integrating the various components
- OpenHW reference GNU tools
- OpenOCD software
- Other toolchains

4. Simple hello world application to test the entire toolchain


### Longer term 
1.Simulator integration - There are many (Verilator/GDB Simulator/QEMU Simulation/OVPSim). 


