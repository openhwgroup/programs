# OpenHW Project Concept and Project Launch markdown template: Instructions
*This template presents both PC and PL templates as well as instructions for use*


*In the **normal OpenHW project flow**:*
- *The **PC*** 
  - *Introduces the intitial project concept and team, associated market drivers or user requirements (the "why") along with basic scope of the project*
  - *Typically lacks detail such as a feature list, architecture or complete project team.* 
  - *If PC approved by the TWG, the project team completes the project description in the **PL proposal***. 
  - *The PC as approved is retained in the programs repository*

- *The **PL***:
  - *Is a separate document to the PC, which it updates and completes.*
  - *The architecture, major features and project phases (the "what" - but not necessarily final level of detail)*
  - *The project team is identified* 
  - *If PL approved by the TWG, the project team completes the feature specification and project plan in the **Plan Approved (PA) proposal***. *

*The flow for **OpenHW software projects** whose scope/target is a family of related targets (such as CORE-V 32 bit 4 stage cores):*
- *PC and PL are written as top-level projects addressing the target family.* 
- *Any PC and PL sections intended for a particular target, e.g., preliminary feature list, are identified as target-specific*
- *The PA describes a "subproject" for a particular target. Each PA should contain the full feature list and project plan for a particular target*
- *There would normally be multiple PA sub-projects for top-level SW projects*

*The flow for **OpenHW Advanced RISC-V Verification Methodology (ARVM)** subprojects:*
- *The ARVM PC is written as a top-level project addressing multiple ARVM subprojects* 
- *The PL and PA describe an ARVM "subproject". The PA  contains the full feature list and project plan for the subproject*
- *There will be multiple PL/PA subprojects for the ARVM top-level project*

<hr/>

***Part 1, PC fields:***
*The PC proposal introduces the project and explains the market drivers and the "why"* 

# Title of Project - "CORE-V CoresProject XYZ"
# Project Concept Proposal
## Date of proposal - 2021-01-01
## Author(s) - Joe Smith, Mary Jones

## High Level Summary of project, project components, and deliverables

## Summary of market or input requirements
### Known market/project requirements at PC gate
### Potential future enhancements

## Who would make use of OpenHW output

## Initial Estimate of Timeline


## Explanation of why OpenHW should do this project

## Industry landscape: description of competing, alternative, or related efforts in the industry

## OpenHW Members/Participants committed to participate


## Project Leader(s)
### Technical Project Leader(s)
### Project Manager, if a PM is designated

## Next steps/Investigation towards Project Launch (**PC only**)
### Item1 to investigate
### Item2 to investigate
### Target Date for PL

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
*For IP Cores or more complext projects, a user manual with requirements specification is produced at the PA gate, which may supersede this list of features*

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
*Architecture (internal blocks and interconnections), and context (depiction of the project content within its operational context), are both encouraged where appropriate to depict functionality to both subject matter experts and to non-experts*



## Project license model

## Description of initial code contribution, if required

## Repository Requirements

## Project distribution model

## Preliminary Project plan
*A full project plan is not required at PL. A preliminary plan, which can be for instance the schedule for completion of component or feature list, together with responsible resource, should be provided. Full details should be provided at PA gate.*

## Risk Register
*A list of known risks, for example external dependencies, and any mitigation strategy*

