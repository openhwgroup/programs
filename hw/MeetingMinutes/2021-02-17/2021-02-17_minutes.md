# HW TG Meeting: February 17, 2021

## Attendees:
- Hugh Pollitt-Smith
- Alfredo Herrera
- Ashish Darbari
- Davide Schiavone
- Duncan Bees
- Florian Zaruba
- Jeremy Bennett
- Michael Wong
- Mike Thompson
- Olive Zhao
- Rick O’Connor
- Simon Davidmann
- Tim Saxe

## Agenda:
- Update on CORE-V-MCU Verilator
- Update on CORE-V-MCU SOC/FPGA

## Verilator project update:

- PPL plan is available in the [core-v-docs repo](https://github.com/openhwgroup/core-v-docs/blob/master/program/verilator-modeling-ppl.md); Alfredo will present PPL for formal approval at the TWG (Feb. 22)
- Has there been any discussion around Renode from Antmicro?
    - Quicklogic has been working with Antmicro to bring up Renode on CORE-V-MCU; this is working on the original CORE-V-MCU and will need to be done for the new version; if Antmicro is doing this already, does it need to be managed in OpenHW?
    - SW TG would like multiple models (Verilator, OVPSim, Renode) to meet the needs of different types of SW teams (those who want to run applications, those who want to develop compilers, etc.)
    - There is a scarcity of resources for all activities; if we want to introduce Renode, someone will need to own/drive the project; further discussion is planned for the March SW TG meeting; Jeremy will approach Michael from Antmicro to present
        - Antmicro is currently not a member of OpenHW Group, discussions are underway
    - Verilator/cycle-accurate models are important for toolchain development; requirements from SW TG perspective are already captured in the PPL (run as standalone model and as a gdb server)
    - Renode supports Verilator as well
- It was noted to be sure to use the same manifest for Verilator as for the FPGA build

## CORE-V-MCU project update:
- Tim presented detailed task list for the project
- Tim, Duncan, Hugh to meet to update project plan and timelines
    - Decide whether we manage as an Eclipse project; current platform based on PULPissimo uses IP from 30 different repos maintained in PULP Platform; some components (core-v-mcu, pulp_soc) will be forked and maintained in OpenHW repos
- We should resolve naming of the platform (CORE-V-MCU, CORE-V-MCU2, Arnold2 are all floating around)
    - It was noted there will be other CORE-V-MCU platforms (e.g., including security core) and multiple tape-outs
- The current FPGA emulation needs to be updated with the interrupt scheme and timer to enable FreeRTOS
- For platform modeling, the tool needs to know what components are in the system, how they are connected, address map
- The uDMA component is not conventional, but the software will need to work with it
- There will be a separate site for bitstreams (daily builds) to avoid hosting them in Github
- It was noted that the NexysA7-100T board is obsolete (or soon will be) in favour of NexysA7-200T
