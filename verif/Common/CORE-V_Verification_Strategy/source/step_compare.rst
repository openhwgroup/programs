Step and Compare
================
For most tests the Imperas ISS is used as the golden model, i.e. the predictor.  The ISS is used in a step and compare mode in which the ISS and RTL execution are in lock-step.  Step and compare is invaluable for debug because the ISS and RTL are executing the same instructions in a compare cycle.

The table below contans the main signals used in stepping and comparing the RTL and ISS. 

+--------------------------------+----------+------------------------------------------------------------+
|  Name                          | Type     |    Meaning                                                 |
+================================+==========+============================================================+
| step_compare_if.ovp_cpu_retire | event    | ISS has retired an instruction, triggers ev_ovp event      |
+--------------------------------+----------+------------------------------------------------------------+
| step_compare_if.riscv_retire   | event    | RTL has retired an instruction, triggers ev_rtl event      |
+--------------------------------+----------+------------------------------------------------------------+
| step_ovp     	                 | bit      | If 1, step ISS until ovp.cpu.Retire event                  |
+--------------------------------+----------+------------------------------------------------------------+
| ret_ovp	                 | bit	    | ISS has retired an instruction, wait for compare event.    |
|                                |          | Set to 1 on ovp.cpu.Retire event                           |
+--------------------------------+----------+------------------------------------------------------------+
| ret_rtl	                 | bit	    | RTL has retired an instruction, wait for compare event.    |
|                                |          | Set to 1 on riscv_tracer_i.retire event                    |
+--------------------------------+----------+------------------------------------------------------------+
| ev_ovp	                 | event    | ISS has retired an instruction                             |
+--------------------------------+----------+------------------------------------------------------------+
| ev_rtl	                 | event    | RTL has retired an instruction                             |
+--------------------------------+----------+------------------------------------------------------------+
| ev_compare	                 | event    | RTL and ISS have both retired an instruction.  Do compare. |
+--------------------------------+----------+------------------------------------------------------------+

Referring to Figure 1:

1. The simulation starts with step_rtl=1.  The RTL throttles the ISS.
2. Once the RTL retires an instruction (indicated by ev_rtl) the ISS is commanded to Step and retire an instruction (indicated by ev_ovp)
3. The testbench compares the GPR, CSR, and PC a fixed time after both the RTL and ISS have retired an instruction
4. Once the testbench performs the compare (indicated by ev_compare) step_rtl asserts and the process repeats


.. figure:: ../images/step_compare_sequence1.png
   :name: Figure 1
   :align: center
   :alt: 

   Figure 1: Step and Compare Sequencing

Step and compare is accomplished in the *uvmt_cv32_step_compare.sv* module.

Compare
----------
RTL module *riscv_tracer* flags that the RTL has retired an instruction by triggering the *retire* event.    Currently, the PC, GPRs, and CSRs are compared when the *compare* function is called. The comparison count is printed out at the end of the test. The test will cause a UVM_ERROR if the PC, GPR, or CSR is never compared, i.e. the comparison count is 0.  

GPR Comparison
~~~~~~~~~~~~~~
When the RTL retire event is triggered *<gpr>_q* may not have updated yet. For this reason RTL module *riscv_tracer* maintains queue *reg_t insn_regs_write* which contains the address and value of any GPR which will be updated. It is assumed and checked that this queue is never greater than 1 which implies that only 0 or 1 GPR registers change as a result of a retired instruction. 

If the size of queue *insn_regs_write* is 1 the GPR at the specified address is compared to that predicted by the ISS.  The remaining 31 registers are then compared. For these 31 registers, *<gpr>_q* has not updated due to the current retired instruction so *<gpr>_q* is used instead of *insn_regs_write*.

If the size of queue *insn_regs_write* is 0 all 32 registers are compared, *<gpr>_q* is used for the observed value. 

CSR Comparison
~~~~~~~~~~~~~~
When the RTL retire event is triggered the RTL CSR's will have updated and can be probed directly. At each Step the ISS will write the updated CSR registers to array *CSR* which is an array of 32-bits indexed by a string. The index is the name of the CSR, for example, mstatus. Array *CSR* is fully traversed every time function *compare* is called and compared with the relevant RTL CSR. A CSR that is not be compared can be ignored by setting bit *ignore=1*.  An example is *time*, which the ISS writes to array *CSR*.


