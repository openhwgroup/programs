# OpenHW Project Concept And Project Launch Markdown Template: Instructions

*This template is divided into two parts:*

- *The **Project Concept (PC)** required fields are shown in the first part.*
- *The additional **Project Launch (PL)** required and optional fields are shown in the second part.*

*Delete any sections not needed for your proposal*

*The normal proposal flow is:*

- ***The PC proposal*** *is prepared and presented to TWG. The PC proposal introduces the project and explains the market drivers and the "why"*
  - *TWG grants PC gate with feedback, or rejects PC gate with feedback*
  - *If PC granted, additional work is carried out to prepare the **PL proposal***.
- *The **PL proposal** contains updates to the PC fields and adds additional fields. The PL proposal explains the "what" of the project.*
  - *For software porting projects, the PL should contain the feature list*
  - *For IP core or other complex projects, the PL should contain a high level feature list (the user manual with feature specification is developed for the Plan Approved gate).*

<hr/>

***Part 1, PC fields:***
*The PC proposal introduces the project and explains the market drivers and the "why"*

# Title of Project - "CORE-V Extension Interface (CV-X-IF)"

# Project Concept Proposal

## Date of proposal - 2023-09-25

## Author(s) - Christian Herber

## High Level Summary of project, project components, and deliverables

## Summary of market or input requirements

### Known market/project requirements at PC gate

- Advance specification to version 1.0
- Improve applicability to various pipeline depths and microarchitectures
- Superscalar/multi-threading support
- Multiple co-processors per hart
- Support for different instructions lengths (16/32/48/...)

### Potential future enhancements

- Improved support for out-of-order processors

## Who would make use of OpenHW output

The CV-X-IF is already supported in CV32E40X and CVA6. Synthara plans to implement CV-X-IF for the CVE2. Two additional companies have plans to implement CV-X-IF in their cores.

## Initial Estimate of Timeline

Target is for products based on CV-X-IF 1.0 to be developed latest within two years. This requires the specification to be ready within one year, for additional work, e.g. regarding design and verification to rely on a solid specification.

## Explanation of why OpenHW should do this project

Co-processor interfaces allow customization of cores without touching the existing core. Customization is a key differntiator in RISC-V, and providing a solution to simplify this process in CV-X-IF has high value.
The usefulness of a co-processor interface depends on the adoption in cores, as this gives designers choice in selection of core IP without having to redesign their coprocessors. In addition, an ecosystem of SW, tools, and verification IP will contribute to an interfaces success. To increase the number of processors supporting CV-X-IF, it is necessary to enhance the interface in terms of features, and improve the quality of documentation to a point that gives adopters a high level of trust.

## Industry landscape: description of competing, alternative, or related efforts in the industry

Many coprocessor interfaces for RISC-V exist, but only few have a decent market penetration. Most are limited to the core they were developed for.

- RoCC (Rocket Custom Co-processor) adopted in Rocket and Boom https://chipyard.readthedocs.io/en/stable/Customization/RoCC-Accelerators.html
- NICE (Nuclei Instruction Co-unit Extension) - https://doc.nucleisys.com/hbirdv2/core/core.html#nice
- Andes ACE (proprietary)
- Semidynamics Open Vector Interface (OVI)
- VexRiscv-CCOPI: https://github.com/jens-na/VexRiscv-CCOPI/blob/master/paper/ccopi_paper.pdf
- SCAIE-V - https://github.com/esa-tu-darmstadt/SCAIE-V
- Composable Custom Extensions Project (CX) - https://github.com/grayresearch/CX
- Pico Co-Processor Interface (PCPI) - https://github.com/YosysHQ/picorv32#pico-co-processor-interface-pcpi
- extension accelerator interface (EAI) - https://www.mdpi.com/2079-9292/9/6/1005
- SiFive Vector Coprocessor Interface (VCIX)

## OpenHW Members/Participants committed to participate

NXP, Thales, Gaisler, Axelera, Silicon Labs, Synthara

## Project Leader(s)

### Technical Project Leader(s)

Christian Herber (NXP)

### Project Manager, if a PM is designated

N/A

## Next steps/Investigation towards Project Launch (**PC only**)

### Use cases

Determine which configurations of cores and classes of co-processors are relevant in this project.

### Technical scope and priorities

Determine which are the must-have's and should-do's in terms of technical improvements.

### Target Date for PL

23. October 2023
