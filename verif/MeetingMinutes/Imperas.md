May 11, 2020
============

Attendees:
----------

**OpenHW:** Mike Thompson<br>
**Imperas:** Lee Moore, Simon Davidmann<br>
**em-micro:** Greg Tumbush

Notes:
------

New actions: Mike, Greg, Simon.<br>

Topics:
-------

1. Open Actions:

- **Greg** issued updated pull-request (closed)
- **Lee** already investigate ELFD generation (see minutes from May 4). (closed)
- **Mike** worked with Owain Jones at CMC to get OVPsim licenses installed. (closed)
- **Mike** reports that NVIDIA has accepted action to create execution-example for core-v-isg. (closed)


2. Lee's Issues:

- Send Lee the updates to the code for DSIM
- NM File: for the monitor only - symbol for stdout peripheral and for program ecall (for exit).
- Drystone testcase is failing because of reads of uninitialized memory.  See "Handing of uninitialized memory" below.
- Davide cannot reproduce trace issue<br>
ACTION: **Greg** to investigate.

3. Handing of uninitialized memory:

- The drystone code reads, but does not use, uninitialized data from memory.  This cases comparison
failures in the testbench (because X !== 0|1).
- Three possible solutions: (1) 2-state comparions, (2) initialize memory to 0, (3) initialize memory with random data.
- We agreed on solution (3). Implement in base testcase that will initialized both the TB and ISS memories with same pseudo-random pattern.<br>
ACTION: **Greg** to implement and push to his `iss_integration` fork/branch.

4. Going "live" with the Imperas ISS

- Mike is motivated to get the Imperas ISS installed and enabled on the core-v-verif master branch as soon as possible.
- This will not be gated by interrupt verification.
- ACTION: **Mike** to pipeclean install process with CMC.
- ACTION: **Simon** to write up a HOWTO for OpenHW users to install ISS license.



May 4, 2020
===========

Attendees:
----------

**OpenHW:** Mike Thompson<br>
**Imperas:** Lee Moore, Simon Davidmann<br>
**em-micro:** Greg Tumbush

Notes:
------

Actions: Mike, Lee, Greg.<br>
Note: meeting minutes published on GitHub at core-v-docs/verif/MeetingMinutes.

Topics:
-------

1. Status of Step-and-Compare

- Greg reports S&C working for all CSRs, GPRs and PC using 'hello-world'.<br>
- Mike wants inclusion of the ISS to be a compile-time option (not in by default).<br>
ACTION: **Greg** to issue updated pull-request as soon as he has a couple if other programs runing and passing PLUS compile-time inclusion of ISS.

2. ELDF conversion

- Lee wanted to know how data section was handled in ELF to hex-file conversion.<br>
- Mike was "pretty sure" that the conversion simply ignored the program by including everything.<br>
ACTION: **Lee** to investigate.<br>
Note: Lee has already responded - see email thread "Open HW Testbench ELDF conversion" (it would appear that the method used to convert elf-\>hex using objcopy - does indeed include the initialised data section)

3. CMC:

- Simon enquired about status of ISS installation at CMC.<br>
ACTION: **Mike** to speak with Owain Jones at CMC.

4. Other Business:

- Simon has had a look at the core-v-isg and would like to know when it will be ready to use.<br>
ACTION: **Mike** has weekly status meetings with NVIDIA (who donated the code) and will report back.  Next OpenHW + NVIDIA meeting is 2020-05-06 at 21:00 EDT.


