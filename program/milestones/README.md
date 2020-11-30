## CV32E40P Functional RTL Freeze milestone definition
The tables and supporting files in this directory comprize the Checklist for the “Functional RTL Freeze” criteria for OpenHW Group’s CV32E40P CORE-V RTL IP project.

### RTL IP
For the purposes of this document, RTL IP shall mean designs and associated collateral that can be use to realize a functional design in either an FPGA, ASIC or both.  The RTL IP is captured as synthesizable SystemVerilog.

### What Does “Functional RTL Freeze” Mean?
IP that meets the Functional RTL Freeze criteria is complete, functionally correct, validated against a specific software toolchain and ready to be used in a commercial-grade product.  The Specification, Design and Verification are complete and functional consistent with each other.  The IP has been shown to match the design intent as captured in the specification by means of either dynamic or static verification methods (or both).

### Deliverables:
The OpenHW Group provides the following open source collateral (licensed under Solderpad 2.0):
- User Manual
- RTL source code
- Verification Plans and Reports
- Verification Environment source code

### A note about Physical Implementations
OpenHW IP that achieves the Functional RTL Freeze milestone is subject to a minimal set of lint checks.  It may or may not have been synthesized and implemented into a physical gate model.
