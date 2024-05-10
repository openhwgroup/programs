**April 11th, 2024**

## Participants

* Jonathan Balkind (UCSB)
* César Fuguet Tortolero (CEA)
* Duncan Bees (OpenHW)
* Lluc Alvarez (BSC)
* Mike Aronson (Rumble dev)
* Behzad Salami (BSC)
* Redbeard (Red Hat)

## Agenda

* Polara dev kit
* CV-Mesh
* CV-TCCC
* CV-VISION
* CVA6 Platform
* CV-HPDCache

## Notes

* CV-TCCC
  * Project moved to Bologna under Davide Rossi

* CV-Mesh
  * New progress: connected HPDC, LLC (existing), and NoC (new) perf counters to Sargantana PMU
  * CI/CD of torture tests and multicore benchmarks for verification
  * Needed to make some fixes to how non-cacheable reqs' data were replicated for the expectations of OpenPiton's AXI bridge
  * César has some suggestions for clearing critical paths on HPDC-core interface

* Polara dev kit
  * Schematics handed over to Empaiot
  * Duncan suggests getting the schematics onto Github

* CV-VISION
  * Merging the Polara mesh into the rest of the Vision APU design

* CVA6 Platform
  * Feedback on the proposed RFP is that some people get it, while others don't understand why it's needed (why not use QEMU? Mike suggests we have a slide to explain)
  * Preparing to present to TSC at sometime soon

* CV-HPDCACHE
  * Fixed a perf bug
  * Will be publishing the user guide in rtd
  * Test plan delivery has been delayed
  * Three features planned, ideally one per month through the end of June

