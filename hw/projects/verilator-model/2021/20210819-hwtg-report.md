# Hardware TG monthly meeting - Verilator modeling update (19 July 2021)

## Overview

The project is now running 8 weeks late, due to a combination of insufficient resource and tasks taking longer than planned.  Given we have seen 8 weeks slip having completed 7 or the 16 planned tasks, it is reasonable to estimate that a further 8-10 weeks slip could occur, with all deliverables complete in January 2022.

The TAP driver continues to prove complex, with more issues identified, and hence more testing anticipated than planned.  We can now drive the DMI interface, and the remaining task is to complete testing of the DMI interface.

The main branch of `core-v-mcu` now correctly reports there is a single HART and it is available. The general registers and CSRs can be read (although see issue [#159](https://github.com/openhwgroup/core-v-mcu/issues/159)) below.

The TAP driver was used to evaluate Greg Martin's clean up and restructuring of CORE-V MCU (see pull request [#157](https://github.com/openhwgroup/core-v-mcu/pull/157)) and identified some issues to be resolved.

## Issues

[#150](https://github.com/openhwgroup/core-v-mcu/issues/150) *Debug module reports the wrong number of Harts* is now fixed.

[#159](https://github.com/openhwgroup/core-v-mcu/issues/159) *Accessing FP CSRs crashes the debug unit* has been raised.  Reading a FP CSR causes all subsequent reads of CSRs to return the same value (the most recent value read).  This is presumed to be because the FPU is not present, although it has not been verified if the problem resolves with the FPU present.  There is no problem with HW Loop CSRs, even though this is not enabled in the default MCU. While reading non-existent CRSs should be an error, it should not crash the debug unit.

## Milestone progress

The [detailed plan](https://docs.google.com/spreadsheets/d/1Sl_GIklam3redWNj_DRVRVVBD49LvLD8k1zeFsJXllc) is a Google Doc and can be viewed as a [kanban board](https://github.com/openhwgroup/embdebug-target-core-v/projects/1) in the [embdebug-target-core-v repository](https://github.com/openhwgroup/embdebug-target-core-v).

Progress is shown as a percentage of tasks completed.

| Milestone                    | # Tasks | This Mth | Last Mth | Planned   | This Mth  | Last Mth  |
| ---------------------------- | -------:| --------:| --------:| --------- | --------- | --------- |
| Verilator model available    |       1 |     100% |        - | 30 May 21 |  Complete |  Complete |
| JTAG TAP driver complete     |       7 |      86% |        - | 27 Jun 21 | 22 Aug 21 |  1 Aug 21 |
| Intial version of Embdebug   |       2 |        - |        - | 18 Jul 21 | 12 Sep 21 | 22 Aug 21 |
| Initial standalone simulator |       2 |        - |        - | 25 Jul 21 | 19 Sep 21 | 29 Aug 21 |
| Final version of Embdebug    |       3 |        - |        - | 22 Aug 21 | 17 Oct 21 | 26 Sep 21 |
| Final standalone simulator   |       1 |        - |        - |  5 Sep 21 | 31 Oct 21 |  3 Oct 21 |


## Task status

* Task *RISC-V DMI driver written* is complete, but overran by 16 hours (80%)
* Task *RISC-V DMI tests written* is in progress, but now estimated to require
  an additional 8 hours (100%).

| Task status | This Month | Last Month |
| ------------| ----------:| ----------:|
| Planned     |          8 |          8 |
| In Progress |          1 |          4 |
| Complete    |          7 |          4 |
| **Total**   |     **16** |     **12** |

## Testing status

Not yet available.

## Risk register

The risk register is available as a tab on the detailed plan.  There has been no change since last month.

## Plans for next month

* complete testing of the JTAG TAP driver DMI interface.
* start work on the Embdebug target library for CORE-V MCU
