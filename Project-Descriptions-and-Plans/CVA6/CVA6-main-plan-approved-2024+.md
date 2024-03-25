# OpenHW Project: CVA6 core (main project)

| Gate                                 | Status                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------- |
| PC gate: Project Concept             | Approved on 2020-09-28 as Preliminary Project Launch (PPL)                 |
| PL gate: Project Launch              | Approved on 2021-01-25                                                     |
| PA gate: Plan Approved               | Presented on 2022-02-28 for **2022 workplan**, approved on 2022-03-28      |
| PA gate: Plan Approved               | Presented on 2023-06-26 for **2023-2024 workplan**, approved on 2023-08-12 |
| PA gate: Plan Approved               | To be resented on 2024-03-25 to **address several CVA6 configurations**    |

Author: Jérôme Quévremont, Thales Research & Technology

## Summary of project

**CVA6** is a family of configurable mid-range application and embedded RISC-V cores.
Its origin is the ARIANE core from the PULP team (ETH Zürich & University of Bologna).

From a single RTL source, several flavors can be configured: 32- or 64-bit architecture (**CV32A6** / **CV64A6** sub-families),
with or without FPU, with or without MMU...

An instance of CVA6 with a defined list of parameter values is called a **configuration**.
Configurations that target the industrial maturity known as **TRL5** (technical readiness level)
are given a **part number** beginning with CV32A6 or CV64A6 (e.g. CV32A60AX).

CVA6 targets both **ASIC** and **FPGA soft-core** implementations.

The ability to have very similar 32- and 64-bit cores should allow to quite seamlessly switch between them in a SoC architecture:
same core interface, a few compiler directives to change.

The main goal of the project is to bring **CVA6** configurations to **TRL5**:
- Quality documentation
- Add a few features desired by participating members
- High-coverage verification for some given CVA6 configurations
- Optimizations for FPGA-based products
- SW tools (GCC, GDB, LLVM<sup>1</sup>...)
- FPGA prototype and development board
- Linux and FreeRTOS<sup>1</sup> support

Note:<br>
<sup>1</sup> FreeRTOS and LLVM support are developed in related OpenHW projects.

Additional goal: A sustainable open-source solution, presumably a subset of outputs, will be maintained for researchers,
engineers seeking to evaluate CVA6 and industrial domains that need to support their products for decades.

### Summary of Project Structure

As the list of CVA6 configurations targetting TRL5 is growing,
the maturing of specific CVA6 configurations, mostly based on verification, will be spun off to **sub-projects**,
while this **main project** will host joint activities and maintenance of the CVA6 repository.

In addition, **sister projects** host developments that closely relate with CVA6.

### Summary of Timeline

The CVA6 main project has indeed evolved to become an umbrella project for several CVA6 configurations.
It is not possible at this point in time to identify an end date for the project.

The first verified configuration is expected at the end of 2024. Several other TRL5 configurations will follow.

## OpenHW Members/Participants committed to participate in CORE-V CVA6 main and sub-projects

- Thales group:
    - Thales Research & Technology France (TRT)
    - Thales Secure Silicon (TSS, formerly known as INVIA)
    - Thales India / Engineering Competence Center (ECC)
- The University of Minho
- Zero-Day Labs
- PULP team (ETH Zürich and U. Bologna)
- 10xEngineers
- MU-Electronics
- CEA
- PlanV
- A partner of the TRISTAN project
- A start up company

## Project Structure

The CVA6 project has evolved to a main project and several sub-projects as more CVA6 configurations are envisioned to target TRL5.

### Common goals

Despite the number of sub-projects, the following goals will be pursued by the main and sub-projects:
- Optimize the effort sharing and reuse between configurations
- Keep a common RTL database (with parameters)
- Manage a common documentation
- Still be able to accept relevant evolutions (but be more selective than in the past)

The scopes of the main, sub-, and sister projects are described below:

### Main project

The main CVA6 project includes:
- The synchronization with the sub-projects
- The review and selection of proposed CVA6 evolutions<sup>2</sup>
- The review of pull requests (PRs) modifying CVA6 repository, mostly to check that the PR meets the project goals and quality targets
- The maintenance of the GitHub-triggered CI flow, the CVA6 GitHub repository , the triage of external issues
- Design and verification activities that are not hosted in a sister project (MMU unification, FPGA optimizations...)
- Identification of reused/joint/new verification building blocks (DV plans, agents, sequences...)
- Creation/updates of Doc/Design/DVPlan/sequences
- The definition of a release process, that is needed by sub-projects.

Note:<br>
<sup>2</sup> A sister project and/or a TWG gate can be recommended for major evolutions.

### Sub-projects

Each CVA6 configuration targetting the TRL5 maturity will launch a sub-project with a PA gate presented at a TWG meeting.

The sub-projects goal is to sign-off the CVA6 configuration.

The PA gates of sub-projects include:
- Quality targets (coverage targets, certification if any...)
- Additions to the RTL freeze checklist as deemed necessary
- Fix issues discovered in the sub-project
- Release plan for the configuration, based on the release process

The sub-project PA gates are prepared and presented by their respective leaders.
Prior to presenting the gate to the TWG, it is recommended to review the sub-project and PA gate document in a CVA6 meeting.

At the time of writing, the envisioned sub-projects are:
- CV32A60AX<sup>3</sup>, a 32-bit application core with the CV-X-IF, led by 10xEngineers
- CV32A65X, a 32-bit embedded core with dual issue<sup>4</sup> and CV-X-IF, led by TSS

Notes:<br>
<sup>3</sup> CV32A60AX was previously named CV32A60X or step1/step2 (in the 2023-06-26 PA gate).<br>
<sup>4</sup> The dual issue will likely be selected by TSS. If the single issue is finally selected, the part number will become CV32A60X.<br>

Future considered configurations for TRL5 are:
- a 64-bit application core with an interface to a vector coprocessor, led by a start-up company
- a 32-bit real-time core with safety features and CV-X-IF, led by a TRISTAN project partner
- a 64-bit application core with safety features and CV-X-IF, led by a TRISTAN project partner

For these future configurations, the scope of the sub-projects might be wider than for CV32A60AX and CV32A65X.

Refer to OpenHW [Dashboard](https://github.com/openhwgroup/programs/tree/master/dashboard) for the current list of sub-projects.

### Sister projects

The sister projects are led independently. They synchronize with the CVA6 main and sub-projects as deemed necessary.

At the time of writing, the sister projects are:
- [CVA6-H](https://github.com/openhwgroup/programs/tree/master/Project-Descriptions-and-Plans/CORE-V-CVA6-H) (CVA6 Hypervisor Extension Support)
- [HPDCache](https://github.com/openhwgroup/programs/tree/master/Project-Descriptions-and-Plans/CORE-V-L1-DCACHE) (High Performance Data Cache)
- [CORE-V-VEC](https://github.com/openhwgroup/programs/tree/master/Project-Descriptions-and-Plans/CORE-V-VEC-Research)  (vector coprocessor)
- [CORE-V CV-Mesh](https://github.com/openhwgroup/programs/tree/master/Project-Descriptions-and-Plans/CV-MESH) (multi-core coherence system)
- [Tightly-coupled cache coherence for CVA6](https://github.com/openhwgroup/programs/tree/master/Project-Descriptions-and-Plans/CVA6_tightly_coupled_cache_coherence)
- [CVA6 Free-RTOS](https://github.com/openhwgroup/programs/blob/master/Project-Descriptions-and-Plans/FreeRTOS/PA%20for%20CVA6%20FreeRTOS%20support.md)
- [Dual issue CVA6](https://github.com/openhwgroup/programs/tree/master/Project-Descriptions-and-Plans/cva6-dual-issue)
- [CVA6 Platform](https://docs.google.com/document/d/1lpMdyBCXY6m8kyTkqF7p_UGQywGA52e4kp10wFhpgfw)

If the links above are outdated, please check the https://github.com/openhwgroup/programs/tree/master/Project-Descriptions-and-Plans folder.

## Project Leader(s)

For the main project:
- Project Manager (PM) and Technical project leader (TPL): Jérôme Quévremont, TRT
- Verification leader and main committer: Jean-Roch Coulon, TSS
- FPGA softcore leader: Sébastien Jacq, TRT

The sub-projects will name their leadership teams.

## Project Planning Documents

The main project workplan is below.

## Summary of requirements

### CVA6 features

The CVA6 specification was prepared for the 2022-02-28 PA gate and approved by the Technical WG. It is available in [ReadTheDocs](https://docs.openhwgroup.org/projects/cva6-user-manual/02_cva6_requirements/cva6_requirements_specification.html).

To avoid duplications and inconsistencies, it is not copied here.

### Open-source approach

The team's expectation is to contribute and get a **sustainable open-source solution**
- to integrate CVA6 in new ASIC and FPGA projects for a long period and to maintain/upgrade them for several decades for industrial domains (avionic, satellite, railways, energy...);
- to permit audit and reviews of verification and tools in the context of certifiable security and functional safety;
- to permit public review to improve the quality of the core and its ecosystem;
- to foster cooperative projects and connections with academy and research.

Thereforce, the team expects:
- Not only the core RTL, but also a version of the verification environment and the SW tools are available as open-source.
- Commercial tools can be added to this basic set to deliver additional value (improved quality, coverage...).
    - But the project shall not depend on a single-source commercial tool.
	- Commercial tools with multiple sources, such as logic simulators, are acceptable.

In addition, this sustainable open-source solution, lowers barriers for newcomers to OpenHW. They can evaluate CVA6, adopt it, join OpenHW Group, add their "secret sauce"...

### Verification

To foster cooperation and efficiency within OpenHW Group, CVA6 will use and contribute to **core-v-verif**.

**Spike** will be used as a reference ISS for some configurations.
Synopsys/Imperas OVPSim can be considered for other configurations.

Gateways between OpenHW core-v-verif repositories and Thales internal environment (GitLab, CI...) will be set up.

The verification plans will provide more insight into the verification methods.

## Future enhancements (off project):

Increasing the core architectural performance (out-of-order...), adding RISC-V extensions, adhering to a RISC-V profile, delivering a larger subsystem (SMP multi-core, peripherals, accelerators...)

## Explanation of why OpenHW should do this project

Like RI5CY, the ARIANE core donated by ETH Zürich and U. Bologna was at the heart of the OpenHW Group creation. We need an application processor core in our portfolio.

In addition, an embedded configuration with the same interfaces is relevant for teams who need both embedded and application cores
while keeping a common infrastructure (bus interfaces...) and leveraging commonalities between configurations (e.g. for verification, toolchains...)

Also, there are very few vendor-neutral FPGA softcores and CV32A6 is an alternative to proprietary cores.

## Industry landscape: description of competing, alternative, or related efforts in the industry

On the core side, for ASIC targets, these are the most comparable competitors (pipeline length, MMU, single issue...):
- ARM: Cortex-A5
- SiFive: U54
- CHIPS Alliance&nbsp;/ Western Digital: CVA6 between the smaller SweRV  EL2 and the larger EH1.
- ANDES: A25 (32-bit) and AX25 (64-bit)
- Frontgrade Gaisler: NOEL-V

On the FPGA side, CV32A6 is a vendor-neutral alternative to these proprietary cores:
- Xilinx: Microblaze
- MicroChip: Mi-V
- Intel: Nios-II, Nios-V

On the tool side, CHIPS Alliance has plans to make their tools open-source
([link](https://semiengineering.com/components-for-open-source-verification/), 5<sup>th</sup> paragraph).

### Market differentiators

To differentiate from the competition, marketing can stress:
- Source code written in **SystemVerilog**, a widely accepted language;
- **Open-source** availability of the cores;
- Open-source availability of verification artefacts, which is a great step towards certification for security- and safety-critical domains;
- The availability of a family of **technology-independent cores optimized for ASIC and FPGA targets**;
- The ability to **extend the instruction** set thanks to the CV-X-IF interface;
- The **SW ecosystem** running on CVA6, with FreeRTOS and Linux already demonstrated;
- The ability to scale to SMP multi/many-core CPUs thanks to the OpenPiton framework;
- The permissive licence scheme that allows the integration in open-source or closed-source projects or the addition of a "secret sauce";
- The low risk of export control restrictions as OpenHW members are bound by the member agreement to avoid contribution of export-controlled technology ([OpenHW Group Membership Agreement](https://www.openhwgroup.org/membership/openhw-group-membership-agreement-2019-10-16.pdf), section 4.1).

## External dependencies

The project relies on:
- Related and sister OpenHW projects (joint with other cores): LLVM, FreeRTOS, core-v-verif, CV-X-IF specification, OpenPiton/CV-MESH...
- Open-source software: GCC, GDB, LLVM, Linux (Yocto, BuildRoot), OpenSBI, UBoot, BBL...
- Open-source verification: Google Riscv-dv, Spike, [riscv-arch-test](https://github.com/riscv-non-isa/riscv-arch-test)
- Open-source hardware: fpnew (ETH Zürich), first verified in CV32E40Pv2
- Eclipse Foundation, GitHub
- Digilent Genesys 2 board
- Linter: verible
- Simulators: Verilator (open-source), Siemens Questa, Synopsys VCS, Cadence Xcelium
- Synthesis: Vivado (AMD, ex Xilinx), Libero (Microchip), Quartus (Intel, ex Altera), Synopsys Design Compiler (ASIC), other ASIC CAD suites...

## List of project outputs

### Documentation:

The CVA6 document structure is:
- Requirement specification
    - Identifies features agreed upon
    - “What” defined as requirements with identifiers
    - Can be seen as a datasheet
- User Manual
    - For CVA6 integrators and users: HW, SW, ASIC, FPGA… viewpoints
	- Includes more details than the requirement specification
    - Includes among others: list of parameters of the configurations, list of CSRs, supported RISC-V instructions, interfaces...
- Design document
    - Explains the “How”: design choices…
    - Useful for verification, maintenance, next projects and certain certification schemes
- Design Verification Plans
    - DVplan, Verification Plan, Vplan: same meaning
    - Feature-by-feature listing of the Device Under Test
        - and a description of how it will be verified
        - and how we know when it is verified (coverage).
    -   Prepared with the [VPTOOL](https://github.com/openhwgroup/core-v-verif/tree/master/tools/vptool) utility

The user manual and design document are inputs for design verification. They are joint documents for all configurations.
Thanks to templating, it will be possible to generate versions specific to some given configurations.

DVplans can be commonalized between some configurations thanks to the support of configuration fields by VPTOOL.

### Design 

- CVA6 configurable RTL source code (TRL5 target)
- Subsystems and FPGA designs, a.k.a. APU, to exercise CVA6 on development boards...

All CVA6 configurations share the same source code and are differentiated thanks to SystemVerilog parameters.

### Verification:

- Versatile generic testbench with adaptation layers for CVA6
    - Subset compliant with _sustainable open-source solution_ expectations
- Test sequences
- Verification results
     - Including code coverage and functional coverage

### Software:

- Baremetal BSP for Genesys 2 FPGA board featuring CVA6
- Linux ports for CV32A6 and CV64A6 on the Genesys 2 board, based on UBoot bootloader, OpenSBI firmware and Yocto embedded Linux distribution builder
- Toolchains (parameters for GCC compilation...)

FreeRTOS is a product of a sister project, that has been kept in sync with the CVA6 project.

### Release process

The OpenHW Group has a release process adapted to single configurations (CV32E40P...)
Some additions to this process are needed to address a project and joint repository that will generate several TRL5 cores.

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

The workplan below has been prepared according to available members' resources.

### Marketing resource - requirement and availability

The project needs support from:

- Florian 'Flo' Wohlrab, OpenHW CEO
- Michelle Clancy, Director of Marketing

to promote CVA6 and attract new participants to the project.

On the members' side, promotion activities (presentations, demos...) will mainly be addressed by the engineering team.

### Funding for project aspects - requirement and availability

Some marketing activities (OpenHW TV production...) might need OpenHW funding.

Participating members provide the necessary tools to their teams.

Refer to the acknowledgements at the bottom of this document for Horizon Europe and Chips JU funding.

## Architecture and/or context diagrams

![CVA6 architecture](https://github.com/openhwgroup/cva6/blob/master/docs/03_cva6_design/_static/ariane_overview.drawio.png)

## Who would make use of OpenHW output

Any entity needing a mid-range verified open-source RISC-V application and/or embedded processing core for ASIC and FPGA technologies:
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

See [2023-06-26 PA document](https://github.com/openhwgroup/programs/blob/master/Project-Descriptions-and-Plans/CVA6/CVA6-plan-approved-2023-2024.md).

## Repository Structure

https://github.com/openhwgroup/cva6: the core master directory<br>
/core: the CVA6 core (defined as the scope of the IP in the specification and targetting 100% coverage)<br>
/corev_apu: the computing subsystem comprising CVA6<br>
/docs: CVA6 documents (specification, users' guide...)<br>
/verif: CVA6 verification, based on https://github.com/openhwgroup/core-v-verif
	
https://github.com/openhwgroup/core-v-verif: OpenHW verification framework
	
https://github.com/openhwgroup/cva6-sdk: RISC-V tools and BuiltRoot Linux

https://github.com/openhwgroup/meta-cva6-yocto: Yocto Linux

https://github.com/openhwgroup/core-v-docs/tree/master/program/Project%20Descriptions%20and%20Plans/CVA6: project gates.

A Google Drive [folder](https://drive.google.com/drive/folders/1DWXTVgLJnOn6DfoYHyy45QGZUfAkfHbI) is available for shared documents that do not fit the GitHub structure above (presentations...).

In addition, Thales has set up an internal mirror of GitHub repositories to trigger the
continuous integration environment they host.

## Project distribution model

OpenHW GitHub repository

The release process remains to define.

## Project plan

Past plans are available in the [2023-06-26 PA document](https://github.com/openhwgroup/programs/blob/master/Project-Descriptions-and-Plans/CVA6/CVA6-plan-approved-2023-2024.md).

### Sub-projects

Sub-projects activities will be detailed in their respective PA documents: specific RTL configuration, quality target and sign-off results, release...

### Main project

These activities are hosted in the main project. They can also relate to the integration of sister projects' results.

| Related TG      | Milestone                                                                                                                      | Target        | Contributor                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------- | ------------------------------------------    |
| Project-wide    | Customize the release process for CVA6                                                                                         | 2024-Q1       | Project and sub-project leaders, OpenHW staff |
| Project-wide    | Review proposed CVA6 evolutions                                                                                                | Continuous    | All, coordinated by Jérôme                    |
| Project-wide    | Maintain and upgrade User Manual                                                                                               | Continuous    | All, coordinated by Jérôme                    |
| Project-wide    | Maintain and upgrade Design Document                                                                                           | Continuous    | All, coordinated by Jean-Roch                 |
| Project-wide    | Triage of PR and issues                                                                                                        | Continuous    | Jean-Roch, with Mike's support                |
| Project-wide    | Reviews of PR , handling of issues                                                                                             | Continuous    | As per triage                                 |
| Cores           | Unify three MMU (Sv32, Sv39, Sv39x4) in a single source code, as a prerequisite to the hypervisor mode integration             | 2024-Q1       | PlanV                                         |
| Cores           | Integrate the hypervisor mode to the master branch                                                                             | 2024-Q2       | Zero-Day Labs, with TSS support               |
| Cores           | Add support of Microchip PolarFire FPGA (port FPGA optimizations)                                                              | 2024          | TRT                                           |
| Cores           | Add support of Microchip PolarFire FPGA (APU adaptation)                                                                       | 2024          | Undisclosed new member                        |
| Cores           | Add support of Intel FPGA (port FPGA optimizations, APU adaptation)                                                            | 2024          | TRT                                           |
| Cores           | Define and add memory protection for harsh environments (error detection and correction)                                       | 2024          | Interested stakeholders                       |
| Cores           | Integrate in-order dual-issue                                                                                                  | 2024-Q2       | TSS                                           |
| Cores           | Integrate instruction and data scratchpads                                                                                     | 2024-Q2       | TRISTAN partner                               |
| Cores           | Parametrization (replace configuration packages and `directives by top-level SV parameters)                                    | 2024-Q2       | TSS                                           |
| Cores           | Evaluate HPDCache as L1 data cache, decide if it's the project default L1 date cache                                           | 2024-Q1       | Interested stakeholders                       |
| Cores           | _To be confirmed:_ Upgrade CV-X-IF to the newly ratified version                                                               |               | TSS                                           |
| Cores           | _To be confirmed:_ Evolutions for the tightly-coupled cache coherence project                                                  |               | PlanV                                         |
| Cores           | _To be confirmed:_ Configurable reset                                                                                          |               | ECC                                           |
| Verification    | Maintain GitHub-triggered CI flow                                                                                              | Continuous    | TSS                                           |
| Verification    | Maintain tandem mode                                                                                                           | Continuous    | OpenHW staff                                  |
| Verification    | Add Mentor Questa support to the verification flow                                                                             | 2024          | OpenHW staff                                  |
| Verification    | Add Cadence Xcelium support to the verification flow                                                                           | 2024          | TRISTAN partner                               |
| Verification    | Edit DVplans                                                                                                                   | 2024          | OpenHW members                                |
| Verification    | Develop UVM environment (covergroups, random test generation, UVM agents,...)                                                  | 2024          | OpenHW members                                |
| Verification    | MMU architectural tests and UVM agent development                                                                              | 2024          | 10xEngineers                                  |

### Project tracking and meetings

#### Project tracking

The progress is tracked in CVA6 meetings, with a joint GitHub based [Kanban board](https://github.com/orgs/openhwgroup/projects/3).
Labels are used to differentiate configuration-specific tasks.

A monthly reporting will be provided using the [project report template](https://github.com/openhwgroup/programs/blob/master/process/Project-Monthly-Report-Template.md)
in the [CVA6 reporting directory](https://github.com/openhwgroup/programs/tree/master/TGs/cores-task-group/cva6).

Short minutes and short-lived documents will be posted to Mattermost's CVA6 channel, to keep the whole team updated. Longer-lived documents can be posted to the Google Drive folder.

The various activities (core, verification, software) are reported to the relevant task groups, based on their respective reporting format.

#### Meetings

The CVA6 main project meets
- three times a month at a time suited for ET, WET, CET, PST, IST timezones;
- once a month in the "West shifted meeting" at a time suited for PT, ET, WET, CET timezones.

The verification teams meet once a week in a specific meeting.

The synchronisation between sub-projects can be hosted in the CVA6 main project meetings or in verification meetings.

Meetings are kept up-to-date in the "official" OpenHW calendar hosted by Google. Links for various timezone:
[PT](https://calendar.google.com/calendar/u/0/embed?src=meetings@openhwgroup.org&ctz=US/Pacific),
[ET](https://calendar.google.com/calendar/u/0/embed?src=meetings@openhwgroup.org&ctz=US/Eastern),
[WET](https://calendar.google.com/calendar/u/0/embed?src=meetings@openhwgroup.org&ctz=Europe/Lisbon),
[CET](https://calendar.google.com/calendar/u/0/embed?src=meetings@openhwgroup.org&ctz=Europe/Paris),
[PST](https://calendar.google.com/calendar/u/0/embed?src=meetings@openhwgroup.org&ctz=Asia/Karachi),
[IST](https://calendar.google.com/calendar/u/0/embed?src=meetings@openhwgroup.org&ctz=Asia/Kolkata).

<!-- Comment: to add time zones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones -->

### Oustanding topics

None

### Risk register

|                             | Likelihood | Impact | Avoidance&nbsp;/ Mitigation                                                      |
| --------------------------- | :--------: | :----: | ---------------------------------------------------------------------------------|
| Not enough resources        | Mid        | Major  | Some members have received grants. Need to recruit more members on verification. |
| Insufficient coordination   | Mid        | Mid    | Weekly meetings                                                                  |
| Conflicting contributions   | Mid        | Major  | Weekly meetings                                                                  |
| Hard to merge contributions | High       | Mid    | Updated CONTRIBUTING.md                                                          |
| Export control              | Low        | Major  | Apply OpenHW membership agreement (carefully review non-OpenHW contributions)    |
| Lack of market appeal       | Mid        | Major  | Marketing, dissemination in European projects                                    |

## PA Checklist

*Confirm in the table below that each listed item is completed, or explain the exception/waiver*

| Item                                                | Completion (Y/N/In progress/NA) | Comment                                                                       |      
| --------------------------------------------------- | --------------------------------| ------------------------------------------------------------------------------|
| Project Concept Complete                            | Y                               |                                                                               |
| Project Launch Complete                             | Y                               |                                                                               |
| SW Target platform identified                       | Y                               |                                                                               |
| Cores Part Number identified	                      | Y                               |                                                                               |
| Cores TRL Target identified	                      | Y                               |                                                                               |
| Project release plan identified                     | N                               | Process to define in the main project. Plans to define in the sub-projects    |
| HL Project deliverables identified                  | Y                               |                                                                               |
| Feature list available                              | Y                               | Requirement specification                                                     |
| Resource plan available                             | Y                               | Team in place for the main project. Sub-projects to identify their resources. |
| Repo setup                                          | Y                               |                                                                               |
| License.md file in place                            | Y                               |                                                                               |
| Project Manager identified                          | Y                               |                                                                               |
| Technical Project Leader per deliverable identified | Y                               | For the main project                                                          |
| At least 1 project committer elected                | Y                               |                                                                               |
| Work Breakdown Structure available                  | Y                               |                                                                               |
| Baseline schedule available                         | Y                               |                                                                               |
| Ongoing schedule tracking identified                | Y                               |                                                                               |
| Regular project meeting setup                       | Y                               |                                                                               |
| Project Monthly report format agreed                | Y                               |                                                                               |
| Risk Register available                             | Y                               |                                                                               |
| Set of Project Freeze/Release Checklists identified | N                               | To be defined in sub-projects                                                 |

## Acknowledgements

Some contributions to CVA6 are supported by the FRACTAL, TRISTAN and ISOLDE projects,
which have received funding from the Chips Joint Undertaking (Chips JU),
Austria, Belgium, Czechia, Finland, France, Germany, Italy, the Netherlands, Poland, Romania, Sweden, Switzerland, Spain and Turkey
under grant agreements 877056, 101095947 and 101112274.
The JU receives support from the European Union’s Horizon Europe research and innovation program.

![EU Logo](https://github.com/openhwgroup/tristan-unified-access-page/blob/main/images/logo_EU.png)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![ChipsJU Logo](https://github.com/openhwgroup/tristan-unified-access-page/blob/main/images/logo_chipsJU.png)   
