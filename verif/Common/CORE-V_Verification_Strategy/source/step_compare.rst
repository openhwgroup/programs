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
