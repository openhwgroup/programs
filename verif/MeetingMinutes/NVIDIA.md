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
