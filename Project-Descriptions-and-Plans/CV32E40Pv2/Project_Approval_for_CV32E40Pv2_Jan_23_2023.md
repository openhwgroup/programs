# OpenHW Project: Plan Approved proposal for CV32E40Pv2 core

| Gate                                 | Status                                                     |
| ------------------------------------ | ---------------------------------------------------------- |
| PC gate: Project Concept             | Approved on 2021-06-28                                     |
| PL gate: Project Launch              | Approved on 2021-11-22                                     |
| PA gate: Plan Approved proposal      | Approved on 2023-02-27                                     |
| PF gate: Project Freeze              | Target is 2023-06-31                                       |

Author: Pascal Gou&eacute;do (Dolphin Design)

## Project summary
The goal of the project is to bring all PULP instructions (disabled during **CV32E40Pv1** phase) in **CV32E40Pv2** to a **TRL5** maturity level and to provide an all aligned:
- Quality documentation
- Quality RTL
- High-coverage verification (formal and simulation)
- Reference Model
- SW GNU toolchain elements (GCC, BINUTILS, GDB...)

### Requirements
* Support of RV32IMC_Zicsr_Zifencei RISC-V extensions.
* Support of PULP instructions in X RISC-V extension. 
* Optional support of Single-Precision Floating Point F RISC-V extension.
* Optional support of Zfinx RISC-V extension.
* Optional support of PULP_CLUSTER instruction in X RISC-V extension.

### Timeline
* PF (Project Freeze): RTL release and project checklists completed by e/o June 2023.<br>
Workplan and Milestone are detailed below.

### Initial contribution
#### Core RTL
* Initial code is from CV32E40Pv1 cv32e40p_v1.0.0 release.
#### FPU RTL
* Initial FPU code is FPnew from ETH Zürich and University of Bologna moved to OpenHW CV-FPU.
#### Verification
* Initial UVM simulation environment is OpenHW core-v-verif used for CV32E40Pv1.

### Project license model
* Solderpad License, Version 2.0

### Project distribution model
#### OpenHW web site & GitHub repositories
* Documentation: https://docs.openhwgroup.org/projects/cv32e40p-user-manual
* RTL: https://github.com/openhwgroup/cv32e40p
* Verification and Reports: https://github.com/openhwgroup/core-v-verif
* SW toolchain sources: https://github.com/openhwgroup/corev-gcc and https://github.com/openhwgroup/corev-binutils-gdb
#### Pre-compiled SW toolchain package can be downloaded from https://www.embecosm.com/resources/tool-chain-downloads/#corev

## Verification methodology
It is based on both:
* Formal verification using Siemens EDA OneSpin tools and its RISC-V ISA verification app to accelerate the verification of more than 300 new instructions.
* Simulation verification of what can not be verified with Formal methodology like asynchronisms (interrupts & debug) or specific micro-architecture features (prefetch buffer,...).<br>
It is starting from [Step-and-Compare 1.0](https://core-v-verif-verification-strategy.readthedocs.io/en/latest/cv32_env.html#step-and-compare) core-v-verif uvm environment used to verify CV32E40Pv1 which is upgraded first to support [Step-and-Compare 2.0](https://core-v-verif-verification-strategy.readthedocs.io/en/latest/cv32_env.html#step-and-compare-2-0) (RFVI interface on Core side and RVVI on ISS side) to finally be compliant with ImperasDV framework methodology.

Gateways between OpenHW core-v-verif repositories and Dolphin Design internal environment (GitLab, ...) will be set up for internal jobs (debug, Continous Integration...).

## TGs Impacted/Resource requirements

|                 | Staff | Members |
| :-------------- | :---: | :-----: |
| Cores TG        |   X   |    X    |
| Verification TG |   X   |    X    |
| SW TG           |   X   |    X    |

### OpenHW Members committed to participate
* Dolphin Design  

### OpenHW engineering staff resources
* Davide Schiavone - Architecture and Design support
* Mike Thompson - Verification environment support
* Duncan Bees - Project management support

### OpenHW marketing staff resources
* Rick O'Connor - OpenHW CEO
* Michelle Clancy - Director of Marketing

### Engineering resource supplied by member(s)
* Pascal Gou&eacute;do - Architecture, Documentation, Design and Formal Verification
* Yoann Pruvost - Design and Verification
* Xavier Aubert - Verification

### Project Leader(s)
* Technical Project Leader: Pascal Gou&eacute;do, Dolphin Design 
* Verification Leader: Xavier Aubert, Dolphin Design 

## List of project outputs
### Documentation
#### User Manual
* New encoding for all PULP instructions
* Re-factored FPU chapter with information imported from FPnew documentation
* Integration chapter with additional section about Core + FPU wrapper
#### RTL Freeze checklist
#### Verification Architecture description
Participation to core-v-verif Verification Strategy document update about ImperasDV methodology migration.
* User manual for the verification environment testbenches, testcases, verification components, etc.
* Description of the testbench structure and theory of operation
#### Verification plans (DVplan, Vplan...)
* Formal plans
* Simulation Plans<br>
Feature-by-feature listing of the Device Under Test<br>
and a description of how it will be verified<br>
and how we know when it is verified (coverage).
#### Verification reports
* Formal and Simulation coverage analysis and reports.
* RTL code coverage analysis and reports on 5 (7?) defined configurations.  

### Design 
* Configurable RTL at TRL5 level with parameters allowing v1 and v2 configurations plus FPU instructions latencies.
* Benchmarking results (coremark, EmBench 1.0, ...) of different configurations.
* Implementation Reports (PPA analysis on different use cases e.g. either targetting high frequency or low area).

### Verification
* State-of-the-art core-v-verif uvm verification environment
* Test Sequences for all new tests
* RV32IMCF_Zicsr_Zifencei + X ISA coverage
* Functional coverage of specific features
* Imperas Floating Point test suite integrated in core-v-verif

### Reference Model
Imperas Reference Model

### Software
GNU GCC Compiler toolchain and utilities

## External dependencies
### SW GNU tooclhain including
* X instructions support
* Single-Precision Floating Point support
* Zfinx support
### Imperas Reference Model
Supporting all v2 features.

<br>
<br>

## Project plan

| Related TG      | Milestone                                                                                                                      | Target        | Contributor            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------- | ---------------------- |
| Core            | Initial User Manual version with PULP instructions re-encoding                                                                 | 2022-12-15    | Dolphin                |
| Core            | User Manual final version                                                                                                      | 2023-03-31    | Dolphin                |
| Core            | CV32E40Pv1 RTL re-encoded to v2                                                                                                | 2022-12-15    | Dolphin                |
| Core            | Remaining v2 RTL updates (Zfinx, HWLoops CSR remapping...)                                                                     | 2023-02-28    | Dolphin                |
| Core            | Correction of CV32E40Pv1 remaining bugs                                                                                        | 2023-03-31    | Dolphin                |
| Core            | Correction of CV32E40Pv2 bugs found by Formal Verification                                                                     | 2023-03-31    | Dolphin                |
| Core            | Correction of CV32E40Pv2 bugs found by Verification                                                                            | 2023-04-30    | Dolphin                |
| Core            | Code Coverage analysis for verification scenario improvment                                                                    | 2023-05-31    | Dolphin                |
| Core            | Checklist for Project Freeze                                                                                                   | 2023-06-30    | Dolphin                |
| Software        | Initial version of GNU GCC binutils supporting v2 instructions (except Hardware Loops)                                         | 2023-01-15    | Embecosm               |
| Software        | Final version GNU GCC compiler, binutils, gdb supporting v2                                                                    | 2023-03-31    | Embecosm               |
| Verification    | Initial version of Reference Model supporting v2 instructions (except Hardware Loops)                                          | 2023-01-31    | Imperas                |
| Verification    | Final version of Reference Model supporting v2 instructions                                                                    | 2023-02-15    | Imperas                |
| Verification    | Addition of all X instructions to corev-dv instructions generator                                                              | 2022-12-15    | Dolphin                |
| Verification    | core-v-verif verification environment conversion to RVFI                                                                       | 2022-12-15    | Dolphin                |
| Verification    | core-v-verif verification environment conversion to ImperasDV support                                                          | 2023-02-15    | Dolphin                |
| Verification    | Formal Verification Plan                                                                                                       | 2022-12-15    | Dolphin / OneSpin      |
| Verification    | Simulation Verification Plan                                                                                                   | 2023-01-31    | Dolphin                |
| Verification    | Add Imperas Floating Point test suite to core-v-verif for compliance checking                                                  | 2023-02-28    | Dolphin                |
| Verification    | Floating Point DIV and SQRT specific scenario generation and verification                                                      | 2023-02-28    | Dolphin                |
| Verification    | SIMD X Instructions scenario for operands coverage                                                                             | 2023-03-15    | Dolphin                |
| Verification    | Interrupt and Debug on new instructions (except Hardware Loops)                                                                | 2023-04-31    | Dolphin                |
| Verification    | Interrupt and Debug on Hardware Loops                                                                                          | 2023-05-15    | Dolphin                |
| Verification    | Functional Coverage analysis for scenario improvment                                                                           | 2023-06-15    | Dolphin                |
| Verification    | Formal Verification runs on final RTL                                                                                          | 2023-05-15    | Dolphin / OneSpin      |
| Verification    | Checklist for Project Freeze                                                                                                   | 2023-06-30    | Dolphin                |

## Project tracking and meetings

The progress will be tracked in CV32E40Pv2 weekly meetings and Cores TG ones.<br>
Slides will be updated and posted on OpenHW programs repository.

## Risk Register

|                                    | Likelihood | Impact | Avoidance / Mitigation           |
| ---------------------------------- | :--------: | :----: | -------------------------------- |
| SW toolchain avaibility in time    | Mid / Low  | Major  | Weekly meetings                  |
| Reference Model avaibility in time | Mid / Low  | Major  | Weekly meetings                  |
| CV-FPU DIV/SQRT IEEE-754 compliant | Mid        | Major  | Close coordination with ETHZ     |
| Insufficient coordination          | Low        | Mid    | Weekly meetings                  |
| Lack of resources                  | Mid        | Major  | More participants are welcome!!! |
