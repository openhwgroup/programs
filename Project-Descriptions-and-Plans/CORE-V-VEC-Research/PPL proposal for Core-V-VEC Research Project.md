# OpenHW Preliminary Project Launch (PPL) Proposal - Core-V-VEC Research Project
# Title of Project

This is the PPL for the Core-V-VEC project. This is a research-oriented project driven by several OpenHW members to develop an enhanced version of the "Ara" Coprocessor.
The Ara VP is a state-of-the-art parametric in-order high-performance 64-bit vector unit based on version 0.5 of the RISC-V “V” specification, which works in tandem with the Ariane application-class RV64GC scalar processor core


Fhe Mitacs Accelerate research proposal document ("Research Proposal") describes the proposed research in full detail
"RISC-V Vector Processor for High-throughput Multidimensional Sensor Data Processing & Machine Learning Acceleration at the Edge"
for details.

 ## Summary of project

The main goal of the project is to undertake research that will result in improved the functionality and performance of Ara.
Research will focus on two main areas
(i) Energy efficient handling for low precision operands 
(ii) Autonomous memory interface to provide direct memory access from Ara, which will improve energy efficiency of the system.
Since the time that Ara was first developed, the RISC-V Foundation vector extensions have been further refined and updating Ara to meet this specification is a component of the project.
Also, the project will bring Ara under the OpenHW umbrella and home the repository in the OpenHW organization.

The following is the abstract from the Research Proposal Nov 20, 2020 version

Today’s main challenge of advanced computing solutions consists in increasing the performances of systems while keeping their power envelope within tight bounds, as dictated by the needs of a wide range of applications: from small Internet of Things (IoT) all the way up to High Performance Computing (HPC). This high demand for energy-efficiency, coupled with the limitations of technology scaling – which no longer provides improved performances at constant power densities – is leading designers to explore new microarchitectures with the goal of pulling more performances out of a constrained power budget. This project will enter into this trend by revisiting the vector processing model, which provides a highly efficient way of exploiting data parallelism in scientific and matrix-oriented computations, as well as in high-throughput multi-dimensional digital signal processing and machine learning (ML) algorithms under real-time constraints. Indeed, the efficiency of vector processors (VPs) comes from their ability to perform parallel-data computations on very large vectors, thereby amortizing the overhead of fetching and decoding instructions. The starting point for this project will be from the VP that follows the specifications of the open-source RISC-V ISA “V” vector extension, and it will take place within a larger research project known as the PULP Platform [1]. Specifically, this project will extend on prior works, performed as part of the PULP Platform, that led to a first-generation RISC-V VP called Ara. The Ara VP is a state-of-the-art parametric in-order high-performance 64-bit vector unit based on version 0.5 of the RISC-V “V” specification, which works in tandem with the Ariane application-class RV64GC scalar processor core. Early analysis of Ara has shown that it achieves up to 41 DP-GFLOPS/W, which is superior to similar vector processors found in the literature. Yet, insights gained with this analysis also highlighted that addressing specific limitations of Ara would significantly improve its energy-efficiency. In addition, Ara must be updated to support the most recent version of the RISC-V “V” extension (from version 0.5 to version 0.9), which is continuously evolving. With the objective of improving the energy-efficiency of Ara, this project will explore two main research areas: 1) A more autonomous memory subsystem will be added to Ara. This will reduce stalls in the scalar processor due to interactions with the vector processor, while extracting more bandwidth from the memory hierarchy, thereby improving the overall energy efficiency of the system. 2) Ara will be extended to support low-precision instructions, that is, operations performed on low-precisions (e.g. sub-byte) vector operands. This addition to Ara’s datapath will benefit a new class of ML models, such as Binary Neural Nets or XNOR networks, that have demonstrated improved performances compared to ordinary neural network models by operating on low-precision data. Both research areas will require extensive work at the hardware and the software levels. On the software side, dedicated libraries, mixing intrinsics and optimized macros that exploit Ara’s features, will be developed in an effort to develop a benchmark suite targeting key application kernels used in (binary) neural networks. On the hardware side, RTL development will be supported by simulations and rapid FPGA prototyping. An important milestone of this project is the implementation and the fabrication of improved Ara VP core prototypes using the GLOBALFOUNDERIES 22FDX 22 nm technology, which will showcase the proposed microarchitecture through energy-efficiency measurements. Our Ara VP design and its associated software stack will be open-sourced under a liberal license as part of the CORE-V family of RISC-V processors – derived from the PULP Platform – of the OpenHW group, with the intention of stimulating future open-source hardware collaboration involving Canadian industries and universities.  

Note that unlike other OpenHW Projects, for example the cv32e40p project, it is not the goal of the Core-V-VEC Research Project to produce industrial quality IP. 
Rather, this project produces a set of outputs (RTL, research papers, source code, test chip) that could serve as "advanced input" to industrial quality IP projects should OpenHW choose to underake that.





### Components of the Research Proposal

The scope of this project is quite wide and constitutes a number of activities that for an industrial quality project, might be treated as independent projects.
The current intent is to manage this research project as one OpenHW project, and consider in future splitting into separate "industrialization" projects.


T1. Setting up the PULP Platform environment to support the development of the Ara VP: 
T2. Emulating the Ara VP on FPGA: 
T3. Benchmarking the Ara VP
T4. Supporting the most recent RISC-V “V” vector ISA extension [7]: 
T5. Improving the energy efficiency of the Ara VP via autonomous memory subsystems
T6. Extending Ara to support low-precision ISA extensions: 
T7. Providing software support for the Ara VP
T8. Implementing the Ara VP in the GF 22FDX ASIC technology

### Summary of Timeline

The Research Proposal provides a detailed schedule for each person working on it. Essentially this is a 2 year project with activities broken out into 4 month chunks. The starting date is January 2021.

![Image of Research Proposal Timeline]
(https://github.com/openhwgroup/core-v-docs/blob/master/program/images/VEC%20schedule.png)

Source: Presentation of Hugh Pollitt-Smith, CMC

## OpenHW Members/Participants committed to participate 

The Research Proposal names 6 interns who are doing the work of the project. 
The project funding (for the interns) is provided by CMC Microsystems and Mitacs on an approximately equal basis. Note that this is the first example of the OpenHW Accelerate Program, which brings together academic, peer-reviewed research funding from Mitacs and other OpenHW members.


## Technical Project Leader(s) (TPLs)
Frank Gurkaynak, ETH Zurich Professor
Mickael Fiorentino, Polytechnique Montreal, Post-Doctoral Fellow and project intern


## Project Manager (PM)
Hugh Politt Smith, CMC


## Project Documents
See list of project outputs below. A specific set of documents is not as yet itemized.

## Summary of requirements
These technical requirements are driving the Ara coprocessor. 

Applications:
- High-throughput multi-dimensional digital signal processing. For example, sensor fusion, e.g. aggregation of automotive sensor data.
- Machine learning (ML) algorithms under real-time constrain
- IoT to High Performance Computing (HPC)
- Highly efficient way of exploiting data parallelism in scientific and matrix-oriented computations

Specific requirements to be addressed:
- Extreme energy efficiency for vector arithmetic
- Specific focus on energy efficiency for low-precision operands
- Update Ara to support version 0.9 of the RISC-V "V" extension

## Explanation of why OpenHW should do this project
OpenHW through its members is developing a full ecosystem around the Core-V cores and related IP and tooling. The external Vector processor is one of several industry approaches for acceleration of vector-math intensive applications. It will be an important part of the OpenHW Core-V ecosystem.
This is the lead project for OpenHW's Accelerate program and will pave the way for future industry-academic collaboration projects within the OpenHW ecosystem.  

## Industry landscape: description of competing, alternative, or related efforts in the industry
Check paper reference [14] for potential description of alternative approaches

## External dependencies
Leave open for now

## List of project outputs

(1) Open source RTL code
(2) Open source code for software ecosystem (RISC-V assembly, c/c++, python)
(3) ASIC implementatoin, EDA scripts, tape-out, characterization in GF 22FDX technology
(4) FPGA emulation targeting CMC-supported boards
(5) Technical documentation and training materials
(6) Mitacs final report
(7) Student PhD/MSc theses, conference and journal papers
(8) Test chips and demonstration boards


## TGs Impacted/Resource requirements

The primary TG that will have oversight is the to-be-formed University Outeach Task Group.
Although the project scope includes activities carried out in SW, Cores, Verification, and HW, those TG will not have direct oversight as this is not an industrialization project.
On the other hand, there will be some involvement of processes from these groups, for example verification framework, and the project is expected to provide updates to the relevant TG as work progresses. 

### University Outreach Task Group (under MWG)
The project manager of this OpenHW group is expected to report the overall progress, issues, roadblocks, and changes to the UOTG



## OpenHW engineering staff resource plan: requirement and availability
## Engineering resource supplied by members - requirement and availability

The interns driving the work, under the funding model described above, are identified in the Research Proposal.

## OpenHW marketing resource - requirement and availability
## Marketing resource supplied by members - requirement and availability
## Funding supplied by OpenHW - requirement and availability 
## Funding supplied by members - requirement and availability

Already described above

## Architecture diagram


![Image of Ara architecture]
(https://github.com/DBees/core-v-docs/blob/master/program/images/ARA%20block%20diagram.png)

Screenshot From M. Cavalcante, F. Schuiki, F. Zaruba, M. Schaffner, and L. Benini, “Ara: A 1-GHz+ Scalable and Energy-Efficient RISC-V Vector Processor With Multiprecision Floating-Point Support in 22-nm FD-SOI,” IEEE Trans. Very Large Scale Integr. VLSI Syst., vol. 28, no. 2, pp. 530–543, Feb. 2020, doi: 10.1109/TVLSI.2019.2950087.


## Who would make use of OpenHW output

(i) Academic community 

(ii) OpenHW members may industrialize within OpenHW

(iii) Any industry members may take the results privately and advance further

## Project license model
Expectation
- existing license model for Ara at the moment and going forward under SHL 2.0 - need to verify
- sw work Apache 2.0
- Not expected to be run as Eclipse project, but should be treated under OpenHW/Eclipse IP process
- verify MCCA status of key participants

## Description of initial code contribution, if required
Need reference to the current state of the Ara code and repository

## Repository Structure
An OpenHW GitHub Repository will be used for the Ara coprocessor as it evolves. The point at which, and mechanism for which the Ara code is transferred from ETHZ to OpenHW is not yet defined.

## Project distribution model
Not yet defined

## Preliminary Project plan

Project Manager is tasked with creating a project plan for the PL gate