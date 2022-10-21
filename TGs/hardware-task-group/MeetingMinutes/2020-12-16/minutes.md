# OpenHW Group HW TG Call - December 16, 2020

## Attendees: 
- Hugh Pollitt-Smith
- Alfredo Herrera
- Davide Schiavone
- Duncan Bees
- Florian Zaruba
- Jeremy Bennett
- Michael Wong
- Mike Thompson
- Olive Zhao
- Rick O’Connor

## Discussion:

- CORE-V-MCU FPGA
    - Not much test infrastructure from core-v-verif can be reused for verifying the CORE-V-MCU platform
    - We can make use of tool chain regression tests from SW TG
    - Alfredo volunteered to help with the SOC test plan
    - Continuous Integration: we want to automate building the bitstreams and make them more prominent
        - Have a task running on a build machine that will run nightly regression or after every push to master; will need to launch an instance of Vivado
        - There will be a stable release and then 
        - Need to identify a server and also a Vivado license for the Genesys2 build (NexusA7 build can use the free Vivado Webpack version)
        - CMC is CAD supplier for OpenHW Group and can leverage same servers for CI, but need to resolve Vivado licensing
        - Florian can drive this effort
        - In additional to bitstreams, include a video on how to setup the FPGA board
- CORE-V-MCU SOC
    - For consistency/clarity, avoid using Arnold2 to reference the CORE-V-MCU SOC platform
- Future versions of the CORE-V-MCU
    - IP should be maintained by OpenHW Group, as opposed to Pulpissimo which is maintained by ETH Zurich
    - Pulpissimo is research-focussed and complicated (e.g., MicroDMA); define a stripped-down architecture that is a demonstrator for the CORE-V cores
    - Use Pulpissimo for current CORE-V-MCU SOC, but plan to use simpler architecture in future iterations
    - Florian is working on a minimal specification and will run by Quicklogic
    - Also need to move away from PULP runtime; again something leaner and more focussed on CORE-V-MCU use cases
        - FreeRTOS or CMSIS with monitor interface
        - Don’t want to invent an propriety in-house RTOS
        - Needs to go through the project process and needs resources
- First priority is to develop and get agreement on the CORE-V-MCU specification
    - Document published with OpenHW logo
    - Florian will write the draft and share with Hugh and Tim; Alfredo has volunteered to review; goal to publish in HW TG in early January
    - Once the specification is agreed upon, we can develop a roadmap, define incremental deliverables over time
    - Will need to do for CORE-V-APU as well in future

