July 3, 2020
============

Attendees:
----------
**OpenHW:** Mike Thompson, Duncan Bees<br>
**Axiomise:** Ashish Darbari, Alex Netterville<br>

Actions:
--------
**Alex**: to open issue for un-aligned STORE (see topic #2 below).
**Alex**: share status slides (which will be put up on GitHub).
**Mike**: book next meeting for July 17.

Topics:
-------
1. Mike provided quick OpenHW Group status update.  CV32E40P RTL is stable and by the end of July should be in "bug fix mode", with no changes for new or
changed features.
2. Quick status report from Alex.  Using a clone of cv32e40p from last week, good progress with the IS proof-kit has been made.  No failures,
full coverage and only a few outstanding proofs.  Alex to provide summary slides shortly.
3. Alex reports that on on an older version of the RTL a proof of unaligned STORE did not converge.  It now does converge with the latest RTL.  Mike requested
Alex to create a GitHub issue and assign to either Arjan or Davide.
4. Alex reviewed the preliminary formal verification plan.  It is complete except for the English language descriptions of the properties.  Mike reiterated
that these are very important as not all members of OpenHW have a background in SVassertions and formal verification.
5. Ashish reiterated that Axiomise has no plans to execute verificaiton of the Math instructions.
6. Ashish, Alex and Mike agreed that it would be important to review the mapping of abstract registers (e.g. axiomise_REG_rs1) to the RTL with the design team.
7. Goal for the next meeting is to review the english descriptions of the formal verification plan properties.


June 5, 2020
============

Attendees:
----------
**OpenHW:** Mike Thompson<br>
**SiLabs:** Arjan Bink, Paul Zavalney, Steve Richmond<br>
**Futurewei:** Jingliang Wang<br>
**Thales:** Jerome Quevremont,  Romain Soulat, Emmanuuel Gureghian<br>
**Axiomise:** Ashish Darbari, Alex Netterville<br>

Notes:
------

Update on Alex/Arjan Action Item (see below)<br>
Email ffrom Arjan published in an email sent on 2020-06-08):
* Instruction address output is not kept stable during address phase : https://github.com/openhwgroup/cv32e40p/issues/128
* LSBs of data address are not consistent with byte enables: https://github.com/openhwgroup/cv32e40p/issues/176 
<br>
Issue #128 violates the ‘RI5CY user manual’. Issue #176 could maybe not reasonably have been spotted as the expected behavior was not part of the ‘RI5CY user manual’. The bus interfaces of CV32E40P will become compatible with https://github.com/openhwgroup/core-v-docs/blob/master/cores/cv32e40p/OBI-v1.0.pdf once this pull request https://github.com/openhwgroup/cv32e40p/pull/322 has been accepted. The above two issues (and more) have been fixed in that pull request. The issues above violate requirement R-3.1.1 and R-8 respectively of the OBI spec.
<br>
Response ffrom Ashish<br>
Issue 128 is literally a deja-vu moment for me. It was one of the first bugs I had found on 0riscy and later on ibex see https://github.com/darbaria/0riscy/issues/2
<br>
As this was not fixed on either of these cores, I decided not to lose my sleep any longer on this issue for RISCY.
<br>
In any case, unlike 0riscy where I had planned to carry out a more thorough micro-arch verification, we haven’t started anything on RISCY yet. This bug like its cousin I had found in March 2019 I suspect doesn’t break the ISA checks.

Topics:
-------

1. Introductions
2. Mike provided an update to the other members of the OpenHW team to introduce the work being done to verify CV32E40P by Axiomise.
3. Mike and Ashish re-iterated the agreement between OpenHW and Axiomise:
- Axiomise intends to verify the RV32IC ISA compliance, plus Interrupts and CSRs.
- Axiomise to provide formal testplan
- Axiomise to provide coverage report
4. Alex presented a few slides to provide a status update.
5. Arjan asked about coverage of the memory bus:
- Axiomise's model abstracts the memory interfaces
- Arjan reports a known bug on the interface and wonders if Axiomise would be senstive to it.<br>
ACTION: **Arjan** and **Alex** to discuss offline.
6. Axiomise reports that interrupts and debug are currently constrained out.
- Interrupt verification is part of the plan.
- Debug is under consideration.
- Paul Z. reports that the Debug section of the [CV32E40P User Manual](https://core-v-docs-verif-strat.readthedocs.io/projects/cv32e40p_um/en/latest/) is complete and stable.
7. Project Plan
- Mike updated Axiomise on the project schedule (RTL Freeze 2020-09-25).
- Arjan reports that the RTL is "feature complete".  Future updates to the RTL will be for bug fixes, not feature changes.
- Ashish indicated that the CV32E40P schedule aligns with Axiomise's.
8. Parameterization
- The RI5CY/CV32E40P core is highly parameterizable.  OpenHW has made several significant updates to this.
- Need to ensure that the parameters used by Aximoise match those being used by OpenHW.
- These are specified in the [Core Integration](https://core-v-docs-verif-strat.readthedocs.io/projects/cv32e40p_um/en/latest/integration.html) chapter of the User Manual.
9. Meeting cadence:
- Team agreed to meet bi-weekly.
- Mike to book next meeting: Friday, June 19 at 10:00 A.M. EDT.


May 8, 2020
============

Attendees:
----------

**OpenHW:** Mike Thompson<br>
**Axiomise:** Ashish Darbari, Alex Netterville


Topics:
-------

1. Open Actions:

- none.


2. Update from Axiomise:

- Ashish and Alex report that they have made good progress applying the Axiomise formal proof-kit of RV32I to the CV32E40P.
- Axiomise'e near-term goal is to cover the RV32IC ISA compliance, plus Interrupts and CSRs.
- Axiomise is not in a position to open-source its formal tool-kit, but will open GitHub issues for any and all bugs found
and will publish it formal testplan on OpenHW's covre-v-verif repository.

3. Update from Mike:

- the CV32E40P RTL is in active development, so it is advisable to update the clone used by Axiomise.  Mike recommends doing
this at least weekly.
- the CV32E40P does not support Atomic instructions, so  all we need is RV32IC.
- Mike would like to put the formal testplan up on GitHib (core-v-verif) as soon as possible.
- Mike also requested a formal coverage report when it is available.
