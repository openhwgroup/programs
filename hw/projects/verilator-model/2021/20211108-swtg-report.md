# Software TG monthly meeting - Verilator modeling update (8 Nov 2021)

## Overview

Work has resumed this month, and has shed more light on one issue, and exposed a second issue.

1. Verification issue [#820](https://github.com/openhwgroup/core-v-verif/issues/820): Accessing FP CSRs crashes the debug unit.  This is now established to be a lock up of the debug unit. As soon as one of these CSRs is accessed, `abstractcs` will continually report that the abstract command engine is busy, and cannot be released.

2. New MCU issue [#187](https://github.com/openhwgroup/core-v-mcu/issues/187) FPU register 0 reported through debug unit as tied to constant positive 0.  This appears to be analagous to the integer register bank, although the RISC-V standard specifies that F0 is a writable temporary register in the API.

We have effectively had a 6 week interregnum, when no work was possible, leading to a corresponding delay to the final deliverables.

## Milestone progress

The [detailed plan](https://docs.google.com/spreadsheets/d/1Sl_GIklam3redWNj_DRVRVVBD49LvLD8k1zeFsJXllc) is a Google Doc.  A high level view is also available as a [Kanban board](https://github.com/openhwgroup/embdebug-target-core-v/projects/1).

Progress is shown as a percentage of tasks completed.

| Milestone                    | # Tasks | This Month | Last Month |   Planned | This Mth  | Last Mth  |
| ---------------------------- | -------:| ----------:| ----------:| --------- | --------- | --------- |
| Verilator model available    |       1 |       100% |       100% | 30 May 21 |  Complete |  Complete |
| JTAG TAP driver complete     |       7 |        86% |        43% | 27 Jun 21 | 21 Nov 21 | 24 Oct 21 |
| Intial version of Embdebug   |       2 |          - |          - | 18 Jul 21 |  2 Jan 22 |  5 Dec 21 |
| Initial standalone simulator |       2 |          - |          - | 25 Jul 21 | 16 Jan 22 | 19 Dec 21 |
| Final version of Embdebug    |       3 |          - |          - | 22 Aug 21 | 13 Mar 22 | 13 Feb 22 |
| Final standalone simulator   |       1 |          - |          - |  5 Sep 21 |  3 Apr 22 |  6 Mar 22 |

## Testing status

Not yet available.

## Risk register

The risk register has been created, and is available as a tab on the detailed plan.  There are no changes this month.

## Plans for next month

* complete and test the JTAG TAP driver (DTM driver, TAP and DTM tests)
* start work on the Embdebug target library for CORE-V MCU
* implement initial standalone simulator
