**June 13th, 2024**

**Prepared by: Cesar Fuguet**

# CV-HPDCACHE

## Summary

Development and verification of a High-Performance L1 Dcache integrated with
the CVA6.

## Activities and progress since last report:

* Achievements:
  * Latest version of the HPDcache with the new parametrization scheme
    integrated in the master branch of the CVA6
  * Add the HPDcache in the Thales' CVA6 UVM testbench
  * Optimizations in the write buffer to improve both area and performance
    (1.5x speedup in synthetic write-only request sequences)

* Planned:
  * Publish the HPDcache User Guide in the OpenHW ReadTheDocs server
  * Still working in the delivery of a preliminary testplan. Delayed until
    June'24
  * Working in the delivery of a preliminary UVM testbench
  * Develop hybrid write-policy functionality
    * Currently working in the functional and micro-architecture specification
      document of this functionality
  * Develop scratchpad mode functionality

* Unplanned:
  * Contribution of the Bender metadata file for the HPDcache from Michael
    Platzer (Axelera IA)

* Other related activities:
  * GSoC project: adapting the HPDcache to be also used as the instruction
    cache of the CVA6 core (mentored by N. Oliete-Escuin, J. Balkind and C. Fuguet)
    * The student Akiho Kawada started to work.
    * We are figuring out how to align the work with the ongoing
      re-specification by Thales of the data and instruction interfaces (based
      on the OBI protocol) towards the caches in the CVA6.

## Issues and dificulties:

* None

## Gate status:

* Plan Approved
