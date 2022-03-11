# OpenHW Preliminary Project Launch (PPL) Proposal  - FreeRTOS implementation for Core-V

This is the PPL for the implementation of the FreeRTOS operating system for Core-V devices and reference designs.

## Summary of project

[FreeRTOS](https://www.freertos.org) is a low-complexity operating system for microcontroller and small microprocessors. It is distributed under the MIT open source license at. Key features include:

- tiny, power-saving kernel
- support for 40+ architectures
- modular libraries

This project is an implementation of FreeRTOS for the OpenHW Core-V family of devices. The primary initial target for OpenHW's implementation of FreeRTOS is the CVE4 family of embedded cores.  The *Core-V-MCU FPGA based* reference design developed for CV32E40P core will be the first target.

FreeRTOS is composed of:

- a kernel which handles scheduling and inter-task communication.
- hardware specific drivers that integrate with the kernel and use processor mechanisms such as ISRs and clock
- libraries of higher level services such as TCP/IP stack, MQTT stack, etc.

Any and all changes, if any, to the RISC-V kernel made by OpenHW for CORE-V will be upstreamed.

There is a separate FreeRTOS upstream repository, with demonstration applications for many platforms.  These are typically very simple (blink an LED) and intended to be copied as the starting point for real projects.  A medium term goal is to upstream a demonstration application for CORE-V.

### Components of the Project

The major components of this project are

- **Component 1:** to build or adapt from available open source code drivers suitable for the Core-V-MCU FPGA board
- **Component 2:** to integrate Component 1 with the kernel, and test with a simple application which excercises the basic elements of FreeRTOS
- **Component 3:** Build a demo application that excercises this functionality
- **Component 4:** Model support by Imperas OVPSim, based on the design used for the FPGA board.
- **Component 5 (TBC):** Support for the MCU SoC being developed by QuickLogic

Related projects in OpenHW will be impacted to some extent:

- **Core-V IDE**

  - The Core-V IDE project implementation should support FreeRTOS.  This will typically involve a reference project, allowing users to develop applications using the FreeRTOS task framework, drivers and libraries.

- **The CORE-V tool chain projects**

  - A version of GDB that is FreeRTOS aware will allow debugging of application tasks under FreeRTOS, rather than the kernel itself.

- **OpenOCD**

  - A variant of this which is OpenOCD aware may be needed to support GDB.  More work is needed to confirm if this is the case.

- **Verification TG**

  - How can FreeRTOS be incorporated in the verification toolset?

- **Core-V MCU-FPGA**

  - This board will be the primary target for this project.  Work on FreeRTOS may feed back to the MCU design

- **Core-V MCU-SoC**

  - This could be an additional target, and again FreeRTOS may feed back to the MCU design.

### Summary of Timeline

We identify the following stages

1. (Component 1) Kernel support, with board specific ISR and clock
2. (Component 1) C runtime setup & board initialization
3. (Component 1) Blinky application with kernel
4. (Component 1) Create and integrate UART driver
5. (Component 1) Hello World application (via termina/UART)
6. (Component 2) Integration of further drivers
7. (Component 3) Demo application implemented, details TBD
8. (Component 4) OVPSim environment for FreeRTOS
9. (Component 9) Variant FreeRTOS for MCU-SoC (TBD)

For the purpose of this preliminary proposal, the objective is to achieve Stage 3 by end 2020, with a stretch goal of achieving Stage 5 in the same time period.  We shall seek full project approval after Stage 3.

## OpenHW Members/Participants committed to participate

The following have committed to the project

- **ETH Zürich:** technical leadership, implementation of drivers/kernel
- **Embecosm:** initial implementation of drivers/kernel, development of task aware GDB.
- **CMC :** implementation of drivers/kernel and bring up application on target
- **Imperas:** OVPsim support

The following have indicated interest, but have not yet made a formal commitment

- **Ashling:** potential openOCD involvement/IDE awareness
- **QuickLogic:** variant for MCU-SoC
- **Alexander Fedorov:** RTOS aware IDE

## Technical Project Leader(s) (TPLs)

- **Robert Balas:** PhD student/employee ETH Zurich.  Will lend technical guidance on real time O/S, subject to supervisor approval and guidance (Prof Luca Benini)
- **Shteryana Shopova:** Embecosm.  Available until mid-December for general kernel/driver work.
- **Olive Zhao:** CMC.

TPL are expected to liaise with SW TG chair and OpenHW Project Office to establish project milestones, identify blocking points, and report progress against milestones

## Project Manager (PM)

Jeremy Bennett, Chair of the Software Task Group, will act as project manager during initial setup of the project, supported by OpenHW Project Office.  A matter of urgency will be to identify a dedicated Project Manager.

## Project Documents

For this premiminary project, two documents will be created.

1. A risk register (see below)
2. A spreadsheet to track initial task progress.

## Summary of requirements

1. A reference implementation of kernel and drivers for CORE-V

   - set of drivers TBD, but to include UART

2. A demonstration application to show FreeRTOS in use
3. A minimal "starter" project, which CORE-V users can use as the starting point for their own projects
4. Various OpenHW customers have requirements for a basic bare metal monitor - FreeRTOS could potentially fulfill this role

### Specific requirements

The implementation must be flexible, to use CORE-V extensions where they are available, but to still be usable when extensions are not available.

### Future enhancements

1. Support within the OVPSim environment
2. Variant to support the QuickLogic MCU-SoC

## Explanation of why OpenHW should do this project

FreeRTOS is the most widely used RTOS (see below).  Existing customers of OpenHW Group members already have investment in the technology and expect it to be available for CORE-V.

Since OpenHW Group are preparing a reference FPGA platform, OpenHW Group need to provide a reference FreeRTOS implementation for that platform. The reference FPGA platform is not complete without a software infrastructure.

## Industry landscape: description of competing, alternative, or related efforts in the industry

The [AspenCore/EE Times 2019 Embedded Markets Study](https://www.embedded.com/wp-content/uploads/2019/11/EETimes_Embedded_2019_Embedded_Markets_Study.pdf) showed that FreeRTOS was the most popular RTOS, used for 18% of current projects. No other RTOS achieved more than 6%.

For future projects, FreeRTOS was planned to be used for 27% of projects, with no other RTOS scored more than 9%.

In this study, the most popular OS for projects was Embedded Linux, but this is not suitable for MCU class devices.

Zephry has a high-profile in the RISC-V community, largely due to the efforts of Antmicro in providing implementations and support.  However it is worth noting that it doesn't even appear in the AspenCore report - it is still very new.

## External dependencies

1. Access to the upstream source code
2. Access to existing Pulpissimo work by Robert Balas (pending ETH Zürich legal approval).

## List of project outputs

## TGs impacted/resource requirements

- **CORE-V Software Task Group.**  The group which owns and manages this project.
- **CORE-V Hardware Task Group.**  As developers of the MCU-FPGA, this group is the immediate customer.
- **CORE-V Verification Task Group.**  Potential adopters of FreeRTOS for hardware verification.

## OpenHW engineering staff resource plan: requirement and availability

## Engineering resource supplied by members - requirement and availability

- A development board (Nexus A7) needs to be provided to Shteryana Shopova of Embecosm ASAP.
- Robert Balas needs to obtain permission from ETH Zürich to make his Pulpissimo work available.  In the meantime, Shteryana Shopova will start from the existing RISC-V implementation,

**Note:** Multiple FPGA platforms (Nexus A7, Genesys II) will be in use by the team.  Long time this is good for portability, short term it makes reproducing issues harder.

## OpenHW marketing resource - requirement and availability

## Marketing resource supplied by members - requirement and availability

## Funding supplied by OpenHW - requirement and availability

## Funding supplied by members - requirement and availability

## Architecture diagram

FreeRTOS is widely documented. The simplest overview is [FreeRTOS](https://www.aosabook.org/en/freertos.html) by Christopher Svec.

## Who would make use of OpenHW output

- OpenHW Group members and other CORE-V users who are already committed to FreeRTOS.
- OpenHW Group members and other CORE-V users starting new projects for which a simple RTOS is needed.

## Project license model

- The FreeRTOS kernel is distributed user the [MIT license](https://spdx.org/licenses/MIT.html), a highly permissive license.
- Users can choose any license for the drivers specific to their platform

Proposed approach:

- CORE-V specific changes to the kernel (if any) are upstreamed to FreeRTOS under MIT (analagous to the approach used for GNU tools and LLVM tools projects).
- Drivers are developed under the OpenHW/Eclipse arrangement and licensed using Apache 2.0 (thereby being compatible with projects using GPL).

There is no requirement by the upstream project for copyright license assignment.

As with other projects, there will be a need for OpenHW to obtain consent from contributors for their work to be contributed upstream *before* any contribution is accepted into OpenHW repositories.

## Description of initial code contribution, if required

- upstream baseline code
- Pulpissimo project - FreeRTOS port and drivers

## Repository Structure

- OpenHW GitHub Repositor(ies) for code development

## Project distribution model

- FreeRTOS kernel for CORE-V is upstream
- Starter project for CORE-V MCU-FPGA is upstream
- CORE-V MCU-FPGA drivers distributed as part of a complete FreeRTOS package from OpenHW

**Note:** This implies long-term obligations on OpenHW Group to maintain and support FreeRTOS, with the consequent costs.  It is also important that the commercial ecosystem for FreeRTOS is supported (Goal #1 of the SW TG).  Thus it is important that the OpenHW package is kept as simple as possible.  It may be that OpenHW Group outsource the responsibility for the long term maintenance.

## Risk Register

This will become a separate document at full project launch.

Risk is scored as likelihood (1-10) x impact (1-3) with mitigation required for any risk with score of 10 or more, of with an impact of 3 (project killer).

| Risk                          |   L |   I |   R | Mitigation                 |
|:----------------------------- | ---:| ---:| ---:|:---------------------------|
| Dedicated project manager cannot be identified, leading to project failure | 5 | 3 | 15 | Socialize around OpenHW members to identify committed Project Manager
| Insufficient resource available | 5 | 3 | 15 | Socialize around OpenHW members to find expertise/funding. |
| Engineering team have different FPGA boards, meaning that issues may be hard to reproduce | 8 | 1 | 8 |  |
| Delay in releasing Pulpissimo code from ETH Zürich | 2 | 5 | 10 | Start development using the public code base. |

## Preliminary project plan

This will become a separate document at full project launch.

The initial plan is a list of tasks, which will be tracked through a shared Google spreadsheet. The lists of tasks are.

- set up CORE-V mirror repositories
- add platform specific timer to kernel
- add platform specific ISR to kernel
- add C run-time startup
- upstream CORE-V kernel changes (if any)
- bring up "blinky" application (LED flashing)
- implement platform UART driver
- bring up "hello world" application using UART
- identify which other drivers are needed
- implement remaining drivers (1 task each)
- identify suitable demo application
- port application to FreeRTOS
- create "starter" application for upstreaming
- upstream "starter" application

All coding tasks include design, implementation and test.

As with other projects, the CORE-V repositories will include only a development branch and potentially a stable branch in the future.  The development branch will track upstream top-of-tree for the kernel and the starter application.  The intention is that all development will be in user forks, submitted as pull-requests, for merging by rebasing on the development branch.

If CORE-V maintains a package long term, it will need additional branches to manage versions.
