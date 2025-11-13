---
author: Cesar Fuguet
title: INTG - HPDcache Report
date: November 13th, 2025
...
# CV-HPDCACHE

## Summary

Development and verification of a High-Performance L1 Dcache integrated with
the CVA6.

## Activities and progress since last report:

### Achievements:

* Arnau Bigas (BSC) proposed a PR (merged) to update the OpenPiton adapter to
  the latest version of the HPDcache.

* New CVA6 Eclipse project organization accepted. Any change on how we should
  track progress on the HPDcache project ? (question for @MikeThompson)

### In progress:

* Implementing SECDED ECC (error correction and detection) and scrubber in the
  HPDcache.
  Asking for a timeslot during one of December's CVA6 meetings to present:
  * gem5 model of the HPDcache
  * performance evaluation results
  * selected micro-architecture with ECC for the HPDcache
  * discuss with CVA6 code owners to select a strategy to implement the
    software-hardware interface: CSRs, and error signaling.

* Riccardo Tedeschi is working on the support of the ACE coherence protocol in
  the HPDcache. Currently chasing bugs. Linux runs but not every time...

* Sheldon (student at UCSB under the supervision of Jonathan Balkind),
  continues the evaluation of the HPDcache when integrated to the Vortex GPU.
  Latest results exhibit a performance bottleneck when sharing a HPDcache
  instance with multiple Vortex cores (each with a dedicated port towards the
  HPDcache).

### Planned:

* Correctly verify CMOs on both UVM and Verilator testbenches
  * Add a RVFI kind of interface in the HPDcache (mainly for verification
    purposes): As the HPDcache can process requests in an out-of-order fashion,
    this interface will allow to track more easily which requests are being
    actually processed. As a result the testbench can track the internal state
    and compare it with the expected one.

* Multi-banking support (with Arnau Bigas) of BSC.

### Unplanned

* NA

## Issues and difficulties:

* CVA6 repository still points out to an old version of the HPDcache. Latest
  version make some tests under VCS and UVM on the Thales private CI to fail.
  As I do not have access to VCS, I cannot rerun the corresponding tests to
  look into waves. We need to setup an interactive debug session with
  Jean-Roch's team to take a look on the waves.

## Gate status:

* Plan Approved

vim: ts=2 : sts=2 : sw=2 : et : spell : spelllang=en
