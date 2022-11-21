
[comment]: # "this template is for ARVM projects"

# **ARVM-Standards** Monthly Report for 21-November-2022

Project leader : Simon Davidmann   
Lead company :  Imperas  
Participating companies : OpenHW, SiLabs, Dolphin, NXP, Intrinsix 

## Overview
Defining and implementing evolving interface standards for test bench components to enable better test bench component reuse and potentially stimulate availability of compatible VIPs.  
Easing the adoption of interface to core tracer and test bench (RVVI-TRACE).  
Easing the adoption interface of test bench to Verification IP that includes the reference model (RVVI-API).  
Enabling the development of other interfaces, e.g. RVVI-VVP Virtual Verification Peripherals.   

## Current Status
Within OpenHW core verification projects, RVVI-TRACE and RVVI-API are in use in cv32e40x and cv32e40s core-v-verif testbenches to allow use of Imperas async-lock-step-compare VIPs.  
This month has seen RVVI just now starting to be used in cv32e40s.  
Existing test benches use ad-hoc virtual peripherals.  

## Key activities / tasks completed this month
- SiLabs, OpenHW, Imperas migrated cv32e40s test bench from ad-hoc to RVVI-TRACE and RVVI-API
- with this integration made several requests for enhancements to RVVI

## Planned activities / tasks for coming month
- port cv32e40pv2 core-v-verif test bench from ad-hoc to use of RVVI
- discussions with RISC-V International compliance group on RVVI-VVP (Virtual Peripherals) (collaborative paper accepted for RISC-V summit in Dec.)
- arrange OpenHW discussions on RVVI-VVP   
    the existing testbench approach of ad hoc interrupts is starting to become hard to understand and use -  
        "Disjoint control of Interrupt interface in CORE-V-VERIF"     https://github.com/openhwgroup/core-v-verif/issues/1499
    -  illustrating that standardization will be more efficient...     
 
## Issues / items that are slowing progress
- none - just starting up...


