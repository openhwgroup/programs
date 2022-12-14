# Title of Project - "CORE-V L1 DCACHE"
# Project Launch Proposal
## Date of proposal

2022-05-03

## Author(s)

Cesar Fuguet - Research Engineer - CEA List (Grenoble)

## Summary of project

Many applications in the HPC domain (e.g. scientific applications) are
often memory bound: the performance bottleneck is the memory. It is
therefore necessary to implement cache subsystems enabling a high memory
throughput. This is to hide the continuously growing gap between memory
and processor cores speeds (“Memory Wall”).

We propose a High-Performance, Out-of-Order, Level-1 Data Cache (HPDC)
compatible with RISC-V processor cores. This L1 DCACHE was successfully
integrated with a CVA6 core (replacing its original DCACHE). However,
it is meant to be compatible with other cores (with some modifications
in the load/store unit interface).

### Components of the Project

  - *Component 1 "Feature specification document"*
  - *Component 2 "High-Performance, Out-of-Order, L1 Dcache (HPDC) IP"*
  - *Component 3 "Hardware Memory Prefetcher IP"*
  - *Component 4 "UVM (Universal Verification Methodology) testbench for standalone (without core) testing of the HPDC"*

#### Component 1 Description

It is a specification document with a detailed description of the features
implemented in the HPDC, and the Hardware Memory Prefetcher. It also
contains a description of the micro-architecture.

#### Component 2 Description

This is the HPDC IP which is described in SystemVerilog RTL.

It is a High-Performance, Out-of-Order, Level-1 Data Cache (HPDC)
compatible with RISC-V processor cores, such as the CVA6.

Some of the features of the HPDC are:

  - Set-associative cache with configurable number of sets and ways.
  - Support of standard load, store, CMOs, and atomic operations of
    the RISC-V ISA.
  - Support of multiple independent requesters, such as, CORE-V cores
    and tightly couple accelerators.
  - Allow high and flexible bandwidth between this cache and the requesters.
    Current prototypes support up to 32 bytes/cycle between a given requester
    and this cache.
  - Supports a high (configurable) number of miss requests to the memory.
  - Write-through cache with a write-buffer for write data coalescing and
    multiple inflight write
  - Adapter for the AMBA AXI5 interface on the NoC/Memory interface of
    this cache.
  - Pipelined micro-architecture to achieve high clock frequencies and
    high throughput.
  - Allow out-of order execution of memory operations to avoid unnecessary
    stalls. Compliance with the RISC-V Weak Memory Ordering Consistency
    Model (RVWMO).
  

#### Component 3 Description

This is the Hardware Memory Prefetcher IP which is described in SystemVerilog RTL.

It is a programmable memory profetcher that implements up to 4 independent engines.
These engines allow to prefetch strided memory buffers into the cache. This is to
anticipate actual accesses from the application, increase the cache hit rate, and
thus the performance.

#### UVM testbench for standalone testing of the HPDC

This is a SystemVerilog testbench, that follows the Universal Verification
Methodology (UVM), and that allows to verify the HPDC and the Hardware Memory
Prefetcher IPs.

This testbench allows standalone verification of these IPs, this is, the
verification is performed without any core or accelerator. Hereafter a list of
features of this testbench:
- Request agents that generate sequences of requests to the HPDC:
  loads, stores, CMOs or AMOs. Sequences can be directed or random.
- Memory response model with out-of-order delivery of responses, able to send
  error responses, and that can apply back-pressure to requests or variable delays
  to responses.
- Scoreboard for the automatic verification of outputs from the HPDC and the Hardware
  Memory Prefetcher.

## Summary of market or input requirements
### Known market/project requirements at PL gate
### Potential future enhancements for future project phases

## Who would make use of OpenHW output

## Summary of Timeline
*High level view of timeline, for example timeframe for each component*

## Explanation of why OpenHW should do this project
*What is the impact of doing/not doing this project on the OpenHW ecosystem. Why is OpenHW best suited to do this project*

## Industry landscape: description of competing, alternative, or related efforts in the industry


## OpenHW Members/Participants committed to participate


## Project Leader(s)
### Technical Project Leader(s)
### Project Manager, if a PM is designated

## Project Documents
### Project Planning Documents
### Project Output Documents


## List of project technical outputs
*This is a list of technical artifacts produced by the project*

### Feature Requirements
*Features are more granular than Components.* 
*For SW porting projects, this list serves as the detailed project reference for features*
*For IP Cores or more complext projects, a user manual with requirements specification is produced at the PA gate, which may supercede this list of features*

#### Feature 1
#### Feature 2


## External dependencies
*These are external factors on which the project depends, such as external standards ratification, external technology input, etc.*

## OpenHW TGs Involved
*Which TG will be involved, such as SW, HW, Verification, etc.*

## Resource Requirements
*This is a list of major resources/people required to implement the project and indication of whether the resources are available*

### Engineering resource supplied by members - requirement and availability
### OpenHW engineering staff resource plan: requirement and availability
### Marketing resource  - requirement and availability
### Funding for project aspects - requirement and availability 

## Architecture and/or context diagrams 
*Architecture (internal blocks and interconnections), and context (depiction of the the project content within its operational context), are both encouraged where appropriate to depict functionality to both subject matter experts and to non-experts*



## Project license model

## Description of initial code contribution, if required

## Repository Requirements

## Project distribution model

## Preliminary Project plan
*A full project plan is not required at PL. A preliminary plan, which can be for instance the schedule for completion of component or feature list, together with responsible resource, should be provided. Full details should be provided at PA gate.*

## Risk Register
*A list of known risks, for example external dependencies, and any mitigation strategy*
