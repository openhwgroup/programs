.. _fpu:

Floating Point Unit (FPU)
=========================

The RV32F ISA extension for floating-point support in the form of IEEE-754 single
precision can be enabled by setting the parameter **FPU** of the toplevel file
``cv32e40p_core.sv`` to 1. This will extend the CV32E40P decoder accordingly
and it will extend the ALU to support the floating-point comparisons and
classifications. The actual Floating Point Unit is instantiated outside the
CV32E40P and is accessed via the APU interface (see :ref:`apu`).
By default a dedicated register file consisting of 32
floating-point registers, ``f0``-``f31``, is instantiated. This default behavior
can be overruled by setting the parameter **PULP_ZFINX** of the toplevel
file ``cv32e40p_core.sv`` to 1, in which case the dedicated register file is
not included and the general purpose register file is used instead to
host the floating-point operands.

The latency of the individual instructions and
information where they are computed are summarized in :numref:`Overview of FP-operations`.

The FPU is divided into three parts:

1. A *simple FPU* of ~10kGE complexity, which computes FP-ADD, FP-SUB
   and FP-casts.

2. An *iterative FP-DIV/SQRT unit* of ~7 kGE complexity, which computes
   FP-DIV/SQRT operations.

3. An *FP-FMA unit* which takes care of all fused operations. This unit
   is currently only supported through a Synopsys Design Ware
   instantiation, or a Xilinx block for FPGA targets.

.. table:: Overview of FP-operations
  :name: Overview of FP-operations

  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  |   FP-Operation     |   Executed in:     |   Latency     |   Operation                    |   Information                                                                                                               |
  +====================+====================+===============+================================+=============================================================================================================================+
  | flw                | LSU                | 2             | Loads 32 to FP-RF              | Mapped to lw                                                                                                                |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fsw                | LSU                | 2             | Stores FP-operand to memory    | Mapped to sw                                                                                                                |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fmadd              | FPU                | 3             | rd = rs1 \* rs2 + rs3          |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fmsub              | FPU                | 3             | rd = rs1 \* rs2– rs3           |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fnmadd             | FPU                | 3             | rd = – (rs1 \* rs2+ rs3)       |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fnmsub             | FPU                | 3             | rd = –(rs1 \* rs2 – rs3)       |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fadd.s             | FPU                | 2             | rd = rs1 + rs2                 |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fsub.s             | FPU                | 2             | rd = rs1 – rs2                 |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fmul.s             | FPU                | 2             | rd = rs1 \* rs2                |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fdiv.s             | FPU                | 5 - 8         | rd = rs1 / rs2                 | According to precision specified in custom :ref:`csr-fprec` CSR to control the precision of FP DIV/SQRT operations          |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fsqrt.s            | FPU                | 5 - 8         | rd = sqrt(rs1)                 |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fclass.s           | ALU                | 1             | See specification              |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fmv.s.w            | ALU                | 1             | Move from int-RF to FP-RF      | Mapped to mv                                                                                                                |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fmv.w.s            | ALU                | 1             | Move from FP-RF to int-RF      |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fsgnj.s            | ALU                | 1             | Inserts sign of rs2            |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fsgnjn.s           | ALU                | 1             | Inserts negative sign of rs2   |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fsgnjx.s           | ALU                | 1             | Inserts xor of the two signs   |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | feq.s              | ALU                | 1             | (rs1 == rs2)                   | Reuses integer comparator                                                                                                   |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | flt.s              | ALU                | 1             | (rs1 < rs2)                    |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fle.s              | ALU                | 1             | (rs1 <= rs2)                   |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fmin               | ALU                | 1             | rd = min(rs1, rs2)             |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fmax               | ALU                | 1             | rd = max(rs1, rs2)             |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fcvt.x.w           | FPU                | 2             | Int to FP cast                 |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fcvt.x.wu          | FPU                | 2             | Unsigned int to FP cast        |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fcvt.w.x           | FPU                | 2             | FP to int cast                 |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
  | fcvt.wu.x          | FPU                | 2             | FP to unsigned int cast        |                                                                                                                             |
  +--------------------+--------------------+---------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+

FP CSR
------

When using floating-point extensions the standard specifies a
floating-point status and control register (:ref:`csr-fcsr`) which contains the
exceptions that occurred since it was last reset and the rounding mode.
:ref:`csr-fflags` and :ref:`csr-frm` can be accessed directly or via :ref:`csr-fcsr` which is mapped to
those two registers.

Since CV32E40P includes an iterative div/sqrt unit, its precision and
latency can be controlled via the custom :ref:`csr-fprec` CSR. This allows faster
division / square-root operations at the lower precision. By default,
the single-precision equivalents are computed with a latency of 8
cycles. The FPU CSRs are further described in :ref:`cs-registers`.

Floating-point Performance Counters:
------------------------------------

Some specific performance counters have been implemented to profile
FP-kernels.

Some hints on synthesizing the FPU
----------------------------------

The pipeline of the FPU is not balanced but it includes one pipeline
register in front of the *simple FPU* which is intended to be moved in
to the pipeline with automatic retiming commands. The same holds for the
*FP-FMA unit* which contains two pipeline registers (one in front, and
one after the unit).

Optimal performance is only achieved with retiming these two blocks.
This can for example be achieved with the “optimize\_register” command
of the Synopsys Design Compiler.
