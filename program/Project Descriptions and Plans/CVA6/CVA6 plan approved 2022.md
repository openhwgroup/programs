# OpenHW Project: CVA6 core

| Gate                                 | Status                                                     |
| ------------------------------------ | ---------------------------------------------------------- |
| PC gate: Project Concept             | Approved on 2020-09-28 as Preliminary Project Launch (PPL) |
| PL gate: Project Launch              | Approved on 2021-01-25                                     |
| PA gate: Plan Approved               | Seeking approval on 2022-02-28 for **2022 workplan**       |
| PA gate: Plan Approved               | 2023 and beyond workplan in future PA gate                 |

Author: Jérôme Quévremont, Thales Research & Technology

## Summary of project

The **CVA6** core is a configurable mid-range application RISC-V core able to boot a rich OS like Linux. Its origin is ETH Zürich / University of Bologna's ARIANE core.

From a single RTL source, several flavors can be configured: 32- or 64-bit architecture (**CV32A6** / **CV64A6**),
with or without FPU, with or without MMU...

CVA6 targets both **ASIC** and **FPGA soft-core** implementations.

The ability to have very similar 32- and 64-bit cores should make the transition between both quite seamless.

The goal of the project is to bring **CVA6** to an industrial maturity known as **TRL5** (technical readiness level):
- Quality documentation
- Add a few features desired by participating members
- High-coverage verification
- Optimizations for FPGA-based products
- SW tools (GCC, GDB, LLVM\*...)
- FPGA prototype and development board
- Linux and FreeRTOS\* support

\* FreeRTOS and LLVM support are developed in related OpenHW projects.

In addition to these industrial goals, a sustainable open-source solution, presumably a subset of outputs, will be maintained for researchers,
engineers seeking to evaluate CVA6 and industrial domains that need to support their products for decades.

### Summary of Timeline

CVA6 is a long-run project, for which some participants are expecting grants to perform the work needed to reach TRL5. It is therefore difficult to plan the complete project.

Therefore, in order to keep the project under control, the project plan is defined for **2022 activity**. An update of the plan will be needed beginning of 2023, together with another PA gate.

## OpenHW Members/Participants committed to participate in CORE-V CVA6 project

- Thales group:
    - Thales Research & Technology (TRT)
    - Thales DIS Design Services (INVIA)
	- Thales India / Engineering Competence Center (ECC)
- The University of Minho
- ETH Zürich
- U. Bologna (past contribution)

## Project Leader(s)

- Project Manager (PM) and Technical project leader (TPL): Jérôme Quévremont, TRT
- Verification leader: Jean-Roch Coulon, INVIA
- FPGA softcore leader: Sébastien Jacq, TRT

## Project Planning Documents

The 2022 workplan, based on milestones for various contributions and contributors, is below.

The progress towards the milestones will be tracked during progress meetings, usually every two weeks.

## Summary of requirements

### CVA6 features

The CVA6 specification has been prepared for the PA gate.
It is temporarily hosted in this [Google Docs file](https://docs.google.com/document/d/11rsoO5WKraMCraSpnsVqmt4hJaCcDG0zq7LTWdXVkf0).
After approval by the TWG, it will be converted to AsciiDoc and managed in OpenHW GitHub.

As a summary, CVA6 contains:

|                     | CV64A6                                | CV32A6                           |
| :------------------ | :-----------------------------------: | :------------------------------: |
| ISA                 | RV64IMA\[F\[D\]\]\[C\]_Zicsr_Zifencei | RV32IMA\[F\]\[C\]_Zicsr_Zifencei |
| Privilege levels    | M/S/U\*                               | M/S/U\*                          |
| Virtual memory      | \[Sv39\]                              | \[Sv32\]                         |

\[\] denotes a configurable feature.

\* In addition, CV64A6 will optionally support RISC-V Hypervisor extension.

`FENCE.T` is supported and might become a standard RISC-V instruction in the future.

The **CV-X-IF** interface will allow to extend CVA6 instruction set with an external co-processor.
It will either support proprietary extensions or RISC-V extensions that are not natively supported by CVA6.

### License scheme

Because of the nature of its business, Thales expectation is to contribute and get a **sustainable open-source solution**
- to integrate CVA6 in new ASIC and FPGA projects for a long period and to maintain/upgrade them for several decades for industrial domains (avionic, satellite, railways, energy…);
- to permit audit and reviews of verification and tools in the context of certifiable security and functional safety;
- to permit public review to improve the quality of the core and its ecosystem;
- to foster cooperative projects and connections with academy and research.

Thereforce, Thales expects:
- Not only the core RTL, but also a version of the verification environment and the SW tools are available as open-source.
- Commercial tools can be added to this basic set to deliver additional value (improved quality, coverage...).
    - But the project shall not depend on a single-source commercial tool.
	- Commercial tools with multiple sources, such as logic simulators, are acceptable.

In addition, this sustainable open-source solution, lowers barriers for newcomers to OpenHW. They can evaluate CVA6, adopt it, join OpenHW Group, add their "secret sauce"...

### Verification

To foster cooperation and efficiency within OpenHW Group, CVA6 will use and contribute to **core-v-verif**. Spike will be used as a reference ISS and Imperas OVPSim is considered too.

Gateways between OpenHW core-v-verif repositories and Thales internal environment (GitLab, CI...) will be set up.

## Future enhancements (off project):

Increasing the core architectural performance (dual issue...), adding RISC-V extensions, delivering a larger subsystem (SMP multi-core, peripherals, accelerators...)

## Explanation of why OpenHW should do this project

Like RI5CY, the ARIANE core donated by ETH Zürich and U. Bologna was at the heart of the OpenHW Group creation. We need an application processor core in our portfolio.

Also, there are very few FPGA technology-independent softcores and CV32A6 is an alternative to proprietary cores.

## Industry landscape: description of competing, alternative, or related efforts in the industry

On the core side, for ASIC targets, these are the most comparable competitors (pipeline length, MMU, single issue...):
- ARM: Cortex-A5
- SiFive: U54
- CHIPS Alliance&nbsp;/ Western Digital: CVA6 between the smaller SweRV  EL2 and the larger EH1.
- ANDES: A25 (32-bit) and AX25 (64-bit)
- Gaisler NOEL-V

On the FPGA side, CV32A6 is a technology-independent alternative to these proprietary cores:
- Xilinx: Microblaze
- MicroChip: Mi-V
- Intel: Nios-II, Nios-V

On the tool side, CHIPS Alliance has plans to make their tools open-source
([link](https://semiengineering.com/components-for-open-source-verification/), 5<sup>th</sup> paragraph).

### Market differentiators

_This section was initially titled "Related efforts to be described"._

To differentiate from the competition, marketing can stress:
- Source code written in SystemVerilog, a widely accepted language;
- Open-source availability of the core;
- Open-source availability of verification artefacts, which is a great step towards certification for security- and safety-critical applications;
- The availability of a family of technology-independent cores optimized for ASIC and FPGA targets;
- The ability to extend the instruction set thanks to the CV-X-IF interface;
- The SW ecosystem running on CVA6, with FreeRTOS and Linux already demonstrated;
- The ability to scale to SMP multi/many-core CPUs thanks to the OpenPiton framework;
- The permissive licence scheme that allows the integration in open-source or closed-source projects or the addition of a "secret sauce";
- The low exposition to export control
([OpenHW Group Membership Agreement](https://www.openhwgroup.org/membership/openhw-group-membership-agreement-2019-10-16.pdf), section 4.1).

## External dependencies

The project relies on:
- Related OpenHW projects (joint with other cores): LLVM, FreeRTOS, core-v-verif, CV-X-IF specification
- Open-source software: GCC, GDB, LLVM, Linux (Yocto, BuildRoot), OpenSBI, UBoot, BBL...
- Open-source verification: Google Riscv-dv, Spike, RISC-V compatibility tests
- Open-source hardware: fpnew (ETH Zürich, soon migrated to OpenHW)
- Eclipse Foundation, GitHub
- Digilent Genesys 2 board
- Simulators: Verilator (open-source), Siemens Questa, Synopsys VCS
- Synthesis: Vivado (Xilinx), Synopsys Design Compiler (ASIC)

CVA6 can be integrated in the OpenPiton framework to build an SMP multi/many-core CPU.

The RV32F DIV and SQRT simulation sequences will be developed as early as possible so that they can be reused by CV32E40Pv2 project.

## List of project outputs

### Documentation:

The document structure has been defined at the PL gate:
- Specification
    - Identifies features agreed upon
    - “What” defined as requirements with identifiers
    - Some sections are short (references to RISC-V ISA, AXI specs…)
- Users’ guide
    - Includes more details than the specification
    - For CVA6 integrators and users: HW, SW, ASIC, FPGA… viewpoints
- Design document
    - Explains the “How”: design choices…
    - Not prescriptive, written during or after the design.
	- Useful for next projects.
- Verification Environment Specification
    - User manual for the verification environment testbenches, testcases, verification components, etc.
    - Description of the testbench structure and theory of operation
- Design Verification Plans
    - DVplan, Verification Plan, Vplan: same meaning
    - Feature-by-feature listing of the Device Under Test
        - and a description of how it will be verified
        - and how we know when it is verified (coverage).

The specification and users' guide are inputs for design verification plans.

### Design 

- CVA6 configurable RTL source code (TRL5 target)
- Subsystems and FPGA designs, a.k.a. APU, to exercise CVA6 on development boards...


### Verification:

- Versatile generic testbench with adaptation layers for CVA6
    - Subset compliant with _sustainable open-source solution_ expectactions
- Test sequences
- Verification results
     - Including code coverage and functional coverage

### Software:

- Baremetal BSP for FPGA boards featuring CVA6
- Linux ports (based on UBoot, OpenSBI and Yocto)
- Toolchains (compiler...)

LLVM and FreeRTOS are products of related OpenHW projects.


## TGs Impacted/Resource requirements

|                 | Staff | Members |
| :-------------- | :---: | :-----: |
| Cores TG        |   X   |    X    |
| Verification TG |   X   |    X    |
| SW TG           |   X   |    X    |

### OpenHW engineering staff resource plan: requirement and availability

The OpenHW staff is expected to support the task groups on these missions:
- Mike Thompson on verification
- Florian Zaruba on software and ARIANE knowledge transfer
- Davide Schiavone on core design
- Duncan Bees on project management

### Engineering resource supplied by members - requirement and availability

The 2022 workplan below has been prepared according to available members' resources.

Grants are expected to fuel 2023 workplan with more resources, especially on verification activities.

### Marketing resource - requirement and availability

The project needs support from:

- Rick O'Connor, OpenHW CEO
- Michelle Clancy, Director of Marketing

to promote CVA6 and attract new participants to the project.

On the members' side, promotion activities (presentations, demos...) will mainly be addressed by the engineering team.

Results obtained by the engineering team in 2021 (CV32A6 release, FreeRTOS support, Linux support...) can be used
in 2022 to promote the CVA6 project.

### Funding for project aspects - requirement and availability

Some marketing activities (OpenHW TV production...) might need OpenHW funding.

Participating members provide the necessary tools to their teams.

## Architecture and/or context diagrams

![CVA6 pipeline](https://www.allaboutcircuits.com/uploads/articles/Ariane_CPU.jpg)

## Who would make use of OpenHW output

Any entity needing a mid-range verified open-source RISC-V application processing core for ASIC and FPGA technologies:
- OpenHW members
- Large and small businesses
- Academy and research
- Future OpenHW projects

Also refer to the "Market differentiators" section above.

An open-source project favors collaborative and research projects that can start quickly without commercial and legal burdens.

## Project license model

The project artefacts and outputs will be licensed under Apache 2.0 or for SW code and Solderpad 2.0 or 2.1 for HW/RTL codes.

Third-party open-source contributions will generally retain their own licence model.

"Viral" licences, such as GPL, will be avoided.

OVPSim licences will be provided by Imperas.

## Description of initial code contribution, if required

Contributions before or off the project:
- ARIANE (CV64A6) and debug, ETH Zürich and University of Bologna
- CV32A6 bare mode, INVIA
- `FENCE.T`, Hensoldt Cyber/ETH Zürich
- CV64A6 Hypervisor extension, University of Minho
- ASIC PPA assessment, INVIA
- FPGA PPA assessment, TRT

## Repository Structure

https://github.com/openhwgroup/cva6: the core master directory<br>
/core: the CVA6 core (defined as the scope of the IP in the specification and targetting 100% coverage)<br>
/corev_apu: the computing subsystem comprising CVA6<br>
/docs: CVA6 documents (specification, users' guide...)
	
https://github.com/openhwgroup/core-v-verif: the verification home<br>
/cva6: specific files for the core
	
https://github.com/openhwgroup/cva6-sdk: RISC-V tools and Linux

https://github.com/openhwgroup/core-v-docs/tree/master/program/Project%20Descriptions%20and%20Plans/CVA6: project gates.

In addition, Thales has set up an internal mirror of GitHub repositories to trigger their countinuous integration environment.

## Project distribution model

OpenHW GitHub repository

## Project plan

### 2021 contributions (between the PL and PA gates)

- CVA6 specification, joint work
- CV32A6 MMU and debug, TRT
- Complete CV32A6 release
- Several bug fixes, various teams
- Continuous integration environment, INVIA
- Operational Linux 1 (BBL, Buildroot), TRT
- Operational Linux 2 (U-Boot, OpenSBI, Buildroot), TRT
- Operational FreeRTOS, ECC
- Embench-IoT benchmarks, ICP/stall analysis environment, U. Bologna
- Various contributions (design fixes, documentation...)

### 2022 workplan

A waterfall method is used.

| Related TG      | Milestone                                                                                                                      | Target        | Contributor |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------- | ----------- |
| Core            | +50% frequency and -50% FPGA resource used for the CV32A6 soft-core                                                            | 2022-09-30    | TRT         |
| Core            | Implementation gap: CSR fixes: performance counters size...                                                                    | 2022-10-31    | ECC         |
| Core            | Implementation gap: Footprint optimisation of performance counters                                                             | 2022-10-31    | ECC         |
| Core            | L1D feature to support datasize extension to store EDC, ECC or other information.                                              | 2022-12-31    | ECC          |
| Core            | invalidate L1WTD content with the FENCE.T command.                                                                             | TBD           | ECC?        |
| Core            | Feature to transform cache ways into a scratchpad                                                                              | 2022-12-31    | ECC         |
| Core            | L1I feature to support datasize extension to store EDC, ECC or other information                                               | 2022-12-31    | ECC         |
| Core            | Add H extension as an option to CV64A6                                                                                         | 2022-07-31    | U. Minho    |
| Core            | Add custom temporal fence (`fence.t`) instruction on CV64A6 and CV32A6                                                         | 2022-05-31    | ETH         |
| Software        | Linux Yocto up and running on CVA6                                                                                             | 2022-06-30    | TRT         |
| Verification    | Trigger Thales CI from github/openhwgroup repository and maintain it                                                           | 2022-03-31    | INVIA       |
| Verification    | CV-X-IF: VPlan, coprocessor UVM agent and verification                                                                         | 2022-06-30    | INVIA       |
| Verification    | CV32E4\* verification environment reuse                                                                                        | 2022-12-31    | INVIA       |
| Verification    | First verification steps: RV32F DIV and SQRT simulation in CVA6 DV environment (to be reused by CVE40Pv2)                      | 2022-12-31    | ECC         |
| Verification    | Implementation and execution of Virtual Peripheral                                                                             | 2022-09-30    | ECC         |
| Verification    | Add riscv-arch-test suite to existing CVA6 core-v-verif CI (32-bit and 64-bit)                                                 | 2022-06-30    | ECC         |
| Verification    | CVA6 complete verification pending new grants                                                                                  | 2023 activity | INVIA       |
|                 | _For information:_                                                                                                             |               |             |
| Related project | FreeRTOS developments - maturing the boot sequence, driver eco-system for peripherals, synchronize with SW TG and MCU FreeRTOS | 2022-10-31    | ECC         |
| Off project     | Keystone FreeRTOS integration on RISC-V hardware (IBEX, CVA6 etc.), synchronize with SW TG and MCU FreeRTOS                    | 2022-12-31    | ECC         |
| Off project     | TensorflowLite deployment on Linux CVA6                                                                                        | 2022-12-31    | ECC         |

### Project tracking and meetings

The progress towards 2022 milestones will be tracked in progress meetings. Slides will be updated during the meeting and posted on CVA6 Mattermost channel.

The various activities (core, verification, software) are led in a unified project way and reported to the relevant task groups.

The CVA6 meets every week, alternating progress and technical meetings.
The meetings are well suited for East Coast, Europe and India timezones. Once a month, the meeting starts later to accomodate participants from the West Coast.

### Oustanding topics

These topics will be defined in CVA6 meetings at the relevant time:
- Overall approach for Github issues and label
- Project release version approach and estimated schedule

No Project Freeze (PF) checklist is planned in 2022.

### Risk register

|                           | Likelihood | Impact | Avoidance&nbsp;/ Mitigation                                                   |
| ------------------------- | :--------: | :----: | ----------------------------------------------------------------------------- |
| Not enough resources      | High       | Major  | The current team is expecting grants ; more participants welcome              |
| Insufficient coordination | Mid        | Mid    | Weekly meetings                                                               |
| Conflicting contributions | Mid        | Major  | Weekly meetings                                                               |
| Export control            | Low        | Major  | Apply OpenHW membership agreement (carefully review non-OpenHW contributions) |
| Lack of market appeal     | Mid        | Major  | Increase CVA6 promotion based on intermediate results                         |
