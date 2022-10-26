
[comment]: # "this template is for core verification projects"

# **CV32E40Pv2** Monthly Report for 17-October-2022

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
Core specification (link to pdf) :  generation on-going   
Verification plan / specification completeness (%) : 0 / 50  
Test bench (link GitHub) : [core-v-verif](https://core-v-verif-verification-strategy.readthedocs.io/en/latest/cv32_env.html#core-scoreboard)  
Functional coverage code created completeness (%) : 0  
Formal / Simulation assertions written completeness (%) : 100 / 0  

## Key activities / tasks completed this month
- Finalized instructions re-encoding in specification and RTL.  
- 2 new Hardware Loops instructions added and illegal instruction exception generation when using CSR write instructions.  
- Test-bench moved to RVFI support.  
- All RISC-V X instructions added to corev-dv.  
- All instructions are hold-bounded (no failure) on 5 configurations in Formal Verification.  
- Started to debug/correct the 18 bugs found by Formal Verification.  

## Planned activities / tasks for coming month
- Specification generation with changes !!!!!!!!!!!!!!  
Then start all remaining updates (HWLoops constraints, FPU...).  
- Continue to debug/correct the 18 bugs found by Formal Verification.  
- Update Formal Verification flow to support FPU instructions latency.  
- Launch full unbounded Formal Verification runs (0-cycle FPU latencies).  
- Start Verification Plan.  

## Issues / items that are slowing progress
- Documentation generation with changelog and versioning.  
- OpenHW staff support seems not as responsive on E40P as on other projects (E40X/S, CVA6...).  

## Risks
- to project timescales  
None up to now.  

#
