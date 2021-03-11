March 8, 2021 - VTG Meeting

==============

Attendees: See Master Attendance sheet in program/TGVerification_Attendance_2021.md

Notes:
----------

Topics:


1. RVVI/RVCI Scoreboard 

- Reviewed proposal and code fork in term

2. Revised schedule of meetings

- Hold a single VTG meeting per month (First Thursday) - targeted to strategic initiatives and reviews - Lead by Steve/Robert
- Hold a single E* core verification meeting per month (Second Thursday) - Status/execution/collaboration meeting for CV32E40X/CV32E40S/CV32E40P_V2 - Lead by Steve
- A* core meeting - Status/execution/collaboration meeting for CVA6

3. Project boards for collaboration

- Reviewed 3 boards (40X,40S, Common) 
- Reviewed improvements being implemented by Silicon Labs

November 5, 2020 - VTG Meeting

==============

Attendees:
----------

**OpenHW:** Mike Thompson, Duncan Bees, Rick O'Connor<br>
**Imperas:** Simon Davidmann<br>
**Silicon Labs:** Steve Richmond, Arjan Bink<br>
**EM-Micro:** John Martin<br>

Notes:
----------

Topics:

1. Announcement of Papers

- Steve announced RISCV Summit and DVCON 2021 papers presented by OpenHW members and partners.
- Announced that Leo will also present on FORCE-RISCV

** Action: Steve to add some information to slides on general OpenHW activities at RISCV Summit.

2. Introduction of the Improvements Repo

- Steve presented Phase 1 of Improvements project to gather, track and refine suggestions for improvements to core-v-verif.<br>
  - Phase 1 will be brainstorming (i.e. gathering) of issues only via Github issues.  Separate Github issues will be created for deeper discussion.
  - If issue requires more discusssion unique Github issues will be generated
  - Phase 2 will use meeting to rank and filter list of issues.  Those will be moved to actionable Issues for implementation.
- Will announce to Mattermost for more publicity.  

** Action: General research on Github projects or alternative ways to manage _Issues_ in core-v-verif.

3. Mike asked question about measuring engagement

- Available statistics from github: number of users star'ing the project and number of forks

** Action: Look into better ways to measure, track and communicate general engagements with cores and testbench repos.

4. Rick asked that we continue to remind folks to say Core **5** and not Core **V** to get our branding right!

September 24, 2020 - VTG Meeting

==============

Attendees:
----------

**OpenHW:** Mike Thompson, Duncan Bees<br>
**Futurewei:** Jingliang Leo Wang<br>
**Imperas:** Simon Davidmann, Lee Moore<br>
**Embecosm:** Jeremy Bennett<br>
**EM-Micro:** John Martin<br>
**Symbiotic EDA:** Nina Engelhardt<br>

Notes:
----------

Topics:

1. FORCE-RISCV Preliminary Project Launch.

- Jingliang (Leo) Wang presented PPL draft.
- A few timeline and details updates are suggested and adopted.
- Some technical details are discussed.
- Jeremy Bennett is interested in using the ISG to verify assembler.

** Action: Jingliang (Leo) Wang to update the PPL and submit to GitHub for broader publishing.

2. Definition of RTL freeze

- Mike Thompson presented RTL freeze definition details document.
- No feedback or concerns.


August 13, 2020 - VTG Meeting

==============

Attendees:
----------

**OpenHW:** Mike Thompson<br>
**Futurewei:** Leo Wang<br>
**SiLabs:** Steve Richmond, Paul Zavalney, Arjan Bink<br>
**Imperas:** Simon Davidmann<br>
**Embecosm:** Craig Blackmore<br>
**EM-Micro:** John Martin<br>
**Symbiotic EDA:** Nina Engelhardt<br>

Notes:
----------

Topics:

1. Simulation Control

- Presented updates on PRs and next phases.
- No feedback or concerns.

2. Regression and Test Specification Updates

- Presented plans and PR in review.
- No feedback or concerns.

3. Simulation vs. Formal

- Presented issue with exceptions/illegal instructions on CV32E40P.
- No technical objections to relying on OneSpin for illegal insruction/decoder completion coverage on CV32E40P.

**Action: Steve to work with Mike to describe strategy and simulation coverage issue for TWG to ratify.

4. Tags

- Community has expressed to Mike desire for tag repo peridoically.  It is a relatively common Github practice
  to provide tags.  This is especially helpful for non-expert Git users.
- Don't really have milestones or any other natural tag boundary.
- Mike proposing automated simple daily tagging.
- Possibility to use a weekly regression tied to a Metrics regression.  Mike has meeting next week.

**Action: Steve and Mike to propose/implement an automated tag.

July 30, 2020 - VTG Meeting

==============

Attendees:
----------

**OpenHW:** Duncan Bees<br>
**Futurewei:** Leo Wang<br>
**SiLabs:** Steve Richmond<br>
**Imperas:** Simon Davidmann<br>
**Embecosm:** Craig Blackmore<br>
**EM-Micro:** John Martin<br>


Notes:
----------

Topics:

1. Simulation Control

- Initial PR for Xcelium Makefile updates was approved, awaiting merging<br>
- Reviewed completed items, near term items and long ter items<br>
- Steve to release Questa updates soon and complete documentation<br>
- Regression tool YAML discussion regarding simple scope<br>

2. Assertion standards

- Quick presentation of upcoming PR merge.  No issues were raised.<br>

3. FORCE-RISCV

- Leo previewed documentation prepared by FORCE team to scope effort and tasks to enable RISCV32 generation from FORCE.
    - Should be PRed soon for review.
    - Interest in helping with the port from a Hong Kong-based professor and his students


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

