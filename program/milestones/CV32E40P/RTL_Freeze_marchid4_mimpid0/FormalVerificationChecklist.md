## Formal Verification Checklist for Functional RTL Freeze
An item is "signed off" once the `Owner` and `Completed` cells are filled in.  `Owner` should be an email address and `Completed` is the date the work was done.  If there is an Exception or Waiver, it should be captured as a GitHub issue in core-v-verif and the issue number recorded in the `Exceptions/Waiver/Comment` cell.

| Category              | Item                             | Sign-off Criteria                                      | Owner                  | Completed  | Exceptions/Waivers                         |
| --------------------- | -------------------------------- | ------------------------------------------------------ | ---------------------- | ---------- | ------------------------------------------ |
| Verification Planning | RV32I Vplan                      | Completed, reviewed and up-issued per review           | sven.beyer@onespin.com | yyyy-mm-dd | Captured as core-v-docs issues             |
| Verification Planning | RV32C Vplan                      | Completed, reviewed and up-issued per review           | sven.beyer@onespin.com | yyyy-mm-dd | Captured as core-v-docs issues             |
| Verification Planning | RV32M Vplan                      | Completed, reviewed and up-issued per review           | sven.beyer@onespin.com | yyyy-mm-dd | Captured as core-v-docs issues             |
| Verification Planning | RV32Zicsr_Zifencei Vplan         | Completed, reviewed and up-issued per review           | sven.beyer@onespin.com | yyyy-mm-dd | Captured as core-v-docs issues             |
| Verification Planning | RV32IMC Exceptions Vplan         | Completed, reviewed and up-issued per review           | sven.beyer@onespin.com | yyyy-mm-dd | Captured as core-v-docs issues             |
| Verification Planning | Formal Testbench Cross-reference | Each item in Vplan cross-ref’ed to assertions          | sven.beyer@onespin.com | yyyy-mm-dd | Captured as core-v-docs issues             |
| Regression            | Formal Testbench                 | All assertions hold unbounded with reachable witnesses | sven.beyer@onespin.com | yyyy-mm-dd | Partial results for M Extension Assertions |
| Final Report          | Verification Plans               |                                                        | sven.beyer@onespin.com | yyyy-mm-dd |                                            |
| Final Report          | Regression Results               |                                                        | sven.beyer@onespin.com | yyyy-mm-dd |                                            |
| Final Report          | Coverage Results                 |                                                        | sven.beyer@onespin.com | yyyy-mm-dd |                                            |
