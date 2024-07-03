## RTL_v1.8.3 summary
Short summary table for the RTL_v1.8.3 results overview

### Formal Verification
Control and Datapath assertions checking runs launched on 2 configurations with 198 assertions globally.
| Configurations  | Status                                                     |
------------------| -------------------------- |
PULP              | Successful unbounded check |
PULP_FPU_0CYCLAT  | Successful unbounded check |

### Regression Results
*Some testcases run multiple seeds in one regression*
|Configurations             | xplup      || F + xpulp  || F + xpulp (lat. 1) || F + xpulp (lat. 2) || Xpulp + Zfinx || Xpulp + Zfinx (lat 1) || Xpulp + Zfinx (lat. 2) || **Total All Cfg**  ||
----------------------------|------|------|------|------|------|--------------|------|--------------|------|---------|-------|----------------|------|------------------|----------|----------|
**Regress File**            | Pass | Fail | Pass | Fail | Pass | Fail         | Pass | Fail         | Pass | Fail    | Pass  | Fail           | Pass | Fail             | **Pass** | **Fail** |
cv32e40pv2_fpu_instr        | NA   | NA   | 1504 | 0    | 1504 | 0            | 1504 | 0            | 1504 | 0       | 1504  | 0              | 1504 | 0                | 9024     | 0        |
cv32e40pv2_interrupt_debug	| 1701 | 0    | 1951 | 0    | 1950 | 1            | 1951 | 1            | 1952 | 0       | 1952  | 0              | 1951 | 1                | 13408    | 3        |
cv32e40pv2_xpulp_instr      | 1433 | 0    | 1433 | 0    | 1433 | 0            | 1433 | 0            | 1433 | 0       | 1433  | 0              | 1433 | 0                | 10031    | 0        |
cv32e40pv2_legacy_v1        | 29   | 0    | 29   | 0    | 29   | 0            | 29   | 0            | 29   | 0       | 29    | 0              | 29   | 0                | 203      | 0        |
**Total number of tests**   | 3134 | 0    | 4888 | 0    | 4887 | 1            | 4888 | 1            | 4889 | 0       | 4889  | 0              | 4888 | 1                | 32666    | 3        |

The 3 failing tests are going in time-out. Generally they just require much longer time-out setup to successfully run but which can not be applied systematically on all tests.

### Riscof Architecture Test
| Configurations               | Status |
-------------------------------|--------|
PULP configuration             | Pass   |
PULP_FPU_0CYCLAT configuration | Pass   |
PULP_FPU_1CYCLAT configuration | Pass   |
PULP_FPU_2CYCLAT configuration | Pass   |

### RTL Code Coverage
*Still some holes in cv32e40p_controller (2 causes resulting in 16 holes).
| Configurations               | Statement | Branch | Condition | 
-------------------------------|-----------|--------|-----------|
PULP Configuration             | 99.8%     | 99.6%  | 99.2%     | 
PULP_FPU_0CYCLAT configuration | 99.9%     | 99.8%  | 99.4%     |

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
riscvISACOV            | 95.08% (*optional. We use Siemens Questa Processor tool to verify instructions.*)|

(2) **Combined from 3 ZFINX configurations** using PULP_ZFINX_0CYCLAT as master
| Covergroups          | Status                                               |
-----------------------|------------------------------------------------------|
ZFINX                  | 100%                                                 |

