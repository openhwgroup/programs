
# cv32e40s Monthly Report for 16-January-2023

## Overview
Targeted core : cv32e40s  (The X is not being worked on because we are working on the S)  
Verification project leader : Henrik Fegran  
Lead company : Silicon Labs  
Target date verification complete (RTL Freeze) : 2023 Q2  
Target verification quality level (TRL 1-5) : TRL5  
Verification approaches being used :
- async-lock-step-compare co-simulation (ImperasDV)
- self-checking directed tests
- non-self-checking directed tests
- constrained random
- asserts
- formal verification
- ...   

Reference model used : Imperas  
Test Generator used : riscv-dv  
Formal approach : Jasper  

## Current Status
Core revision version being tested : 0.6.0  
Core specification (link to pdf) : https://docs.openhwgroup.org/_/downloads/cv32e40s-user-manual/en/latest/pdf/  
Verification plan / specification completeness (%) : 95%  
Test bench (link GitHub) : https://github.com/openhwgroup/core-v-verif/tree/cv32e40s/dev  
Functional coverage code created completeness (%) : 80%  
Formal / simulation assertions written completeness (%) :  90%  

## Key activities / tasks completed this month
- vPlans  
	-- vPlan updates  (Zb, Debug)  
	-- Link to coverage  (PMP, Fencei, Umode)  (Revealed some holes)  
- Xsecure  
	-- Xsecure directed tests  
	-- Xsecure more assertions  
- CLIC  
	-- Directed test (for CLIC-related CSRs)  
- ISS  
	-- ImperasDV port to 40s  (new impdv infrastructure)  
	-- CLIC enable support through ImperasDV  
- Misc  
	-- Fix OBI if params  (Big UVM undertaking to support parameterized interfaces)  
	-- User-mode functional coverage  

## Planned activities / tasks for coming month
- OBI 1.5 support in core-v-verif  
- Debug testing updated to 1.0.0 spec  (easier said than done)  
- Link to coverage in vplans  
- Xsecure, bus hardening asserts  
- Riscv-DV, support for CLIC and Zc  

## Other activities
- Formal testbench in core-v-verif working again for 40s  
	-- Roadmap https://github.com/openhwgroup/core-v-verif/issues/1459  
- RVFI asserts started  (not written to be generalizable, not competing with riscv_formal)  

## Issues / items that are slowing progress

## Risks
- to project timescales    
	-- Thoroughness of the vplans  (extremely meticulous and ambitious at times)  
	-- Unwritten asserts/covers/tests  
	-- Coverage not hit  
- to project quality    
	-- Riscof  
