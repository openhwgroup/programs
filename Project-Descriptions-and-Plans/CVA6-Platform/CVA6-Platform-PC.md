# Title of Project - "CVA6-Platform"
# Project Concept Proposal
## Date of proposal - 2023-10-25
## Author(s) 

Jonathan Balkind, UCSB
Jeremy Bennett, Embecosm

Rick O’Connor, OpenHW
Duncan Bees, OpenHW

## High Level Summary
The project aim is to define, implement, and initially deploy cloud-based and desktop-based software development and regression platforms based on the CVA6 processor core. The goal would be to provide clearer certainty of software validation on vendor-neutral, RISC-V ISA/platform/profile (as relevant) compliant hardware. Because the platforms will be FPGA-based, they can evolve as CVA6 enhancements and bug-fixes are made, and as the RISC-V standards evolve.
 
## Market/Driving Requirements at PC Gate

As CVA6 core configurations near readiness for industrial adoption, those basing product architectures on CVA6 will need flexible, up-to-date, performant and cost-efficient software development platforms. CVA6-Platform will help to address this need by defining and initiating deployment of such platforms.  

The RISC-V ecosystem, through initiatives such as RISE (RISC-V Software Ecosystem), is addressing application software requirements and open-source software implementations. These efforts require a vendor neutral platform (particularly RV64). Since OpenHW cores are vendor-independent, completely open-source, and support the initial platform specifications, CVA6 based platforms are a natural candidate for this role. As additional players develop and deploy software on CVA6, this will also further contribute to CVA6 momentum within OpenHW and the industry at large.

## Feature Requirements at PC Gate

The following project feature list is preliminary and will be refined as we move forward through the OpenHW Gate process
RISC-V profiles:
Hardware: 
RV64GC core (initial)
RVV Vector support (future)
Software: 
RVA20U64 (initial)
RVA22U64 (future)
Linux distributions
Fedora (initial)
Debian (initial)
Others (need comment here - CentOS, Ubuntu, …)

CVA6-Platform Hardware Configurations
Octal CVA6 cluster on Amazon F1 (initial)
Dual CVA6 for Genesys2 fpga boards (initial)
Quad CVA6 cluster with CV-VEC (RVV) on Amazon F1 (future) 

### Underlying Architecture for CVA6-Platform

All the CVA6-Platform implementations will share a common underlying architecture. The main elements of this architecture are:

CVA6 Core clusters (2, 4, or 8) in which the cores access local and L2 cache via a CV-MESH (also know as OpenPiton) fabric
The cores access peripherals via a Chipset also connected to the CV-MESH

The following shows the high levels of this architecture

### Potential future enhancements
CVA6 will need the following additional hardware features to support RVA22U64
Zic64b
Zicbom
Zicbop
Zfhmin
Zkt
Svpbmt
Svinval

As Polara moves forward, Vector support will be added as noted above
Project Outputs and Who Would Make Use of Them
Project Outputs

OpenHW’s project outputs would comprise
Open-source code (RTL) published on OpenHW repos that implement the several CVA6-Platform versions
FPGA bit stream instantiations of the platforms for use on the target hardware platforms
User manual descriptions of 1 & 2
Open-source software implementations of the various OS selected for support on CVA6-Platform
Deployment of these platforms 
Cloud-based deployments on AWS F1 instances
Desktop-based deployments Gensys2 FPGA boards


## Users of the Project Outputs

Note that this Project Concept does not say anything about F1 computing resource availability (other than limited platform development and initial testing by OpenHW project members and staff, it is assumed that F1 computing resources will be subject to commercial arrangements in all cases). 

### OpenHW members 

OpenHW Members would use all of the project outputs, for instance 
To build and test application software for CVA6-based products
For CVA6 development testing
To support CVA6-Platform use by External stakeholders. 

### OpenHW Staff

Like OpenHW members, OpenHW Staff would be expected to utilize the project outputs to promote and develop CVA6-Platform and CVA6 itself, for examples in demos, architecture exploration, and software exploration.

### External stakeholders

External stakeholders who are not OpenHW members who would use the project outputs are:
Industry bodies such as RISE or RISC-V International who are developing and testing software on a vendor-neutral RISC-V platform such as CVA6-Platform
Entities who are developing CVA6-based products

## Initial Estimate of Timeline
October 2023
Project Concept proposal 

November 2023
Demo at RISC-V Summit of 2-core implementation of CVA6-Platform supporting Debian and Fedora

December 2023
Project Launch, improving the scope of this project in more detail, establishing which members will be responsible for which pieces, establishing the repos needed, providing more detail on platform variants, and initial timelines associated with each variant

March 2023
Plan Approved, setting out detailed feature specification for each variant and providing a project plan until Project Freeze (i.e. the first releases of each variant)

## Explanation of why OpenHW should do this project
OpenHW is the developer of the most widely known and adopted, fully open source and vendor-neutral RISC-V processor brand (CORE-V) and specifically of the CVA6 family. CVA6 is achieving widespread adoption and has a growing set of related projects (CV-MESH, CVA6-Hypervisor, CVA6-HPDCache, CVA6-dual-issue), etc. OpenHW also has participation from leading software companies supporting CVA6 SDK, compiler tools, and different OS include FreeRTOS. OpenHW takes an ecosystem approach and delivers not just open source cores but also accompanying IP, FPGA implementations, and DevKits.  For all these reasons, OpenHW Group is the natural choice as open-source home to the CVA6-Platform work.

## Industry landscape: description of competing, alternative, or related efforts in the industry
RISE and RISC-V International already described above.
OpenHW Members/Participants committed to participate
UCSB
Embecosm
Ashling
Thales

## Specific roles to be outlined in the Project Launch

### Project Leader(s)

### Technical Project Leader(s)
CV-MESH and fundamental architecture - Jonathan Balkind
Others - TBD
Project Manager, if a PM is designated
TBD
## Next steps/Investigation towards Project Launch 
Determine specific variants
Determine feature list in more detail as suited to PL and begin to consider a project plan that will be reviewed in the PA gate.
Determine scope of software to be developed within OpenHW and how that meshes with external stakeholders’ software efforts
Determine external dependencies
Determine project participants and each one’s role
Determine/establish required repos and IP licenses to be used
Determine promotion/marketing plan to support this project and increase its visibility both within OpenHW and externally
Determine deployment models for F1 instances 

## Target Date for PL
December, 2023


