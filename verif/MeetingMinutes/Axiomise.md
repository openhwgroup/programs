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

New actions: Alex and Arjan<br>

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
