**September 12th, 2024**

**Prepared by: Cesar Fuguet**

# CV-HPDCACHE

## Summary

Development and verification of a High-Performance L1 Dcache integrated with
the CVA6.

## Activities and progress since last report:

* Achievements:
  * Delivery of a preliminary UVM testbench
    (accessible in https://github.com/openhwgroup/cv-hpdcache-verif)
  * Delivery of a preliminary testplan (same repository as above)

* Planned:
  * Publish the HPDcache User Guide in the OpenHW ReadTheDocs server
  * Develop hybrid write-policy functionality
    * 90% implemented
  * Develop scratchpad mode functionality

* Unplanned:
  * Discussions with ETH-Z and Univ. of Bologna who are interested in using
    the HPDcache into the Cheshire platform with Culsans (small-scale,
    snoop-based, cache coherency).

* Other related activities:
  * GSoC project: adapting the HPDcache to be also used as the instruction
    cache of the CVA6 core (mentored by N. Oliete-Escuin, J. Balkind and C. Fuguet)
    * GSoC project ended.
    * The work is not finished. The student had a hard time to understand the
      new OBI interface between the CVA6 and the HPDcache.

## Issues and dificulties:

* NA

## Gate status:

* Plan Approved
