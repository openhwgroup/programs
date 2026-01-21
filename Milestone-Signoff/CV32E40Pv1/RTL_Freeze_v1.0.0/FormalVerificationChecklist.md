## Formal Verification Checklist for Functional RTL Freeze
An item is "signed off" once the `Signed-off By` and `Sign-off Date` cells are filled in. `Signed-off By` should be an email address.  If there is an Exception or Waiver, it should be captured as a GitHub issue in core-v-verif and the issue number recorded in the `Exceptions/Waiver/Comment` cell.

| Category              | Item                             | Sign-off Criteria                                      | Signed-off By               | Sign-off Date | Exceptions/Waivers/Comments                |
| --------------------- | -------------------------------- | ------------------------------------------------------ | --------------------------- | ------------- | ------------------------------------------ |
| Verification Planning | RV32I Vplan                      | Completed, reviewed and up-issued per review           | nicolae.tusinschi@onespin.com      | 2020-12-10    |          |
| Verification Planning | RV32C Vplan                      | Completed, reviewed and up-issued per review           | nicolae.tusinschi@onespin.com      | 2020-12-10    |          |
| Verification Planning | RV32M Vplan                      | Completed, reviewed and up-issued per review           | nicolae.tusinschi@onespin.com      | 2020-12-10    |          |
| Verification Planning | RV32Zicsr_Zifencei Vplan         | Completed, reviewed and up-issued per review           | nicolae.tusinschi@onespin.com      | 2020-12-10    |          |
| Verification Planning | RV32IMC Exceptions Vplan         | Completed, reviewed and up-issued per review           | nicolae.tusinschi@onespin.com      | 2020-12-10    |          |
| Verification Planning | Formal Testbench Cross-reference | Each item in Vplan cross-ref’ed to assertions          | nicolae.tusinschi@onespin.com      | 2020-12-10    |          |
| Regression            | Formal Testbench                 | Sign-Off criteria listed in formal vPlans per verification item   | sven.beyer@onespin.com      		 | 2020-12-18    | Partial results for M-Ext |
| Final Report          | Axiomise RISC-V Formal Toolkit   | Posted to GitHub                                       | ashish.darbari@axiomise.com | 2020-12-03    | Filed in "Reports" directory               |
| Final Report          | Verification Plans               | RV32: I,M,C,Zicsr_Zfencei, Xcpt vPlans in GitHub       | nicolae.tusinschi@onespin.com      | 2020-12-18    |                                             |
| Final Report          | Regression Results               | Posted to Github                                       | sven.beyer@onespin.com      | 2020-12-18    |                                            |
