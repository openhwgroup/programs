Step and Compare
================
For most tests the Imperas ISS is used as the golden model, i.e. the predictor.  The ISS is used in a step and compare mode in which the ISS and RTL execution are in lock-step.  Step and compare is invaluable for debug because the ISS and RTL are executing the same instructions in a compare cycle.

The table below contans the main signals used in stepping and comparing the RTL and ISS. 

+--------------------------------+----------+------------------------------------------------------------+
|  Name                          | Type     |    Meaning                                                 |
+================================+==========+============================================================+
| ev_compare	                 | event    | RTL and ISS have both retired an instruction.  Do compare. |
+--------------------------------+----------+------------------------------------------------------------+
