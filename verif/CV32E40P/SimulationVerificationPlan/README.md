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
| RV32I | Complete | Complete | |
| Zifencei extension | Complete | Complete | See CV32E40P_RV32Z_Extention_Instructions.xlsx |
| Zicsr extension | Complete | Complete | See CV32E40P_RV32Z_Extention_Instructions.xlsx |
| M extension | Complete | Complete | |
| F extension | N/A | N/A | Not a verifiied feature of CV32E40P |
| C extension | Complete | Complete | |
| Counter extension | Complete | Complete | |
| Instruction Exceptions | Complete | Complete |  |

### Interrupts

| Feature | Capture | Review | Comment |
|---------|---------|--------|---------|
| CLINT | Captured | Complete | |
| CLIC | | | Not a CV32E40P Feature |

### Debug & Trace

| Feature | Capture | Review | Comment |
|---------|---------|--------|---------|
| Debug | Captured | Complete | |
| Trigger module | N/A | N/A | Not a CV32E40P Feature |
| Tracer | N/A | N/A | Behavioral model, not RTL |

### Privileged spec

| Feature | Capture | Review | Comment |
|---------|---------|--------|---------|
| CSRs | Incomplete | | |
| User mode | N/A| N/A | Not a CV32E40P Feature |
| PMP | N/A | N/A | Not a CV32E40P Feature |

### Micro-architecure

| Feature | Capture | Review | Comment |
|---------|---------|--------|---------|
| OBI     | Ready for Review | | |
| Sleep Unit | Not started | | Partially covered by other Vplans, needs review to ensure no holes |
| Pipelines | Not started | | |

### Xpulp instruction extensions
**Note**: Xpulp instructions are "exercised, but not fully verified" in CV32E40P.

| Feature | Capture | Review | Comment |
|---------|---------|--------|---------|
| Post-increment load/store | Preliminary draft | | |
| Hardware Loop | Preliminary draft | | On-going discussions with Cores TWG |
| Bit Manipulation | Preliminary draft | | |
| General ALU | Preliminary draft | | |
| Immediate branching | Preliminary draft | | |
| SIMD | Preliminary draft | | |

### Custom circuitry

| Feature | Capture | Review | Comment |
|---------|---------|--------|---------|
| RI5CY performance counters | | | Not a CV32E40P Feature |
| Advanced Processing Unit itf | | | Not a CV32E40P Feature |
| 128-bit wide Instruction Bus itf | | | Not a CV32E40P Feature |
| RI5CY interrupt scheme | | | Not a CV32E40P Feature |
| PULP cluster itf | | | Not a CV32E40P Feature |
