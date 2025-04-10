**April 10th, 2025**

**Prepared by: Cesar Fuguet**

# CV-HPDCACHE

## Summary

Development and verification of a High-Performance L1 Dcache integrated with
the CVA6.

## Activities and progress since last report:

### Achievements:

* Integration of a new feature in the HPDcache developed by Riccardo
  Tedeschi (Univ. Bologna)
  * Refill coalescing buffer: in case of write miss (in write-back mode),
    use a coalescing buffer (CB) to buffer the data from the core, and coalesce it
    later on with the data from the refill.
  * There are a parametrizable number of CBs. The MSHR is extended with a pointer
    to the associated CB.
  * Previous implementation split the write miss in two requests, one read miss
    and one write that was put on-hold in the RTAB.
  * The advantage of this new technique is reduced latency for write misses, and
    reduced utilization of the RTAB.
* Publish the HPDcache User Guide in the OpenHW ReadTheDocs server
  * Done by Mike Thompson
* Improvements in the SystemC testbench and Github's CI:
  * Test posted requests (requests not requiring a response)
  * Add new tests in the CI with different configurations of the HPDcache

### In progress:

* Discussions with Riccardo Tedeschi about the support of ACE coherence
  protocol in the HPDcache
* Add support for multi-banking
  * Collaborative work between Arnau Bigas (BSC) and myself.
  * Currently in pause... I would like to improve the SystemC testbench to have
    a good validation coverage before merging these modifications.

### Planned:

* Correctly verify CMOs on both UVM and Verilator testbenches
  * Add a RVFI kind of interface in the HPDcache (mainly for verification purposes):
    As the HPDcache can process requests in an out-of-order fashion, this interface
    will allow to track more easily which requests are being actually
    processed. As a result the testbench can more easily track the internal state
    and compare it with the expected one.
* Project to implement SECDED (error correction and detection) in the HPDcache
  should start in the following weeks.
* Performance evaluation of Hybrid write-policy functionality
* I'll supervise an internship (May, 2025) on porting the HPDcache into the
  open-source Vortex GPU:
  * Initial work was already done by a student of J. Balkind in Santa Barbara.
    This will be used to bootstrap the work of the new student.

### Unplanned

* NA

## Issues and dificulties:

* NA

## Gate status:

* Plan Approved
