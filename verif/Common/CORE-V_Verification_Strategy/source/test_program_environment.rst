.. _test_program_environment:

Test Program Environment
========================

The purpose of this chapter is to define the "programming environment" of a
test program in the CORE-V verification environments. The current version of
this document is specific to the CV32E40P. Further versions will be sufficiently
generic to encompass all CORE-V cores.

Recall from :ref:`sim_tests` that a “test program” is set of RISC-V instructions
that are loaded into the testbench memory and executed by the core RTL model.
Test-program are typically written in C or RISC-V assembler and can be either
human or machine generated.  In either case it needs to be "aware" of the
hardware environment supported by the core and its testbench.  This linkage
between the test-program and hardware needs to be flexible to support a variety
of test-program sources:

- manually written assembler and C test-programs inherited from RI5CY
- test-programs from the RISC-V Foundation Compliance Test Suite
- manually written OpenHW test-programs
- machine generated test-programs from an instruction generator (e.g. riscv-dv)

Test-programs, the toolchain that translates them into machine code and the
testbench all have to be compatible with one-another.

Hardware Environment
--------------------

The testbench supports an instruction and data memory and a set of memory mapped
virtual peripherals.  The address range for I&D memory is 0..0x10_0000 (1Mbyte)
for the UVM testbench and 0..0x400_0000 (4Mbytes) for the core testbench [16]_.
The virtual peripherals start at address 0x1000_0000. The core will start
fetching instructions from the address provided on its **boot_addr_i** input. In
addition, if debug_req_i is asserted, execution jumps to **DM_HALTADDR** (a
SystemVerilog parameter). This hardware setup constrains the test-program in
important ways:

- The entire program, including data sections and exception tables must fit in a 1Mbyte space starting at address 0.
- The first instruction of the program must be at the address defined by **boot_addr_i**.
- The address DM_HALTADDRESS must exist in the memory map, it should not be stomped on by the test-program and there should be something there to execute that will produce a predictable result.
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

The linker command file (typically called **link.ld**) is used to map the
program and data sections of the test-program to physical memory addresses.
Typically, these files have two commands, **MEMORY** and **SECTIONS**. If
MEMORY is not present then the linker assumes that there is sufficient
contiguous memory to hold the program.  We are constrained by a need to support
the Compliance test-suite and the Google generator, so it is possible we need
more than one linker control file.  In any case, it should be possible to
define a small (one or two) set that will support the hardware environment and
all types of test programs we may wish to write/generate.

The Ugly Details
----------------

All of the link.ld files in use today in core-v-verif were inherited from the
RI5CY project.  The MEMORY section from these link.ld files look something like
this::

   MEMORY
   {
     /*
     ** the memory in the testbench is 1024k in size;
     ** set LENGTH=1008k and leave at least 16k for stack
     */
     mem : ORIGIN = 0x00000000, LENGTH = 0x000fc000
   }
   
A cut-down version of the SECTIONS command in one of the linker command files
looks something like this::

   SECTIONS
   {
      .vectors (ORIGIN(mem)):
      {
        __irq_base_vector = .;
        KEEP(*(.vectors));
      } > mem
   
      .start (ORIGIN(mem) + 0x80):
      {
         __boot_addr = .;
        KEEP(*(.start));
      } > mem

      .legacy_irq (ORIGIN(mem) + 0x8000):
      {
        KEEP(*(.legacy_irq));
      } > mem
   }

A couple of things to note:

- The code of the test-program is assumed to have .vectors, .start and .legacy_irq symbols.
- The value of the .start symbol needs to match the value of boot_addr_i in the testbench.

As mentioned previously, the MEMORY command is not required and in fact the linker command
file used by the Google instruction generator does not use one.  Here it is in its entirety::

  OUTPUT_ARCH( "riscv" )
  ENTRY(_start)

  SECTIONS
  {
    . = 0x80000000;
    .text : { *(.text) }
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
  }

Note that in this case, ENTRY command is used to define the symbol for the first
instruction (_start) and the "." operator is used to define the address of the
program (in this case at 0x8000_0000).  The requirement here is that the program
produced by the generator must have a global start symbol, which it does::

  .global _start
  _start:
           li x1 0x0
           li x2 0x0
  ...etc...

Obviously, this will not work with our testbench as the start is aligned to a
memory address that does not exist. So either the testbench or the linker control
file need to be modified if we are to use the Google generator.


.. [16]
   This needs to be fixed - they should match.

