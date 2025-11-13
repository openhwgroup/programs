---
author: Cesar Fuguet
title: INTG - HPDcache Report
date: June 12th, 2025
...
# CV-HPDCACHE

## Summary

Development and verification of a High-Performance L1 Dcache integrated with
the CVA6.

## Activities and progress since last report:

### Achievements:

* Add synthesis scripts using the Yosys tool to get an estimation of the area (in 45nm technology) of the HPDcache.
  This script is now part of the CI.
* In collaboration with Riccardo Tedeschi, simplified handling of AMOs and
  uncached requests. The objective is to enable easier implementation of ACE or other cache coherence procotols more easily. No impact on performance expected (but not yet measured).
* Improvements in the SystemC testbench and Github's CI:
  * Support of 32-bits (embedded) configuration

### In progress:

* Riccardo Tedeschi is working on the support of the ACE coherence protocol in
  the HPDcache.
* Add support for multi-banking
  * Collaborative work between Arnau Bigas (BSC) and myself.
  * Currently in pause... I would like to improve the SystemC testbench to have
    a good validation coverage before merging these modifications.
* Internship on porting the HPDcache into the open-source Vortex GPU:
  * Initial work was already done by a student of J. Balkind in Santa Barbara.
    This will be used to bootstrap the work of the new student.

### Planned:

* Correctly verify CMOs on both UVM and Verilator testbenches
  * Add a RVFI kind of interface in the HPDcache (mainly for verification purposes):
    As the HPDcache can process requests in an out-of-order fashion, this interface
    will allow to track more easily which requests are being actually
    processed. As a result the testbench can more easily track the internal state
    and compare it with the expected one.
* Project to implement SECDED (error correction and detection) in the HPDcache
  still in standby.
* Performance evaluation of Hybrid write-policy functionality

### Unplanned

* NA

## Issues and dificulties:

* NA

## Gate status:

* Plan Approved
