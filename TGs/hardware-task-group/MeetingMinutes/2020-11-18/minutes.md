# OpenHW Group HW TG call - November 18, 2020

## Attendees:
- Hugh Pollitt-Smith
- Tim Saxe
- Davide Schiavone
- Jeremy Bennett
- Jessical Mills
- Mel Chaar
- Michael Wong
- Mike Thompson
- Olive Zhao

## Agenda
1. Update on CORE-V-MCU FPGA
2. Update on CORE-V-MCU SOC
3. New university research project: CORE-V-VEC

## Discussion

1. Update on the CORE-V MCU FPGA platform
    - RTL freeze for CV32E40P is ~1 week away after which updating the FPGA platform with latest RTL would start

2. Update on the CORE-V MCU SOC
    - Quicklogic is wrangling resources for the project, hopes to have in place by the end of the month
    - It would be great to have an open source equivalent to ARM CMSIS, which is a HAL for Cortex processors; every peripheral has register maps and can generate documentation and header files
        - There has been some chatter on this but needs motivation and vested interest ($) to develop
        - HW/SW TGs may end up defining CMSIS for RISC-V, but need resources to create; need to find someone with a vested interest ($)

3. New research project proposal (CORE-V-VEC)
    - Word of caution—the vector extension is larger than all the other extensions and the software effort may be quite large; ARM invested 100 engineer years on getting a compiler working
    - Is the OpenHW Accelerate program connected with RISC-V University Outreach? Jeremy will provide an email intro to Mel Chaar to RISC-V University Outreach, as well as the Southampton group
- Alexander Fedorov is asking for demo projects for the IDE
    - Need applications as project templates, linker scripts
    - FreeRTOS demands something a bit different from the IDE; a bare metal reference/demo is needed
    - Quicklogic looking at porting a Tensorflow Lite application from Arnold onto CORE-V-MCU
    - Need a BSP project

