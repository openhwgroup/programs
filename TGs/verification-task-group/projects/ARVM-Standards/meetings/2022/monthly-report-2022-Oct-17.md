
[comment]: # "this template is for ARVM projects"

# **ARVM-Standards** Monthly Report for 17-October-2022

Project leader : Simon Davidmann   
Lead company :  Imperas  
Participating companies : OpenHW, SiLabs, Dolphin, NXP, Intrinsix 

## Overview
Defining and implementing evolving interface standards for test bench components to enable better test bench component reuse and potentially stimulate availability of compatible VIPs.  
Easing the adoption of interface to core tracer and test bench (RVVI-TRACE).  
Easing the adoption interface of test bench to Verification IP that includes the reference model (RVVI-API).  
Enabling the development of other interfaces, e.g. RVVI-VVP Virtual Verification Peripherals.   

## Current Status
RVVI-TRACE and RVVI-API are in use in cv32e40x core-v-verif testbench to allow use of Imperas async-lock-step-compare VIPs.  
Existing test benches use ad-hoc virtual peripherals.  

## Key activities / tasks completed this month
- OpenHW and Imperas migrated cv32e40x test bench from ad-hoc to RVVI-TRACE and RVVI-API
- with this integration made several requests for enhancements to RVVI

## Planned activities / tasks for coming month
- port cv32e40s core-v-verif test bench from ad-hoc to use of RVVI
- arrange OpenHW discussions on RVVI-VVP
- discussions with RISC-V International compliance group on RVVI-VVP (Virtual Peripherals) (collaborative paper accepted for RISC-V summit in Dec.)

## Issues / items that are slowing progress
- none - just starting up...


