
[comment]: # "this template is for core verification projects"

# **CV32E40Pv2** Monthly Report for 21-November-2022

## Overview
Targeted core : CV32E40P  
Verification project leader : Xavier Aubert  
Lead company : Dolphin Design  
Target date verification complete (RTL Freeze) : 2023-03  
Target verification quality level (TRL 1-5) : 5  
Verification approach being used (self check, compare signature, compare trace file, lock-step-compare, other) : lock-step-compare  
Reference model used (Imperas, spike, spike-modified, qemu, qemu-modified, other) : Imperas  
Test Generator used (riscv-dv, Valtrix, force-riscv, other) : riscv-dv  
Formal approach (Jasper, Questa formal, Onespin, other) : OneSpin with RISC-V app for IMCFZfinxZicsrZicountZifencei + X  

## Current Status
Core revision version being tested : v2  
Core specification (link to pdf) :  [cv32e40p_v1.1.0](https://docs.openhwgroup.org/projects/cv32e40p-user-manual/en/cv32e40p_v1.1.0/)  
Verification plan / Formal Verification Plan / specification completeness (%) : 10 / 15 / 60  
Test bench (link GitHub) : [core-v-verif](https://core-v-verif-verification-strategy.readthedocs.io/en/latest/cv32_env.html#core-scoreboard)  
Functional coverage code created completeness (%) : 0  
Formal / Simulation assertions written completeness (%) : 100 / 0  

## Key activities / tasks completed this month
- First version of specification available (cv32e40p_v1.1.0)  
- Test-bench moving to RVFI support: Interrupts OK, some work still needed (Debug feature, ...)  
- First toolchain has been delivered (elw, simd8-16)  
- Checked and corrected the corev-dv generation of xcorev2p0 instructions in assembly available to date.  
- Continue debugging/correcting the bugs found by Formal Verification.  
- Formal Verification working with FPU instructions latency.  
- Started Simulation and Formal Verification Plans  

## Planned activities / tasks for coming month
- Continue with specification updates (HWLoops constraints, FPU...).  
- Continue to debug/correct the bugs found by Formal Verification.  
- Full unbounded Formal Verification runs on-going since 3weeks (80% done)  
- Continue Verification Plans.  

## Issues / items that are slowing progress
- Documentation generation with changelog and versioning.  
- OpenHW staff support seems not as responsive on E40P as on other projects (E40X/S, CVA6...).  
- Run-time for formal verification due to multiple configurations  

## Risks
- to project timescales  
None up to now.  

#
