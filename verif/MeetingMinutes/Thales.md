May 14, 2020
============

Attendees:
----------

**OpenHW:** Mike Thompson, Davide Schiavone <br>
**Thales:** Jerome Quevremont, Jean Roch Coulon, Sebastien Jacq

Notes:
------

Actions: Mike, Jean Roch

Topics:
-------

1. Open Actions:

- **Jean Roch** and **Mike** agreed to date/time for a meeting to review an update of the CV32E verification strategy and status presentation.  Closed.

2. Instruction Generator:

- Jean Roch has reviewed comparison chart for core-v-isg (NVIDIA instruction generator).  The
chart does not explicitly call out features important to INVIA such as MMU, cache, interrupts and all RV ISA extensions (M, C, A, M, D, etc.).<br>
ACTION: **Mike** to discuss with NIVIDA.

3. CV32A

- The CV32A is a 32-bit variant of the PULP Ariane core developed by Thales/INVIA.  It may
be donated to OpenHW.
- Thales/TDT is interested in an FPGA implementation of CV32A.
- Thales/INVIA is primarily interested in an ASIC implementation of CV32A.
Thales TDT and NVIA teams are not targetting use of CV32E40P but are willing to contribute
to the verification of CV32E40P for features that overlap with CV32A.

3. CV32E40P Verification Project Plan:

- Mike has a task to develop a project plan to complete CV32E40P verification by 2020-10-30.

4. Next Meeting:

- The weekly meeting on Thursday, May 21 will be cancelled to due a holiday in France.
- Jerome Quevremont is on vacation from May 15..25.
- Sebastien Jacq can sit in on any meetings called to discuss the CV32E40P Verification Project Plan.


May 7, 2020
===========

Attendees:
----------

**OpenHW:** Mike Thompson, Davide Schiavone <br>
**Thales:** Jerome Quevremont, Jean Roch Coulon

Notes:
------

Actions: Mike, Jean Roch

Topics:
-------
1. Thales organization:

- Jerome explained that he and Jean Roch work in different divisions of Thales and in different cities.
- Jerome and his team work in the Thales Research & Technology (TRT) near Paris.
- Jean Roch and his team work in INVIA near Marseille. (INVIA is member of the Thales group.)
- Both TDT and INVIA intend to participate in the OpenHW Group.

2. Cores

- Up until a few weeks ago, the CV32E40 (RI5CY) and CV64A (Ariane) where the only two CORE-V cores activitly
considered by OpenHW.
- In recent weeks several other cores have been proposed (such as a 32-bit version of Ariane).
- Davide recommended that we keep the focus on CV32E and CV64A until such time as the TWG desides
on adding/changing cores to the CORE-V family.
- Jean Roch and the INVIA team have spent ~6 months investigating Ariane and are very familiar with  the core,
the Google instruction stream generator (riscv-dv) and using the Spike ISS.

3. Verification Environments

- Both OpenHW and INVIA have done a lot of work on verification, albeit on different cores.
- Mike will present to INVIA (and anyone from TDT who wishes to join) the strategy and status of the CV32E40P
(RI5CY) verification effort.   This will be done on Monday, May 11.<br>
ACTION: **Mike** to update his CV32E verification strategy and status presentation.<br>
ACTION: **Jean Roch** to confirm time and date and book conference call (with shared screen capability).
- Jean Rock to present INVIA's work with Ariane verification at the next weekly meeting.

4. Instruction Set Generator

- The INVIA team is very familar with the Google ISG (riscv-dv) and curious about the new
[core-v-isg](https://github.com/openhwgroup/core-v-isg) instruction set generator donated to OpenHW by NVIDIA.
- Mike indicated that this ISG was specifically coded for 64-bit cores.  It should be possible to target to 32-bit
cores.  The effort todo this has not been assessed.
- The current plan-of-record for the CV32E40P verification is to deploy and use the Google ISA.   A decision about an
ISA for CV64A has not been made.
