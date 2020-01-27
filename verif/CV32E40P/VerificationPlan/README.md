This is the root directory of the CV32E40P Verification Plan (aka Test Plan).  Each sub-directory is the Verification Plan a specific [CV32E40P high-level feature](https://github.com/openhwgroup/core-v-verif/tree/master/doc) of the same name.

Use the provided CORE-V_VerifPlan_Template.xlsx spreadsheet as your template to capture a Verification Plan.

## Verification Plan Status

The tables below capture the current status of the Verification Plan for the CV32E40P.
The table will be updated at least weekly.  The owners are shown by their IDs on MatterMost.  If you plan to capture a Feature for the Verification Plan, please
contact @mikeopenhwgroup.

### Base instruction set plus standard instruction extensions

| Feature | Owner | Capture | Review | Comment |
|---------|-------|---------|--------|---------|
| RV32I | @mikeopenhwgroup | Ready for Review | Not yet scheduled | Looking for feedback |
| Zifencei extension | @mikeopenhwgroup | Ready for Review | Not yet scheduled | See CV32E40P_RV32Z_Extention_Instructions.xlsx |
| Zicsr extension | @mikeopenhwgroup | Ready for Reivew | Not yet scheduled | See CV32E40P_RV32Z_Extention_Instructions.xlsx |
| M extension | @agrasset | Ready for Review | Not yet Scheduled | |
| F extension | | Not started | | Tentative feature for CV32E40P |
| C extension | @agrasset | Ready for Review | | |
| Counter extension | @agrasset | Ready for Review | Not yet Scheduled | Is the complete and definative list of counters defined? |
| Instruction Exceptions | @kenowhg | Complete (?) | | Unsure of EEI dependencies |

### Privileged spec

| Feature | Owner | Capture | Review | Comment |
|---------|-------|---------|--------|---------|
| User mode | | | | Not a CV32E40P Feature |
| PMP | | | | Not a CV32E40P Feature |

### Xpulp instruction extensions

| Feature | Owner | Capture | Review | Comment |
|---------|-------|---------|--------|---------|
| Post-increment load/store | | | | |
| Hardware Loop | @agrasset | | | Optional CV32E40P Feature.  Arnaud has on-going discussions with Cores TWG |
| Bit Manipulation | @alfredoh1234 | Ready for Review | Not yet Scheduled | |
| General ALU | @alfredoh1234 | Ready for Review | Not yet Scheduled | |
| Immediate branching | | | | |
| SIMD | | | | |

### Custom circuitry

| Feature | Owner | Capture | Review | Comment |
|---------|-------|---------|--------|---------|
| RI5CY performance counters | | | | Not a CV32E40P Feature |
| Advanced Processing Unit itf | | | | Not a CV32E40P Feature |
| 128-bit wide Instruction Bus itf | | | | Not a CV32E40P Feature |
| RI5CY interrupt scheme | | | | Not a CV32E40P Feature |
| PULP cluster itf | | | | Tentative CV32E40P Feature |
| Sleep interface | | | | |

### Future extensions

| Feature | Owner | Capture | Review | Comment |
|---------|-------|---------|--------|---------|
| Stack overflow protection | | | | Not a CV32E40P Feature |

### Interrupts

| Feature | Owner | Capture | Review | Comment |
|---------|-------|---------|--------|---------|
| CLINT | | | | |
| CLINT extension (MIP2, MIE2) | | | | |
| CLIC | | | | Not a CV32E40P Feature |

### Debug & Trace

| Feature | Owner | Capture | Review | Comment |
|---------|-------|---------|--------|---------|
| Debug |  | | | |
| Trigger module | | | | |
| Trace | | | | Not a CV32E40P Feature |

### RVI-compliant interface

| Feature | Owner | Capture | Review | Comment |
|---------|-------|---------|--------|---------|
| RVI Instruction Bus interface | | | | |
| RVI Data Bus interface | | | | |
