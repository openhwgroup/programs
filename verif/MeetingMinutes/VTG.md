July 16, 2020 - VTG Meeting

==============

Attendees:
----------

**OpenHW:** Mike Thompson<br>
**Futurewei:** Leo Wang<br>
**SiLabs:** Steve Richmond, Paul Zavalney<br>
**Imperas:** Simon Davidmann<br>
**Embecosm:** Jeremy Bennett<br>
**Symbiotic EDA:** Nina Engelhardt<br>


Notes:
----------

Actions: Steve

Topics:
1. Logistics

- New Product Introduction flow and general program management proceeding through Duncan Bees.<br>
    - Future work will be driven through the TWG with input from the other Working Groups.<br>

2. ISGs

- Continued discussion on ISG proposals.<br>
- Decisions that will need to be made with respect to VTG usage of ISGs.<br>
    - Will the VTG be a customer (i.e. user) or developer/maintainer of ISGs?  Given resource realities being a user of ISGs is most feasible.<br>
    - Use of a single ISG or multiple ISGs.  Again this will need to be balanced with respect to resource realities and technical advantages of ISGs.  Also there is the point that any ISG is typically targeted to a core (or related family of cores).<br>
    -   Machine code vs. tool-chain programs.  Typically get more effective verification from direct machine code that doesn't require toolchain.  However some machine code generators can be harder to target to a system/core (e.g. memory maps in riscv-isg).<br>
- There may be a professor with some student-led bandwidth to add 32-bit support to FORCE.<br>

3. Simulator Control

- General agreement on language standards (make, Python3 and YAML) and methodology for environment.<br>
    - Jeremy made good point to clarify Python3 usage especially in relation to older Linux distros that primarily use Python2.<br>
- Revise RISCV environment variable to SV_SW_TOOLCHAIN.<br>
- Support YES,NO,yes,no,1,0 for make flags.<br>

**Action: Steve to release initial testbench enhancement pull request for Questa and Xcelium.**<br>
**Action: Steve to find volunteer to help with VCS port and provide guidance.**<br>

July 2, 2020 - VTG Meeting

==============

Attendees:
----------

**OpenHW:** Mike Thompson<br>
**Futurewei:** Leo Wang<br>
**SiLabs:** Steve Richmond, Paul Zavalney, Wajid Minhass<br>
**Imperas:** Simon Davidmann<br>
**Thales:** Jean-Roch Coulon, Sebastien Jacq<br>
**Embecosm:** Jeremy Bennett<br>


Notes:
----------

Actions: Steve

Topics:
1. Logistics

- Calendar entries in shared OpenHW group calendar are updated.<br>
- Persistent SiLabs Zoom room for all VTG sprints and meetings has been established.  Links will be in all calendar entries and emails.<br>

2. Github repository

- Simon brought up importance of delineating active, vetted, approved repos versus technology contributions<br>
    - There is a need to balance contributions and experimentations with in-use repos.<br>
    - Github will "bubble-up" more actively used repos.<br>
** Action: Steve to propose documentation guidelines for ensuring repo usage and state is clear to Github visitors.**<br>

3. Project Management

- Reviewed slides as introduction.<br>
- For NPI process, Jeremy reminded that it is important to understand availability of tool-chain (architecture, e.g. 32 versus 64) including BSP.<br>

4. ISGs

- Healthy discussion on pros and cons of ISGs.<br>
- Continue developing procedures and process for selecting ISGs.<br>
- Develop integration guidelines for ISGs.<br>

5. Simulator Control

- Brief review of proposed<br>
- Jeremy mentioned importance of maintaining Verilator for software bringup and testing.  Enables software and tool-chain development.<br>
  -- There is some value in 100,000+ GNU tests run on this platform.<br>
  -- Will continue current plan of enablement of Verilator for S/W (core testbench) only.<br>
  -- Understood that Verilator will never be officially supported by OpenHW in a DV context (i.e. with an ISG or functional tests).<br>
** Action: Steve to propose make flags and level of standardization **<br>


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

