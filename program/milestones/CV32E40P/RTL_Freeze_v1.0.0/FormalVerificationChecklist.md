## Formal Verification Checklist for Functional RTL Freeze
An item is "signed off" once the `Signed-off By` and `Sign-off Date` cells are filled in. `Signed-off By` should be an email address.  If there is an Exception or Waiver, it should be captured as a GitHub issue in core-v-verif and the issue number recorded in the `Exceptions/Waiver/Comment` cell.

| Category              | Item                             | Sign-off Criteria                                      | Signed-off By               | Sign-off Date | Exceptions/Waivers/Comments                |
| --------------------- | -------------------------------- | ------------------------------------------------------ | --------------------------- | ------------- | ------------------------------------------ |
| Verification Planning | RV32I Vplan                      | Completed, reviewed and up-issued per review           | sven.beyer@onespin.com      | yyyy-mm-dd    | Captured as cv32e40p GitHub issues         |
| Verification Planning | RV32C Vplan                      | Completed, reviewed and up-issued per review           | sven.beyer@onespin.com      | yyyy-mm-dd    | Captured as cv32e40p GitHub issues         |
| Verification Planning | RV32M Vplan                      | Completed, reviewed and up-issued per review           | sven.beyer@onespin.com      | yyyy-mm-dd    | Captured as cv32e40p GitHub issues         |
| Verification Planning | RV32Zicsr_Zifencei Vplan         | Completed, reviewed and up-issued per review           | sven.beyer@onespin.com      | yyyy-mm-dd    | Captured as cv32e40p GitHub issues         |
| Verification Planning | RV32IMC Exceptions Vplan         | Completed, reviewed and up-issued per review           | sven.beyer@onespin.com      | yyyy-mm-dd    | Captured as cv32e40p GitHub issues         |
| Verification Planning | Formal Testbench Cross-reference | Each item in Vplan cross-ref’ed to assertions          | sven.beyer@onespin.com      | yyyy-mm-dd    | Captured as cv32e40p GitHub issues         |
| Regression            | Formal Testbench                 | All assertions hold unbounded with reachable witnesses | sven.beyer@onespin.com      | yyyy-mm-dd    | Partial results for M Extension Assertions |
| Final Report          | Axiomise RISC-V Formal Toolkit   | Posted to GitHub                                       | ashish.darbari@axiomise.com | 2020-12-03    | Filed in "Reports" directory               |
| Final Report          | Verification Plans               |                                                        | sven.beyer@onespin.com      | yyyy-mm-dd    |                                            |
| Final Report          | Regression Results               |                                                        | sven.beyer@onespin.com      | yyyy-mm-dd    |                                            |
| Final Report          | Coverage Results                 |                                                        | sven.beyer@onespin.com      | yyyy-mm-dd    |                                            |
