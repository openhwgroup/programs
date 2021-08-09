# Hardware TG monthly meeting - Verilator modeling update (5 June 2021)

## Overview

The TAP driver is proving rather more complex than originally planned, with a
need to model the DTM as well as the TAP leading to delays in milestones.

We have the software TAP drivers, and can read and write DTM registers. This
is leading to questions about unexpected behavior of some registers.

The [detailed plan](https://docs.google.com/spreadsheets/d/1Sl_GIklam3redWNj_DRVRVVBD49LvLD8k1zeFsJXllc) has been created as a Google Doc.  In due course the high level data will be presented as a GitHub project board (aka Kanban board).

## Milestone progress

Progress is shown as a percentage of tasks completed.

| Milestone                    | # Tasks | This Month | Last Month |  Due Date |
| ---------------------------- | -------:| ----------:| ----------:| --------- |
| Verilator model available    |       1 |       100% |          - | 30 May 21 |
| JTAG TAP driver complete     |       3 |          - |          - | 27 Jun 21 |
| Intial version of Embdebug   |       2 |          - |          - | 18 Jul 21 |
| Final version of Embdebug    |       3 |          - |          - | 22 Aug 21 |
| Initial standalone simulator |       2 |          - |          - | 25 Jul 21 |
| Final standalone simulator   |       1 |          - |          - |  5 Sep 21 |

## Testing status

Not yet available.

## Risk register

The risk register has been created, and is available as a tab on the detailed plan.  Two risks are identified:

1. Insufficient specialist staff who know Verilator and Embdebug.  Mitigation is to prioritize initial versions of tool and keep requirements to a minimum.

2. Lack of MCU debug interface documentation increases difficulty of integrating with Embdebug.  Mitigation is early engagement with the ETH team to understand the documentation.

## Plans for next month

* complete the JTAG TAP driver
* start work on the Embdebug target library for CORE-V MCU
