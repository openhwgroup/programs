# Verification Plans

This directory contains all Verification Plans for all CORE-V cores.

Refer to the co-locted VerificationPlanning101.md for a description of the philosophy and implementation of CORE-V verification plans.

The subdirectories are split into plans for each CORE-V and a set of plans for each standard RISCV-V ISA base feature or extension.  
The general idea is that all planning regarding frozen RISC-V Unprivileged Specifications should remain in this directory.
Any plans for Privileged Specification, Debug Specification or other core-specific funtionality should reside within plans with the specific core.

|Directory|Description|
|---------|-----------|
|ISA      | Common ISA functionality verification plans|
|CV32E40P | Verification plans for the CV32E40P RV32IMCZicsr_Zifencei processor |
|CV32E40X | Verification plans for the CV32E40X RV32IMACBPXZce_Zicount_Zicsr_Zifencei processor |
