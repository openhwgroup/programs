# Software TG monthly meeting - Verilator modeling update (12 July 2021)

## Overview

The TAP driver is proving rather more complex than originally planned, with a
need to model the DTM as well as the TAP leading to delays in all milestones
of around 1 month.

We have the software TAP drivers, and can read and write DTM registers. This
is leading to questions about unexpected behavior of some registers.

## Milestone progress

The [detailed plan](https://docs.google.com/spreadsheets/d/1Sl_GIklam3redWNj_DRVRVVBD49LvLD8k1zeFsJXllc) is a Google Doc.  In due course the high level data will be presented as a GitHub project board (aka Kanban board).

Progress is shown as a percentage of tasks completed.

| Milestone                    | # Tasks | This Month | Last Month |   Planned |  Forecast |
| ---------------------------- | -------:| ----------:| ----------:| --------- | --------- |
| Verilator model available    |       1 |       100% |          - | 30 May 21 |         - |
| JTAG TAP driver complete     |   5 (3) |        40% |          - | 27 Jun 21 | 25 Jul 21 |
| Intial version of Embdebug   |       2 |          - |          - | 18 Jul 21 | 15 Aug 21 |
| Initial standalone simulator |       2 |          - |          - | 25 Jul 21 | 22 Aug 21 |
| Final version of Embdebug    |       3 |          - |          - | 22 Aug 21 | 19 Sep 21 |
| Final standalone simulator   |       1 |          - |          - |  5 Sep 21 | 26 Sep 21 |

## Testing status

Not yet available.

## Risk register

The risk register has been created, and is available as a tab on the detailed plan.  The following risk has increased in likelihood.

1. Insufficient specialist staff who know Verilator and Embdebug.  Mitigation is to prioritize initial versions of tool and keep requirements to a minimum.

The following risk has been added.

3. Estimates of effort are too low.  Mitigation is addressing highest risk items first and chosing simplest designs throughout.

## Plans for next month

* complete the JTAG TAP driver (DTM driver, TAP and DTM tests)
* start work on the Embdebug target library for CORE-V MCU
