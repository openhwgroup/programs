**February 13th, 2025**

**Prepared by: Cesar Fuguet**

# CV-HPDCACHE

## Summary

Development and verification of a High-Performance L1 Dcache integrated with
the CVA6.

## Activities and progress since last report:

### Achievements:

* Full support for HPDcache WB mode in the CVA6 with the release of an official configuration package using it
  * Instruction and Data cache coherency issue handled by flushing the HPDcache when the fence.i and fence instructions are executed
  * Some issues under investigation (see below)

### In progress:

* Publish the HPDcache User Guide in the OpenHW ReadTheDocs server
  * Mike Thompson is taking care of this
* Add support for multi-banking
  * Collaborative work between Arnau Bigas (BSC) and myself.
  * We are resuming this work after putting in pause during January

### Planned:

* Performance evaluation of Hybrid write-policy functionality
* Correctly verify CMOs on both UVM and Verilator testbenches

### Unplanned

* Collaborative work with ETH-Z and University of Bologna for a paper on the RISC-V summit Europe.
* Evaluation of the CVA6S+ (enhanced Superscalar version of the CVA6 with the HPDcache WB).
  * Regarding the HPDcache WB, it provides an important speedup on memory intensive benchmarks in comparison to the original WB cache.
  * However, ETH-Z and UniBo are observing a very slow booting of Linux. The issue is under investigation.

## Issues and dificulties:

* NA

## Gate status:

* Plan Approved
