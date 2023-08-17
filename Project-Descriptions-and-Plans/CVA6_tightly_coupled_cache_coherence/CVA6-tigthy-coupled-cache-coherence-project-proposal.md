# "Tightly-coupled cache coherence for CVA6"
# Project Concept Proposal
## Date of proposal - 2023-06-22
## Author(s) - Massimiliano Giacometti, Max Bjurling

## High Level Summary of project, project components, and deliverables

The goal is being able to create a cluster of 2 to 4 cache coherent CVA6 CPUs, something like ARM-MP.

The strategy is therefore to trade scalability for performance: the solution will be an ACE-based snooping (MOESI) protocol.

Components and deliverables:

- modified WB cache, to support ACE transactions (outgoing and incoming)
- cache coherence unit (CCU), which is the layer which broadcasts ACE transactions from one CPU to the others and to the rest of the system
- unit tests
- FPGA implementation

## Summary of market or input requirements

### Known market/project requirements at PC gate

TBD

### Potential future enhancements

The project currently focuses on the WB cache. The WT cache and the HPDcache could also be extended to be compatible with the implemented algorithm.

## Who would make use of OpenHW output

Everyone interested in implementing a small CVA6 cluster.

## Initial Estimate of Timeline

A first Linux-capable implementation is already available.
We are planning on further developing it to overcome the bottlenecks which have been identified.

## Explanation of why OpenHW should do this project

There is a lot of interest in CVA6 and offering the possibility to use it in a multicore system would boost the enthusiasm towards this project even more.
It is true that alternative way of using CVA6 in a cluster already exist (see below), but different solution address different requirements (multicore vs manycore).

## Industry landscape: description of competing, alternative, or related efforts in the industry

It already exists an IP which offers cache coherence for CVA6 and which can support many cores by using a NoC: OpenPiton. It implements a directory-based algorithm, which does not fit well as the requirement is for a tightly-coupled, low-latency mechanism.

A similar approach has been followed by BlackParrot.

Rocket chip can be configured as a multicore processor with snooping cache coherence mechanism, but it leverages on TileLink, while CVA6 has a native AXI interface.

## OpenHW Members/Participants committed to participate

PlanV GmbH

## Project Leader(s)
### Technical Project Leader(s)

Max Bjurling (max.bjurling@planv.tech)

## Next steps/Investigation towards Project Launch (**PC only**)
### Alignment with CVA6 and AXI repositories

The integration of the novel and modified modules within the existing repositories is still to be discussed.

- how to select the new or standard WB variant
- where to store the CCU implementation (AXI repository vs CVA6 repository vs standalone repository)

### Target Date for PL

TBD