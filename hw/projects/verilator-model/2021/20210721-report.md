# Hardware TG monthly meeting - Verilator modeling update (21 July 2021)

## Overview

The TAP driver is proving rather more complex than originally planned, with a need to model the DMI and DTM as well as the TAP. In addition we are struggling to commit the planned resource to the work, leading to increasing delays in all milestones of around 5 weeks.

We have the software TAP and DTM drivers, and can read and write DTM registers. We can also read and write some DMI registers.

We have raised issue [#150](https://github.com/openhwgroup/core-v-mcu/issues/150) about the Debug Module reporting an incorrect number of harts.

## Milestone progress

The [detailed plan](https://docs.google.com/spreadsheets/d/1Sl_GIklam3redWNj_DRVRVVBD49LvLD8k1zeFsJXllc) is a Google Doc and can be viewed as a [kanban board](https://github.com/openhwgroup/embdebug-target-core-v/projects/1) in the [embdebug-target-core-v repository](https://github.com/openhwgroup/embdebug-target-core-v).

4 tasks have been added to the JTAG TAP driver complete milestone since last month.  Progress is shown as a percentage of tasks completed.

| Milestone                    | # Tasks | This Mth | Last Mth | Planned   | This Mth  | Last Mth  |
| ---------------------------- | -------:| --------:| --------:| --------- | --------- | --------- |
| Verilator model available    |       1 |     100% |        - | 30 May 21 |       N/A |       N/A |
| JTAG TAP driver complete     |       7 |      42% |        - | 27 Jun 21 |  1 Aug 21 | 27 Jun 21 |
| Intial version of Embdebug   |       2 |        - |        - | 18 Jul 21 | 22 Aug 21 | 18 Jul 21 |
| Initial standalone simulator |       2 |        - |        - | 25 Jul 21 | 29 Aug 21 | 25 Jul 21 |
| Final version of Embdebug    |       3 |        - |        - | 22 Aug 21 | 26 Sep 21 | 22 Aug 21 |
| Final standalone simulator   |       1 |        - |        - |  5 Sep 21 |  3 Oct 21 |  5 Sep 21 |


## Task status

| Task status | This Month | Last Month |
| ------------| ----------:| ----------:|
| Planned     |          8 |         10 |
| In Progress |          4 |          1 |
| Complete    |          4 |          1 |
| **Total**   |     **16** |     **12** |

## Testing status

Not yet available.

## Risk register

The risk register has been created, and is available as a tab on the detailed plan.  The following risk has increased in likelihood since last month

1. Insufficient specialist staff who know Verilator and Embdebug.  Mitigation is to prioritize initial versions of tool and keep requirements to a minimum.

The following risk has been added since last month

3. Estimates of effort are too low.  Mitigation is addressing highest risk items first and chosing simplest designs throughout.

## Plans for next month

* complete the JTAG TAP driver (DTM driver, TAP and DTM tests)
* start work on the Embdebug target library for CORE-V MCU
