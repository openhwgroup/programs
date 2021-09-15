# Hardware TG monthly meeting - Verilator modeling update (15 September 2021)

## Overview

The TAP driver continues to prove complex, with changes to the CORE-V MCU RTL code base causing some difficulties this month.  We now have a working system again and can access the model through the debug interface and read/write all registers. The final steps of testing the JTAG interface will be to verify memory access works and that breakpoint behaviour can be implemented.

The project continues to struggle with lack of resource, with a delay of 12 weeks so far to the second milestone.  Analysis shows that there has been 8 hours/week contributed over the project to date, rather than the planned 16 hours/week.  The plan has been updated to reflect this as the planning assumption going forward.

With this assumption, there is a delay of 23 weeks to project completion, and this would seem to be more realistic.

## Issues

No new issues raised.

## Milestone progress

The [detailed plan](https://docs.google.com/spreadsheets/d/1Sl_GIklam3redWNj_DRVRVVBD49LvLD8k1zeFsJXllc) is a Google Doc.  A high level view is also available as a [Kanban board](https://github.com/openhwgroup/embdebug-target-core-v/projects/1).

Progress is shown as a percentage of tasks completed.

| Milestone                    | # Tasks | This Mth | Last Mth | Planned   | This Mth  | Last Mth  |
| ---------------------------- | -------:| --------:| --------:| --------- | --------- | --------- |
| Verilator model available    |       1 |     100% |        - | 30 May 21 |  Complete |  Complete |
| JTAG TAP driver complete     |       7 |      86% |        - | 27 Jun 21 | 26 Sep 21 | 22 Aug 21 |
| Intial version of Embdebug   |       2 |        - |        - | 18 Jul 21 |  7 Nov 21 | 12 Sep 21 |
| Initial standalone simulator |       2 |        - |        - | 25 Jul 21 | 21 Nov 21 | 19 Sep 21 |
| Final version of Embdebug    |       3 |        - |        - | 22 Aug 21 | 16 Jan 22 | 17 Oct 21 |
| Final standalone simulator   |       1 |        - |        - |  5 Sep 21 |  6 Feb 22 | 31 Oct 21 |


## Task status

* Task *RISC-V DMI tests written* is in progress, but now estimated to require an additional 26 hours (225% overrun).

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
