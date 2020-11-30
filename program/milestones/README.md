## CV32E40P Functional RTL Freeze milestone definitions

### Purpose of this Document
This document is the Checklist for the “Functional RTL Freeze” criteria for OpenHW Group’s CV32E40P CORE-V IP project.

### RTL IP
For the purposes of this document, RTL IP shall mean designs and associated collateral that can be use to realize a functional design in either an FPGA, ASIC or both.  The RTL IP is captured as synthesizable SystemVerilog.

### What Does “Functional RTL Freeze” Mean?
RTL that means the Functional RTL Freeze criteria is complete, functionally correct, validated against a specific software toolchain and ready to be used in a commercial-grade product.  The Specification, Design and Verification are complete and self-consistent.  It has been shown to match the design intent as captured in the specification by means of either dynamic or static verification methods (or both).

### Deliverables: OpenHW provides the following at RTL Freeze:
- RTL source code (licensed under Solderpad 2.0)
- Verification Plans and Reports
- Verification Environment source code

### A note out Physical Implementations
OpenHW IP that achieves the Functional RTL Freeze milestone is subject to a minimal set of lint checks.  It may or may not have been synthesized and implemented into a physical gate model.
