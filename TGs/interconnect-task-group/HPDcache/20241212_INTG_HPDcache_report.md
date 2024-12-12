**December 12th, 2024**

**Prepared by: Cesar Fuguet**

# CV-HPDCACHE

## Summary

Development and verification of a High-Performance L1 Dcache integrated with
the CVA6.

## Activities and progress since last report:

* Achievements:
  * Integration of newest version of the HPDcache with the CVA6
    * No full support for WB yet: needs coherency mechanism with the Icache in
      case of modified instructions

* In progress:
  * Publish the HPDcache User Guide in the OpenHW ReadTheDocs server
    * Mike Thompson is taking care of this
  * Add support for multi-banking
    * Collaborative work between Arnau Bigas (BSC) and myself.
    * Things that work:
      * Currently supports read and write operations with multi-banking
        (1 request/bank processed at a time)
    * Things that do not work (yet):
      * Multiple banks responding to the same requester
      * Uncacheable accesses
      * CMOs
      * Flushes (WB support)

* Planned:
  * Support of WB mode with the CVA6
  * Performance evaluation of Hybrid write-policy functionality
  * Correctly verify CMOs on both UVM and Verilator testbenches

## Issues and dificulties:

* NA

## Gate status:

* Plan Approved
