**February 8th, 2024**

## Participants

* Alex Kropotov (BSC)
* César Fuguet Tortolero (CEA)
* Redbeard (Red Hat)
* François Leduc-Primeau (PolyMTL)
* Mike Aronson (Rumble dev)
* Duncan Bees (OpenHW)
* Behzad Salami (BSC)
* Angela Gonzalez (PlanV)
* Massimiliano Giacometti (OpenHW/PlanV)
* Lluc Alvarez (BSC)

## Agenda

* Polara dev kit
* CV-Mesh
* CV-TCCC
* CV-VISION
* CVA6 Platform
* CV-HPDCache

## Notes

* Polara
  * Chip is in fab!
  * Still looking for expressions of interest in receiving a dev board
  * RB asking about physical I/O for developers
    * G2 has a lot of I/O but only a few of those have been connected in terms of drivers etc
    * Could connect I/O back to mainboard (via FMC) and then connect some other ports/chips on the mainboard
    * Could use another board (NetFPGA/VCU/118...)
    * Will have art on the chip package
  * PL was recently approved
  * Packaged chips back on May.
  * Board schematic in progress w/ Empaiot
  * Devkit & chip bringup: intern has been recruited for May
  * Working on a showcase app for after bringup
  * Empaiot are going to use Cadence board tool rather than open source ones for the board design
  * No MMU support on the vector accelerator
  * RB raises: we should get a software bill of materials for reproducing the board
  * Need a repo for sharing the devkit board files

* CV-Mesh (updates from BSC)
  * CincoRanch chip (tape-out on Q3 2024)
  * Based on the Intel Horse Creek
  * OpenPiton based with 2 Lagarto Ka and 1 Sargantana
  * CV-Mesh enhancements:
    * HPDC integration
    * L1.5/2 increased MSHRs, associativity, cache block size
    * Wider NoC buses
    * Next will be widening L1.5/2 interface, fixing some bugs
    * Plan is to upstream these enhancements into OpenPiton/CV-Mesh
  * Working on an FPGA shell for use of the design on Alveo boards (particularly U280 & U55C)
    * Ideally the "min" shell could be upstreamed into OpenPiton
    * NoC->AXI bridge has been heavily modified to add features and fix bugs
    * Add multiple memory channels on edge tiles (instead of a single chipset IO channel)
    * HBM crossbar (accessible from any edge tile) between memory channels to reduce the latency.

* HPDcache
  * Updates
    * Functional version upstreamed into CVA6
    * First integration into OpenPiton can boot Linux on emulator (bug fixes in progress)
    * HPDcache integrated into 3 cores at BSC internally (Linux boot works on at least 1 of those)
    * Bosch & Thales will use HPDC
  * Plans:
    * Changing documentation format to OpenHW preferred rst
    * Updating docs reflecting VIPT and other features
    * Test plan and testbench
    * Debugging embedded config & OpenPiton integration
  * Qs
    * Technology node? Has been taped out on 22nm and 7nm
    * What will be shared? Floorplans? RTL with many parameters has been released, adaptable across nodes

* TCCC
  * Snoopy coherence for 2-4 cores w/ MOESI states and ACE interface
  * Linux is booting on one version but there are still some bugs triggering crashes in other versions. Debugging is in progress. Will try w/ HyperRAM to have more consistent memory latency/behaviour
  * PC was passed but PL still to come. Questions around moving repo to OpenHW etc.

* Vision APU
  * Work proceeding on integrating 1 tile from Polara w/ other embedded CORE-V core(s)
  * Finalising specs and then will re-engage with OpenHW community
  * Will investigate multi-tile, extending NoC off-chip, etc

* CVA6 Platform
  * Have met the last couple of weeks between UCSB, 10xE, Red Hat
  * Figuring out how to make a proposal to RISE
  * Aligning goals, 10xE likely to pick up some engineering for Linux/distro bringup on F1
  * RISE links from RB:
    * https://wiki.riseproject.dev/display/HOME/Work+Group+Ways+of+Working
    * https://wiki.riseproject.dev/display/HOME/RISE+RFP+Process

* Next meeting March 14th (in 5 weeks)
