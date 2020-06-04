May 20, 2020
============

Attendees:
----------

**OpenHW:** Mike Thompson <br>
**NVIDIA** Neo Fang, Wenjing Song, Lesliex

Notes:
------

Actions: Mike

Topics:
--------

1. Open Action Items:

- (Closed) **Neo**: example testbench to run core-v-isg.
- (Closed) **Mike** to forward a couple of useful formal verification papers from Oski Technologies.
- (Closed) **Neo** to investigate the effort required to port the NVIDIA instruction set generator for 32-bits.
- (Closed) **Mike** to send out an agenda 2 days ahead of time.

2. Additional questions about the NVIDIA ISG.

* Mike asked about the effort required to create a 64/32-bit version of the NVIDIA ISG.
  * Neo estimates this would be about 2 to 3 weeks of effort for an engineer already familiar with the code.
* User Manual:
  * A User Manual is planned, but NVIDA cannot commit to a specific delivery date.   Effort to generate the document is ~2wk.
  * Mike will review the "NEED_CHANGE" comments in the `riscv_base_seq` to see if he has any questions about controlling the generator.
* The INVIA sub-division of Thale has seen core-v-isg and wants to know if it supports MMU, cache, interrupts and all RV ISA extensions (M, C, A, M, D, etc.).
  * MMU is not explicitly supported
  * Cache is not supported
  * the NVIDIA ISG will generate code for interrupt handlers, but the testbench is required to drive interrupts
  * RV64IMCF extensions are supported
  * User and Supervisor modes are supported

3. Example testbench:

- Thanks to Neo for generating this so quickly.
- Mike has updated the dsim.mk Makefile and successfully run the example using Metrics DSIM
ACTION: **Mike** to update xrun.mk to allow Cadence Xcelium users to run the example.
- Mike and Neo briefly reviewed some of the code.

4. NVIDIA contribution to OpenHW CORE-V verification.

- Rick O'Connor has issued a "call for participation" to execute verification of the CV32E40P as soon as possible.
- Mike has developed a detailed project plan that requires 4 FTE engineers to complete the task by 2020-09-25.
- How can NVIDIA contribute to this effort?
ACTION: **Mike** to arrange a meeting with NVIDIA leaders to discuss.


May 13, 2020
===========

Attendees:
----------

**OpenHW:** Mike Thompson <br>
**NVIDIA** Neo Fang, Doris Yin, Eric Liang, Wenjing Song

Notes:
------

Actions: Neo, Mike

Topics:
--------

1. Open action items:

- CLOSED: **Mike:** to create a set of slides and present in our next meeting (see CORE-V Overview for NVIDIA team below).
- CLOSED: **Neo:** to create a "vcs.mk" to support compiling with Synopsys VCS.
- OPEN: **Neo:** has made some progress creating example testbench to run core-v-isg.  Still working on it.

2. CORE-V Overview for NVIDIA team:

- Mike gave a status [presentation](https://github.com/openhwgroup/core-v-docs/blob/master/verif/Common/Presentations/20200512_OpenHW_Verif_Status.pdf) to the NVIDIA team.
- Neo had several questions about OpenHW plans for Formal Verification.  The detailed plann is captured in the [Formal Verification](https://core-v-docs-verif-strat.readthedocs.io/en/latest/formal.html) chapter of the CORE-V Verification Strategy.<br>
ACTION: **Mike** to forward a couple of useful papers from Oski Technologies.
- The current plan of record for the CV32E40P is to use the Imperas Instruction Set Simulator (ISS) as the reference model for the core.  Using a Spike model will require additional effort (it is possible, just not part of the plan).
- Mike informed the team that users of the Imperas ISS will need to obtain a license from Imperas.  These will be provided free of charge by Imperas for OpenHW members working on CV32E40P.

3. Using [core-v-isg](https://github.com/openhwgroup/core-v-isg) for 32-bit cores:

- Neo is not sure how much effort it would be to port the NVIDIA instruction set generator (now core-v-isg) for 32-bit architectures.<br>
ACTION: **Neo** to investigate and report back at the next meeting.

4. Next meetings:

- team agreed to maintain weekly meetings at this timeslot (9AM Beijing time).
- **Mike** to send out an Agenda 2 days ahead of time (with reminders of Action Items).


May 6, 2020
===========

Attendees:
----------

**OpenHW:** Mike Thompson <br>
**NVIDIA** Joe Xie, Neo Fang, Doris Yin, Eric Liang, Robert Liu, Wenjing Song

Notes:
------

Actions: Neo, Mike


Topics:
-------
1. Regular meetings:

- Mike has regular (typically weekly) meetings with several of the OpenHW Member
Companies that contribute engineering staff to CORE-V verification.
- It is possible that the new management team at OpenHW may want to modify that
meeting schedule in the future.
- In the meantime, Joe and Mike agree to hold weekly meetings on Thursdays, at
9:00A.M., China time (Wednesdays, 9PM EDT).<br>
ACTION: **Mike** to book these meetings.

2. Executable demo for core-v-isg

- Mike reports that the core-v-isg has Makefiles to compile it using
Cadence Xcelium (xrun) and Metrics dsim.<br>
ACTION: **Neo** to create a "vcs.mk" to support compiling with Synopsys VCS.
- Mike would like to create an "executable example".  This would require a simple
testbench and/or program  that would compile the isg, and run it to generate a hexfile.
- Neo agreed that he could do this for VCS.<br>
ACTION:  **Neo** to create example testbench and add ability to vcs.mk to compile
and run it.


3. Use of core-v-isg for CORE-V verification

- Current core-v-isg is targets RV64 cores and will require some effort to port
to RV32 architectures.
- The strategy for CV32E40P was defined prior to NVIDIA joining OpenHW and is
currently planned to use the Google instructon set generator (rsicv-dv)
- Mike recommends we deploy core-v-isg on the CV64A, an RV64 ISA core.
- Use of core-v-isg for future CV32 cores is to-be-determined.

4. CORE-V Overview for NVIDIA team

- Joe requested a presentation for the team.<br>
ACTION: **Mike:** to create a set of slides and present in our next meeting.

- Mike quickly introduced the NIVIDA team to several sources of information:<br>
https://www.openhwgroup.org/membership/members/ <br>
https://core-v-docs-verif-strat.readthedocs.io/en/latest <br>
https://github.com/openhwgroup/core-v-docs <br>
https://github.com/openhwgroup/core-v-verif <br>
https://github.com/openhwgroup/core-v-cv32e40p <br>
https://metrics.ca/ <br>
