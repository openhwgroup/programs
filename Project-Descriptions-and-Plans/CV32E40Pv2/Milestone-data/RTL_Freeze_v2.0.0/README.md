## RTL_Freeze_v2.0.0_summary
Short summary table for the RTL_Freeze_v2.0.0 results overview

### Formal Verification
Control and Datapath assertions checking runs launched on 3 configurations  
*430 assertions. (TODO:update the number of assertions)*
| Configurations                          | Status                                           |
----------------------------------------- | ------------------------------------------------ |
PULP                                      | Successful unbounded check (11 days)             |
PULP_FPU (0 cycle latency)                | still running after 18 days. No error so far.    |
PULP_FPU_ZFINX_2CYCLAT (2 cycles latency) | still running after 18 days. No error so far.    |

### Regression Results
*Some testcases run multiple seeds in one regression*
|Configurations             | xplup      || F + xpulp  || F + xpulp (lat. 1) || F + xpulp (lat. 2) || Xpulp + Zfinx || Xpulp + Zfinx (lat 1) || Xpulp + Zfinx (lat. 2) || **Total All Cfg**  ||
----------------------------|------|------|------|------|------|--------------|------|--------------|------|---------|-------|----------------|------|------------------|----------|----------|
**Regress File**            | Pass | Fail | Pass | Fail | Pass | Fail         | Pass | Fail         | Pass | Fail    | Pass  | Fail           | Pass | Fail             | **Pass** | **Fail** |
cv32e40pv2_fpu_instr        | NA   | NA   | 1504 | 0    | 1504 | 0            | 1504 | 0            | 1504 | 0       | 1504  | 0              | 1504 | 0                | 9024     | 0        |
cv32e40pv2_interrupt_debug	| 1701 | 0    | 1950 | 2    | 1951 | 1            | 1951 | 1            | 1951 | 1       | 1952  | 0              | 1949 | 3                | 13405    | 8        |
cv32e40pv2_xpulp_instr      | 1433 | 0    | 1433 | 0    | 1433 | 0            | 1433 | 0            | 1433 | 0       | 1433  | 0              | 1433 | 0                | 10031    | 0        |
cv32e40pv2_legacy_v1        | 29   | 0    | 29   | 0    | 29   | 0            | 29   | 0            | 29   | 0       | 29    | 0              | 29   | 0                | 203      | 0        |
**Total number of tests**   | 3134 | 0    | 4887 | 2    | 4888 | 1            | 4888 | 1            | 4888 | 1       | 4889  | 0              | 4886 | 3                | 32663    | 8        |

### Riscof Architecture Test
| Configurations               | Status |
-------------------------------|--------|
PULP configuration             | Pass   |
PULP_FPU_0CYCLAT configuration | Pass   |
PULP_FPU_1CYCLAT configuration | Pass   |
PULP_FPU_2CYCLAT configuration | Pass   |

### RTL Code Coverage
*Only left with holes in cv32e40p_controller (12 causes resulting in 24 holes).
Seeking help from Openhwgroup community*
| Configurations               | Statement | Branch | Condition | 
-------------------------------|-----------|--------|-----------|
PULP Configuration             | 99.8%     | 99.5%  | 98.7%     | 
PULP_FPU_0CYCLAT configuration | 99.9%     | 99.7%  | 99.0%     |

### Functional Coverage
(1) **Combined from all 7 configurations** using PULP_FPU_0CYCLAT as master  
| Covergroups          | Status                                               |
-----------------------|------------------------------------------------------|
FPU                    | 100%                                                 |
HWLOOP                 | 100%                                                 |
Debug                  | 100%                                                 |
Interrupts             | 100%                                                 |
OBI                    | 100%                                                 |
Assertions & Directive | 100%                                                 |
riscvISACOV            | 95.01% (*optional. We use Formal OneSpin tool to verify instructions.*)|

(2) **Combined from 3 ZFINX configurations** using PULP_ZFINX_0CYCLAT as master
| Covergroups          | Status                                               |
-----------------------|------------------------------------------------------|
ZFINX                  | 100%                                                 |

