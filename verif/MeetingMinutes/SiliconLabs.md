April 29, 2020
==============

Attendees:
----------

**OpenHW:** Davide Schiavone, Mike Thompson<br>
**SiLabs:** Oivind Ekelund, Wajid Minhass, Paul Zavalney, Sebastian Ahmed, Steve Richmon

Notes:
------

Actions: Mike, Wajid, Paul.
Note: meeting minutes published on GitHub at core-v-docs/verif/MeetingMinutes.

Topics:
-------
1. Status of Actions from last meeting:
- Mike confirmed that riscv-dbg is being used by lowRISC Ibex.
- Davide reached out to Chips Alliance but has not received confirmation from them regarding their use/verification of riscv-dbg.
- Mike captured strategy for supporting both Core-level and Subsystem-level verification in a single UVM environment in the Verification Strategy.  Arjan provided review comments.
- Wajid has not yet had a chance to start on the review of the core-level debug verification implementation at lowRISC Ibex.
- Davide and Paul completed an update of Debug and Trace features in the user manual (see pr #287).
- Mike completed translation of user manual into restructured text.
- Wajid has not yet had a chance to start on the cv32e40p debug Vplan.

2. New Leadership:

- Mike will generate status for newly appointed VTG co-chairs Steve Richmond and Jingliang Wang.
- Team agreed that our on-going debug-verification effort would proceed as usual since debug is a "low hanging fruit" that needs to be implemented/verified regardless of future direction from the VTG co-chairs and/or TWG.

3. Next Steps:

- Team agreed to consolidate all debug verification into core-v-verif UVM environment.<br>
ACTION: **Mike** to retire the "dm", "scripts", "tb\_MPU", tb\_riscv" and "verilotor-model" testbenches in the core-v-verif repo.
- Need to get started on the debug Vplan.<br>
ACTION: **Wajid** to provide an estimate of completion for the Vplan and review of the lowRISC Ibex implementation.

4. Other Business:

- Team re-iterated that the current focus shall be on debug verification of the core, not subsystem.  Subsystem considerations may be discussed at a future date.
- SiLabs is interested in using the Pulp riscv-dbg IP as the DM for their cv32e40p based subsystem.  No interest in a commercial DM at this time.
- Paul has encountered issues using the PULP toolchain.  Mike reported that this has been a long-standing open issue.<br>
ACTION: **Mike** to reach out to newly appointed SW TG co-chairs.
- Team review Paul's suggested additions to the Verification Strategy to support debug verif.<br>
ACTION: **Mike** and **Paul** to integrate into the core-v-verif verification strategy.<br>
ACTION: **Mike** to provide an explanation of how/why the toolchain, test program and testbench memory map need to be aligned.
- Agree to hold weekly meetings in the same time-slot (Mike to book).


April 15, 2020
==============

Attendees:
----------

**OpenHW:** Davide Schiavone,Mike Thompson<br>
**SiLabs:** Oivind Ekelund, Paul Zavalney, Sebastian Ahmed, Steve Richmon, Arjan Bink

Notes:
------

Actions: Mike, David, Wajid, Paul, Sebastian.<br>
Slides available on GitHub at: https://github.com/openhwgroup/core-v-docs/tree/master/verif/Common/Presentations

Topics:
-------
1. Agreed that we should adopt the PULP-Platform [riscv-debug](https://github.com/pulp-platform/riscv-dbg) as the DM and DTM implementation for at least CV32E40P, CV32E40 and probably CV64A.

- Arjan has reverse-engineered the riscv-debug and it supports the functional sub-blocks and interfaces shown in Figure 1 of the [OBI specification](https://github.com/openhwgroup/core-v-docs/blob/master/cores/cv32e40p/OBI-v1.0.pdf).
- It is believed that this is the DM/DTM being used by lowRISC ibex.<br>
ACTION: Mike to confirm
- Rumour has it that this IP is being verified by Google.<br>
ACTION: Davide to confirm and inquire about projected completion.

2. Agreed that primary verification of debug should be done at the CORE level, not Subsystem level.

- Mike would still like to have the ability to verify debug at both the core and sub-system levels, but agreed with the goal to verify it first at the core level.<br>
ACTION: Mike to illustrate a strategy for supporting both Core-level and Subsystem-level verification in a single UVM environment.
- Verification environment for debug will be the UVM environment (uvmt\_cv32), not the "dm" testbench inherited from RI5CY.<br>
ACTION: Wajid to review Ibex core-level debug verification implementation.

3. Documentation:

- Paul had previously created a pull-request to update Debug and Trace features in the user manual.<br>
ACTION: **Davide** and **Paul** to push that through.
- Mike stupidly admitted that he is working to create a restructured text version of the user manual.<br>
ACTION: **Mike**, get it done and committed to GitHub.<br>
ACTION: **Paul** buys a bottle opener for the wine Davide will owe Mike.
- Need to get started on the debug Vplan.<br>
ACTION: **Wajid** owns this (Paul agreed to contribute)

4. Tracking:

- No strong comments/opinions about using GitHub's "per-repository projects", so Mike will publish tasks as GitHub issues on the CV32E40P Debug Verification project.
- Agreed to hold weekly meetings.
- ACTION: **Sebastian** to suggest convenient time for Austin and Oslo (we can assume these are also convenient for Ottawa and Zurick).
