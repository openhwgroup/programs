<!--

# OpenHW Project Concept and Project Launch Markdown Template: Instructions

This template is divided into two parts:
- The Project Concept (PC) required fields are shown in the first part.
- The additional Project Launch (PL) required and optional fields are shown in the second part.

Delete any sections not needed for your proposal

The normal proposal flow is:

- The PC proposal is prepared and presented to TWG. The PC proposal introduces
  the project and explains the market drivers and the "why"
  - TWG grants PC gate with feedback, or rejects PC gate with feedback
  - If PC is granted, additional work is carried out to prepare the PL proposal.
- The PL proposal contains updates to the PC fields and adds additional fields.
  The PL proposal explains the "what" of the project.
  - For software porting projects, the PL should contain the feature list
  - For IP core or other complex projects, the PL should contain a high level
    feature list (the user manual with feature specification is developed for
    the Plan Approved gate).

-->

# Superscalar CVA6

# Project Concept Proposal

## Date of proposal - 2023-08-28

## Author(s) - Côme Allart

## High Level Summary of project, project components, and deliverables

The goal is to provide a faster version of CVA6, with an opt-in configuration
option to enable dual-issue.

- The project should not impact other configurations: each characteristic of
  CVA6 without dual-issue must be the same or better than before
  modifications. Specifically, no area should be added at all if dual-issue is
  disabled.
- The performance gain is not ISA-specific and does not require compiler
  changes: the exact same code must be executed faster.
- The project, as a CVA6 configuration option, will benefit from CVA6
  verification work.

The current estimations are:

- performance: 4.56 CoreMark/MHz (+47%)
- area cost: 18 kGates (+14%)

## Summary of market or input requirements

As for the competition evolution, OpenHW Group should offer such a higher
performance core.

### Known market/project requirements at PC gate

TBD

### Potential future enhancements

Branch prediction currently has an impact on instruction fetch only.
Therefore, instructions following an unresolved branch are not issued.

It should be possible to change the issue stage and the branch functional unit
to issue speculative instructions.

The current estimations for this change are:

- performance:
  - Single issue: 3.23 CoreMark/MHz (+4.1%)
  - Dual issue: 4.85 CoreMark/MHz (+5.4%)
- area cost: 3 kGates (+2.3%)

## Who would make use of OpenHW output

Everyone interested in implementing a fast CVA6.

Interested entities include:

- Thales
- Tristan project (EU)

## Initial Estimate of Timeline

1. Fetch 64 bits (frontend): September 2023
2. Dual-issue (issue stage): October 2023
3. Added ALU (EX stage): December 2023

## Explanation of why OpenHW should do this project

Improve CVA6 performance without impacting too much power/area.

## Industry landscape: description of competing, alternative, or related efforts in the industry

TBD

## OpenHW Members/Participants committed to participate

- Côme Allart, Thales DIS
- André Sintzoff, Thales DIS

## Project Leader(s)

### Technical Project Leader(s)

André Sintzoff, DIS

### Project Manager, if a PM is designated

None

## Next steps/Investigation towards Project Launch (**PC only**)

- Review of existing work on CVA6: September 2023

## Target Date for PL

End of September 2023
