**March 13th, 2025**

**Prepared by: Cesar Fuguet**

# CV-HPDCACHE

## Summary

Development and verification of a High-Performance L1 Dcache integrated with
the CVA6.

## Activities and progress since last report:

### Achievements:

* Integration of a new feature in the HPDcache developed by Arnau Bigas @ BSC
  * Improve throughput with a latency degradation (access hit latency is 2
    cycles instead of 1)
  * Rationale:
    * Out-of-order cores prefer high-throughput to latency (out of order
      execution allows to hide latency).
    * In-order cores prefer low-latency to high-throughput.
  * A parameter allows to enable/disable this feature
* Add formal LNT model of the HPDcache developed by Inria colleagues 

### In progress:

* Publish the HPDcache User Guide in the OpenHW ReadTheDocs server
  * Mike Thompson is taking care of this
* Add support for multi-banking
  * Collaborative work between Arnau Bigas (BSC) and myself.
  * Currently in pause... I would like to improve the SystemC testbench to have
    a good validation coverage before merging these modifications.

### Planned:

* Performance evaluation of Hybrid write-policy functionality
* Correctly verify CMOs on both UVM and Verilator testbenches
* Project to implement SECDED (error correction and detection) in the HPDcache
  should start in the following weeks.

### Unplanned

* Discussions with Riccardo Tedeschi about the support of ACE coherence
  protocol in the HPDcache

## Issues and dificulties:

* NA

## Gate status:

* Plan Approved
