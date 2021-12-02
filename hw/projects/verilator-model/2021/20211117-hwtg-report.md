# Hardware TG monthly meeting - Verilator modeling update (17 November 2021)

## Overview

Work has resumed this month.  The model can now read from memory using the system bus.  This work has led to the documentation of the CORE-V-MCU memory map (thanks to Davide Schiavione).  A further update to the PULP debug unit documentation is required to record that quick access and memory access are not implemented as abstract commands.  Once we have unaligned memory reading properly tested and memory writing added, the interface to the debug unit will be complete.  This will allow work on bringing up the debug server to proceed.

We have effectively had a 6 week interregnum, when no work was possible, leading to a corresponding delay to the final deliverables.

## Issues

The work has shed more light on one issue, and exposed a second issue.

1. Verification issue [#820](https://github.com/openhwgroup/core-v-verif/issues/820): Accessing FP CSRs crashes the debug unit.  This is now established to be a lock up of the debug unit. As soon as one of these CSRs is accessed, `abstractcs` will continually report that the abstract command engine is busy, and cannot be released.

	2. New MCU issue [#187](https://github.com/openhwgroup/core-v-mcu/issues/187) FPU register 0 reported through debug unit as tied to constant positive 0.  This appears to be analagous to the integer register bank, although the RISC-V standard specifies that `f0` is a writable temporary register in the API.

## Milestone progress

The [detailed plan](https://docs.google.com/spreadsheets/d/1Sl_GIklam3redWNj_DRVRVVBD49LvLD8k1zeFsJXllc) is a Google Doc.  A high level view is also available as a [Kanban board](https://github.com/openhwgroup/embdebug-target-core-v/projects/1).

Progress is shown as a percentage of tasks completed.

| Milestone                    | # Tasks | This Mth | Last Mth | Planned   | This Mth  | Last Mth  |
| ---------------------------- | -------:| --------:| --------:| --------- | --------- | --------- |
| Verilator model available    |       1 |     100% |        - | 30 May 21 |  Complete |  Complete |
| JTAG TAP driver complete     |       7 |      86% |        - | 27 Jun 21 | 21 Nov 21 | 31 Oct 21 |
| Intial version of Embdebug   |       2 |        - |        - | 18 Jul 21 |  2 Jan 22 | 12 Dec 21 |
| Initial standalone simulator |       2 |        - |        - | 25 Jul 21 | 16 Jan 22 | 26 Dec 21 |
| Final version of Embdebug    |       3 |        - |        - | 22 Aug 21 | 13 Mar 22 | 20 Feb 22 |
| Final standalone simulator   |       1 |        - |        - |  5 Sep 21 |  3 Apr 22 | 13 Mar 22 |

## Task status

* Task *RISC-V DMI tests written* is in progress, but now estimated to require an additional 43 hours (540% overrun).

| Task status | This Month | Last Month |
| ------------| ----------:| ----------:|
| Planned     |          8 |          8 |
| In Progress |          1 |          1 |
| Complete    |          7 |          7 |
| **Total**   |     **16** |     **16** |

## Testing status

Not yet available.

## Risk register

The risk register is available as a tab on the detailed plan.  There has been no change since last month.

## Plans for next month

* complete testing of the JTAG TAP driver DMI interface.
* start work on the Embdebug target library for CORE-V MCU
