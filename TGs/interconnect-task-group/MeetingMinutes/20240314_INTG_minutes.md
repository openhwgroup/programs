**March 14th, 2024**

## Participants

* Jonathan Balkind (UCSB)
* César Fuguet Tortolero (CEA)
* Duncan Bees (OpenHW)
* François Leduc-Primeau (PolyMTL)
* Mike Aronson (Rumble dev)

## Agenda

* Polara dev kit
* CV-Mesh
* CV-TCCC
* CV-VISION
* CVA6 Platform
* CV-HPDCache

## Notes
* CV-TCCC (Plan-V absent)
  * Bugs identified and solved: linux boots reliably even after removing the (HW) workaround
  * Performance profiling and optimizations started
  * PL TBD (project moving back to ETHZ)

* CV-Mesh (BSC absent)
  * Parallel access to LLC SRAM works enough to pass some tests; improves performance
  * Icache 64B line (with Lagarto Hun) works; perf benefit negligible
  * From Lluc's slides [OpenHW Interconnect TG meeting](https://docs.google.com/presentation/d/1LFvKRvm41dBByQ3ggSxPmSjtocle79lkxbQn96ehQEU/edit?pli=1#slide=id.g2c2dc620106_0_13):
    * Increased write-through width from L1D$ to L2$ to 64B
    * Solved bug with 64 MSHRs in L2$
    * Solved bug with refills and invalidations from L2$ to L1D$
    * Initial implementation of parallel access to the L2$ and L3$ SRAMs

* CVA6 Platform Proposal for RISE RFP
  * Met with RISE distros group a few days ago to share our proposal for RFP
  * Feedback was minor/positive
  * Unclear on when we'll meet with the TSC
  * Some requests about 32-bit Linux support (with the 32-bit CVA6).
  * Working on a paper for the RISC-V summit EU for submission on the ~20th

* Polara dev kit
  * Schematics coming in the next week
  * Can power entirely from Genesys2!
  * Can try to get Mateo for a future call

* Vision APU
  * Still trying to get "final" configuration of which components and how many

* HPDC
  * 64 core emulator implementation boots Linux; working next on multithreaded benchmarks
  * New embedded-focused features
  * Thales DIS comparing to CVA6 WTDC, demonstrated lower area usage
  * User guide in complete form, to be published
  * Working through many GSoC questions regarding our proposed HP icache (HPIC)

