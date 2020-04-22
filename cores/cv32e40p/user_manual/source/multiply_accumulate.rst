Multiply-Accumulate
===================

CV32E40P uses a single-cycle 32-bit x 32-bit multiplier with a 32-bit
result. All instructions of the RISC-V M instruction set extension are
supported.

The multiplications with upper-word result (MSP of 32-bit x 32-bit
multiplication), take 4 cycles to compute. The division and remainder
instructions take between 2 and 32 cycles. The number of cycles depends
on the operand values.

Additionally, CV32E40P supports non-standard extensions for
multiply-accumulate and half-word multiplications with an optional
post-multiplication shift.
