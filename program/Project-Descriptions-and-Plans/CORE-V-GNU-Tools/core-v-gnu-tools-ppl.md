# OpenHW Preliminary Project Proposal: CORE-V GNU compiler tool chain

## Summary of project

This proposal is for a baseline GNU compiler tool chain for CORE-V comprising:

- GNU binutils

  - assembler
  - linker
  - low level utilities

- GNU compiler collection for C and C++
  - compiler
  - emulation library (`libgcc`)
  - C++ standard library (`libstdc++v3`)

- GNU debugger (GDB)
- a standard C library

Because of the scale of this project, the work is composed in three phases:

1. support for bare metal use of C with CV32E40P (32-bit) and the _Newlib_ C library;
2. support for Linux application use of C and C++ with CVA6 (32-/64-bit) and the _GlibC_ C library; and
3. support for other RTOS

The proposal addresses just the first phase. Other phases will be the subject of separate proposals. Phase 1 will provide the following.

- support for the following CORE-V instruction set extensions:

  - hardware loop;
  - multiple accumulate;
  - post-increment and register-indexed load/store;
  - direct branches; and
  - general ALU operations.

- support for a generic CORE-V instruction set extension interface:

  - this will provide a commercial driver for future tool chain development for these extensions.

In order to support the Software TG primary goal of developing a thriving commercial ecosystem, only a basic implementation will be provided.  By basic implemention, we mean that the assembler/linker will support the instructions, the compiler will have intrinisc/builtin function support and the compiler will have patterns to generate the instructions from C code in obvious circumstances.

However there will be no attempt to provide compiler optimization (which is a much bigger task).  Software companies will rely on the majority of work still needing to be done in order to drive their businesses.

In order to support the Software TG secondary goal of upstreaming all open source tool developments:

- all development will be kept compliant with GNU coding standards;
- the implemenation will follow the upsrtream tool design conventions; and
- the design will remain consistent with the standard RISC-V GNU compiler tool chain.

The finished work will be contributed and maintained upstream.

### Nature of the development

This project is modification of a set of existing public open source code bases maintained as projects of the Free Software Foundation (FSF).  As such the processes used within OpenHW will reflect the processes of those upstream projects.

These code bases are very large:

- GCC: 6.2MLOC
- binutils and GDB: 3.9MLOC
- newlib or GlibC: 0.9MLOC / 1.3MLOC

The code bases include substantial regression test suites, and success with these test suites is a pre-requisite of upstream acceptance of any patch.  The GCC test suite is the largest of these, which in its standard configuration comprises around 100,000 C tests and 50,000 C++ tests.

Until CORE-V is accepted upstream, code will be developed in narrow mirrors of upstream repositories, featuring a single development branch based on upstream top of tree.  This will be used as the basis of the patches to be submitted for upstreaming.

Once CORE-V is accepted upstream, code will be developed exclusively in upstream FSF repositories and the narrow mirrors will be removed.

### Summary timeline

- Preliminary Project Launch (PPL, this document): early October 2020

  - includes project plan

- Project Launch (PL): end October 2020
- First release (hardware loop support): end October 2020
- Upstreaming of first release: objective is to include in GCC 11.1 in Q2/2021

  - patch must be submitted by GCC stage 3 gate in early November 2020
  - requires cooperation from RISC-V GCC maintainers
  - otherwise will be delayed to GCC 12.1 in Q2/2022.

- Subsequent releases to support further instruction set extensions will be timed according to available resource.

## OpenHW members/participants committed to participate in this project

All OpenHW group members are invited to contributed expertise to this project. At present we are aware of:

1. Embecosm
2. To be checked: Thales (phase 2)

## Project Manager and technical lead

- Jessica Mills, Embecosm, supported by Jeremy Bennett, Embecosm

This is a much lighter role than a traditional project manager, since the requirements are fully defined through the hardware design process.  The primary roles will be:
- tracking and reporting status to OpenHW Software TG and Technical WG
- identifying and resolving issues related to the outcome.

Jessica Mills is currently project managing the CORE-V GCC development effort
within Embecosm, work she co-presented at OSDForum in September 2020.

## Project documents

The following project documents will be created:
- Preliminary Project Proposal (this document)

  - including an initial project plan
  - including an initial risk register

- Project Proposal, an updated version of this document

  - separate detailed project plan
  - separate risk register

## Virtual customer

It is proposed that the OpenHW Group Hardware TG act as a "virtual customer" to exercise the compiler as it is developed.

While the tool chain will have been thoroughly tested, it will benefit from the OpenHW Group Hardware TG being able to use if with their reference applications.

## Summary of requirements

The requirements are captured in the [OpenHW Group CV32E40P User Manual](https://core-v-docs-verif-strat.readthedocs.io/projects/cv32e40p_um/en/latest/).

## Explanation of why OpenHW should do this project

A processor is only useful with a robust, up-to-date, proven compiler tool chain.  CORE-V, being a strict RISC-V derivative can use a standard RISC-V compiler tool chain, but in these circumstances will not be able to take advantage of any of the extended ISA features of the CORE-V processors.

This project will provide a baseline tool chain allowing these extensions to be used, albeit without optimization, from the CORE-V tool chain.

## Industry landscape

Description of competing, alternative, or related efforts in the industry

### Related efforts to be described

The upstream GNU tool chain projects already support standard RISC-V.  It is reasonably standard, but relatively immature by comparison with competing tool chains such as Arm and MIPS.

The PULP GNU tool chain is based on GCC from 2017, shortly after RISC-V was
added upstream.  It lacks all the more recent work on RISC-V optimization
work.  It is a research compiler, and does not always follow GNU design principles or coding standards.  It does not include any PULP specific tests

There are also other non-GNU tool chains for RISC-V

- Clang/LLVM for RISC-V
- IAR RISC-V compiler

None of these yet supports PULP or CORE-V.

## External dependencies

Prequisites:
- all the upstream tool sources
- a suitable platform for regression testing the compiler.
- agreement on the instruction set encodings to be compliant with the RISC-V standard.

External dependencies
- ongoing tracking of upstream until the CORE-V tool chain is accepted upstream.

## List of project outputs (deliverables)

## Project deliverables

### Final deliverables

1. extensions to upstream GNU compiler tools to support CORE-V; and
2. revisions to the CORE-V design specifications to clarify ambiguities.

### Interim deliverables

1. Reports on progress to the monthly SW TG:
   - progress against work packages;
   - regression test results;
   - updates to the project plan; and
   - updates to the risk register.
2. Continuously updated source code as new features are added.

## TGs impacted/resource requirements

The software TG will be responsible for oversight of the planning and delivery of this project.

## OpenHW engineering staff resource plan: requirement and availability

- Duncan Bees - program management oversight

## Engineering resource supplied by members - requirement and availability

Previous work by Craig Blackmore of Embecosm has estimated the effort to be 15
engineer months work *for experienced GNU tool chain engineers*.  This is to
achieve a tested functional tool chain *without* optimization.

- Embecosm has already contributed around 3 engineer months to CORE-V GNU compiler tool chain development, and is willing to contribute another 3 engineer months during 2020 and early 2021.
- a further 9 engineer months is needed to complete the project

*Note:* This is effort by GNU compiler tool chain specialist engineers.

## OpenHW marketing resource - requirement and availability

- press release support if/when CORE-V is accepted upstream.

## Marketing resource supplied by members - requirement and availability

- No  resource requirements yet identified

## Funding supplied by OpenHW - requirement and availability

- None proposed

## Funding supplied by members - requirement and availability

- An alternative to support in kind is funding of effort by Embecosm.

## Architecture diagram

The standard GNU tool chain components are shown in the following diagram.

![](images/gnu-tools.png)

## Who would make use of OpenHW output

See [Explanation of why OpenHW should do this project](#explanation-of-why-openhw-should-do-this-project)

## Project license model

Each component will use the license of the corresponding upstream RISC-V component.

## Description of initial code contribution, if required

- a GNU tool chain with support for CORE_V open hardware loop supplied by Embecosm.

## Repository structure

The respositories are mirrors of the upstream repositories.

## Project distribution model

The delivered code will be distributed as part of the upstream projects.

Pending upstream adoption, the source code for the components will be available through mirror repositories under OpenHW Group GitHub.

## Preliminary risk register

This will become a separate document at full project launch.

Risk is scored as likelihood (1-10) x impact (1-3) with mitigation required for any risk with score of 10 or more, of with an impact of 3 (project killer).

| Risk                          |   L |   I |   R | Mitigation                 |
|:----------------------------- | ---:| ---:| ---:|:---------------------------|
| Isufficient resource available | 5 | 3 | 15 | Socialize around OpenHW members to find expertise or funding. |
| Ownership of software for upstreaming | 5 | 2 | 10 | Ensure OpenHW group has FSF approval, discuss transfer of ownership with Luca Benini, clean room rewrite as last resort. |
| No process for allocating new relocations | 5 | 2 | 10 | Propose new process to RISC-V International psABI group, suggest allocation is coincident with upstreaming. |

## Preliminary project plan

This will become a separate document at full project launch.

The support of any instruction set extension in the GNU compiler tool chain breaks into four work packages.

1. *Addition of the instructions to the GNU assembler and linker.*  The GNU assembler tables are modified to add the missing instructions.   Where new operand types are added, the parser is extended as appropriate.  Tests are added to `testsuite/gas/riscv` to exercise each instruction, including tests for all failure modes.

   If operands may be relocatable symbols, and cannot use existing relocations, the linker is extended with new relocations.

   At the end of this work package, the instructions can be used with the GNU assembler, or within GCC as inline assembly code.

2. *Add intrinsic and/or builtin functions to GCC.*  Intrinsic functions are just wrappers around inline assembly code provided for convenience.  Builtin functions are integral to the compiler, giving greater opportunity for the compiler to optimize seamlessly around the new instructions.  In general builtin functions are to be preferred, but they are more work, and in some cases may make little difference, so intrinsic functions will suffice.

   Builtin or intrinsic functions are added as appropriate.  Tests will be added to `testsuite/gcc.target/riscv` to exercise each function, including tests for all failure modes.

   It should be noted that some instructions may not be suitable for direct intrinsic or builtin functions, particularly if they only make sense within a looping context. In such cases derivative builtin functions using the new instructions may be more useful (for example optimized `memcpy`).

	At the end of this work package the instructions can be used directly from C or C++ via the intrinsic/builtin functions.

3. *Provide instruction generation patterns to GCC.*  GCC is a pattern matching compiler. Patterns in the GCC intermediate representation are used to lower the intermediate statements to RISC-V code.  Patterns will be provided to lower code to use the new instructions where this is advantageous.

   Tests are added  to `testsuite/gcc.target/riscv` to verify that the patterns are being applied correctly. In addition benchmarking, for example with [Embench](https:://embench.org), will be used to measure the benefit obtained by generating the new instructions.

	Some of the instruction set extensions will prove harder than others to generate, particularly for the post-increment instructions.  Getting effective use of auto-increment instructions in a compiler target such as RISC-V, which has been optimized without them, is a challenge.

	At the end of this work package, appropriate C or C++ code will generate object code using the new instructions. It is worth noting that without optimization, the cases where this happens may be limited.

4. *Extend GCC optimization to take advantage of new instructions.*  This is where GCC optimization passes are modified and extended to try to increase the opportunity to use the new instructions.  This may involve changes to existing passes, or writing new passes, and is an inherently open ended task.

   Tests are again be added `testsuite/gcc.target/riscv` to verify that the optimizations are being applied.  Benchmarking is used to measure the benefit obtained by optimization. This is done at the start of this work package, since the results will guide the optimization strategy.

	As with code generation, some of the instruction set extensions will prove harder than others to optimize, particularly for the post-increment instructions.  Optimizing  use of auto-increment instructions in a compiler target such as RISC-V, which has been optimized without them, is a challenge.

	At the end of this work package, the quality of code generated from C or C++ should be improved. It is worth noting that optimization is a very inexact science. It is usual to try 10 or 20 different optimization strategies, of which 20% will have a negative effect, 60% will have a minimal effect and only 20% will make a significant difference.

In addition there are there are two work packages which apply throughout

5. *Continuous integration and test.*  This is an essential prerequisite to any GNU tool chain development.  The project must be able to run the GCC, GNU assembler and GNU linker regression tests and nay benchmarking on a regular basis.  This may use the Hardware TG reference FPGA platform or a simulation model of the platform.

6. *Extend tool chain drivers for CORE-V.*  The GNU compiler tools will build out of the box with any vendor specified, so tools can be named `riscv-corev-elf-* rather than riscv-unknown-elf-*.  The vendor field is used to control whether code for CORE-V extensions is included in the tool chain.

   It is important that the user can control which CORE-V instructions are included, which is achieved through the -march option to the tools. It uses the syntax specified in chapter 27 of the current RISC-V ISA standard.  Vendor specific instruction set extensions are alphabetic and prefixed by X.  We shall provide support for `Xcorev` to provide support for all extensions, and the following to support specific subsets:

   - hardware loop: `Xcorevhwl`
   - multiple accumulate: `Xcorevmac`
   - post-increment and register-indexed load/store: `Xcorevpostinc`
   - direct branches: `Xcorevbi`
   - general ALU operations: `Xcorevalu`

Finally there is a work package to prepare for the future

7. *Support generic instruction set extensions to CORE-V.*  There is no credible automated way to provide an optimizing compiler from a specification of an instruction.  We therefore will define a process by which the compiler can be manuall extended by specialist experts in GCC optimization.

However...

There is an automated technology, CGEN, which allows automatic creation of the assembler, disassembler and instruction set simulator from a semi-formal specification of the architecture in Scheme.  This is widely used for architectures in the GNU tool chain.

CGEN has not been used to generate the assembler/disassembler in upstream RISC-V tools. However the CGEN specification has been written. This project can extend this specification to support CORE-V.  This then provides a faster way to implement work package 1 for future instruction set extensions.

### Program of work

We propose the following work sequence within the scope of Phase 1 of this PPL:

- work package 5;
- work package 6;
- work packages 1, 2 and 3 for hardware loop;
- work packages 1, 2 and 3 for multiple accumulate;
- work packages 1, 2 and 3 for post-increment and register-indexed load/store;
- work packages 1, 2 and 3 for direct branches;
- work packages 1, 2 and 3 for general ALU operations; and
- work package 7.

Note that we do not propose any optimization work as part of this project.
