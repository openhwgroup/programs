May 8, 2020
============

Attendees:
----------

**OpenHW:** Mike Thompson<br>
**Axiomise:** Ashish Darbari, Alex Netterville

Notes:
------

New actions: Alex<br>

Topics:
-------

1. Open Actions:

- none.


2. Update from Axiomise:

- Ashish and Alex report that they have made good progress applying the Axiomise formal proof-kit of RV32I to the CV32E40P.
- Axiomise'e near-term goal is to cover the RV3IC ISA compliance, plus Interrupts and CSRs.
- Axiomise is not in a position to open-source its formal tool-kit, but will open GitHub issues for any and all bugs found
and will publish it formal testplan on OpenHW's covre-v-verif repository.

3. Update from Mike:

- the CV32E40P RTL is in active development, so it is advisable to update the clone used by Axiomise.  Mike recommends doing
this at least weekly.
- the CV32E40P does not support Atomic instructions, so  all we need is RV32IC.
- Mike would like to put the formal testplan up on GitHib (core-v-verif) as soon as possible.
- Mike also requested a formal coverage report when it is available.
