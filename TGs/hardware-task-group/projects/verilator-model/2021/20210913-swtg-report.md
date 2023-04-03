# Software TG monthly meeting - Verilator modeling update (13 Sep 2021)

## Overview

The TAP driver continues to prove complex, with changes to the CORE-V MCU RTL code base causing some difficulties this month.  We now have a working system again and can access the model through the debug interface and read/write all registers. The final steps of testing the JTAG interface will be to verify memory access works and that breakpoint behaviour can be implemented.

The project continues to struggle with lack of resource, with a delay of 12 weeks so far to the second milestone.  Overall there is a delay of 12 weeks to project completion, but there has been a slip of 5 weeks in the past month, and if we cannot identify further resource, then the delay to the overall project can only get worse. Given the project has slipped 12 weeks and is not yet halfway, a completion date towards the end of Q1/2022 seems more realistic.

## Milestone progress

The [detailed plan](https://docs.google.com/spreadsheets/d/1Sl_GIklam3redWNj_DRVRVVBD49LvLD8k1zeFsJXllc) is a Google Doc.  A high level view is also available as a [Kanban board](https://github.com/openhwgroup/embdebug-target-core-v/projects/1).

Progress is shown as a percentage of tasks completed.

| Milestone                    | # Tasks | This Month | Last Month |   Planned | This Mth  | Last Mth  |
| ---------------------------- | -------:| ----------:| ----------:| --------- | --------- | --------- |
| Verilator model available    |       1 |       100% |       100% | 30 May 21 |  Complete |  Complete |
| JTAG TAP driver complete     |       7 |        86% |        43% | 27 Jun 21 | 19 Sep 21 | 15 Aug 21 |
| Intial version of Embdebug   |       2 |          - |          - | 18 Jul 21 | 10 Oct 21 | 29 Aug 21 |
| Initial standalone simulator |       2 |          - |          - | 25 Jul 21 | 17 Oct 21 |  7 Sep 21 |
| Final version of Embdebug    |       3 |          - |          - | 22 Aug 21 | 14 Nov 21 |  3 Oct 21 |
| Final standalone simulator   |       1 |          - |          - |  5 Sep 21 | 28 Nov 21 | 10 Oct 21 |

## Testing status

Not yet available.

## Risk register

The risk register has been created, and is available as a tab on the detailed plan.  There are no changes this month.

## Plans for next month

* complete and test the JTAG TAP driver (DTM driver, TAP and DTM tests)
* start work on the Embdebug target library for CORE-V MCU
* implement initial standalone simulator
