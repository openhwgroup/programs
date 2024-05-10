**May 9th, 2024**

## Participants

* Jonathan Balkind (UCSB)
* César Fuguet Tortolero (CEA)
* Duncan Bees (OpenHW)
* Flo Wohlrab (OpenHW)
* Davide Rossi (UniBo)
* Riccardo Tedeschi (UniBo)
* Lluc Alvarez (BSC)
* Luca Valente (UniBo)

# Agenda

* CV-Mesh
* CV-TCCC
* CVA6 Platform
* CV-HPDCache

# Notes

* CV-HPDC
  * Cache now supports parameterisation at instantiation instead of using a package for it (meaning heterogeneous caches are possible). Still to be merged to CVA6 due to some bugs on the CVA6 AXI agent side
  * GSoC project approved for HPIC

* CV-Mesh
  * Fix home node selection bug when NO_RTL_CSM is set
  * Critical path for HPDC+Ox solved
  * Coherent PCIe->AXI->NoC in progress (new scratch-built bridge)
  * Stream prefetcher in HPDC in progress

* CV-TCCC
  * Version of "Culsans" (TCCC) delivered to UniBo/ETHZ had some performance bottlenecks which are being addressed
  * First optimisation moves from -26% to -14% worst case perf, average from -6% to 4%
  * Second optimisation further improves perf, only a few cases underperform vs OpenPiton at this point

* CVA6 Platform
  * Trying to get a response to concerns regarding the platform vs just using QEMU

