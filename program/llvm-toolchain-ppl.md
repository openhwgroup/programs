# OpenHW Preliminary Project Proposal: LLVM tool chain for CORE-V

## Summary of project

This proposal is for a baseline development tool chain for CORE-V based on up-to-date compiler and simulation technology, comprising:

- Clang/LLVM tool chain for C and C++:
  - compiler
  - assembler
  - linker
  - emulation library (`compiler-rt`)
  - C++ library (`libc++`)

The CORE-V LLVM tool chain may rely initially on the GNU CORE-V binutils developed as part of the GNU CORE-V tool chain:
  - linker (GNU `ld`)
  - low level utilities for manipulating object files.

The tool chain will interface to the following other components of the CORE-V development ecosystem:
- GNU debugger (GDB)
- standard C libraries (`newlib`, GNU `_GlibC_`)

NOTE: Provision of non-(L)GPL C/C++ libraries is beyond the scope of this project.

Because of the scale of the project and the current maturity level of LLVM for RISC-V in general, the LLVM-related work is decomposed into three phases:

1. Support for bare metal use of C with CVA6 (64-/32-bit) and with CV32E40P together with the _Newlib_ C library;
2. Support for Linux application use of C and C++ with CVA6 (32-/64-bit) together with the _GlibC_ C library; and
3. Support for other RTOSes.

The proposal addresses just the first phase. Other phases will be the subject of separate proposals. Phase 1 will provide the following:

- suitability of Clang/LLVM for HW verification of CVA6:
  - seamless support of multiple datapath widths (multi-XLEN support);
  - resolution of functional failures identified on the current CVA6 verification flow.

- support of differentiating characteristics of the CVA6 cores:
  - pipeline depth,
  - specific CSRs.

- support for a generic CORE-V instruction set extension interface:
  - in the Clang/LLVM tool chain.
  - NOTE: this will provide a commercial driver for future tool chain development for new extensions, whether public or proprietary.

In order to support the Software TG's primary goal of developing a thriving commercial ecosystem, only a basic implementation will be provided.
By basic implementation we mean that:
- the assembler/linker will support the instructions;
- the compiler will have intrinsic (builtin) function support;
- the compiler will have patterns to generate the instructions from C code in obvious circumstances.

There will be no attempt to provide compiler optimizations.  The development of optimizations will be under the responsibility of:
- software companies which can rely on the amount of work still needing to be done to drive their businesses; and of
- HW and system integration companies which can use specific optimizations targeted at their products as market differentiators.

In order to support the Software TG secondary goal of upstreaming all open source tool developments:
- all Clang/LLVM development will be kept compliant with the LLVM Foundation coding and quality assurance standards;
- the implementation will follow the upstream tool design and coding conventions; and
- any vendor-specific modifications or additions will be duly isolated into extensions, so as to maintain a fully functional common open source code base.

Finished LLVM-related work that is not vendor-restricted will be contributed to the LLVM community and maintained upstream.

### Nature of the development

This project requires the modification of a set of existing public open source code bases maintained as projects of the LLVM Foundation and the REMS project.  Therefore, the processes used within OpenHW will reflect the processes of those upstream projects.

The code base of LLVM is of substantial size:

- llvm-project: 6.4 MLOC C++ including Clang, LLVM, LLDB, LLD.

The LLVM code base includes substantial regression test suites (1.5 MLOC including `libc++` C++ library tests), and success with these test suites is a pre-requisite of upstream acceptance of any patch.
As LLVM has only tests up to IR level (no execution regression tests), successful GCC execution regression tests are necessary.

Until CORE-V related contributions are accepted upstream, code will be developed in narrow mirrors of upstream repositories, featuring a single branch based on upstream top of tree.  This will be used as the basis of the patches to be submitted for upstreaming.

<!--- Partners may maintain local backport branches for corrections to official releases used in their internal HW development flows. --->

Once CORE-V contributions are accepted upstream, common CORE-V specific code for LLVM will be developed and maintained in upstream `llvm.org` repositories.  However, dedicated extensions may continue to be developed in member-owned repositories tracking the upstream repository.

### Summary timeline

- Preliminary Project Launch (PPL, this document): 30 November 2020
  - includes project plan

- Project Launch (PL): TBD
- First OHG CVA6 64/32 bits release (HW verification equivalence to GCC): TBD
- First OHG CV32E40P release (assembler/builtin support): early Q1 2021
- Upstreaming of first release: 2021 H1, targeting LLVM 13.0
- Support of compiler patterns and codegen: TBD (need additional resource commitment)

The schedule of LLVM releases follows a six-month cycle which additionally depends on the progress of on-going releases.  This makes the scheduling of upstream contributions more flexible (and also more difficult to schedule upfront).

## OpenHW members/participants committed to participate in this project

All OpenHW Group members are invited to contributed expertise to this project. At present we are aware of the interest and commitment of:

1. Thales
2. Embecosm

## Project Manager and technical lead

- TBD

This is a much lighter role than a traditional project manager, since the requirements are fully defined through the hardware design process.  The primary roles will be:
 tracking and reporting status to OpenHW Software TG and Technical WG;
- identifying and resolving issues related to the outcome.

## Project documents

The following project documents will be created:
- Preliminary Project Proposal (this document)

  - including an initial project plan
  - including an initial risk register

- Project Proposal, an updated version of this document

  - separate detailed project plan
  - separate risk register

## Virtual customer

It is proposed that the OpenHW Group Cores TWG acts as a "virtual customer" to exercise the compiler as it is developed.  In particular, the CVA6 project will exercise the multi-XLEN and core functionality of the LLVM compiler in the CVA6 verification flow.
For instance, the HW TG can try out LLVM on the FPGA platform.

In addition, while the tool chain will have been thoroughly tested, it will benefit from the OpenHW Group Cores TWG being able to use it with their reference applications.

## Summary of requirements

The requirements for the CVA6 platform are captured in (link TBD).

## Explanation of why OpenHW should do this project

A processor is only useful with a robust, up-to-date, proven compiler tool chain.  CORE-V, being a strict RISC-V derivative, can use a standard RISC-V compiler tool chain, but in these circumstances will not be able to take advantage of any of the added features of the CORE-V processors.  This project will provide a baseline tool chain allowing these features to be used (albeit without optimization) and simulated from the source code level.

Furthermore, the licensing scheme of LLVM (Apache license) makes it particularly appealing to industrial players.  Because it does not require the disclosure of compiler source code, chip manufacturers and system integrators can better protect their differentiating Intellectual Property assets.  This licensing scheme also creates additional opportunities for software companies which can provide high added-value services in the area of compiler tuning for hardware/system-centric companies.

Generated code for Embench tests by LLVM 11.0 is 4% quicker that GCC 10.2 code. This is an additional reason to offer LLVM support for CORE-V processors. 

## Industry landscape

The "original" compiler used for the development of RISC-V cores is GCC licensed under the GNU General Public License, requiring vendors to make source code available.  LLVM offers a "permissive" licensing scheme which some customers find more attractive, since it does not require the source to be made available. As a result LLVM-based compiler chains appear to be at the basis (in whole or in part) of a number of proprietary compilers.  The downside is that there is less pressure on companies to contribute back to LLVM development.  This project will give OpenHW Group members a choice over which approach to adopt (make their toolchain code available or not).

### Related efforts to be described

The upstream LLVM tool chain project already supports standard RISC-V, including all ratified ISA extensions.  RISC-V support in LLVM is strongly compliant to the RISC-V specification, but relatively immature in comparison to older architectures as x86, Arm and MIPS.
Moreover, LLVM follows closely new ISA extension discussions as it already provides support for not yet ratified extensions like Bit Manipulation and Vector ones.

The support of CORE-V specific features or extensions by LLVM is in its infancy (e.g. hardware loop support just added in the assembler), and subsequently, its test suites do not include any CORE-V or PULP-specific tests.

Other toolchains available for RISC-V are:
- the GNU tool chain for RISC-V, for which a CORE-V specific project is in progress within OpenHW Group;
- IAR RISC-V compiler

The GNU tool chain project within OpenHW Group intends to support CORE-V and PULP extensions, but at the time of writing focuses solely on the CV32E40P platform.

An OHG architecture project devoted to the CVA6 (Ariane) family of cores has passed the PPL gate.  There is a clear synergy between this project and the CVA6 project:
- CVA6 hardware design and verification will directly benefit from the LLVM work;
- in return, the CVA6 project will directly provide inputs (specifications, documentation) for the compiler- and simulator-related activities in the present project.

The CV32E40P project will similarly take benefit from LLVM development.

## External dependencies

Prequisites:
- all the upstream tool sources,
- a suitable platform for regression testing the compiler,
- agreement on the instruction set encodings to be compliant with the RISC-V standard.

External dependencies:
- ongoing tracking of upstream LLVM development until the CORE-V tool chain is accepted upstream.

## List of project outputs (deliverables)

## Project deliverables

### Final deliverables

1. extensions to upstream LLVM compiler tools to support CORE-V;
2. revisions to the CORE-V design specifications to clarify ambiguities.

### Interim deliverables

1. Reports on progress to the monthly SW TG:
   - progress against work packages;
   - regression test results;
   - updates to the project plan; and
   - updates to the risk register.
2. Continuously updated source code as new features are added.

## TGs impacted/resource requirements

The Software TG will be responsible for oversight of the planning and delivery of this project.

## OpenHW engineering staff resource plan: requirement and availability

- Duncan Bees - program management oversight

## Engineering resource supplied by members - requirement and availability

- Embecosm: two engineer months from Philipp Krones in Q4 2020 for CV32E40P support
- TBD

*Note:* This is effort by experienced LLVM compiler tool chain / OCaml specialist engineers.

## OpenHW marketing resource - requirement and availability

- press release support if/when CORE-V support is accepted upstream.

## Marketing resource supplied by members - requirement and availability

- No resource requirements yet identified

## Funding supplied by OpenHW - requirement and availability

- None proposed

## Funding supplied by members - requirement and availability

- An alternative to support in kind is funding of effort by Thales and Embecosm.

## Architecture diagram

The standard LLVM tool chain components are shown in the following diagram.

![](images/llvm-tools.png)

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
| Insufficient resource available | 5 | 3 | 15 | Socialize around OpenHW members to find expertise or funding. |

## Preliminary project plan

TBD
