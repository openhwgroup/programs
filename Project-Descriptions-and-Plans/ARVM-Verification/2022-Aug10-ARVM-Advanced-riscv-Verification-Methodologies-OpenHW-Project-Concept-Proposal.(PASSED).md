# OpenHW Project Concept Proposal:
# Advanced RISC-V Verification Methodology (ARVM)
## Presented at OpenHW TWG 2022-July-25, reviewed 10-Aug-2022, and Approved 06-Sep-2022

## Summary of Project
This project is to be a project under the VTG.

This project aims to enhance the capabilities and efficiency of the RISC-V verification available to all RISC-V core developers and thereby improve the quality of the available RISC-V cores and reduce the risk of RISC-V market fragmentation, disarray, and slow growth.

## Summary of market
Today, many RISC-V processor implementations use a relatively simple subset of the RISC-V ISA. However, more advanced features and capabilities are brought forward as implementations, supporting features such as Out-of-Order, multi-issue, multi-core, multi-hart, multi-thread, and new ISA extensions such as vectors.

To support this evolution in processor capabilities, processor verification tools, technology, VIPs and methodologies must continually improve and be adopted for delivery of quality RISC-V processors.

By working on and succeeding with this ARVM project, OpenHW can lead the industry in evolving best-in-class RISC-V processor DV solutions and impact the entire RISC-V community.

### Goals of Project
The project will address RISC-V processor verification with an initial sub-project list of:

- **ARVM-Methodologies**: improving the capabilities and available methodologies available for verification environments
- **ARVM-Promotion**: educating / informing processor verification teams of choices and techniques available across the RISCV community and verification ecosystem (for example tutorials and videos)
- **ARVM-TestbenchQuality**: developing quality measurement of test benches - so quality of cores can be predicted (for example defining fault models and tests and relating those to TRL levels)
- **ARVM-Standards**: defining and implementing evolving interface standards for test bench components to enable better test bench component reuse and potentially stimulate availability of compatible VIPs
- **ARVM-FunctionalCoverage**: developing open-source VIPs (such as functional coverage) that can be used for many different core configurations/implementations
- **ARVM-SoCIntegration** : consider requirements and solutions for SoC core integration verification (for example cache coherency with uncore components)
- **ARVM-Roadmap**: ongoing roadmap to accommodate new innovations in RISC-V designs, new ratified extensions, and new tool developments

To be clear - this project / group is focused on advancing high quality industrial strength verification and is not targeting specific OpenHW core implementations / teams / groups - but it is expected that members of the various OpenHW core verification teams will participate actively in, and benefit from, this project.

## Project Organization
This project and its sub-projects will be tracked as follows in OpenHW:
- ARVM (Advanced riscv Verification Methodologies) will be the "carrier project" within VTG that goes through the Project Concept gate in the OpenHW TWG to setup the basic idea and structure
- Each of the sub-projects as listed above (or others to be determined) will traverse the Project Launch, Plan Approve, and Project Freeze gates in the OpenHW TWG under the guidance of the ARVM leaders
- ARVM will work with OpenHW staff to develop the Project Launch, Plan Approve and Project Freeze criteria for the sub-projects as suits their nature

## Who would make use of the developments in this project
This project is focused on advancing high quality industrial strength verification and is not targeting specific OpenHW core implementations / teams / groups - but it is expected that members of the various OpenHW core verification teams will participate actively in, and benefit from, this project. 

The outputs from this project range from education & methodology, to VIPs and interface standards - all of which will enhance DV teams capabilities and thereby drive RISC-V to more success.

All 'internal' OpenHW core verification teams can participate and benefit and so can external core verification teams, including commercial partners. Nothing will be done which will be specific to OpenHW cores - the focus is ecosystem wide.

OpenHW is a collaborative community / organization and for a sub-project to become an approved ARVM project an OpenHW member must propose it and provide resources to work on the sub-project.

There is no requirement that a sub-project is directly related to an existing OpenHW core / project.

### Other verification projects (not this project, but part of other VTG projects)
Here are some suggestions about other projects that could be done in VTG if / when member companies come forward to develop project and resource plans for them (but note - these are not currently part of this ARVM project planning):
- Continued promotion of SV/UVM testbenches for CORE-V cores and SoCs
- Reduction of the integration effort of new cores into core-v-verif
- Build on the core-v-mcu-uvm project to develop an SoC verification methodology
- Review and update of Strategic Goals for core-v-verif
- Standing up a multi-simulator automatic CI flow for all supported CORE-V cores
- Creation of an open-source formal verification testbench for at least one CORE-V core
- Refactoring of CORE-V-VERIF into per-core verification repos
- Make ISACOV standalone VIP, able to connect to any Instruction Fetch Bus Agent
- Improved processes for creating, writing and tracking DVplans
- Toolchain independence
- Update riscv-dv to make it a true UVM component (and integrate it into core-v-verif)
- Update the verification coding style guidelines
- Lint checking to create automated checks for the above guidelines

However these may become part of the ARVM sub projects as appropriate.

## Initial Estimate of Timeline
ARVM is an ongoing carrier project. The following are initial steps:

August / September 2022
- Refine and enhance the sub-projects list, develop the sub-projects focus
- Encourage participation in ARVM sub-projects both among existing OpenHW members and new prospective members
- for ARVM sub-projects setup recurring meetings on the OpenHW Calendar, chaired by the ARVM Technical Project Leader (named)
- for ARVM sub-projects setup MatterMost channels
- for ARVM sub-projects setup GitHub repos

October 2022 - onwards - get on with it

December 2022 - target for an initial progress update at the RISC-V Summit

Provide regular feedback on progress to VTG, TWG etc...

## Explanation of why OpenHW should do this project
As an open-source industry forum already focusing on industry quality verification of CORE-V processor cores, publishing results in open-source while making use of best available tools, it is natural for the OpenHW Group to foster continued development of verification methodologies specific to that application domain. While the ARVM project would increase the scope of verification methodology within OpenHW to consider requirements beyond those of the CORE-V Processor Cores IP, the increased verification methodology focus will be beneficial for CORE-V Cores IP and for OpenHW members.

## Industry landscape: description of competing, alternative, or related efforts in the industry
RISC-V has created opportunities for new entrants to develop their own processors.  Few of these new entrance have experience with processor verification.

As there is no industry accepted flow for processor verification - every core verification team is forced to invent & develop their own verification ideas, components, tools, simulators, models, interfaces, frameworks, flows, etc. This is inefficient, costly, error prone, and is unnecessary.

RISC-V International is focused on the ISA and the standardization of the ISA. Yes RVI has a compliance group - but this is solely focused on ISA compliance (architecture) and not, repeat not, on processor implementation verification (micro-architecture).

CHIPS Alliance is focused on open-source EDA tooling, for example Verilator, and RISCV-DV - yes components as part of verification. 

This new OpenHW ARVM group is needed and focused on industrial grade processor verification.

## OpenHW Members/Participants committed to participate
- Imperas 
- Codasip (name to be provided)
- Other EDA tool companies under discussion to join OpenHW
- Current and future OpenHW members actively verifying one or more CORE-V projects

All OpenHW core projects with verification targeting TRL5 should be participating.

## Project Leader(s)
### Technical Project Leader(s)
Simon Davidmann (Imperas)

Each sub-group will have a 'leader' - tbd.

## Resource Requirements
Imperas will provide leadership for the ARVM carrier project as well as contribute to the engineering resources for the sub-projects

Other members will participate and contribute in the new project and sub-projects

Engineering resources are mainly needed to help drive the sub-projects

## Project license model
All deliverables including documents and code will be open-source on https://github.com/openhwgroup/ and developed under Apache 2.1 and/or Solderpad 2.1 licenses

## Description of initial code contribution, if required
It is not currently thought that ARVM will be part of the Eclipse CORE-V Cores project. If required any initial code contributions will follow OpenHW/EF contribution questionnaire rules.

## Repository Requirements
Github repos for specs, project documents, milestones, reports etc.

## Project distribution model
Code Releases will be made available on http://downloads.openhwgroup.org/ under an ARVM heading.

Output documentation will be made available on ReadTheDocs at https://docs.openhwgroup.org/projects/

## Preliminary Project plan
as above

## Risk Register
Main risk for the carrier project initially is lack of participation and interest during the refinement of the sub-project list. To succeed, ARVM requires a considerable critical mass of expertise on verification. 

To manage this, the ARVM project requires "lobbying" for participation by the current OpenHW processor companies and organizations. 


