# OpenHW CORE-V MCU Dev-Kit Project Concept Proposal


<hr/>

***Part 1, PC fields:***
*The PC proposal introduces the project and explains the market drivers and the "why"* 

# Title of Project - CORE-V MCU Dev-Kit
# Project Concept Proposal
## Date of proposal - 2021-11-22
## Author(s) - Hugh Pollitt-Smith, Anthony Le, Hugh O'Keeffe, Jasper Lin

## High Level Summary of project, project components, and deliverables

The CORE-V MCU Dev-Kit (aka Dev-Kit) is a project to design, manufacture and distribute a development board (aka DEV-Board) that showchases the operation of the CORE-V-MCU system on chip, the CORE-V SDK software, and various peripherals.
The Dev-Kit enables software development for CORE-V MCU. The Dev-Kit will be purchasable from OpenHW Group. 


The components of the project are:

### Dev-Board

The Dev-Board is a PCB integrating the MCU, peripheral devices, network interfaces, LEDs, configuration switches, and debug hardware.

#### Dev-Board Design
The Dev-Board will be designed by Quicklogic with specification and eview by other participants like CMC.
The design tool to be used will be selected by Quicklogic and won't neccesarily be an open source tool. The design files should made available as open source artefacts of the project in source and PDF form.
 

Input to the design specification includes:
- OpenHW team input based on SDK requirements, cost target, functionality, certification requirements

The following open source documents and outputs are needed for Dev-Board Design
- Design Specification (including design requirements as a section)
- Design files (Anthony to give a list of files).
- Output: Gerber file


#### Dev-Board Fabrication
Dev-Board Fabrication will be overseen by CMC.
The Dev-Board will initially be manufactured in a limited run, and subequently will be manufactured for distribution.
The following open source documents and outputs are needed for Dev-Board Fabrication
- Supply contract
- Input: Gerber file


#### Dev-Board Assembly
Dev-Board Assembly will be overseen by (CMC)
The following open source documents and outputs are needed for Dev-Board Manufacture
- BOM File (Excel file e.g.)




#### Dev-Board Test

Not likely that we need to do bare board testing for prototype run (may want to do for volume).

First samples of the assembled Dev-Board production will be used for testing of the board. Testing is based on board functionality: MCU, WiFi, other periperhals etc.
Test phases:
- (1) Initial bringup which is largely manual and reuses SW from bench test board
- (2) SDK driven, script based manufacturing testing of each functional element



(1) Dev-Board testing will be overseen by Quicklogic

The following open source documents and outputs are needed for Dev-Board Testing
- Dev-Board test plan, edited by Quicklogic

(2) Manufacturing test will likely be implemented by CMC, assuming smaller volume runs
The following open source documents and outputs are needed for Dev-Board Testing
- Dev-Board manufacturing test plan, edited by CMC



### Cables

The Dev-Kit will be shipped with necessary cables to support debug operation including USB for power. 

The following open source documents and outputs are needed for Cables specification
- Dev-Kit Cables Specification, edited by (CMC OR QUICKLOGIC?)



### Physical Packaging

The Dev-Kit project includes selection of the appropriate packaging for shipping to end customer.
CMC will drive this. The following open source documents and outputs are needed for Packaging:
- Physical Packaging Specification
- Packaging procurement plan (if needed)


### SDK Distribution

Although the creation and testing of the SDK is itself a separate project, the Dev-Kit includes the SDK as a key content to be shipped to the end customer. The Dev-Kit project will document the distribution mechanism of the SDK. 
The following open source documents and outputs are needed for SDK Distribution:
- SDK distribution specification. CMC and Ashling will own this.
- As per SDK Project Concept, one suitable mechanism is a QR code etched on the Dev-Board pointing to a SDK github repo. 

### End-user documentation

As the Dev-Kit is shipped to end customers it is important that documentation such as user guide is at high standard.

The following open source documents and outputs are needed End-user documentation:
- Dev-Kit User Guide (edited by CMC) comprising both HW and SW elements and needs further discussion as to exact form and split between SDK and DEV-KIT. 
- eFPGA programming guide (edited by Quicklogic)

A good example approach to be discussed with SDK folks from QL:
- Dev-Kit Quickstart guide which provides an out of box test sequence (cycle some LEDS) based on preloaded Flash
- Then a link to Github repos to download to SDK

Physical documentation may or may not be needed. Currently QL boards are not shipped with physical docs, but link to the SDK provides documentation. 





### Additional User Collateral

Beyond documentation such as user guide, the Dev-Kit project will need to create collateral such as video how-to guides.

The following video content is required:
- Dev-Kit Video Unboxing Guide 
- Needs to coordinate with component 6 of the SDK project concept. 


### Cost Analysis

The Dev-Kit Project will document the cost target, production cost, selling price, and cost recovery basis for the Dev-Kits, as well as the source of funding required to support manufacture, distribution and shipping.
The following open source documents and outputs are needed for cost planning:
- Dev-Kit Cost Analysis (edited by CMC)

As of Project Concept, a sub-$100 cost target per board is identified. Need to drive much more detail for PL. 

### Dev-Kit Distribution

The Dev-Kit Project will put in place a distribution mechanism such as on-line purchase
The following open source documents and outputs are needed for Dev-Kit distribution:
- Dev-Kit Distribution plan documenting ordering and fulfillment (edited by CMC)
- Any related contracts to support the distribution
- Export control requirements
- Region specific certifications

To be checked: 
- crowdsupply.com as a store front for new hardware
- digitkey to hold inventory and ship the board


## Summary of market or input requirements
### Known market/project requirements at PC gate

#### Dev-Board Features

As of Project Concept, it is not determined which features are on-board and which are optionally included via modules.

The following are thought to be base features:

- WiFi
- Bluetooth
- Debug hardware (incl. UART)
- SPI based Flash device
- LEDs
- Expansion headers
- Specific shield/form factor




#### Cables
-  USB cable used to connect to on-board debug and UART

#### User Guide must cover
- MCU (refer to MCU User Manual)
- All periperhals and their registers
- ..?




### Potential future enhancements

## Who would make use of OpenHW output

The Dev-Kit will be used by 
- Potential industrial or academic users of the CV32E40P core who need to evaluate performance, develop software, or prototype real-world implementations
- As above, those looking to reuse the CORE-V MCU design
- Hobbyist users



## Initial Estimate of Timeline

Note the following timeline is not based on resource or schedule plan, it is intended to be a concept-level guide to initiate planning.

| Gate                      | Description | Expected Date           |
|----------------------------|--------------------|----------------------- |
| Project Concept  | High level project description           | Nov, 2021      |
| Project Launch  | Initially staffed and working on components with preliminary resource & project plan  | February, 2022      |
| Plan Approve  | Detailed project plan         | May, 2022      |
| Project Freeze  | Project Completion           | Dec, 2022      |

Contingent on success of bench board
Unknown: SDK timeline



## Explanation of why OpenHW should do this project

From the SDK project concept, this text applies to the DEV-KIT
The SDK is the "shop window" for the CORE-V project. It is the vehicle through which uses will experience CORE-V for the first time. The user must be able to install software seamlessly and be able to get started with their first project easily. This will require a set of "starter" example projects, getting started guides, tutorials, user manuals and reference documentation, much provided both as physical text and via video and online help systems.


## Industry landscape: description of competing, alternative, or related efforts in the industry

## OpenHW Members/Participants committed to participate
Quicklogic - Dev-board design, User guides, eFPGA documentation
Ashling - Leadership from SDK perspective and how it comes together
CMC - Manufacture, design review, User guides


## Project Leader(s)
### Technical Project Leader(s)
### Project Manager, if a PM is designated
Name from CMC
Name from Quicklogic
Name from Ashling


## Next steps/Investigation towards Project Launch (**PC only**)

- Initial project plan. This should be led by Quicklogic, CMC, and Ashling 
- Initial versions of 
-- Dev-Board Design Specification
-- Dev-Kit Cost Analysis
-- Dev-Kit Distribution Plan


### Target Date for PL
February 2022

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
