# Verification Documentation
The sub-directories below this point contain all of the verification documentation for the CORE-V family of RISC-V cores.
* **Common**: CORE-V verification documentation not specific to any one core
* **CV32E40P**: verification documentation specific to the CV32E40P core
* **CV32E40**: verification documentation specific to the CV32E40 core
# How to Write a Verification Plan (Testplan)
The CORE-V projects use spreadsheets to capture Testplans.  I know, I know, we _all_ hate spreadsheets, but they really are the best format for this type of data.  The template for the spreadsheet is simple enough that you can use either Microsoft Office Excel or LibreOffice Calc.  The key is to start with the template from the **Common** directory.
## Verification Planning
A key activity of any verification effort is to capture a Verification Plan (aka Test Plan or just testplan).  The purpose of a verification plan is to identify what features need to be verified; the success criteria of the feature and the coverage metrics for testing the feature.

A Verification Plan should focus on the **_what_**, and not the **_how_** of verification.  When capturing a testplan we are mostly interested in creating a laundry list of thing to verify.  At this stage we are not (yet) concerned with how to verify them.

The “how” part is captured in the Verification Strategy document.  That document exists to support the Verification Plan.  A trivial example is that the CV32E40P testplan requires that all RV32I instructions be generated and their results checked.  Obviously, the testbench needs to have these capabilities and its the purpose of the Verification Strategy document to explain how that is done.
## A Trivial Example: the RV32I ADDI Instruction
Let's assume your task is to verify the CV32E40P's implementation of the RV32I ADDI instruction.  Simple right?  Create a simple assembler program with a few **_addi_** instructions check the results and we're done.  Checking for the correct result (rd = rs1 + imm), is insufficent.  We also need to check:
* Overflow is detected and flagged correctly
* Underflow is detected and flagged correctly
* No instruction execution side-effects

Its also important that the instruction is fully exercised, so we also need to cover the following cases:
* Use x0..x31 as rs1
* Use x0..x31 as rd (Note: the result of this operation will always be 0x00000000 when rd is x0)
* Set/Clear all bits of immediate
* Set/Clear all bits of rs1
* Set/Clear all bits of rd

Note the simplifying assumptions made here.  With one 32-bit and one 12-bit operand there are 2,244 unique sums that can be calculated.  Including the cross-products of source and destination register yields O(10^6) unique instruction calls.  The RV32I ISA specifies 40 instructions so this gives us O(10^7) instruction executions simply to fully verify the most basic instructions in a CORE-V design.  Obviously this is impractical and fortunately it is not required.

So, specifying the Testplan for the addi instruction forces us to think about what the feature-under-test does, what we need to check to ensure its done properly and what stimulus and configuration needs to be covered to ensure the feature is tested under all penitent conditions.

The template used for this project attempts to provide an easy-to-use format to capture and review this information for every feature in the design.
