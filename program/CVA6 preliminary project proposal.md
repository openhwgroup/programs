# OpenHW Project Proposal: CVA6 core

| Gate                                 | Status                                     |
| ------------------------------------ | ------------------------------------------ |
| PPL gate: Preliminary Project Launch | Seeking approval at TWG meeting 2020-09-28 |
| PL gate: Project Launch              |                                            |
| PPA gate: Project Plan Approved      |                                            |

The goal of this PPL gate is to seek participation of OpenHW members to the CVA6 project and proceed to the PL gate by scoping and planning the project.

## Summary of project

The **CVA6** core is a configurable mid-range application RISC-V core able to boot a rich OS like Linux. Its origin is ETH Zürich's ARIANE core.

From a single RTL source, several flavors can be configured: 32- or 64-bit architecture (**CV32A6** / **CV64A6**),
with or without FPU, with or without MMU, FPGA optimizations...
The ability to have very similar 32- and 64-bit cores should make the transition seamless.

The goal of the project is to bring **CVA6** to an **industrial maturity**:
- Quality documentation
- Add a few features desired by participating members
- High-coverage verification
- Optimizations for FPGA-based products
- SW tools (GCC, LLVM...)
- FPGA prototype and development board
- Linux support

In addition to these industrial goals, a **sustainable open-source solution**, presumably a subset of outputs, will be maintained for researchers,
engineers seeking to evaluate CVA6 and industrial domains that need to support their products for decades.

### Summary of Timeline

The goal is to have all deliverables ready in **June 2022**. A refined planning should be elaborated for the PL gate.

## OpenHW Members/Participants committed to participate in CORE-V IDE project

Confirmed:
- Thales group:
    - Thales Research & Technology (TRT)
    - Thales DIS Design Services (INVIA)
- Hensoldt Cyber
- ETH Zürich

To be confirmed:
- Imperas
- Embecosm
- OpenHW staff
- Futurewei?
- **other members needed**

## Technical Project Leader(s) (TPLs)

- Technical project leader (TPL): Jérôme Quévremont, TRT
- Documentation leader: Florian Zaruba, OpenHW
- Verification leader: Mike Thompson, OpenHW
- _Need identified leaders on other themes/TG?_

## Project Manager (PM)

Three options (starting from the most desired):
1.  Call for participation from an OpenHW member company
    - Thales would like to have participation from more OpenHW partners so encourages this.
    - Staff can assist.
2. PM is OpenHW staff member. 
    - Work closely with the TPL to document the plan.
    - Note that members own this project. In this case, staff PM would be more in background.
3. PM is also Jérôme
    - with support from staff for intergroup coordination and Gantt planning, etc.
    - Jérôme (PM) reports status to TWG.
    - Risky from Thales resource perspective
	
PM role:
-	coordinate and document a project plan (key technical and project steps), 
-	keep track of who is doing what, 
-	plan sprints/waterfall, 
-	identify issues that are blocking the way, 
-	reports issues to TWG, 
-	related to the technical leader role but a bit more toward the planning, tracking and and reporting.


## Project Documents

See the list of project outputs below.


## Summary of requirements

### Introduction

These are requirements identified as of the PPL gate.
They are expected to evolve until the PL gate, as members join and refine the project plan.
The detailed specification will be part of the project itself.

### Initial project requirements 

#### Functional

Compared to the _legacy_ **ARIANE** donated by ETH Zürich:

##### Hensoldt Cyber requirements:

- Support seL4
- `FENCE.T` instruction, <https://github.com/niwis/ariane/tree/fence-t>
- Synchronous resets
- Write-back L1 I+D caches
    - In connection with ETH Zürich

##### Thales requirements:

Configure the core at design-time to get the right performance/area/frequency point:
- Optional RV32 configuration (`XLEN=32` parameter) for embedded applications that are far below the 4 GiB boundaray
    - The large similarity between CV32A6 and CV64A6 should ease the transition and reduce SW rework when jumping to the 64-bit architecture.
- Include or exclude the FPU (RISC-V F and D extensions both for CV32A6 and CV64A6)
- Include or exclude the MMU

Security and functional safety:
- Write-through L1 I+D caches: add a few commands and controls (invalidate/flush, enable/disable, non-cacheable regions, line/way lock, replacement policy,  _to be detailed during specification_)
- Advanced performance counters
- At run-time, ability to disable sources of unpredictability (branch predictions...)

Target ASIC and FPGA products (FPGA not only used as prototypes):
- At design time, select synchronous or asynchronous reset
- Other FPGA optimizations to be identified
    - _Note:_ Thales is co-organizing a student contest in France to get fresh ideas on this topic and promote OpenHW.
	Some elegant student findings might be injected in CV32A6. Thales will act as a firewall between students and OpenHW.

#### License scheme

##### Thales expectactions:

Because of the nature of its business, Thales expectation is to contribute and get a **sustainable open-source solution**
- to integrate CVA6 in new ASIC and FPGA projects for a long period and to maintain/upgrade them for several decades for industrial domains (avionic, satellite, railways, energy…);
- to permit audit and reviews of verification and tools in the context of certifiable security and functional safety;
- to permit public review to improve the quality of the core and its ecosystem;
- to foster cooperative projects and connections with academy and research.

Thereforce, Thales expects:
- Not only the core RTL, but also a version of the simulation environment and the SW tools are available as open-source.
- Commercial tools can be added to this basic set to deliver additional value (improved quality, coverage...).
    - But the project shall not depend on a single-source commercial tool.
	- Commercial tools with multiple sources, such as logic simulators, are acceptable.

In addition, this sustainable open-source solution, removes barriers for newcomers to OpenHW,
as it was the case for ARIANE with the GNU toolchain and the testbench offered by ETH Zürich.
They can evaluate CVA6, adopt it, join OpenHW Group, add their "secret sauce"...

> “Open source tools are the best friends of open hardware.”

#### Verification

OpenHW CEO's expectaction: unified testbench for all CORE-V cores (CVE4, CVA6)

Thales expectactions: Industrial quality:
- High coverage
- Complete package (incl. good quality documentation aligned with verification)
 
Verification leader's expectactions:
- Coverage-driven verification to ensure completeness and quality of results
- Use of SystemVerilog and UVM
- Industrial quality tools
- On-the-fly, in-simulation checking of DUT against a Reference Model
    - Step-and-compare is current technique used
- Ability to offer access and support to non-commercial members of the Open Source community
- Flexibility to support multiple verification components
    - e.g. ISGs, RMs, Scoreboards, etc.

### Future enhancements:

Adding standard or custom extensions, superscalar, SMP multi-core processor, SoC building blocks, architecture generation, build a silicon application processor...

## Explanation of why OpenHW should do this project

Like RI5CY, the ARIANE core donated by ETH Zürich was at the heart of the OpenHW Group creation. We need an application processor core in our portfolio.

## Industry landscape: description of competing, alternative, or related efforts in the industry

On the core side, these are the most comparable competitors (pipeline length, MMU, single issue...):
- ARM: Cortex-A5
- SiFive: U54
- CHIPS Alliance&nbsp;/ Western Digital: CVA6 between the smaller SweRV  EL2 and the larger EH1.
- ANDES: A25 (32-bit) and AX25 (64-bit)
- Gaisler NOEL-V is more powerful (dual-issue in-order pipeline).

On the tool side, CHIPS Alliance has plans to make their tools open-source
([link](https://semiengineering.com/components-for-open-source-verification/), 5<sup>th</sup> paragraph).

### Related efforts to be described

To differentiate from the competition, marketing can stress the:
- open-source availability,
- the permissive licence scheme,
- the low exposition to export control
([OpenHW Group Membership Agreement](https://www.openhwgroup.org/membership/openhw-group-membership-agreement-2019-10-16.pdf), section 4.1).

## External dependencies

- Open-source: GCC, LLVM...
- Eclipse Foundation, GitHub
- Metrics
- Digilent Genesys 2 board
- others

## List of project outputs

Cores-TG:
- Specification
- Core documentation (structure to be defined for the next gates)
- Configurable RTL source code

Verification-TG:
- Verification plans (simulation)
- Versatile generic testbench with adaptation layers for CVA6
    - Subset compliant with _sustainable open-source solution_ expectactions
- Test sequences
- Verification results
     - Including code coverage and functional coverage
- Option: formal verification
     - Verification plan
	 - Bug reports
	 - Verification report

HW TG:
- FPGA design for Digilent 2 board

SW TG:
- Full open-source SW suite (compliant with _sustainable open-source solution_ expectactions)
- Added-value SW suite
- Open-source baremetal BSP
- Open source Linux port

## TGs Impacted/Resource requirements

|                 | Staff | Members |
| :-------------- | :---: | :-----: |
| Cores TG        |   X   |    X    |
| Verification TG |   X   |    X    |
| HW TG           |   X   |    X    |
| SW TG           |   X   |    X    |

### OpenHW engineering staff resource plan: requirement and availability

The OpenHW staff is expected to support the task groups according to their usual mission.

In addition, specific roles:
- Rick O'Connor: promote the project and attract new participants
- Florian Zaruba: documentation leader
- Mike Thompson: verification leader
- Duncan Bees: TDB w.r.t. the selected PM

The preliminary project plan (last section) shows a dire lack of verification manpower.
Can OpenHW subcontract some tasks if members do not provide enough resources?

### Engineering resource supplied by members - requirement and availability
According to project plan (last section)

### OpenHW marketing resource - requirement and availability
TBD

### Marketing resource supplied by members - requirement and availability
TBD

### Funding supplied by OpenHW - requirement and availability
TBD 

### Funding supplied by members - requirement and availability
TBD

## Architecture diagram

|                  | CV64A6              | CV32A6              |
| :--------------- | :-----------------: | :-----------------: |
| ISA              | RV64IMA\[FD\]CZicsr | RV32IMA\[FD\]CZicsr |
| Privilege levels | M/S/U               | M/S/U               |
| [Virtual memory] | \[Sv39\]            | \[Sv32\]            |

\[\] denotes a configurable feature.

![CVA6 pipeline](https://www.allaboutcircuits.com/uploads/articles/Ariane_CPU.jpg)

## Who would make use of OpenHW output

Any entity needing a mid-range verified open-source RISC-V application processing core for ASIC and FPGA technologies:
- OpenHW members
- Large and small businesses
- Academy and research
- Future OpenHW projects

These users may integrate the CVA6 core both in open-source or closed-source projects. They may also add their "secret sauce".

An open-source project favors collaborative and research projects that can start quickly without commercial and legal burdens.

## Project license model

The project artefacts and outputs will be licensed under Apache 2.0 for SW code and Solderpad 2.0 for HW/RTL codes.

Third-party open-source contributions will generally retain their own licence model.

"Viral" licences, such as GPL, will be avoided.

Imperas will provide the project contributors the necessary licences for the verification. Some verification actors may need several tokens.

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
	   - FORCE RISC-V, Futurewei (when 32-bit support is implemented)
  - References:
       - Spike
	   - RISC-V SAIL model, RISC-V International
	   - Imperas ISS _(commercial)_
- SW tools
  - Open source tool generation (GCC, GDB...), INVIA
  - SW tools, Embecosm _(no source access)_

## Repository Structure

TBD

## Project distribution model

OpenHW GitHub repository

## Risks

Very preliminary analysis of major risks (feedback welcome):

|                               | Likelihood | Impact     | Avoidance&nbsp;/ Mitigation                       |
| ----------------------------- | :--------: | :----:     | ------------------------------------------------- |
| **Not enough resources**      | **High**   | **Severe** | **Find more contributors / OpenHW subconcracts ** |
| Not enough coordination       | Mid        | Major      | PM in addition to the TPL                         |
| Export control                | Low        | Severe     | Apply OpenHW membership agreement                 |
| Excessive verification effort | High       | Major      | Wise selection of verified configurations         |
| Lack of market appeal         | ?          | Major      | ?                                                 |


## Preliminary Project plan

Preliminary (to be completed and reviewed by participants):

| TG                       | Task                                                            | Contributor(s)              |
| ------------------------ | --------------------------------------------------------------- | --------------------------- | 
| Cores                    | Specifications                                                  | Participating members       |
| Cores                    | Documentation                                                   | F. Zaruba                   |
| Cores                    | Fix lint warning and errors                                     | ?                           |
| Cores                    | Develop 32-bit MMU (Sv32)                                       | INVIA                       |
| Cores                    | Adapt F,D MMU to 32-bit architecture                            | ?                           |
| Cores                    | Make WT cache configurable                                      | INVIA, TRT                  |
| Cores                    | Develop WB cache                                                | ETH Zürich                  |
| Cores                    | Safety options to make the core more predictable                | TRT                         |
| Cores                    | `FENCE.T` instruction                                           | Hensoldt Cyber              |
| Cores                    | Configurable multiplier/divider: 1 or more cycles               | ?                           |
| Cores                    | Standard extensions: B, V, crypto...                            | ?                           |
| Cores                    | Generic reset (sync/async, active high/low)                     | Hensoldt Cyber, ETH Zürich? |
| Cores                    | FPGA optimizations                                              | TRT                         |
| Cores                    | _Other tasks?_                                                  | ?                           |
| HW                       | FPGA implementation on Genesys 2                                | TRT                         |
| HW                       | _Other tasks?_                                                  | ?                           |
| HW                       | _Other tasks?_                                                  | ?                           |
| SW                       | Support GCC rv64gc/r32gc up-to-date versions with multilibs     | INVIA                       |
| SW                       | Support LLVM rv64gc/r32gc up-to-date versions with multilibs    | INVIA                       |
| SW                       | _Contribution to be described_                                  | Embecosm                    |
| SW                       | Implement standard extensions (B, V...) in GCC/LLVM             | ?                           |
| SW                       | Implement standard extensions (B, V...) in Sail ISS             | ?                           |
| SW                       | Baremetal BSP (Genesys2)                                        | TRT                         |
| SW                       | Linux (Genesys 2)                                               | TRT                         |
| SW                       | Run benchmarks                                                  | TRT                         |
| SW                       | _Other tasks?_                                                  | ?                           |
| Verification (testbench) | Support open source simulator: Veripool (Verilator)             | INVIA                       |
| Verification (testbench) | Support simulators: Mentor, Synopsys, Cadence, Aldec...         |                             |
| Verification (testbench) | Support simulator: Metrics                                      | Staff?                      |
| Verification (testbench) | Support open source ISS : Spike ans Sail                        | INVIA                       |
| Verification (testbench) | Support ISS : Imperas (OVPsim)                                  | Imperas                     |
| Verification (testbench) | Support Riscv-dv Random Generation with VCS (Synopsys)          | INVIA                       |
| Verification (testbench) | Support FORCE-RISCV generator (32 and 64 bit)                   | Futurewei?                  |
| Verification (testbench) | Support “trace and compare” checker                             | INVIA                       |
| Verification (testbench) | Support “step and compare” checker                              | Staff?                      |
| Verification (testbench) | Implement CI based on open source tools, gitlab-ci              | Staff?                      |
| Verification (testbench) | Define  CVA6 HW configs (64/32bits, FPU disable/enable,…)       | INVIA and participants      |
| Verification (testbench) | Memory preload to boost simulation time with Verilator          | INVIA, F. Zaruba            |
| Verification (testbench) | Add functional coverage checkers                                | ?                           |
| Verification (testbench) | Extract code coverage with Questa                               | INVIA                       |
| Verification (testbench) | _Other tasks?_                                                  | ?                           |
| Verification (tests)     | Edit and maintain verifications plans                           | ?                           |
| Verification (tests)     | Riscv-compliance, riscv-tests regression suites                 | ?                           |
| Verification (tests)     | Riscv-dv Instruction Random Generation                          | ?                           |
| Verification (tests)     | FORCE-RISCV Instruction Random Generation                       | ?                           |
| Verification (tests)     | Continous integration with different CVA6 configurations        | ?                           |
| Verification (tests)     | Tests for added extensions                                      | ?                           |
| Verification (tests)     | Add tests to increase coverage                                  | ?                           |
| Verification (tests)     | Reach 100% code coverage                                        | ?                           |
| Verification (tests)     | Reach 100% functional coverage                                  | ?                           |
| Verification (tests)     | Option: formal verification plan                                | Axiomise                    |
| Verification (tests)     | Option: execute formal verification                             | Axiomise                    |
| Verification (tests)     | _Other tasks?_                                                  |                             |

? denotes an optional task or missing contributors.
