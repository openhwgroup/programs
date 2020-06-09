June 9, 2020 - CV32E40P Sprint
==============

Attendees:
----------

**OpenHW:** Mike Thompson, Rick O'Connor<br>
**Futurewei:** Leo Wang<br>
**SiLabs:** Steve Richmond, Paul Zavalney, Wajid Minhass, Arjan Bink<br>
**Imperas:** Simon Davidmann<br>
**EM Micro:** Greg Tumbush<br>
**Thales:** Jerome Quevremont, Sebastien Jacq<br>
**SymbioticEDA:** Nina Engelhardt<br>
**BTA Design Services:** Alfredo Herrera<br>

Notes:
-------

Actions: Mike

Topics:
1. Status of Sprint #1 (2020-06-01 to 2020-06-19)

- Low risk items<br>
    - User manual proceeding very well.  Thank you Cores Task Group and Davide!<br>
    - EM-Micro has signed on with OpenHW.  Welcome Greg Tumbush and colleagues!<br>
        - EM-Micro will develop Interrupt testplans and own verification of interrupts.<br>

- Medium risk<br>
    - Verification strategy document updates addressing the Test Program Environment and the Test Writer's Guide.<br>
    - Excellent progress made on the toolchain by Craig Blackmore of Embecosm.  This is a gating item to further testbench development.<br>

- High risk:<br>
    - RV32IMC compliance infrastructure, including functional coverage instrumented and measured (w/ no closure target)<br>
        - Thales/TRT will complete Compliance testing, but cannot help with Functional Coverage<br>
    - Google riscv-dv is not integrated yet<br>
        - Thales/INVIA can not currently help with CV32E40P<br>
**Action:** Mike to get in touch with Thales to confirm CV32E40P tasks

May 20, 2020
==============

Attendees:
----------

**OpenHW:** Mike Thompson, Rick O'Connor<br>
**Futurewei:** Leo Wang<br>
**SiLabs:** Steve Richmond, Paul Zavalney, Sebastian Ahmed, Arjan Bink<br>
**Thales:** Jerome Quevremont<br>
**SymbioticEDA:** Nina Engelhardt<br>
**BTA Design Services:** Alfredo Herrera<br>
**Metrics:** Aimee Sutton<br>

*Recalled from memory, I believe I missed a couple of folks*

Notes:
------

Actions: Steve

Topics:
-------
1. Status of Actions from last meeting:

- None.  First meeting of the VTG.

2. Charter Review

- Proposed charter for the VTG was presented.  In general the charter was well-received.
- One request from Rick O'Connor to extend scope of verification in charter beyond just the RISC-V OpenHW processor cores.
- Thales raised questions regarding open-ness of core with respect to verification.  The 3rd party tools needed to fully replicate the verification environment include a commerical supported simulator, and the Imperas ISS (OVPSim)<br>
**ACTION:** Steve to update slides to address Rick's concern.<br>
**ACTION:** Steve to publish slides to Mattermost.

3. VTG Overview Presentation

- Presented general overview of current verification strategy, workflow and CV32E40P.
- Proposed reduction of scope in initial verification effort for CV32E40P (PULP, trace, FPU).  No objections were raised.

4. Future meetings

- Proposed 2 week cadence of meetings.
- Proposed time of 1.5 hours per meeting.
- Proposed 10am CDT (US Central).  Thales propsed moving this to at least 930am to ensure that meeting ends before 6pm in Europe.<br>
**ACTION:** Steve to propose next VTG meeting time on Mattermost.

