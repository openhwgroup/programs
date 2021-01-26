..
   Copyright (c) 2020 OpenHW Group
   
   Licensed under the Solderpad Hardware Licence, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
  
   https://solderpad.org/licenses/
  
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
  
   SPDX-License-Identifier: Apache-2.0 WITH SHL-2.0


.. _test_program_environment:

Test Program Environment (BSP)
==============================

The purpose of this chapter is to define the "programming environment" of a
test program in the CORE-V verification environments. The current version of
this document is specific to the CV32E40P. Further versions will be sufficiently
generic to encompass all CORE-V cores.

Software teams will generally use the term **Board Support Package** or 
`BSP <https://github.com/openhwgroup/core-v-verif/blob/master/cv32/bsp/README.md>`__
to refer to what this document calls the **Test-Program Environment** or TPE.  If
you are familiar with BSPs then you may consider that term interchangable with TPE
for the remainder of the discussion below.

Recall from :ref:`sim_tests` that a “test program” is set of RISC-V instructions
that are loaded into the testbench memory and executed by the core RTL model.
Test-program are typically written in C or RISC-V assembler and can be either
human or machine generated.  In either case it needs to be "aware" of the
hardware environment supported by the core and its testbench.

Illustration 9 uses the Core testbench as an example to illustrate the relationship
between the testbench (everything inside the yellow rectangle), the test program
(testcase.S) and a test program environment (crt0.S and link.ld).  The UVM
verification environment will use the same test program environment as the Core
testbench.

.. figure:: ../images/TestProgramEnvironment.png
   :name: Test_Program_Environment_Illustration
   :align: center
   :alt: 

   Illustration 9: Test Program Environment for "Core" testbench


This linkage between the test-program and hardware needs to be flexible to
support a variety of test-program sources:

- manually written assembler and C test-programs inherited from RI5CY
- test-programs from the RISC-V Foundation Compliance Test Suite
- manually written OpenHW test-programs
- machine generated test-programs from an instruction generator (e.g. riscv-dv)

Test-programs, the toolchain that translates them into machine code and the
testbench all have to be compatible with one-another.

Hardware Environment
--------------------

The testbench supports an instruction and data memory plus a set of memory mapped
virtual peripherals.  The address range for I&D memory is 0x0..0x40_0000 (4Mbyte)
for both the core and UVM testbenches.  The virtual peripherals start at address
0x1000_0000.

The addresses and sizes of the I&D memory and virtual peripheral must be compatible
with the Configuration inputs of the core (see
`Core Integration <https://core-v-docs-verif-strat.readthedocs.io/projects/cv32e40p_um/en/latest/integration.html>`__ 
in the CV32E40P User Manual. The core will start
fetching instructions from the address provided on its **boot_addr_i** input. In
addition, if debug_req_i is asserted, execution jumps to **dm_halt_addr_i**.
This hardware setup constrains the test-program in important ways:

- The entire program, including data sections and exception tables must fit in a 4Mbyte space starting at address 0.
- The first instruction of the program must be at the address defined by **boot_addr_i**.
- The address **dm_halt_addr_i** must exist in the memory map, it should not be stomped on by the test-program and there should be something there to execute that will produce a predictable result.
- The program must "know" about the addressing and function of the virtual peripherals (using the peripherals is optional).

Test-Programs
-------------

Most of our test-programs are written/generated in RISC-V assembler. A set of
global symbols are used to define control points to a linker that will generate
the machine-code in a memory image. Examples of these are **.start**,
**.vectors**, **.text**, **.data** and **.string**.  Here we will define a
minimal set of symbols for use in CORE-V test-programs. A sub-set of these will
be mandatory (e.g. **.start**), while others may be optional.

Aligning the Test-Programs to the Hardware Environment
------------------------------------------------------

Beyond the hardware, there are a number of files that define the test program
environment.  These are discussed below.

Linker Control File
~~~~~~~~~~~~~~~~~~~

A file variously refered to as the linker command file, linker control file or
linker script and typically given the filename **link.ld** is used to map the
symbols used in the test-program to physical memory addresses.  Some excellent
background material on the topic is available at
`Sourceware.org <https://sourceware.org/binutils/docs-2.34/ld/Scripts.html#Scripts>`__.

Typically, linker scripts have two commands, **MEMORY** and **SECTIONS**. If
MEMORY is not present then the linker assumes that there is sufficient
contiguous memory to hold the program.  We are constrained by a need to support
the Compliance test-suite and the Google generator, so it is possible we need
more than one linker control file, although a single script for all uses should
be out goal. 

Jeremy Bennett of Embecosm has provided a minimalist linker control file, and
Paul Zavalney of Silicon Labs suggested additions to support the debugger. The
two contributions have been merged into a single script by Mike Thompson::

  OUTPUT_ARCH( "cv32e40p" )
  ENTRY(_start)

  MEMORY
  {
     /* This matches the physical memory supported by the testbench    */
     mem (rwxai) : ORIGIN = 0x00000000, LENGTH = 0x00100000

     /* ORIGIN must match the DM_HALTADDRESS parameter in the core RTL */
     dbg (rwxai) : ORIGIN = 0x1A110800, LENGTH = 0x800
  }

  SECTIONS
  {
     DBG :
     {
        .debugger (ORIGIN(dbg)):
        {
          KEEP(*(.debugger));
        }

        /* Debugger Stack*/
        .debugger_stack         : ALIGN(16)
        {
         PROVIDE(__debugger_stack_start = .);
         . = 0x80;                    /* Is this ORIGIN + 0x80? */
        }
     } >dbg

     MEM : 
     {
        . = 0x00000000;
        .vectors : { *(.vectors) }
        . = 0x00000080;                   /* must equal value on boot_addr_i */
        _start = .;
        .text : { *(.start) }
        . = ALIGN (0x80)
        .legacy_irq : { *(.legacy_irq) }  /* is this still needed? */
        . = ALIGN(0x1000);
        .tohost : { *(.tohost) }
        . = ALIGN(0x1000);
        .page_table : { *(.page_table) }
        .data : { *(.data) }
        .user_stack : { *(.user_stack) }
        .kernel_data : { *(.kernel_data) }
        .kernel_stack : { *(.kernel_stack) }
        .bss : { *(.bss) }
        _end = .;
     } > mem
  }

A few open issues:

1. How does the linker control file need to change to support interrupts?

   At the time of this writting (2020-07-07), this is an area of active
   development in the CV32E40P projects.  This document (or its associated
   README) will be updated at a later date.

|

2. Will this linker script fully support test-programs generated by the Google
   generator (`riscv-dv <https://github.com/google/riscv-dv>`__)?

   This issue has been resolved by extending the riscv_asm_program_gen class
   in the `corev-dv <https://github.com/openhwgroup/core-v-verif/tree/master/vendor_lib/google/corev-dv>`__
   extensions.


C Runtime
~~~~~~~~~

While it is assumed that the vast majority of test programs written for CORE-V
pre-silicon verification will be captured as assembly (\*.S) programs, The
environment provides support for minimalist C programs via a C runtime
file in *./cv32/bsp/crt0.S* [16]_.  crt0.S performs the
bare minimum required to run a C program.  Note that **support for command-line
arguments is deliberately not supported**.

.. [16]
   Additional information on the "Board Support Package" can be found in its associated 
   `README <https://github.com/openhwgroup/core-v-verif/blob/master/cv32/bsp/README.md>`__
   in the `core-v-verif <https://github.com/openhwgroup/core-v-verif>`__ GitHub repository.
