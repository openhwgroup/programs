PULP Hardware Loop Extensions
=============================

To increase the efficiency of small loops, CV32E40P supports hardware
loops. Hardware loops make it possible to execute a piece of code
multiple times, without the overhead of branches or updating a counter.
Hardware loops involve zero stall cycles for jumping to the first
instruction of a loop.

A hardware loop is defined by its start address (pointing to the first
instruction in the loop), its end address (pointing to the instruction
that will be executed last in the loop) and a counter that is
decremented every time the loop body is executed. CV32E40P contains two
hardware loop register sets to support nested hardware loops, each of
them can store these three values in separate flip flops which are
mapped in the CSR address space.

The HWloop constraints are:

-  Start address of an HWLoop must be aligned

-  HWLoop body must contain at least 3 instructions

-  No Compress instructions allowed in the HWLoop body

-  The End address of the outermost HWLoop (#1) must be at least 2
   instructions further thatn the End address innermost HWloop (#0),
   i.e. HWLoop[1].endaddress >= HWLoop[0].endaddress + 8

In order to use hardware loops, the compiler needs to setup the loop
beforehand with the following instructions. Note that the minimum loop
size is two instructions and the last instruction cannot be any jump or
branch instruction.

For debugging and context switches, the hardware loop registers are
mapped into the CSR address space and thus it is possible to read and
write them via csrr and csrw instructions. Since hardware loop registers
could be overwritten in when processing interrupts, the registers have
to be saved in the interrupt routine together with the general purpose
registers.

CSR Mapping
-----------

+-------------------+-----------+------------+------------+-------------------+--------------+-------+---------------------------+
|  CSR Address                                            |                   |              |       |                           |
+-------------------+-----------+------------+------------+                   |              |       |                           |
|   11:10           |   9:8     |   7:6      |   5:0      |  Hex              | Name         | Acc.  | Decription                |
+===================+===========+============+============+===================+==============+=======+===========================+
| 01                | 11        | 10         | 110000     | 0x7C0             | lpstart[0]   | R/W   | Hardware Loop 0 Start     |
+-------------------+-----------+------------+------------+-------------------+--------------+-------+---------------------------+
| 01                | 11        | 10         | 110001     | 0x7C1             | lpendt[0]    | R/W   | Hardware Loop 0 End       |
+-------------------+-----------+------------+------------+-------------------+--------------+-------+---------------------------+
| 01                | 11        | 10         | 110010     | 0x7C2             | lpcount[0]   | R/W   | Hardware Loop 0 Counter   |
+-------------------+-----------+------------+------------+-------------------+--------------+-------+---------------------------+
| 01                | 11        | 10         | 110100     | 0x7C4             | lpstart[1]   | R/W   | Hardware Loop 0 Start     |
+-------------------+-----------+------------+------------+-------------------+--------------+-------+---------------------------+
| 01                | 11        | 10         | 110101     | 0x7C5             | lpend[1]     | R/W   | Hardware Loop 1 End       |
+-------------------+-----------+------------+------------+-------------------+--------------+-------+---------------------------+
| 01                | 11        | 10         | 110110     | 0x7C6             | lpcount[1]   | R/W   | Hardware Loop 1 Counter   |
+-------------------+-----------+------------+------------+-------------------+--------------+-------+---------------------------+

Table 6: Hardware-Loop CSR Mapping
