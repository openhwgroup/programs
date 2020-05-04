May 4, 2020
===========

Attendees:
----------

**OpenHW:** Mike Thompson<br>
**Imperas:** Lee Moore, Simon Davidmann<br>
**em-micro:** Greg Tumbush

Notes:
------

Actions: Mike, Lee, Greg.
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
ACTION: **Mike** has weekyl status meetings with NVIDIA (who donated the code) and will report back.  Next OpenHW + NVIDIA meeting is 2020-05-06 at 21:00 EDT.


