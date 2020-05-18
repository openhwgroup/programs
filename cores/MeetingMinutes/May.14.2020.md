Cores TG Meeting
----------------

Date: May 14, 2020

Attendees:

  Davide Schiavonne (OpenHW)     : davide@openhwgroup.org
  Rick O'Connor (OpenHW)         : rickoco@openhwgroup.org
  Mike Thompson (OpenHW)         : mike@openhwgroup.org
  Jérôme Quevremont (Thales)     : jerome.quevremont@thalesgroup.com
  Sebastien Jacq (Thales)        : sebastien.jacq@thalesgroup.com
  Zbigniew Chamski (Thales)
  Kevin (Thales)
  Marco 
  Massimiliano 
  Arjan Bink (Silicon Labs)      : Arjan.Bink@silabs.com
  Steve Richmond (Silicon Labs)  : Steve.Richmond@silabs.com
  Paul Zavalney (Silicon Labs)   : Paul.Zavalney@silabs.com
  Yunhai Shang
  Jeremy Bennett (Embecosm)      : jeremy.bennett@embecosm.com

- Introductions

  As it was a relatively long time since the previous Cores TG meeting we went through an introduction round in which
  everybody introduced himself. Davide is the director of engineering for the Cores TG; Arjan Bink is the chair of the Cores TG;
  Jérôme Quevremont is the vice-chair of the Cores TG.

- Scope / charter

  The charter of the Cores TG was proposed/discussed. Compared to the previous charter the significant change is that the
  actual roadmap definition and core donation acceptance is now defined to be performed at TWG level.  The Cores TG and the
  other TGs will provide technical support to aid the TWG to perform that task.

  Mike asksed for a documented process for core adoption (this process will need to be defined in the TWG).

- Cores

  Arjan presented the high-level overview of the CV32E40P and CV32E40 cores. Jérôme did the same for CV64A and CV32A. CV32A is
  a new core proposal by Thales and can basically be thought of as a 32-bit Ariane. Within Thales this CV32A is intended
  for two types of projects: ASIC-based, FPGA-based. The CV32A has not yet been officially offered to or accepted by OpenHW.
  Jérôme indicated that he expects this core to be in a shareable state in a couple of months.

  Rick indicated that it is rarely early enough to share cores (in order to increase collaboration, feedback, buy in).

  Rick polled for interest in a M0-class RISC-V core. Both Silicon Labs and Thales (3 teams as users for FPGA) showed interest.

- Status of CV32E40P

  The (design) status of CV32E40P was presented. We are nearly feature complete, but many (i.e. > 100) tickets are still open
  on https://github.com/openhwgroup/cv32e40p/issues/ (documentation, bugs, questions, etc.). Not all of these tickets apply
  to CV32E40P (and proper labels will be added).

  Help is asked to the OpenHW members to drive these tickets to closure. Please inform Davide Schiavonne (davide@openhwgroup.org)
  if you can help out getting these tickets closed.

- Call to action

  Please let us (e.g. Davide Schiavonne (davide@openhwgroup.org) know if you can help out on any of the following topics:

  - Help fixing issues from https://github.com/openhwgroup/cv32e40p/issues
    - RTL fixes
    - Documentation
    - Questions
    - Future improvements (e.g. PMP, User mode)

  - Drive finalization of CV32E40 feature set discussion, drive adoption of Ariane from ETH Zurich PULP team, drive CV64A and 
    CV32A feature set discussion.

- Next meetings

  Next meetings will be a bit earlier, 16:00 CEST (allowing participation from both the US/Canada and Asia). Meeting frequency
  will be adaptable (every 2-4 weeks on to be announced days). 

  Asked for partner presentations (please ask us for a slot) of about 15 minutes addressing with the following content: 
  A) Introduction of partner B) How can you benefit from OpenHW? C) How can you contribute to OpenHW?
  
  Paul proposed 'way of working in github' as topic. This will be considered (but might be more appropriate at the TWG level).

- Actions

  - Mike : Provide prioritized list of required CV32E40P documentation issues
  - Team : Consider to volunteer for helping out on issues from https://github.com/openhwgroup/cv32e40p/issues
  - Team : Consider to volunteer for the other tasks mentioned on slide 7
  - Team : Consider to volunteer for 15 minute partner presentation
