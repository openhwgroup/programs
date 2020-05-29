Date: October 10, 2019

Attendees:

Mike Thompson : (OpenHW)       : mike@openhwgroup.org

Davide Schiavonne (OpenHW)     : davide@openhwgroup.org

Arjan Bink (Silicon Labs)      : Arjan.Bink@silabs.com

Sebastian Ahmed (Silicon Labs) : Sebastian.Ahmed@silabs.com

Steve Richmond (Silicon Labs)  : Steve.Richmond@silabs.com

Paul Zavalney (Silicon Labs)   : Paul.Zavalney@silabs.com


- Introductions. Noteworthy:
  - Mike is the director of engineering for the verification TG
  - Davide is the director of engineering for the cores TG
  - It was mentioned that Jim Parisien (not present) is the director of engineering for the platform TG
  - Steve Richmond will the SiLabs verification TG representative

- There was a general question on the goal of the meeting.
  - The purpose is to define a strategy to have a production-usable RI5CY based cores
    by the second half of 2020 and thus:
      - Defining a E40P and E40 such that E40 is the longer term RISC-V compliant solution
        whereas E40P would have opportunistic updates to align to to standards but be focused
        as more of a verification completion effort
      - We must judiciously select what changes we make to E40P and target the more comprehensive update to E40

- Proposal document walk through (Arjan + all)
  - Only slide3 (table) was covered in the call. Arjan first walked through the items
  - Discussion whether floating-point should be in the E40P since this had not been really verified (Davide)
    - Sebastian mentioned that SiLabs has interest in floating point
    - This is clearly a significant verificaiton project (more on this later)
  - Arjan mentioned that HW loop adds interrupt latency (due to state saving)
  - Davide raised concerns about making "legacy" PULP extensions paramaterized in E40
    - Preference to have E40 and E40P be different repos (makes sense. Re-visit at appropriate time)
  - Davide mentioned that multicore clustering support needs to be discussed. This involves an event
    unit IP and special barrier load/store instructions which allow the EU to stall & clock-gate cores to synchronize
    - Concerns were mostly about the verification  burden of this feature and applicability for an "E" core (embedded)
    - Davide suggested there may be a couple of "simpler" options such as modifying the EU to deal with CLINT (need elaboration on this)
      or just do some sort of SW only solution (e.g. memory semaphores)
  - Davide stressed that we should really reduce the scope of new features and focus on verification due
    to the (lacking/unknown) verificaiton coverage state
    - The team discussed the possibility of moving the stack limit register to E40 for example
    - Davide mentioned the recent bug activity coming from various efforts such as formal etc

- Mike gave a "keeping it real" summary of the state of the verification coverage on RI5CY
  - Currently the RI5CY is deemed not production ready (from a quantifiable verification perspective). The design
    might very well be in good shape, but we can't measure it.
  - Existing environments (such as the Google one) is "show and tell" quality
  - Believes that the E40P as currently defined may be a tall ask to verify (need to clarify timeframe)
  - Mike plans to do a detailed scrub (feature by feature level) in terms of what has already been verified
  - As of today there is no viable/coordinate CI based verification environment for RI5CY
  - Mike will start a series of update calls to define the state of the verification of RI5CY
    - The group agreed this is the highest priority task right now before we can finalize feautres
  - The team discussed that in fact making some of the RI5CY features compliant in E40P may in fact shorten the
    verification scope as it provides opportunities to leverage standards based verification projects such as
    models, formal etc. The verification  landscape study will be critical in determining such opportunities and
    thus possibly steering the adoption/re-factoring to standards
  
Actions:
========
- Mike : Schedule the start of a series of calls to update the team on the RI5CY "state of the (verification) union"
- Team : Based on further discussion and verification state finalize E40P target feature list by end of November
- Davide : Send more details on event unit and related barrier load/store instructions ("event load")
- Davide : Track parameterization/split-repo question
- Figure out how to use mattermost in the appropriate way to:
  - Organize proposals and meeting minutes (unique channel per instance?)
- Figure out how to track open action items
- Document storage/organization
 
--------------------------------------------------------------------------------------------------
