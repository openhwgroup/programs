
[comment]: # "this template is for core verification projects"

# cv32a6 v1.0.0 milestone (formerly known internally as step1) Monthly Report for 17-October-2022

## Overview
Project Focus :  cv32a6-v1.0.0 milestone (which does not correspond to a product)  
Verification project leader : Jean-Roch Coulon  
Lead company :  Thales  
Target date verification complete (RTL Freeze) :  depend on allocated resources  
Target verification quality level (TRL 1-5) : TRL5 white box  
Verification approach being used (self check, compare signature, compare trace file, lock-step-compare, other) : compare trace file    
Reference model used (Imperas, spike, spike-modified, qemu, qemu-modified, other) :  spike   
Test Generator used (riscv-dv, Valtrix, force-riscv, other) :  riscv-dv  
Formal approach (Jasper, Questa formal, Onespin, other) : -  

## Current Status
Core revision version being tested :  cva6/STEP1 branch  
Core specification (link to pdf) :   https://cv32a6-step1.readthedocs.io/en/latest/index.html  
Verification plan / specification completeness (%) :  https://core-v-verif.readthedocs.io/en/latest/index.html  
Test bench (link GitHub) :   https://github.com/openhwgroup/core-v-verif/tree/cva6/dev/cva6/  
Functional coverage code created completeness (%) :  on GitHub, but not yet on CI  
Formal / simulation assertions written completeness (%) :   

## Key activities / tasks completed this month
- Edited Draft of FRONTEND / AXI / CSR core specification, to be reviewed
- Edited Draft of FRONTEND / AXI dvplan, to be reviewed
- Add export markdown feature to VPTOOL
- Re-use ISACOV, 94%, some limitations to cover C extension, 3 improvements done in ISACOV
- Review of AXI agent

## Planned activities / tasks for coming month
- Continue core specification and dvplan edition
- Test termination PR to be submitted, aligned on HTIF protocol
- Exception cause information to be added to RVFI

## Issues / items that are slowing progress
- VPTOOL bugs to be fixed
- AXI Agent active part to be revisited

## Risks
- to project timescales  
	Timescales depend on resources
- to project quality  
	X

#
