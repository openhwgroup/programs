# Software TG monthly meeting - Verilator modeling update (9 August 2021)

## Overview

The TAP driver continues to prove complex, with the documentation based on the PULP debug inteface proving incomplete and incorrect in places (risk 2 materializing). Implementing the DMI model has taken longer than planned, with all but one register now modeled in the DMI. This week is focussed on testing the complete TAP interface.

The project continues to struggle with lack of resource, with a delay of 7 weeks to the second milestone.  Overall there is a delay of 5 weeks to project completion, but there has been a slip of 3 weeks in the past month, and if we cannot identify further resource, then the delay to the overall project can only get worse.

## Milestone progress

The [detailed plan](https://docs.google.com/spreadsheets/d/1Sl_GIklam3redWNj_DRVRVVBD49LvLD8k1zeFsJXllc) is a Google Doc.  In due course the high level data will be presented as a GitHub project board (aka Kanban board).

Progress is shown as a percentage of tasks completed.

| Milestone                    | # Tasks | This Month | Last Month |   Planned | This Mth  | Last Mth  |
| ---------------------------- | -------:| ----------:| ----------:| --------- | --------- | --------- |
| Verilator model available    |       1 |       100% |       100% | 30 May 21 |  Complete |  Complete |
| JTAG TAP driver complete     |   7 (5) |        43% |        40% | 27 Jun 21 | 15 Aug 21 | 25 Jul 21 |
| Intial version of Embdebug   |       2 |          - |          - | 18 Jul 21 | 29 Aug 21 | 15 Aug 21 |
| Initial standalone simulator |       2 |          - |          - | 25 Jul 21 |  7 Sep 21 | 22 Aug 21 |
| Final version of Embdebug    |       3 |          - |          - | 22 Aug 21 |  3 Oct 21 | 19 Sep 21 |
| Final standalone simulator   |       1 |          - |          - |  5 Sep 21 | 10 Oct 21 | 26 Sep 21 |

## Testing status

Not yet available.

## Risk register

The risk register has been created, and is available as a tab on the detailed plan.  The following risk has increased in likelihood.

2. Lack of debugger documentation causes increases effort required to develop debug interface.  Mitigation is Early engagement with ETH team to understand documentation.

## Plans for next month

* complete and test the JTAG TAP driver (DTM driver, TAP and DTM tests)
* start work on the Embdebug target library for CORE-V MCU
* implement initial standalone simulator
