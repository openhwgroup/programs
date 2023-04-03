
[comment]: # "this template is for core verification projects"

# CV32E40S Monthly Report for 17-October-2022

## Overview
Targeted core :  CV32E40S  
Verification project leader : Henrik Fegran  
Lead company :  Silicon Laboratories Inc.  
Target date verification complete (RTL Freeze) :  ~Q1 2023  
Target verification quality level (TRL 1-5) :    TRL 5  
Verification approach being used (self check, compare signature, compare trace file, lock-step-compare, other) :  formal verification, self check, compare signature, lock-step-compare  
Reference model used (Imperas, spike, spike-modified, qemu, qemu-modified, other) :  Imperas ISS  
Test Generator used (riscv-dv, Valtrix, force-riscv, other) :  riscv-dv  
Formal approach (Jasper, Questa formal, Onespin, other) : Jasper FPV, Onespin  

## Current Status
Core revision version being tested : Varies, depends on verification approach - in general latest 
Core specification (link to pdf) :  https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/  
Verification plan / specification completeness (%) : ~90% 
Test bench (link GitHub) : https://github.com/openhwgroup/core-v-verif/tree/master/cv32e40s  
Functional coverage code created completeness (%) :  ~90%  
Formal / simulation assertions written completeness (%) :  ~90%  

## Key activities / tasks completed this month
- Formal property verification work on  
   * CLIC  
   * Xsecure extension  
   * User mode  
   * PMP  
- Functional coverage work on  
   * User mode  
- Functional verification  
   * Zc directed tests  

## Planned activities / tasks for coming month
- ImperasDV integration  
- Riscv-dv updates  
- Functional coverage  
- TBD.  

## Issues / items that are slowing progress
- ImperasDV integration  

## Risks
- to project timescales    
	-- Vendor dependencies  
      * Slow progress on transition to Imperas DV  
   -- Specification changes/ratifications  
- to project quality    
	-- Low visibility/maintainability of external tools  

## Notes
- Silicon Labs is focusing verification on CV32E40S at the current point in time.   
The overlap between E40S and E40X is large, and thus little work is being done directly on the E40X core at the moment.   
Due to this, we will not be providing separate updates for that core for now.  

#
