# OpenHW Project: CVA6 core

| Gate                                 | Status                                                     |
| ------------------------------------ | ---------------------------------------------------------- |
| PC gate: Project Concept             | Approved on 2020-09-28 as Preliminary Project Launch (PPL) |
| PL gate: Project Launch              | Approved on 2021-01-25                                     |
| PA gate: Plan Approved               | Presented on 2022-02-28 for **2022 workplan**, approved on 2022-03-28 |
| PA gate: Plan Approved               | Presented on 2023-06-26 for **2023-2024 workplan**                 |

Author: Jérôme Quévremont, Thales Research & Technology

## Summary of project

The **CVA6** core is a configurable mid-range application RISC-V core able to boot a rich OS like Linux. Its origin is ETH Zürich / University of Bologna's ARIANE core.

From a single RTL source, several flavors can be configured: 32- or 64-bit architecture (**CV32A6** / **CV64A6**),
with or without FPU, with or without MMU...

CVA6 targets both **ASIC** and **FPGA soft-core** implementations.

The ability to have very similar 32- and 64-bit cores should allow to quite seamlessly switch between them in a SoC architecture:
same core interface, a few compiler directives to change.

The goal of the project is to bring **CVA6** to an industrial maturity known as **TRL5** (technical readiness level):
- Quality documentation
- Add a few features desired by participating members
- High-coverage verification for some given CVA6 configurations (= set of parameters)
- Optimizations for FPGA-based products
- SW tools (GCC, GDB, LLVM\*...)
- FPGA prototype and development board
- Linux and FreeRTOS\* support

\* FreeRTOS and LLVM support are developed in related OpenHW projects.

Additional goal: A sustainable open-source solution, presumably a subset of outputs, will be maintained for researchers,
engineers seeking to evaluate CVA6 and industrial domains that need to support their products for decades.

### Summary of Timeline

CVA6 is a long-run project, addressing several configurations of the core. It is therefore difficult to plan the complete project.

Therefore, we first got a project plan for **2022 activity**. Then it is updated with **2023-2024** activity (mostly aligned with the TRL5 verification of a first CV32A6 configuration). An update is expected for the upcoming verification of a CV64A6 configuration.

## OpenHW Members/Participants committed to participate in CORE-V CVA6 project

- Thales group:
    - Thales Research & Technology (TRT)
    - Thales Secure Silicon (TSS, formerly known as INVIA)
    - Thales India / Engineering Competence Center (ECC)
- The University of Minho
- Zero-Day Labs
- ETH Zürich
- U. Bologna (past contribution)
- 10xEngineers
- MU-Electronics
- CEA
- PlanV (expected)

## Project Leader(s)

- Project Manager (PM) and Technical project leader (TPL): Jérôme Quévremont, TRT
- Verification leader and main committer: Jean-Roch Coulon, TSS
- FPGA softcore leader: Sébastien Jacq, TRT

## Project Planning Documents

The 2022 and 2023-2024 workplans are below.

The progress towards the milestones will be tracked during CVA6 meetings, usually once a month.

## Summary of requirements

### CVA6 features

The CVA6 specification was prepared for the previous 2022-02-28 PA gate and approved by the Technical WG. It is now available in [ReadTheDocs](https://docs.openhwgroup.org/projects/cva6-user-manual/02_cva6_requirements/cva6_requirements_specification.html).

To avoid duplications and risks of inconsistencies, it is not copied here.

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

To foster cooperation and efficiency within OpenHW Group, CVA6 will use and contribute to **core-v-verif**. Spike will be used as a reference ISS. Imperas OVPSim could be considered in the future.

Gateways between OpenHW core-v-verif repositories and Thales internal environment (GitLab, CI...) will be set up.

Early 2023, the verification has been split into several steps:
- **Step 1**: Verify the features available to the programmer (RISC-V instructions, CSRs...) of **CV32A60X**, a "small" configuration of CVA6.
- **Step 2**: Verify the **CV32A60X** microarchitecture, i.e. the non-ISA performance features (e.g. branch prediction, caches...)
- **Step 3**: Verify a CV64A6__ "large" configuration.

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
- Source code written in **SystemVerilog**, a widely accepted language;
- **Open-source** availability of the core;
- Open-source availability of verification artefacts, which is a great step towards certification for security- and safety-critical applications;
- The availability of a family of **technology-independent cores optimized for ASIC and FPGA targets**;
- The ability to **extend the instruction** set thanks to the CV-X-IF interface;
- The **SW ecosystem** running on CVA6, with FreeRTOS and Linux already demonstrated;
- The ability to scale to SMP multi/many-core CPUs thanks to the OpenPiton framework;
- The permissive licence scheme that allows the integration in open-source or closed-source projects or the addition of a "secret sauce";
- The low exposition to export control
([OpenHW Group Membership Agreement](https://www.openhwgroup.org/membership/openhw-group-membership-agreement-2019-10-16.pdf), section 4.1).

## External dependencies

The project relies on:
- Related OpenHW projects (joint with other cores): LLVM, FreeRTOS, core-v-verif, CV-X-IF specification
- Open-source software: GCC, GDB, LLVM, Linux (Yocto, BuildRoot), OpenSBI, UBoot, BBL...
- Open-source verification: Google Riscv-dv, Spike, RISC-V compatibility tests
- Open-source hardware: fpnew (ETH Zürich), first verified in CV32E40Pv2
- Eclipse Foundation, GitHub
- Digilent Genesys 2 board
- JADE Design Automation's Register Manager
- Simulators: Verilator (open-source), Siemens Questa, Synopsys VCS
- Synthesis: Vivado (Xilinx), Synopsys Design Compiler (ASIC)

CVA6 can be integrated in the OpenPiton framework to build an SMP multi/many-core CPU.

## List of project outputs

### Documentation:

The document structure has been defined at the PL gate:
- Requirement specification
    - Identifies features agreed upon
    - “What” defined as requirements with identifiers
    - Can be seen as a datasheet
- Users’ guide
    - Includes more details than the specification
    - For CVA6 integrators and users: HW, SW, ASIC, FPGA… viewpoints
- Design document
    - Explains the “How”: design choices…
    - Not prescriptive, written during or after the design
    - Useful for next projects and certain certification schemes
- Verification Environment Specification
    - User manual for the verification environment testbenches, testcases, verification components, etc.
    - Description of the testbench structure and theory of operation
- Design Verification Plans
    - DVplan, Verification Plan, Vplan: same meaning
    - Feature-by-feature listing of the Device Under Test
        - and a description of how it will be verified
        - and how we know when it is verified (coverage).
    -   Prepared with the [VPTOOL](https://github.com/openhwgroup/core-v-verif/tree/master/tools/vptool) utility

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

- Baremetal BSP for Genesys 2 FPGA board featuring CVA6
- Linux ports for CV32A6 and CV64A6 on the Genesys 2 board, based on UBoot bootloader, OpenSBI firmware and Yocto embedded Linux distribution builder
- Toolchains (parameters for GCC compilation...)

FreeRTOS is a products of a related OpenHW project, that will be kept in sync with the CVA6 project.


## TGs Impacted/Resource requirements

|                 | Staff | Members |
| :-------------- | :---: | :-----: |
| Cores TG        |   X   |    X    |
| Verification TG |   X   |    X    |
| SW TG           |   X   |    X    |

### OpenHW engineering staff resource plan: requirement and availability

The OpenHW staff are expected to support the project on their scope:
- Mike Thompson, Director of Engineering, Verification Task Group
- Florian Zaruba, Director of Engineering, HW & SW Task Groups
- Davide Schiavone, Director of Engineering, Cores Task Group
- Duncan Bees, Director, Technical Programs

Florian's experience as the creator of ARIANE is also required for technical guidance.

### Engineering resource supplied by members - requirement and availability

The 2022 and 2023-2024 workplans below have been prepared according to available members' resources.

### Marketing resource - requirement and availability

The project needs support from:

- Rick O'Connor, OpenHW CEO, and his successor
- Michelle Clancy, Director of Marketing

to promote CVA6 and attract new participants to the project.

On the members' side, promotion activities (presentations, demos...) will mainly be addressed by the engineering team.

Results obtained by the engineering team in 2021 (CV32A6 release, FreeRTOS support, Linux support...) and in 2022
(Yocto support, CV-X-IF addition, FPGA optimizations, continuous integration in place...) can be used to promote the CVA6 project.

### Funding for project aspects - requirement and availability

Some marketing activities (OpenHW TV production...) might need OpenHW funding.

Participating members provide the necessary tools to their teams.

The activities of some participants are supported by the **FRACTAL** and **TRISTAN** projects, which have received funding from the
Key Digital Technologies Joint Undertaking (KDT JU) under grant agreements 877056 and 101095947. The JU receives support from
the European Union’s Horizon Europe research and innovation program.

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

Linux and Yocto activities will retain the "upstream" licenses.

"Viral" licences, such as GPL, will be avoided.

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
	
https://github.com/openhwgroup/cva6-sdk: RISC-V tools and BuiltRoot Linux

https://github.com/openhwgroup/meta-cva6-yocto: Yocto Linux

https://github.com/openhwgroup/core-v-docs/tree/master/program/Project%20Descriptions%20and%20Plans/CVA6: project gates.

In addition, Thales has set up an internal mirror of GitHub repositories to trigger their countinuous integration environment.

## Project distribution model

OpenHW GitHub repository

## Project plan

### 2021 contributions (between the PL and PA gates)

- CVA6 specification, joint work
- CV32A6 MMU and debug, TRT
- Complete CV32A6 release
- Continuous integration environment, INVIA
- Operational Linux 1 (BBL, Buildroot), TRT
- Operational Linux 2 (U-Boot, OpenSBI, Buildroot), TRT
- Operational FreeRTOS, ECC
- Embench-IoT benchmarks, ICP/stall analysis environment, U. Bologna
- Various contributions (bug fixes, documentation...)

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
| Project-wide    | Raise a CQ (Eclipse contribution questionnaire)                                                                                | 2022-06-30    | Jérôme, Mike |
| Verification    | CVA6 complete verification pending new grants                                                                                  | 2023 activity | INVIA       |
|                 | _For information:_                                                                                                             |               |             |
| Related project | FreeRTOS developments - maturing the boot sequence, driver eco-system for peripherals, synchronize with SW TG and MCU FreeRTOS | 2022-10-31    | ECC         |
| Off project     | Keystone FreeRTOS integration on RISC-V hardware (IBEX, CVA6 etc.), synchronize with SW TG and MCU FreeRTOS                    | 2022-12-31    | ECC         |
| Off project     | TensorflowLite deployment on Linux CVA6                                                                                        | 2022-12-31    | ECC         |

### 2023-2024 workplan

A waterfall method is used.

| Related TG      | Milestone                                                                                                                      | Target        | Contributor                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------- | ----------------------------------------------- |
| Core            | User guide: sections needed for step 1 verification (instructions, CSR...)                                                     | 2023-Q3       | All, led by Jérôme                              |
| Core            | User guide: sections needed for step 2 verification (microarchitecture when relevant in the users' guide...)                   | 2024-Q3       | All, led by Jérôme                              |
| Core            | Design document: description of the microarchitecture needed for step 2 verification                                           | 2024-Q3       | All, led by TSS                                 |
| Core            | Interface with vector coprocessor merged in master branch                                                                      | 2023-Q2       | ETH                                             |
| Core            | Hypervisor support merged in master branch                                                                                     | 2023-Q2       | Zero-Day Labs (based on prior work at U. Minho) |
| Core            | Evolutions to interface with high performance data cache merged in master branch                                               | 2023-Q2       | CEA                                             |
| Core            | To be confirmed: Evolutions to support new coherent cache systems for 2 to 4 cores                                             | TBC           | PlanV                                           |
| Core            | Zicond support integrated in CVA6 RTL                                                                                          | 2023-Q2       | 10xEngineers                                    |
| Core            | Performance counters: bridge gaps vs. requirements                                                                             | 2023-Q2       | ECC                                             |
| Core            | Instruction scratchpad integrated in CVA6                                                                                      | July 2023     | ECC                                             |
| Core            | Data scratchpad integrated in CVA6: design reviews                                                                             | October 2023  | ECC                                             |
| Core            | Data scratchpad integrated in CVA6: implementation                                                                             | February 2024 | ECC                                             |
| Core            | Configurable reset                                                                                                             | December 2023 | ECC                                             |
| Core            | Note to requirement ISA-110                                                                                                    | December 2023 | ECC                                             |
| Core            | FPGA optimizations: finish committing existing optimizations                                                                   | 2023-Q3       | TRT                                             |
| Core            | FPGA optimizations: focus on frequency increase                                                                                | 2023-Q4       | TRT                                             |
| Core            | ASIC design flow: implement Synopsys synthesis and place and route                                                             | 2023-Q4       | TSS                                             |
| Core            | Parametrization (replace configuration packages and `directives by top-level SV parameters)                                    | 2023-Q3       | TSS                                             |
| Core            | Corrections related to verification activities                                                                                 | Continuous    | TSS and MU-Electronics                          |
| Verification    | Verification step 1: DVPlans                                                                                                   | 2023-Q3       | TSS (lead), 10xEngineers, MU-Electronics, ECC   |
| Verification    | Verification step 1: CV32A60X is verified at programmer's view level                                                           | 2023-Q4       | TSS (lead), 10xEngineers, MU-Electronics, ECC   |
| Verification    | Verification step 1: Create Spike tandem                                                                                       | 2023-Q3       | TSS (lead)                                      |
| Verification    | Verification step 2: DVPlans                                                                                                   | 2024-Q3       | TSS (lead), 10xEngineers, MU-Electronics, ECC   |
| Verification    | Verification step 2: CV32A60X is fully verified (programmer's view level + microarchitecture)                                  | 2024-Q4       | TSS (lead), 10xEngineers, MU-Electronics, ECC   |
| Verification    | CV32A60X released, Project Freeze (PF) checklist                                                                               | 2024-Q4       | TSS (lead) and verification team                |
| Software        | Linux Yocto (with BuildRoot and OpenSBI) available in an OpenHW repository                                                     | 2023-Q2       | TRT                                             |
|                 | _For information: FreeRTOS project related to CVA6_                                                                            |               |                                                 |
| Related project | Validate PMP features on CVA6 with applications on FreeRTOS                                                                    | November 2023 | ECC                                             |
| Related project | Integrate updated release of FreeRTOS kernel into CVA6 FreeRTOS with device drivers implemented, upstream to main repo         | TBD           | ECC                                             |
| Related project | Port the new FreeRTOS on CVA6-apu                                                                                              | TBD           | ECC                                             |

### Project tracking and meetings

The progress will be tracked in CVA6 meetings: specific Gantt for step 1 and 2 verification, GitHub project board for non-verification activities.
Short minutes and informal documents will be posted to Mattermost's CVA6 channel, to keep the whole team updated
(and taking into account that such information is not long-lived).

The various activities (core, verification, software) are reported to the relevant task groups, based on their respective reporting format.

The CVA6 usually meets every week, the agenda contains progress and technical topics.
The meetings are well suited for East Coast, Europe and India timezones. Once a month, the meeting starts later to accomodate participants from the West Coast.

In addition, the contributors to verification activities have a dedicated weekly meeting.

### Oustanding topics

The release plan and Project Freeze (PF) checklist for CV32A60X need to be defined before the end of step 2. This release is known under v5.0.0 number.

### Risk register

|                             | Likelihood | Impact | Avoidance&nbsp;/ Mitigation                                                      |
| --------------------------- | :--------: | :----: | ---------------------------------------------------------------------------------|
| Not enough resources        | Mid        | Major  | Some members have received grants. Need to recruit more members on verification. |
| Insufficient coordination   | Mid        | Mid    | Weekly meetings                                                                  |
| Conflicting contributions   | Mid        | Major  | Weekly meetings                                                                  |
| Hard to merge contributions | High       | Mid    | Updated CONTRIBUTING.md                                                          |
| Export control              | Low        | Major  | Apply OpenHW membership agreement (carefully review non-OpenHW contributions)    |
| Lack of market appeal       | Mid        | Major  | Marketing/dissemination + CV32A60X is expected to be fully verified in 2024.     |

## PA Checklist

*Confirm in the table below that each listed item is completed, or explain the exception/waiver*

| Item                                                | Completion (Y/N/In progress/NA) | Comment |      
| --------------------------------------------------- | --------------------------------| --------|
| Project Concept Complete                            | Y                               |         |
| Project Launch Complete                             | Y                               |         |
| SW Target platform identified                       | Y                               |         |
| Cores Part Number identified	                      | Y                               | CV32A60X for steps 1 and 2 |
| Cores TRL Target identified	                      | Y                               |         |
| Project release plan identified                     | N                               | Activity for step 2 |
| HL Project deliverables identified                  | Y                               |         |
| Feature list available                              | Y                               | See requirement specification |
| Resource plan available                             | Y                               | Team in place for steps 1 and 2 |
| Repo setup                                          | Y                               |         |
| License.md file in place                            | Y                               |         |
| Project Manager identified                          | Y                               |         |
| Technical Project Leader per deliverable identified | Y                               | For verification and FPGA activities |
| At least 1 project committer elected                | Y                               |         |
| Work Breakdown Structure available                  | Y                               |         |
| Baseline schedule available                         | Y                               |         |
| Ongoing schedule tracking identified                | Y                               |         |
| Regular project meeting setup                       | Y                               |         |
| Project Monthly report format agreed                | Y                               |         |
| Risk Register available                             | Y                               |         |
| Set of Project Freeze/Release Checklists identified | N                               | Activity for step 2 |
