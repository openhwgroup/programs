TWG Meeting Report
Nov 30/2020

## TG Reports

### SW TG

Written report prepared - thanks to Jeremy:
https://github.com/openhwgroup/core-v-docs/blob/master/program/TG-reports-for-TWG/20201130-sw-tg.md

IDE - Nearing CQ. Most important issue is availability of applications. 

GNU Tools - Good progress. 
* OpenHW and any contributor having FSF copyright papers in place. This is a requirement for upstream contribution. OpenHW having copyright papers in place means i) anything owned by OpenHW Group can be contributed upstream and ii) for contributors who have difficultly getting FSF copyright papers can be seconded to OpenHW Group and contribute as OpenHW Group staff. Existing action on Duncan to get FSF copyright papers signed.

* Contributors having an agreement with OpenHW that anything they contribute to OpenHW Group repositories may subsequently be contributed upstream by OpenHW Group (giving credit to the originator). Without this, contributions would be eligible to be upstreamed, but OpenHW Group would not have permission to contribute the work upstream. Action on Duncan to create such an agreement for contributors to sign.


FSF assignment from ETH Z needs to be requested. Rick to help out. Target board needed. 

CLANG/LLVM - PPL report below

FreeRTOS - PPL report below


### HW TG
Verbal report:

CORE-V-MCU SOC – Quicklogic is putting resources in place. Need to review against original PPL plan and schedule PL.

CORE-V-VEC – Passed PPL (Nov 23). Research proposal submitted to Mitacs and feedback coming in January.

CORE-V-MUC FPGA - waiting for RTL freeze for CV32E40P core to update platform. Also anticipating using FreeRTOS as the SW development environment for CORE-V-MCU FPGA and SOC.



## PPL Proposals

### FreeRTOS 
https://github.com/openhwgroup/core-v-docs/blob/master/program/core-v-free-rtos-ppl.md

The FreeRTOS PPL proposal was prepared by a team including  Jeremy Bennett, Robert Balas, Shteryana Shopova, Olive Zhao, Duncan Bees and others.

In the PPL presentation by Jeremy, he noted
FreeRTOS is already widely used by OpenHW members and is the most popular RTOS in the world
Zephry is more widely spoken of in RISC-V world because of AntMicro – in future, we may wish to undertake support. 
Current issues:
* The Pulpissimo FreeRTOS work needs to be made available via the legal office. Offer from Rick to work with ETHZ to facilitate this. However, if this is not made available, the FreeRTOS port could start from scratch.
* Development board needs to be supplied to Shteryana – board has been sent to Bulgaria
* Simon noted that Imperas has already supported FreeRTOS for other platforms and plans to support for OpenHW when it is running on the FPGA board. So he will be added as a supporter.
** Q? why do we need the Imperas modelling if actual boards are available?
** Typically you need a s/w environment for development because of timelag, but also virtual platform has cost advantages
** Part of the testing work will be lockstep testing to ensure that simulator and platform are working identically 
* From Thales people, it was noted that they have already done implementations of FreeRTOS ON CVA6
** Jeremy: at full project launch, we can consider extending this project to 32 bit version of A6
** Sebastian can also contribute drivers for this 
* A key issue is that before PL, a project manager needs to be identified
** Requested CMC to review if Olive can possibly take this role
PPL Approved by TWG consensus





### LLVM tool chain for CORE-V
https://github.com/openhwgroup/core-v-docs/blob/master/program/llvm-toolchain-ppl.md
PPL presented by André Sintzoff

* André clarified that PPL, and not PL is requested today
* The project will rely on GNU binutils as a starting point
* Jeremy pointed out that LLVM linker is not ready to be used (this point needs clarification: Jeremy?)
* The LLVM tools will support the standard instruction set and users can add support for their own custom instructions (statement needs review)
* The project model is similar to GNU GCC tools in that it will be upstreamed to LLVM
* The available upstream windows to hit are June 2021 or Dec 2021
* We could upstream potentially both CV32 and CVA6 in first release milestone
* Discussion about need for virtual customer to design initial applications - as per many of our SW work.
* Zbigniew will get back involved in the project prior to PL
The PPL was approved by TWG consensus
