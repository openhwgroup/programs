
[comment]: # "this template is for ARVM projects"

# **ARVM-Standards** Monthly Report for 16-January-2023

Project leader : Simon Davidmann   
Lead company :  Imperas  
Participating companies : OpenHW, SiLabs, Dolphin, NXP, Intrinsix 

## Overview
Defining and implementing evolving interface standards for test bench components to enable better test bench component reuse and potentially stimulate availability of compatible VIPs.  
Easing the adoption of interface to core tracer and test bench (RVVI-TRACE).  
Easing the adoption of the interface of the test bench to Verification IP that includes the reference model (RVVI-API).  
Enabling the development of other interfaces, e.g. RVVI-VVP Virtual Verification Peripherals.   

## Current Status
Within OpenHW core verification projects, RVVI-TRACE and RVVI-API are in use in cv32e40x and cv32e40s core-v-verif testbenches to allow use of Imperas async-lock-step-compare VIPs.  
Existing test benches use ad-hoc virtual peripherals.  

## Key activities / tasks completed this month
- Several requests for enhancements to RVVI based in integration of cores with test benches
- Many public presentations that talked about using RVVI at RISC-V Summit in Dec. 2022
    - "Introduction to RISC-V Verification with the Open Standard RVVI (RISC-V Verification Interface)"
        - [Watch on YouTube](https://www.youtube.com/watch?v=JECxAFE0Yho)
    - "The Continuum of RISC-V Compliance and Verification Testing"
        - [Watch on YouTube](https://www.youtube.com/watch?v=VU9MjjprkBc) (RISC-V International Compliance, Imperas)
    - Tutorial: "Choosing Appropriate Verification Techniques for Desired RISC-V Processor Quality"
        - [Watch on YouTube](https://www.youtube.com/watch?v=c2H3iRl2WEc) (Imperas)
- started exploring HMC/OSU Wally processor as candidate to investigate RVVI enhancements for cache, MMU, TLB
    - 1 day to get RVVI tracer created from scratch
    - 1 day to get RVVI/ImperasDV integrated into testbench
    - already have un-priv RISC-V International Compliance tests running in sync-lock-step-compare co-simulation
## Planned activities / tasks for coming month(s)
- port cv32e40pv2 core-v-verif test bench from ad-hoc to use of RVVI
- discussions with RISC-V International compliance group on RVVI-VVP (Virtual Peripherals) (see paper @ RISC-V summit in Dec.2022 linked above)
- arrange OpenHW discussions on RVVI-VVP   
    the existing testbench approach of ad hoc interrupts is starting to become hard to understand and use -  
        "Disjoint control of Interrupt interface in CORE-V-VERIF"     https://github.com/openhwgroup/core-v-verif/issues/1499
    -  illustrating that standardization will be more efficient...     
- start looking at enhancements to RVVI needed for TRL5 DV of cache, MMU, TLB, ... in applications processors
## Issues / items that are slowing progress
- none


