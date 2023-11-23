# OpenHW Project Concept Proposal: CV32E40PX
*The PC proposal introduces the project and explains the market drivers and the "why"*

# Title of Project - "CV32E4_TBD"
# Project Concept Proposal
## Date of proposal - 2023-11-27
## Author(s) - Manuel PEZZIN (CEA)

## High Level Summary of project, project components, and deliverables
Main goal of this project is to provide a new CPU core that supports official RVB (and a part of RVK) and (upcoming) RVP
extensions while keeping functional backward compatibility with CV32E40Pv1/v2 (eg XPULP
custom extensions are kept and even extended).
Additionnal features may also be considered, like:
* CV-X-IF support
* CLIC support
* Improved OBI interface support (bus error in particular)

This new project will keep functional backward compatibility with CV32E40Pv2,
but with relaxed rules on changes compared to the previous project (CV32E40Pv2). In particular, formal equivalence
with the previous design will not be required to make design work easier.

Due to the strict backward compatibility rules of CV32E40Pv2, this new core is not
named CV32E40Pv3 and a new naming should be found.

## Summary of market or input requirements


### Known market/project requirements at PC gate

**Mandatory features and design changes**

Keep XPULP custom extensions that improve address manipulations and flow control:
* Post-increment and register-register indexed load/store
* Hardware loops
* Immediate branch
* Event load

Introduce a dual opcode scheme for XPULP ALU instructions that have a strict RVB/RVP equivalent:
* Multiply-accumulate
* General ALU extensions
* Bit manipulation
* SIMD (16 and 8-bit data)
note : this dual opcode scheme allows backard compatibility and open the door to smooth transition
of existing programs from XPULP to RVB/RVP, if needed/relevant.

Add support for RISC-V official bit manipulation instructions:
* RVB zba (address manipulation) will be supported
* RVB zbb (basic bit manipulations) will be supported
* RVB zbs (single bit instructions) will be supported
* RVB zbc (carry-less multiplications) : may be supported, to be confirmed if relevant for DSP applications
* RVK zbkb (Bitmanip instructions for Cryptography) : pack, packh, packw, brev8, zip, unzip additionnal instructions may be supported, if relevant for DSP applications.
* RVK zbkx (Crossbar permutation instructions) : xpem4 and xperm8 additionnal instructions may be supported, if relevant for DSP applications.
* RVK zkn, zks, zkr and zkt are specific to cryptographic computations and will not be supported

**Optionnal design changes**

Introduce XPULPv3 custom extentions (preliminary, feature list may evolve):
* ALU instructions that have a strict RVB/RVP equivalent opcode will be deprecated, new XPULPv3 opcodes will be RVB/RVP ones instead
* Deprecate single operand *abs* instruction in favor of dual operand *pdif* (RVP superset of abs useful for manhattan distance computation)
* Deprecate single operand *cv.cplxconj* instruction in favor of dual operand *pas* (RVP parallel add-sub)
* Deprecate *cv.cplxmul.r* and *cv.cplxmul.i* in favor of a single instruction *cv.cplxmul* that computes both parts of complex multiplication
* Introduce hermitian form of *cv.cplxmul* (rs1 x conj(rs2)) ? (widely used in DSP computation for telecom applications)
* *list to be completed / updated*

Add CV-X-IF interface:
* End user product may require additionnal appliance-specific custom instructions, these instructions should be implemented in a co-processor.

Floating Point Unit:
* keep current CV-FPU integration or move it to CV-X-IF?

Add CLIC support:
* Core-local interrupt controller fits better with embedded real-time requirements than PLIC or any other (non RISC-V compliant)
  external interrupt controller that requires a 2-step interrupt handling code.

Design Portability:
* Replace global clock gate by equivalent global enable signal
  * this will make the design more "FPGA-friendly", or compliant with ASIC design rules that forbid any logic addition on clock tree
  * clock gate cell model and/or simulator behaviour may introduce delta cycles on clock tree, leading to RTL/GL simulation mismatch
* EDA tools parser bug work-arounds: current design coding style is standard-compliant, but EDA tools may
  have bugs that prevent proper reading. Design should be parsed with several EDA tools and offending RTL code should be fixed.

### Potential future design enhancements
* remove deprecated features
* Add Zce extension for further code-size reduction (not required for Multicore cluster).
* Add bus attributes support.
* move bitmanip, SIMD and complex number subsets of XPULP, RVB and RVP to a CV-X-IF compliant co-processor IP
  * pros : this will make these features available to other processors, and would simplify verification work.
  * cons : a performance loss is expected on instructions that use register pairs.

## Who would make use of OpenHW output
Companies needing more performances, less energy consumption or smaller code size for real-time control and/or DSP applications.

## Initial Estimate of Timeline
At Project Concept:
* Preliminary RTL release expected in 2024 Q1
* RTL feature-complete expected in end of 2024 Q4
* RTL freeze and verification completed expected in 2025 Q4

## Explanation of why OpenHW should do this project
This proposal is a continuation of CV32E40P project.
Main goal is to support official RVB (and a part of RVK) and (upcoming) RVP
extensions while keeping backward compatibility with CV32E40Pv1/v2.
One key advantage of supporting official RVB/RVP extensions is versatility and
compatibility with a larger set of framework and applications. This will also allow
users to use upstream version of compilation toolchain.

XPULP custom extensions may also be extended to benefit from design enhancements
introduced for RVB and RVP support.

Additionnal features may also be considered, like CV-X-IF and CLIC support.

Improved OBI interface support (bus error in particular) is also envisionned.

Keeping backward compatibility will allow existing users of CV32E40Pv2 to migrate
smoothly their existing products to this new version of the core, while keeping
the benefits of existing custom extensions.
In addition, keeping XPULP custom extensions will offer improvements to address
manipulation, flow control and complex numbers computations.

## Industry landscape: description of competing, alternative, or related efforts in the industry
ARM Cortex M4

## OpenHW Members/Participants committed to participate
* CEA - RVB/RVP/XPLULP Design & Verification

## Project Leader(s)
### Technical Project Leader(s)
At of Project Concept, led by
* Manuel Pezzin, CEA

### Project Manager, if a PM is designated
None designated

## Next steps/Investigation towards Project Launch (**PC only**)

Verification asumptions (to be validated):
* functionnal backward compatibility with CV32E40Pv2 will allow reusing existing test suite
* RVB, RVK, CLIC, ans CV-X-IF being supported by CV32E40X, existing test suite may be reused/adapted
* RVP verification workload difficult to evaluate for the moment

### Item2 to investigate



### Target Date for PL
TBD



<hr/>


***Part 2, PL fields:***
*The PL proposal explains the "what". Some of it can be updated directly from the PC proposal*

# Title of Project - "CORE-V CoresProject XYZ"
# Project Launch Proposal
## Date of proposal - 2021-01-01
## Author(s) - Joe Smith, Mary Jones


## Summary of project

### Components of the Project

*Components are major project components or groups of features.*
- *A project may have, for example, 1-10 components.*
- *Components detail the "The what" at high level, not detailed level*
- *Components don't consider timeline.*
- *For example*
  - *Component 1 "Compiler changes for standard instructions."*
  - *Component 2 "Compiler changes for custom instructions"*
  - *Component 3 "Updates to compiler tools".*

#### Component 1 Description
#### Component 2 Description


## Summary of market or input requirements
### Known market/project requirements at PL gate
### Potential future enhancements for future project phases

## Who would make use of OpenHW output

## Summary of Timeline
*High level view of timeline, for example timeframe for each component*

## Explanation of why OpenHW should do this project
*What is the impact of doing/not doing this project on the OpenHW ecosystem. Why is OpenHW best suited to do this project*

## Industry landscape: description of competing, alternative, or related efforts in the industry


## OpenHW Members/Participants committed to participate


## Project Leader(s)
### Technical Project Leader(s)
### Project Manager, if a PM is designated

## Project Documents
### Project Planning Documents
### Project Output Documents


## List of project technical outputs
*This is a list of technical artifacts produced by the project*

### Feature Requirements
*Features are more granular than Components.*
*For SW porting projects, this list serves as the detailed project reference for features*
*For IP Cores or more complext projects, a user manual with requirements specification is produced at the PA gate, which may supercede this list of features*

#### Feature 1
#### Feature 2


## External dependencies
*These are external factors on which the project depends, such as external standards ratification, external technology input, etc.*

## OpenHW TGs Involved
*Which TG will be involved, such as SW, HW, Verification, etc.*

## Resource Requirements
*This is a list of major resources/people required to implement the project and indication of whether the resources are available*

### Engineering resource supplied by members - requirement and availability
### OpenHW engineering staff resource plan: requirement and availability
### Marketing resource  - requirement and availability
### Funding for project aspects - requirement and availability

## Architecture and/or context diagrams
*Architecture (internal blocks and interconnections), and context (depiction of the the project content within its operational context), are both encouraged where appropriate to depict functionality to both subject matter experts and to non-experts*



## Project license model

## Description of initial code contribution, if required

## Repository Requirements

## Project distribution model

## Preliminary Project plan
*A full project plan is not required at PL. A preliminary plan, which can be for instance the schedule for completion of component or feature list, together with responsible resource, should be provided. Full details should be provided at PA gate.*

## Risk Register
*A list of known risks, for example external dependencies, and any mitigation strategy*
