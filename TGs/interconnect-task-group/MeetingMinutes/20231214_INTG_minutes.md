**December 14th, 2023**

## Participants

* Jonathan Balkind (UCSB)
* César Fuguet (CEA)
* Duncan Bees (OpenHW)
* Jérôme Quévremont (Thales)
* Lluc Alvarez (BSC)
* Flo Wahlrab (OpenHW)
* Yoan Fournier (PolyMTL)
* François Leduc-Primeau (PolyMTL)
* Redbeard (Red Hat)
* Mike Thompson (OpenHW)

## Agenda

* Participants roundtable (5-10 minutes)
* POLARA (5-10 minutes)
* CVA6-Platform Project Launch Initial Draft (10 minutes)
* CV-TCCC status report (5-10 minutes)
* CV-MESH status report (5-10 minutes)
* CV-HPDCACHE (L1DCACHE) status report (5-10 minutes)
* CV-VISION (5-10 minutes)

## Notes

* Some project notes from Duncan: [INTTG-DBees-Dec2023 notes.pptx](https://docs.google.com/presentation/d/1AyB3H6MchJk2ouLGjOobOW5EXkx033EI/edit)

* Presentation of François Leduc-Primeau regarding the POLARA platform
  * OpenBLAS support: not for the moment
  * Verification status is green :)
  * Tapeout on January - Delivery in May 2024
  * OpenHW members can request a board
  * Target applications: quantized deep learning and vision applications

* Presentation of Duncan Bees regarding the draft for the CVA6 platform project
  * Currently no engineering resource working on the setup of the platform on the AWS infrastructure.
  * Should arrange a meeting to set out the details of the PL and begin a doc to take to RISE for advice
  * Should reach out to RISE to discuss setting up a project and leveraging resources that they might provide (through an RFP process)

* CV-TCCC is under Linux boot debug (dual core)
  * 34 open issues
  * Under PC, not entirely clear what's needed for PL
  * Duncan will assist on work on PL and bring it back here before TWG

* CV-MESH
  * Work at BSC/UCSB on integration of the HPDcache and OpenPiton. The different PRs to integrate those changes are opened in the 3 different repos (CVA6, HPDcache, and OpenPiton)
  * Work at CEA/UCSB on evaluating the platform using a hardware emulation
  * Work at BSC/UCSB on parametric cachelines and different optimizations in OpenPiton
  * Work at BSC on the JTAG controller, AXI->NoC bridges

* HPDCache
  * Performance results show better frequency (2%), slightly larger area (6%), and much better performance in CPI (10-50%) and sustained bandwidth (100%+)
  * Integrated w/ OpenPiton, 16 core linux boot works
  * BSC integrated w/ Sargantana (open source), other cores (in progress internally)
  * Jon will add: students took a look at doing an HPICache

