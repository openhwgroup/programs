# OpenHW Project Concept and Project Launch markdown template: Instructions
<!-- This template presents both PC and PL templates as well as instructions for use


In the **standard OpenHW project flow**:
- The **PC**
  - Introduces the intitial project concept and team, associated market drivers or user requirements (the "why") along with basic scope of the project
  - Typically lacks detail such as a feature list, architecture or complete project team.
  - If PC approved by the TWG, the project team completes the project description in the **PL proposal**.
  - The PC as approved is retained in the programs repository*

- The **PL**:
  - Is a separate document to the PC, which it updates and completes.
  - The architecture, major features and project phases (the "what" - but not necessarily final level of detail)
  - The project team is identified
  - If PL approved by the TWG, the project team completes the feature specification and project plan in the **Plan Approved (PA) proposal**. 

The flow for **OpenHW software projects** whose scope/target is a family of related targets (such as CORE-V 32 bit 4 stage cores):
- PC and PL are written as top-level projects addressing the target family.
- Any PC and PL sections intended for a particular target, e.g., preliminary feature list, are identified as target-specific
- The PA describes a "subproject" for a particular target. Each PA should contain the full feature list and project plan for a particular target
- There would normally be multiple PA sub-projects for top-level SW projects

The flow for **OpenHW Advanced RISC-V Verification Methodology (ARVM)** subprojects:
- The ARVM PC is written as a top-level project addressing multiple ARVM subprojects
- The PL and PA describe an ARVM "subproject". The PA  contains the full feature list and project plan for the subproject
- There will be multiple PL/PA subprojects for the ARVM top-level project

**Part 2, PL fields:**
The PL proposal explains the "what". Some of it can be updated directly from the PC proposal -->

# Title of Project - "Clang/LLVM tool chain for CORE-V"
# Project Launch Proposal
## Date of proposal - 2022-11-28
## Author(s) - Jeremy Bennett, Charlie Keaney

## Summary of project

This proposal is for a Clang/LLVM compiler tool chain for CORE-V.  Under the new program structure, this is the overall framework for all Clang/LLVM tool chain development for CORE-V.  Separate "Plan Approved" proposals will address individual target development.  As such there is minimal work directly associated with this Project Launch proposal.

In order to support the Software TG secondary goal of upstreaming all open source tool developments:

- all Clang/LLVM development will be kept compliant with the LLVM Foundation coding and quality assurance standards;
- the implementation will follow the upstream tool (that is llvm-project) design and coding conventions; and
- any vendor-specific modifications or additions will be duly isolated into extensions, so as to maintain a fully functional common open source code base.

Finished LLVM-related work will be contributed to the LLVM community and maintained upstream.

This project requires the modification of a set of existing public open source code bases maintained as projects of the LLVM Foundation.  Therefore, the processes used within OpenHW will reflect the processes of those upstream projects.

The code base of LLVM is of substantial size:

- llvm-project: 6.4 MLOC C++ including Clang, LLVM, LLDB, LLD.

The LLVM code base includes substantial regression test suites (1.5 MLOC including `libc++` C++ library tests), and success with these test suites is a pre-requisite of upstream acceptance of any patch.

LLVM only has unit tests up to LLVM Intermediate Representation (IR) level, the LLVM Integrated Tester (_lit_). There is a LLVM execution test suite, but it tests applications running under an operating system. For bare metal applications, the GCC regression tests are used. Execution tests in turn require availability of implementation targets against which the code can be run.

For the project, successful _lit_, LLVM test suite and GCC regression tests are necessary prior to code being committed.  The tests must be extended where necessary to cover new features being added for CORE-V.

Until CORE-V related contributions are accepted upstream, code will be developed in narrow mirrors of upstream repositories, featuring a single branch based on upstream top of tree.  This will be used as the basis of the patches to be submitted for upstreaming.

### Components of the Project

<!--- Components are major project components or groups of features.
- A project may have, for example, 1-10 components.
- Components detail the "The what" at high level, not detailed level
- Components don't consider timeline.
- For example
  - Component 1 "Compiler changes for standard instructions."
  - Component 2 "Compiler changes for custom instructions"
  - Component 3 "Updates to compiler tools". -->

The LLVM project is monorepo based, with all tools in the project within the single repository.  The details of specific architecture functionality to be supported are a matter for infividual "Plan Approved" (PA) proposals.

In this context it makes more sense to treat components as the class of target being addressed.  Individual PA proposals may be limited as follows

- they may not support all the components (i.e. targets)
- not all tools in the tool chain may be supported.
- they may support only one of 32-bit or 64-bit CORE-V targets
- not all CORE-V ISA extensions may be supported

Because of the scale of the project and the current maturity level of LLVM for RISC-V in general, the LLVM-related work is decomposed into three phases:

1. Support for bare metal use of C with CVA6 (64-/32-bit) and with CV32E40P together with the _Newlib_ C library;
2. Support for Linux application use of C and C++ with CVA6 (32-/64-bit) together with the _GlibC_ C library; and
3. Support for other RTOSes.

#### Component 1 Bare metal Clang/LLVM tool chain

This tool chain will compile code for bare metal use, and include only the `newlib` standard C library.

#### Component 2 Linux application Clang/LLVM tool chain

This tool chain will compile code for Linux applications.  It will include both `newlib` and `glibc` standard libraries and only target 64-bit CORE-V architectures.

#### Component 3 RTOS application Clang/LLVM tool chain

This tool chain will compile code for specific RTOS applications.  Depending on the RTOS this may require RTOS specific libraries alongside or instead of the `newlib` or `glibc` standard libraries.

## Summary of market or input requirements
### Known market/project requirements at PL gate

None at PL gate. Press release support if/when CORE-V support is accepted upstream.

### Potential future enhancements for future project phases

Compiler tool chains require continuous development and maintenance, if only to keep the code up to date with respect to the upstream code:

- to incorporate bug fixes from the latest versions of the code;
- to incorporate new optimizations from the latest versions of the code; and
- to provide new features only available in the latest versions of the code.

The last of these is particularly important given that C and C++ standards are regularly updated and adding important new features in such updates.

## Who would make use of OpenHW output

Any software developer targeting CORE-V processors and wishing to take advantage of CORE-V specific features will need to use either the CORE-V GCC or CORE-V Clang/LLVM compiler tool chain.

## Summary of Timeline
<!-- High level view of timeline, for example timeframe for each component -->
Compiler development is an ongoing process, as the upstream project adopts new features, new language standards, bug fixes and optimizations.  Overall the CORE-V project will mirror the upstream 6-monthly release cycle.

Detailed timelines will be associated with specific Plan Approved (PA) proposals.

## Explanation of why OpenHW should do this project
<!--- What is the impact of doing/not doing this project on the OpenHW ecosystem. Why is OpenHW best suited to do this project -->

A processor is only useful with a robust, up-to-date, proven compiler tool chain.  CORE-V, being a strict RISC-V derivative, can use a standard RISC-V compiler tool chain, but in these circumstances will not be able to take advantage of any of the added features of the CORE-V processors.  This project will provide a baseline tool chain allowing these features to be used (albeit without optimization) and simulated from the source code level.

Furthermore, the licensing scheme of LLVM (Apache license) makes it particularly appealing to industrial players.  Because it does not require the disclosure of compiler source code, chip manufacturers and system integrators can better protect their differentiating Intellectual Property assets.  This licensing scheme also creates additional opportunities for software companies which can provide high added-value services in the area of compiler tuning for hardware/system-centric companies.

In work done a few years ago, code generated for Embench tests by LLVM 11.0 was 4% quicker that GCC 10.2 code. This is an additional reason to offer LLVM support for CORE-V processors.

## Industry landscape: description of competing, alternative, or related efforts in the industry

The "original" compiler used for the development of RISC-V cores is GCC, licensed under the GNU General Public License, requiring vendors to make source code available.  LLVM offers a "permissive" licensing scheme which some customers find more attractive, since it does not require the source to be made available. As a result LLVM-based compiler chains appear to be at the basis (in whole or in part) of a number of proprietary compilers.

The downside is that there is less pressure on companies to contribute back to LLVM development.  This project will give OpenHW Group members a choice over which approach to adopt (make their toolchain code available or not).

### Related work

The upstream LLVM tool chain project already supports standard RISC-V, including all ratified ISA extensions.  RISC-V support in LLVM is strongly compliant to the RISC-V specification, but relatively immature in comparison to older architectures as x86, Arm and MIPS.

Moreover, Clang/LLVM follows closely new ISA extension discussions as it already provides a mechanism to support yet to be ratified extensions.

Other toolchains available for RISC-V are:

- the GNU tool chain for RISC-V, for which a CORE-V specific project is in progress within OpenHW Group;
- IAR RISC-V compiler

The GNU tool chain project within OpenHW Group mirrors this project in its suport for CORE-V archhitecture.

An OpenHW Group architecture project devoted to the CVA6 (Ariane) family of cores has passed the project concept gate.  There is a clear synergy between this project and the CVA6 project:

- CVA6 hardware design and verification will directly benefit from the LLVM work;
- in return, the CVA6 project will directly provide inputs (specifications, documentation) for the compiler- and simulator-related activities in the present project.

The various CVE projects will similarly take benefit from LLVM development.

## OpenHW Members/Participants committed to participate

## Project Leader(s)
### Technical Project Leader(s)

Charlie Keaney, Embecosm

### Project Manager, if a PM is designated

None required.

## Project Documents
### Project Planning Documents

None required.

### Project Output Documents

There are no explicit engineering documents. However comprehensive documentation, including Doxygen commenting of the source code is integral to the LLVM process and will therefore be part of this project.

The only output documents specific to OpenHW Group come under marketing, to inform users of what is available.

## List of project technical outputs
<!--- This is a list of technical artifacts produced by the project -->

1. extensions to upstream LLVM compiler tools to support CORE-V;
2. revisions to the CORE-V design specifications to clarify ambiguities.

### Feature Requirements
<!--- Features are more granular than Components.
For SW porting projects, this list serves as the detailed project reference for features
For IP Cores or more complext projects, a user manual with requirements specification is produced at the PA gate, which may supersede this list of features -->

The specifics of features to be supported are a matter for individual PA proposals, but will comprise some of:

- compiler (`clang`)
- assembler (`clang`)
- linker (`lld`)
- debugger (`lldb`)
- emulation library (`compiler-rt`)
- standard C++ library (`libc++`)
- standard C libraries (`newlib`, `glibc`)

**Note:** Provision of other standard C/C++ libraries may be regarded to support some operating systems.

The CORE-V LLVM tool chain may rely initially on the GNU CORE-V binutils developed as part of the GNU CORE-V tool chain:
  - linker (GNU `ld`)
  - low level utilities for manipulating object files.
  - the GNU debugger

CORE-V provides a number of project specific ISA extensions. At the time of writing, these comprise:

- `xcvhwlp` (hardware loops)
- `xcvmac` (multiply-accumulate)
- `xcvbi` (immediate branch)
- `xcvmem` (post-indexed and register-indexed memory access)
- `xcvalu` (miscellaneous ALU operations)
- `xcvsimd` (PULP 8/16-bit SIMD)
- `xcvbitmanip` (PULP bit manipulation)
- `xcvelw` (event load word)

Others are likely to be defined in the future. Individual PA proposals will define which, if any, of these are to be supported.

## External dependencies
<!--- These are external factors on which the project depends, such as external standards ratification, external technology input, etc. -->
Prequisites:

- all the upstream tool sources,
- a suitable implementation platform for regression testing the compiler (i.e hardware or models to test the compiler against),
- agreement on the instruction set encodings to be compliant with the RISC-V standard.
- agreement on the builtin (intrinsic) function prototypes to be used.

External dependencies:
- ongoing tracking of upstream LLVM development until the CORE-V tool chain is accepted upstream.

## OpenHW TGs Involved
<!--- Which TG will be involved, such as SW, HW, Verification, etc. -->

The Software TG will be responsible for oversight of the planning and delivery of this project.

## Resource Requirements
<!--- This is a list of major resources/people required to implement the project and indication of whether the resources are available -->

### Engineering resource supplied by members - requirement and availability

- Embecosm has over the past two years provided several engineer months of work on this project from Philipp Krones and Charlie Keaney.  Charlie Keaney will continue to provide technical leadership of the project.

- The University of Tübingen provided the original port of Clang/LLVM for the CV32E40P version 1.

- The Programming Languages and Compiler Technology (PLCT) group at the Chinese Academy of Sciences are providing support for specific PA proposals.

Details of resource required for the various specific releases will be a matter for individual PA proposals.

### OpenHW engineering staff resource plan: requirement and availability

- Duncan Bees - program management oversight

### Marketing resource  - requirement and availability

- press release support if/when CORE-V support is accepted upstream.

### Funding for project aspects - requirement and availability

Support for overall project leadership is provided by Embecosm

Details of funding are primarily a matter for the individual PA proposals. Compiler development is a specialist discipline, with a global shortage of experienced specialists. This means that bringing up a new generation of compiler engineers is something that also needs to be supported.

There are broadly two sources of funding.

- state funding, typically via the academic system for work carried out by students.
- commercial funding, for work carried out by professional compiler engineers. This can including supervision of students learning compiler development.

## Architecture and/or context diagrams
<!--- Architecture (internal blocks and interconnections), and context (depiction of the project content within its operational context), are both encouraged where appropriate to depict functionality to both subject matter experts and to non-experts -->

The standard LLVM tool chain components are shown in the following diagram.

![](images/llvm-tools.png)

## Project license model

Each component will use the license of the corresponding upstream RISC-V version of the component.  Most of the LLVM project is now licensed under the Apache 2 license.  However some included components, such as Google Test and Autoconf use their own imported licenses and some legacy code remains under the old LLVM-UIUC license.  Full details are in the [Developer Policy](https://llvm.org/docs/DeveloperPolicy.html) on the LLVM project website.

Some components are not from LLVM project. For example GNU ld and the GNU Debugger are covered by the GNU General Public License version 3, glibc is covered by the GNU Lesser General Public License, and newlib is covered by a huge range of licenses.  In all these cases the `COPYING` files in the top level directory of the repository detail the licensing requirements.

## Description of initial code contribution, if required

Not applicable - the initial contribution is the freely available upstream
code base.

## Repository Requirements

The OpenHW respositories are mirrors of the upstream repositories, with a single branch mirroring upstream top of tree.  These have a limted lifetime until the CORE-V vendor specific code is accepted upstream, thereby allowing all work to be done external to CORE-V.

## Project distribution model

The delivered code will be distributed as part of the upstream projects, allowing users to build the tool chain from source code.

Pending upstream adoption, the source code for the components will be available through mirror repositories under OpenHW Group GitHub.

For convenience, pre-built binaries for a range of operating systems are provided through the [Embecosm resource download page](https://www.embecosm.com/resources/tool-chain-downloads/#corev).

## Preliminary Project plan
<!--- A full project plan is not required at PL. A preliminary plan, which can be for instance the schedule for completion of component or feature list, together with responsible resource, should be provided. Full details should be provided at PA gate. -->
All project plans will appear as part of the Plan Approved proposal.

## Risk Register
<!--- A list of known risks, for example external dependencies, and any mitigation strategy -->
Detailed risk registers will be provided with individual PA proposals.

Risk is scored as likelihood (1-10) x impact (1-3) with mitigation required for any risk with score of 10 or more, of with an impact of 3 (project killer).

| Risk                            |   L |   I |   R | Mitigation                |
| :------------------------------ | --: | --: | --: | :------------------------ |
| Insufficient resource available |   5 |   3 |  15 | Socialize around OpenHW members to find expertise or funding. |
