[comment]: # "this template is for core verification projects"

# **CV32E40Pv2** Monthly Report for 16-January-2023

## Overview
Targeted core : CV32E40P  
Verification project leader : Xavier Aubert  
Lead company : Dolphin Design  
Target date verification complete (RTL Freeze) : 2023-06  
Target verification quality level (TRL 1-5) : 5  
Verification approach being used : async-lock-step-compare ImperasDV  
Reference model used : Imperas  
Test Generator used : riscv-dv  
Formal approach  : OneSpin with RISC-V app for IMCF_Zfinx_Zicsr_Zicount_Zifencei + X  

## Current Status
Core revision version being tested : v2  
Core specification (link to pdf) :  [cv32e40p_v1.2.0](https://docs.openhwgroup.org/projects/cv32e40p-user-manual/en/cv32e40p_v1.2.0/)  
Verification plan / Formal Verification Plan / specification completeness (%) : 70 / 95 / 80  
Test bench (link GitHub) : [core-v-verif](https://core-v-verif-verification-strategy.readthedocs.io/en/latest/cv32_env.html#core-scoreboard)  
Functional coverage code created completeness (%) : 0  
Formal / Simulation assertions written completeness (%) : 100 / 0  

## Key activities / tasks completed this month
- New version of specification available (cv32e40p_v1.2.0), including all PULP extension re-encoded and updates to HW Loops constraints.  
- Test-bench successfuly moved to RVFI support  
- Formal Verification Plan has been reviewed by Mike, and is waiting legal approval from Siemens/Onespin to be open-sourced  
- Full unbounded Formal Verification runs close to be completed (99%)  
- Simulation Verification Plan still on-going. To be reviewed in a few weeks.  

## Planned activities / tasks for coming month
- Continue with specification updates (FPU...).  
- Test-bench update to support ImperasDV methodology.  
- Continue to debug/correct the bugs found by Formal Verification.  
- Push v1.2.0 RTL to the openhw repo.  
- Finish Verification Plans.  

## Issues / items that are slowing progress
- Run-time for formal verification due to multiple configurations  

## Risks
- to project timescales  
None up to now.
  
#
