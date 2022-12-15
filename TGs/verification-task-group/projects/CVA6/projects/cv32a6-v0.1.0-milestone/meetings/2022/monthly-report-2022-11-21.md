[comment]: # "this template is for core verification projects"

# cv32a6 v0.1.0 milestone (formerly known internally as step1) Monthly Report for 21-November-2022

## Overview
Project Focus :  cv32a6-v0.1.0 milestone  
Verification project leader : Jean-Roch Coulon   
Lead company :  Thales   
Target date verification complete (RTL Freeze) :  depend on allocated resources   
Target verification quality level : TRL5 white box   
Verification approach being used : compare trace file     
Reference model used :  spike    
Test Generator used :  riscv-dv   
Formal approach : none   

## Current Status
Core revision version being tested :  cva6/cv32a6_v0.1.0 branch  
User’s guide : https://cv32a6-step1.readthedocs.io/en/latest/index.html  
Design Verification plan :  https://core-v-verif.readthedocs.io/en/latest/index.html  
Test bench (link GitHub) :   https://github.com/openhwgroup/core-v-verif/tree/cva6/dev/cva6/   
Functional coverage code created completeness (%) : not yet available  
Formal / simulation assertions written completeness (%) : not yet available  

## Key activities / tasks completed this month
- [Discussion on going] Proposed maturity levels with metrics, TRL4 and TRL5  
- [Discussion on going] Verification step-by-step strategy  
     Step1 to verify cv32a6 user’s guide – TRL4  
     Step2 to verify cv32a6 RTL as white box – TRL5  
     Step3 to verify cv64a6 – TRL5  
- User’s guide :  
     Merged ISA and AXI, call for reviewers  
     ISA/CSR/AXI/CVXIF done, Exceptions/MMU/MPU to be done - 55% of completeness  
- Design Verification Plan :  
     Merged AXI. ISA in progress.  
     AXI/CVXIF done, ISA/CSR/Exceptions/MMU/MPU to be done - 40% of completeness  
- VPTOOL : Add export markdown feature  

## Planned activities / tasks for coming month  
- Continue core specification and dvplan edition  
- Test termination PR to be submitted, aligned on HTIF protocol  
- Memory access information to be added to RVFI  

## Issues / items that are slowing progress  
- AXI Agent active part to be revisited  

## Risks
- to project timescales   
     Timescales depend on allocated resources  
- to project quality   
     X  

 