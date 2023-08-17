*The PC proposal introduces the project and explains the market drivers and the "why"* 

# Title of Project - "CEA DV Utils"
# Project Concept Proposal
## Date of proposal - 2023-07-24
## Author(s) - Tanuj Khandelwal, Ludovic Pion, Adrian Evans

## High Level Summary of project, project components, and deliverables

It is known that verification is the bottleneck in complex digital hardware design. UVM has become the industry standard for the development
of testbenches for digital verification, however, UVM only provides a set of base classes. This repository contains a set of UVM tools which
can improve the productivity of verification engineers. Particularly it includes some agents for common protocols (AXI4+, SPI), some generic
checkers (memory models) and some scripts.  This below enumerates the components in the dv-utils repository.

| Block | Language | Description |
|-------|:--------:|-------------|
| AXI Superset Agent | UVM | AXI-4 agent with support for atomics. |
| Back Pressure Generator | UVM | Controls a single bit backpressure signal with random sequences. |
| Clock Generator | UVM | Clock generator with controllable frequency |
| Clock Monitor | UVM | Clock monitor that checks a clock is running at the correct frequency, without glitches. |
| DRAM Monitor | UVM | Monitors row/column transactions and build back memory transactions. |
| Generic Agent | UVM | An agent which can be configured for arbitrary data-structure. |
| Memory Partition | UVM | Generates a set of regions in memory. Used to focus accesses into small regions to increase hazard conditions. |
|  Memory Response Model | UVM | An active agent that replaces a real memory system (DRAM controller), generating random, out-of-order responses, but with coherent data |
|  Memory Shadow | UVM | Used to create scoreboards for a memory system. |
|  Perfomance Monitor | UVM | Used to calculate bandwidth and transaction rate between a set of sources and destinations (on a NoC, for example. |
|  Reset Generator | UVM | Generates reset signal during the UVM reset phase. |
|  SPI Agent | UVM | SPI protocol master side agent. |
|  Unix Utils | UVM | Emulate unix functions in uvm - such a grep/sed or generating unique temporary file names. |
|  Watchdog| UVM | Serves as a watchdog in a testbench. Timeout can come from test-bench or command line. |
|  PLL Model | SystemVerilog | Acts as behavioural model of a PLL, providing high frequency clocks, from a reference. |
|  Random Delay | SystemVerilog | Inserts a random delay on a bus, typically used for verifying multi-cycle paths in RTL simulation. |
|  X-Filter | SystemVerilog | Replaces X's on a bus with random values - use with caution. |
|  Param Sweeper | Python | Generates multiple configurations for simulating paramterized designs. |
|  scan_logs | Perl | Script for parsing log files, reporting errors and warnings, and generating summary reports. |

## Summary of market or input requirements

Some of the utilities in this repository are directly useful for RISC-V core verification. However, the set of utilities is broad and
they can be of use to teams developing block-level or chip-level test-benches.

### Known market/project requirements at PC gate

It would be beneficial if the existing library would augmented with an example showing how some of the blocks in this library
can be integrated with Core-V verification, and this is something that is being investigated.

### Potential future enhancements

The coverage and assertion checking in the UVM agents in this library is very light and needs to be enhanced over time.

## Who would make use of OpenHW output

Teams who build UVM test-benches for projects integrating the RISC-V, although there is nothing in this library that is
specific to RISC-V.

## Initial Estimate of Timeline

The CEA hopes to make an initial version of the source code available in the October 2023 time-frame. After this, it may require
2-3 months of effort to complete code reviews, prepare an example integration with Core-V Verif, etc.

## Explanation of why OpenHW should do this project

The utilities in this library are a pre-requisite for the stand-alone test-bench for the high-performance data-cache (HPDC) which has
already been made available by CEA. Without this code-base, it would be more difficult to deliver the test-bench for the HPDC.

## Industry landscape: description of competing, alternative, or related efforts in the industry

CEA is now aware that a group at Thales has made available an alternative AXI-4+ agent. There needs to be discussions about which agent
is more mature and how to avoid a situation where there are two open-source AXI-4+ agents. 

## OpenHW Members/Participants committed to participate

Thales has expressed interest in this project.

## Project Leader(s)

Adrian Evans

### Technical Project Leader(s)

Tanuj Khandelwal, Ludovic Pion

### Project Manager, if a PM is designated

N/A

## Next steps/Investigation towards Project Launch (**PC only**)

### Resolution of how to Handle Multiple AXI-4 Agents

The first step is to identify a strategy. One possible strategy would be to merge the existing agents, taking the best points of both. Alternatively, one or the other, could be retained.
After determining the strategy, the technical work to put it in place must be performed.

Target date : end November 2023

### Further Code Review to Identify Required Updates/ Modifications 

Target date : end October 2023

### Resolution of Legal Requirements for Code Release by CEA

Target date : end September 2023
