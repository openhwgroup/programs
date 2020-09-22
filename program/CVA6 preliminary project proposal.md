# OpenHW Project Proposal: CVA6 core

| Gate                                 | Status                                     |
| ------------------------------------ | ------------------------------------------ |
| PPL gate: Preliminary Project Launch | Seeking approval at TWG meeting 2020-09-28 |
| PL gate: Project Launch              |                                            |
| PPA gate: Project Plan Approved      |                                            |

The goal of this PPL gate is to seek participation of OpenHW members to the CVA6 project, scope the project and proceed to the next gate.

## Summary of project

The **CVA6** core is a configurable application RISC-V core able to boot a rich OS like Linux.

Its origin is ETH Zürich's ARIANE core.
From a single RTL source, several flavors can be configured: 32- or 64-bit architecture (**CV32A6** / **CV64A6**), with or without FPU, with or without MMU...

The goal of the project is to bring **CVA6** to an **industrial maturity**:
- Quality documentation
- Add a few features desired by participating members
- High-coverage verification
- Optimizations for FPGA-based products
- SW tools (GCC, LLVM...)
- FPGA prototype
- Linux support

In addition to these industrial goals, a **sustainable open-source solution**, presumably a subset, will be maintained for researchers, engineers seeking to evaluate CVA6 and industrials who need to support their products for decades.

### Summary of Timeline


## OpenHW Members/Participants committed to participate in CORE-V IDE project

Confirmed:
- Thales Research & Technology (TRT)
- INVIA, a Thales company
- Hensoldt Cyber
- ETH Zürich

To be confirmed:
- Imperas
- Embescom
- OpenHW staff
- others

## Technical Project Leader(s) (TPLs)

- Technical project leader: Jérôme Quévremont, TRT
- Verification leader: Mike Thompson, OpenHW

## Project Manager (PM)

- Jérôme Quévremont, TRT
- Support expected from OpenHW staff (e.g. maintaining Gantt, tracking progress)

## Project Documents

See the list of project outputs below.


## Summary of requirements

### Introduction

### Initial project requirements 

#### Functional

Compared to the _legacy_ **ARIANE** donated by ETH Zürich:

##### Hensoldt Cyber requirements:

- Support seL4
- `FENCE.T` instruction, <https://github.com/niwis/ariane/tree/fence-t>
- Synchronous resets
- Write-back L1 I+D caches

##### Thales requirements:

Configure the core at design-time to get the right performance/area/frequency point:
- Optional RV32 configuration (`XLEN=32` parameter) for embedded applications that are far below the 4 GiB boundaray
- Include or exclude the FPU (RISC-V F and D extensions)
- Include or exclude the MMU

Target ASIC and FPGA products (FPGA not only used as prototypes):
- At design time, select synchronous or asynchronous reset
- Other FPGA optimizations to be identified

Security and functional safety:
- Write-through L1 I+D caches: add a few commands and controls (invalidate/flush, enable/disable, non-cacheable regions, line/way lock, replacement policy,  _to be completed_)
- Performance counters
- At run-time, ability to disable sources of unpredictability (branch predictions...)

#### License scheme

##### Thales requirements:

Because of the nature of its business, Thales expectation is to contribute and get a **sustainable open-source solution**
- to integrate CVA6 in new ASIC and FPGA projects for a long period and to maintain/upgrade them for several decades;
- to permit audit and reviews in the context of certifiable security and functional safety;
- to permit public review to improve the quality and security of the core.

Thereforce, Thales expects:

1. Ideally, integrate in the project _open-source_ and _maintained_ building blocks (RTL, verification, SW tools...)
2. Alternatively, integrate open-source building blocks that require OpenHW to support maintenance
3. As a complement, commercial building blocks are acceptable, provided that they bring additional value (improved quality, coverage...) compared to open-source alternatives and that
   a workable alternative open-source is supported.

### Future enhancements:


## Explanation of why OpenHW should do this project

Like RI5CY, the ARIANE core donated by ETH Zürich was at the heart of the OpenHW Group creation.

## Industry landscape: description of competing, alternative, or related efforts in the industry

On the core side, these are the most comparable competitors (pipeline length, MMU, single issue...):
- ARM: Cortex-A5
- SiFive: U54
- CHIPS Alliance&nbsp;/ Western Digital: CVA6 is between the smaller SweRV  EL2 and the larger EH1.
- ANDES: A25 (32 bits) and AX25 (64 bits)
- Gaisler NOEL-V

On the tool side, CHIPS Alliance has plans to make their tools open-source ([link](https://semiengineering.com/components-for-open-source-verification/), 5<sup>th</sup> paragraph).


### Related efforts to be described

## External dependencies

## List of project outputs

Cores-TG:
- Core documentation (structure to be defined for the next gates)
- Configurable RTL source code

Verification-TG:
- Verification plans
    - Simulation
    - Formal methods
- Versatile generic testbench with adaptation layers for CVA6
- Test sequences
- Verification results, including code coverage and functional coverage and formal method reports


Core:
- Configurable RTL source code

Verification: 

## TGs Impacted/Resource requirements

## OpenHW engineering staff resource plan: requirement and availability

Key resources who could help the project:
- Mike Thompson as the verification leader

## Engineering resource supplied by members - requirement and availability

## OpenHW marketing resource - requirement and availability

## Marketing resource supplied by members - requirement and availability

## Funding supplied by OpenHW - requirement and availability 

## Funding supplied by members - requirement and availability

## Architecture diagram

## Who would make use of OpenHW output

Any entity needing a mid-range verified open-source RISC-V application processing core for ASIC and FPGA technologies:
- OpenHW members
- Large and small businesses
- Academy and research
- Subsequent OpenHW projects (e.g. SMP multi-core, vector extension...)

These users may integrate the CVA6 core both in open-source or closed-source projects. They may also add their "secret sauce" to the core.

An open-source project favors collaborative and research projects that can start quickly without commercial and legal burdens.

## Project license model

The project artefacts and outputs will be licensed under Apache 2.0 for SW code and Solderpad 2.0 for HW/RTL codes.
Third-party open-source contributions will generally retain their own licence model.
"Viral" licences, such as GPL, will be avoided in the project as some users and OpenHW members will not share the rest of their designs in open-source.
Imperas will provide the project contributors the necessary licences for the verification. Some verification actors may need several of them.

## Description of initial code contribution, if required

Contributions below are open-source, _except otherwise mentioned_.
- RTL
    - ARIANE, ETH Zürich and University of Bologna
    - `XLEN=32` configuration, INVIA
    - `FENCE.T`, Hensoldt Cyber
- Verification (to be confirmed, strategy pending)
   - Generators:
       - RISC-V DV, Google
       - Compliance tests, RISC-V International
	   - FORCE RISC-V, FutureWei
  - References:
       - Spike
	   - RISC-V SAIL model, RISC-V International
	   - Imperas ISS _(commercial)_
- SW tools
  - Open source tool generation (GCC, GDB...), INVIA
  - SW tools, Embecosm _(no source access)_

## Repository Structure

TBD in later stages

## Project distribution model

Through OpenHW GitHub repository

## Preliminary Project plan

