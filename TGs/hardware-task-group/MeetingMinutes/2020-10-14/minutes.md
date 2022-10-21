# Hardware TG: October 14, 2020 Meeting Notes

## Attendees
- Hugh Pollitt-Smith, CMC Microsystems (Chair)
- Tim Saxe, Quicklogic (Vice Chair)
- Duncan Bees, OpenHW Group
- Rick O'Connor, OpenHW Group
- Mike Thompson, OpenHW Group
- Jeremy Bennett, Embecosm
- Olive Zhao, CMC Microsystems
- Ary Bhattacharya, University of Southampton
- John Holden, University of Southampton

## Agenda
1. Update on CORE-V MCU FPGA platform activities
2. New Project: CORE-V MCU SoC
3. University of Southampton research project
4. Upcoming HW TG meetings


## Discussion
1. Update on CORE-V MCU FPGA platform activities
    - Add Alexander’s IDE work in the near term activities list; the IDE project is looking to HW TG as a lead customer of the IDE
        - We will want this working for hardened SOC also
        - Hugh to touch base with Alexander on next steps
    - CORE-V toolchain
        - Based on Quicklogic’s work with the Arnold chip, it would be good to standardize on the CORE-V toolchain (as opposed to PULP), build under a common umbrella
        - For the upcoming CV32E40P RTL freeze, PULP extensions will not be fully verified; some are exercised, but synthesis/regression flow disables PULP instructions
            - Goal of the SoC is use the supported features of the toolchain
        - CORE-V toolchain doesn’t use the PULP instructions currently; needs to be a plan and structured release on which PULP instructions get supported (some PULP extensions have already been made redundant with regular extensions)
        - CORE-V MCU FPGA platform is currently using the PULP runtime as a simple monitor to compile code and control peripherals; recommendation would be to quit using the runtime and work with FreeRTOS
            - Need a project to support FreeRTOS for CORE-V and FPGA/SOC platform

2. New Project: CORE-V MCU SoC
    - Based on Agenda Item 1, it would make sense to switch planned OS support from Zephyr to FreeRTOS
    - Our intent is to ensure compatibility between FPGA and SOC platforms, make seamless going from the FPGA platform to SoC
        - Code that runs on the FPGA will still run on the SOC (eFPGA would be invisible in this case)
    - How does eFPGA meet open source model?
        - eFPGA is not open source IP that would be contributed to OpenHW Group, and we’re not trying to build open source SoC; once to start to take RTL through the silicon flow, you start adding proprietary IP (tools, libraries, PDKs)
        - eFPGA provides a means to plug open source IP into a basic structure (CPU, peripherals); our intent is to provide a platform to add/demonstrate open source  IP and differentiation
        - Other aspects of the ecosystem will be open source (RTL, software toolchain)
        - We are not planning to provide chips on their own; we want to provide 1000-10000 development boards to seed a healthy developer ecosystem

3. University of Southampton research project
    - Project is a 10-week group project that is part of a Master’s course; Jeremy/Embecosm is co-supervising group pf 6 students
    - Project would add RISC-V instruction set extension for Machine Learning on the CV32E40P; intent is to modify the core as opposed to a loosely coupled accelerator
    - Ary will confirm if they can share their specification document; after project completion, it could be open sourced, but may not be maintained in future
    - Stretch goals include UVM and FPGA prototyping
    - This will be a proof-of-concept for a custom vendor extension to the CORE-V toolchain; intent is not to propose extension to RISC-V Foundation, but that would be an aspirational goal 
    - This is a good illustration of folks taking the IP from OpenHW Group and using it as a starting point to do exploratory work; we don’t yet have a formal way to identify these projects; we also need to recognize the difference between exploratory projects and commercial-grade, volume production cores (big-R/little-d versus little/no-r/big-D); _OpenHW Labs_ —need a release process for fun, speculative research projects, and clear delineation from the production-level development projects 

4. Upcoming meetings
    - Hugh will put monthly HW TG meetings in the OpenHW calendar for the 3rd Wednesday of each month: November 18, December 16, January 20, February 17, March 17, April 21, May 19

