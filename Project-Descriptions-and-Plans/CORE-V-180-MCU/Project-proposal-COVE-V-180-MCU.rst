OpenHW Project Concept And Project Launch Markdown Template: Instructions
=========================================================================

*This template is divided into two parts:* - *The*\ **Project Concept
(PC)**\ *required fields are shown in the first part.* - *The
additional*\ **Project Launch (PL)**\ *required and optional fields are
shown in the second part.*

*Delete any sections not needed for your proposal*

*The normal proposal flow is:* - **The PC proposal** *is prepared and
presented to TWG. The PC proposal introduces the project and explains
the market drivers and the “why”* - *TWG grants PC gate with feedback,
or rejects PC gate with feedback* - *If PC granted, additional work is
carried out to prepare the*\ **PL proposal**. - *The*\ **PL
proposal**\ *contains updates to the PC fields and adds additional
fields. The PL proposal explains the “what” of the project.* - *For
software porting projects, the PL should contain the feature list* -
*For IP core or other complex projects, the PL should contain a high
level feature list (the user manual with feature specification is
developed for the Plan Approved gate).*

.. raw:: html

   <hr/>

**Part 1, PC fields:** *The PC proposal introduces the project and
explains the market drivers and the “why”*

Title of Project - “CORE-V-180-MCU”
===================================

Project Concept Proposal
========================

Date of proposal - 2023-04-24
-----------------------------

Author(s) - Jean-Paul Chaput, Marie-Minerve Louerat, Karthik Chandrasekaran
---------------------------------------------------------------------------

High Level Summary of project, project components, and deliverables
-------------------------------------------------------------------

This project is the creation of an updated version of the CORE-V-MCU in
a different process technology. The process is the GF-180 which is an
open-source PDK process. The flow from RTL to GSDII will use entirely
open source tooling with back-end (place and route, clock tree analysis,
etc.) developed by LIP6. Key outputs of the project include

-  Revision/simplification of the CORE-V-MCU design so as to enable the
   chip to fit within the area allowed under the GF180 shuttle process.
-  Verification goals to be determined
-  Digital synthesis using open-source (Yosys) tools
-  PLL will be developed/supplied by LIP6
-  Back-end design into the GF-180 process using open-source tools
   developed and published by Sorbonne LIP6
-  Back-end design tool input (including scripts) as a minimum will be
   part of the open-source project output
-  Layout can be published
-  The project will serve as a validation of the LIP6 tools. Specific
   output (white paper, publication…) of the tool validation to be
   determined.
-  Fabrication of the device
-  PCB creation for test purposes
-  Documentation of the device
-  Documentation of the open-source design/implementation process (to be
   determined the role of OpenHW and LIP6 in this)

Further development of software or applications on the PCB is for
further study.

The open-source tools utilized in the project will include: - tool1 ….

Summary of market or input requirements
---------------------------------------

Known market/project requirements at PC gate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Potential future enhancements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

see Industry landscape section for project drivers. The key point is
that this project is a demonstration and validation of an open design
process that will greatly assist smaller companies.

Who would make use of OpenHW output
-----------------------------------

First and foremost, we believe that the chip can be used by universities
for teaching purposes.

Second, the device may be adopted or used as the basis of designs for
commerical purposes (e.g. small appliances or IoT applications). Small
business could adopt the chip baseline design together with the open
source scripts and easily modify the chip as needed.

To support the second goal, obviously documentation of the “how-to” for
the design tools is very important.

As described in “why”

Initial Estimate of Timeline
----------------------------

At the project concept phase, an initial target of 1 year to undertake
the following:

-  tradeoff of features and available space, understanding potential
   applications
-  design exploration of IP blocks and sources: – GF external SRAM –
   LIP6 SRAM – chips4makers
-  Implement the CORE-V-MCU
-  Layout & layout verification/signoff
-  Fabrication

Explanation of why OpenHW should do this project
------------------------------------------------

This project is an ecosystem-enabling effort. From the perspective of
small companies needing to design and fabricate a chip, cost barriers
include (i) Design tools and design costs (ii) IP licensing costs (iii)
fabrication costs

While OpenHW is already providing open-source cores and related IP which
are free of license costs, implementation costs can be very high,
particularly EDA tools. This project validates the use of open-source
back-end tools from LIP6 which can potentially be a game-changer. This
complements OpenHW’s open-source mission.

Industry landscape: description of competing, alternative, or related efforts in the industry
---------------------------------------------------------------------------------------------

See the Global Foundries github site describing the GF180 program
https://github.com/google/gf180mcu-pdk In short

“The GF180MCU open source PDK is a collaboration between Google and
GlobalFoundries to provide a fully open source process design kit (PDK)
and related resources to enable the creation of designs manufacturable
at GlobalFoundries’s facility on their 0.18um 3.3V/6V MCU process
technology.” As of April 2023, the GF180 is targetted at test chips.

OpenHW Members/Participants committed to participate
----------------------------------------------------

+-----------------------+-----------------------+-----------------------+
| Aspect                | Organization          | Individual if known   |
+=======================+=======================+=======================+
| tradeoff of features, | LIP6                  | Jean-Paul             |
| space, applications   |                       | (particularly         |
|                       |                       | back-end              |
+-----------------------+-----------------------+-----------------------+
|                       | GF                    | Karthik or other      |
|                       |                       | staff from GF         |
+-----------------------+-----------------------+-----------------------+
|                       | OpenHW staff          | TBD for consultation  |
+-----------------------+-----------------------+-----------------------+
| design exploration of | LIP6                  | Jean-Paul             |
| IP blocks and sources |                       |                       |
+-----------------------+-----------------------+-----------------------+
| Implement the         | LIP6                  | Jean-Paul             |
| CORE-V-MCU (yosys)    |                       |                       |
+-----------------------+-----------------------+-----------------------+
| Implement the         | LIP6                  | Jean-Paul             |
| CORE-V-MCU (back-end) |                       |                       |
+-----------------------+-----------------------+-----------------------+
| Ongoing engineering   | GF                    | TBD                   |
| consultation          |                       |                       |
+-----------------------+-----------------------+-----------------------+

Sorbonne LIP6 will drive

-  the back-end design

Project Leader(s)
-----------------

Technical Project Leader(s)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Jean-Paul will act as project leader.

Project Manager, if a PM is designated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Next steps/Investigation towards Project Launch (**PC only**)
-------------------------------------------------------------

Item1 to investigate
~~~~~~~~~~~~~~~~~~~~

-  Initiate a regular project meeting to start discussing tradeoffs,
   clarifying the applications targeted
-  Put an architecture diagram together with list of IP blocks
-  Put more detail on the project timeline and steps
-  Establish a project repo in OpenHW and choose a project license
-  Create project slide deck to drive interest inside/outside OpenHW
-  Create initial document outline for the user manual
-  target TWG meeting at end of July 2023 for Project Launch

.. raw:: html

   <hr/>

**Part 2, PL fields:**

*The PL proposal explains the “what”. Some of it can be updated directly
from the PC proposal*

Title of Project - “CORE-V CoresProject XYZ”
============================================

Project Launch Proposal
=======================

Date of proposal - 2021-01-01
-----------------------------

Author(s) - Joe Smith, Mary Jones
---------------------------------

Summary of project
------------------

Components of the Project
~~~~~~~~~~~~~~~~~~~~~~~~~

*Components are major project components or groups of features.* - *A
project may have, for example, 1-10 components.* - *Components detail
the “The what” at high level, not detailed level* - *Components don’t
consider timeline.* - *For example* - *Component 1 “Compiler changes for
standard instructions.”* - *Component 2 “Compiler changes for custom
instructions”* - *Component 3 “Updates to compiler tools”.*

Component 1 Description
^^^^^^^^^^^^^^^^^^^^^^^

Component 2 Description
^^^^^^^^^^^^^^^^^^^^^^^

.. _summary-of-market-or-input-requirements-1:

Summary of market or input requirements
---------------------------------------

Known market/project requirements at PL gate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Potential future enhancements for future project phases
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. _who-would-make-use-of-openhw-output-1:

Who would make use of OpenHW output
-----------------------------------

Summary of Timeline
-------------------

*High level view of timeline, for example timeframe for each component*

.. _explanation-of-why-openhw-should-do-this-project-1:

Explanation of why OpenHW should do this project
------------------------------------------------

*What is the impact of doing/not doing this project on the OpenHW
ecosystem. Why is OpenHW best suited to do this project*

.. _industry-landscape-description-of-competing-alternative-or-related-efforts-in-the-industry-1:

Industry landscape: description of competing, alternative, or related efforts in the industry
---------------------------------------------------------------------------------------------

.. _openhw-membersparticipants-committed-to-participate-1:

OpenHW Members/Participants committed to participate
----------------------------------------------------

.. _project-leaders-1:

Project Leader(s)
-----------------

.. _technical-project-leaders-1:

Technical Project Leader(s)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. _project-manager-if-a-pm-is-designated-1:

Project Manager, if a PM is designated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Project Documents
-----------------

Project Planning Documents
~~~~~~~~~~~~~~~~~~~~~~~~~~

Project Output Documents
~~~~~~~~~~~~~~~~~~~~~~~~

List of project technical outputs
---------------------------------

*This is a list of technical artifacts produced by the project*

Feature Requirements
~~~~~~~~~~~~~~~~~~~~

*Features are more granular than Components.* *For SW porting projects,
this list serves as the detailed project reference for features* *For IP
Cores or more complext projects, a user manual with requirements
specification is produced at the PA gate, which may supercede this list
of features*

Feature 1
^^^^^^^^^

Feature 2
^^^^^^^^^

External dependencies
---------------------

*These are external factors on which the project depends, such as
external standards ratification, external technology input, etc.*

OpenHW TGs Involved
-------------------

*Which TG will be involved, such as SW, HW, Verification, etc.*

Resource Requirements
---------------------

*This is a list of major resources/people required to implement the
project and indication of whether the resources are available*

Engineering resource supplied by members - requirement and availability
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

OpenHW engineering staff resource plan: requirement and availability
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Marketing resource - requirement and availability
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Funding for project aspects - requirement and availability
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Architecture and/or context diagrams
------------------------------------

*Architecture (internal blocks and interconnections), and context
(depiction of the the project content within its operational context),
are both encouraged where appropriate to depict functionality to both
subject matter experts and to non-experts*

Project license model
---------------------

Description of initial code contribution, if required
-----------------------------------------------------

Repository Requirements
-----------------------

Project distribution model
--------------------------

Preliminary Project plan
------------------------

*A full project plan is not required at PL. A preliminary plan, which
can be for instance the schedule for completion of component or feature
list, together with responsible resource, should be provided. Full
details should be provided at PA gate.*

Risk Register
-------------

*A list of known risks, for example external dependencies, and any
mitigation strategy*
