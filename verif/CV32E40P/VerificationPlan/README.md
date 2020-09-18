<!--- SPDX-License-Identifier: Apache-2.0 WITH SHL-2.0 ---> 
This is the root directory of the CV32E40P Verification Plan (aka Test Plan).  Each sub-directory is the Verification Plan a specific [CV32E40P high-level feature](https://github.com/openhwgroup/core-v-verif/tree/master/doc) of the same name.

Use the provided CORE-V_VerifPlan_Template.xlsx spreadsheet as your template to capture a Verification Plan.

## Verification Plan Status

The tables below capture the current status of the Verification Plan for the CV32E40P by high-level feature.  Under the heading `Review` is one of following:
* **Ready for Review**: Vplan has been captured and is awaiting review.
* **Reviewed**: Vplan has been reviewed, and is waiting for updates to address review feedback.
* **Waiting for Signoff**: Vplan has been reviewed and review comments addressed by the author.  Document is now waiting for reviewers to signoff on the post-review updates.
* **Complete**: Post-preview updates have been signed-off.

### Base instruction set plus standard instruction extensions

| Feature | Capture | Review | Comment |
|---------|---------|--------|---------|
| RV32I | Complete | Waiting for Signoff | |
| Zifencei extension | Complete | Waiting for Signoff | See CV32E40P_RV32Z_Extention_Instructions.xlsx |
| Zicsr extension | Complete | Waiting for Signoff | See CV32E40P_RV32Z_Extention_Instructions.xlsx |
| M extension | Complete | Waiting for Signoff | |
| F extension | N/A | N/A | Not a verifiied feature of CV32E40P |
| C extension | Complete | Waiting for Signoff | |
| Counter extension | Complete | Waiting for Signoff | |
| Instruction Exceptions | Complete | Complete |  |

### Privileged spec

| Feature | Capture | Review | Comment |
|---------|---------|--------|---------|
| User mode | N/A| N/A | Not a CV32E40P Feature |
| PMP | N/A | N/A | Not a CV32E40P Feature |

### Xpulp instruction extensions

| Feature | Owner | Capture | Review | Comment |
|---------|-------|---------|--------|---------|
| Post-increment load/store | @silabs-wajidm | First draft | | |
| Hardware Loop | @agrasset | First draft | Not Ready for Review | Optional CV32E40P Feature.  Arnaud has on-going discussions with Cores TWG |
| Bit Manipulation | @alfredoh1234 | Ready for Review | Not yet Scheduled | |
| General ALU | @alfredoh1234 | Ready for Review | Not yet Scheduled | |
| Immediate branching | @silabs-wajidm | Ready for Review | | |
| SIMD | @alfredoh1234 | First draft | Ready for Review | |

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
| Debug | @silabs-oystein | Reviewed |  |  |
| Trigger module | | | | Not a CV32E40P Feature |
| Trace | | | | Not a CV32E40P Feature |

### Micro-architecure

| Feature | Capture | Review | Comment |
|---------|---------|--------|---------|
| OBI     | Ready for Review | | | |
| Pipelines | Not started | | | |
