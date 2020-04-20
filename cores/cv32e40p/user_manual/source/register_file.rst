Register File
=============

CV32E40P has thirty-one 32-bit wide registers which form registers x1 to x31.
Register x0 is statically bound to 0 and can only be read, it does not
contain any sequential logic.

There are two flavors of register file available:

1. Latch-based

2. Flip-flop based

While the latch-based register file is recommended for ASICs, the
flip-flop based register file is recommended for FPGA synthesis,
although both are compatible with either synthesis target. Note the
flip-flop based register file is significantly larger than the
latch-based register-file for an ASIC implementation.

Latch-based Register File
-------------------------

The latch based register file contains manually instantiated clock
gating cells to keep the clock inactive when the latches are not
written.

It is assumed that there is a clock gating cell for the target
technology that is wrapped in a module called cluster_clock_gating and
has the following ports:

-  clk_i: Clock Input

-  en_i: Clock Enable Input

-  test_en_i: Test Enable Input (activates the clock even though en_i
   is not set)

-  clk_o: Gated Clock Output

FPU Register File
-----------------

In case the optional FPU is instantiated, the register file is extended
with an additional register bank of 32 registers f0-f31. These registers
are stacked on top of the existing register file and can be accessed
concurrently with the limitation that a maximum of three operands per
cycle can be read. Each of the three operands addresses is extended with
an fp_reg_sel signal which is generated in the instruction decoder
when a FP instruction is decoded. This additional signals determines if
the operand is located in the integer or the floating point register
file.

Forwarding paths, and write-back logic are shared for the integer and
floating point operations and are not replicated.
