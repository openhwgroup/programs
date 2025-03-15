## CV32E40P Functional RTL Freeze milestone definition
The tables and supporting files in this directory comprize the Checklist for the “Functional RTL Freeze” criteria for OpenHW Group’s CV32E40P CORE-V RTL IP project.  The IP is said to have achieved "Functional RTL Freeze" when all items in all Checklists have been signed off as complete.  Waivers are captured as GitHub Issues.

Note that "Functional RTL Freeze" is intended to be equivalent to [Technology Readiness Level 5](https://www.nasa.gov/directorates/heo/scan/engineering/technology/technology_readiness_level).

### IP Revision
These checklists refer to the first release of the CV32E40P. The GitHub URL for the CV32E40P is https://github.com/openhwgroup/cv32e40p and the GitHub tag for this release is cv32e40p_v1.0.0. Software can unambiguously identify this core by reading these values from the following CSRs:
```
- marchid   = 0x4
- mvendorid = 0x602
- mimpid    = 0x0
```

### RTL IP
For the purposes of this document, RTL IP shall mean designs and associated collateral that can be use to realize a functional design in either an FPGA, ASIC or both.  The RTL IP is captured as synthesizable SystemVerilog.

### What Does “Functional RTL Freeze” Mean?
RTL IP that meets the Functional RTL Freeze criteria is complete, functionally correct, validated against a specific software toolchain and ready to be used in a commercial-grade product.  The Specification, Design and Verification are complete and functionally consistent with each other.  The IP has been shown to match the design intent as captured in the specification by means of either dynamic or static verification methods (or both).

### Deliverables:
The OpenHW Group provides the following open source collateral (licensed under Solderpad 2.0):
- User Manual
- RTL source code
- Verification Plans and Reports
- Verification Environment (testbench) source code

### A note about Physical Implementations
OpenHW IP that achieves the Functional RTL Freeze milestone is subject to a minimal set of lint and synthesis checks.  It may or may not have been synthesized and implemented into a specific physical implementation (ASIC or FPGA).
