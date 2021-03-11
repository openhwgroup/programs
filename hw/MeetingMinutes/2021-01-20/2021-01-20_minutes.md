# Hardware TG: January 20, 2021 Meeting Notes

## Attendees:

- Tim Saxe
- Alfredo Herrera
- Rick O’Connor
- Mike Thompson
- Jeremy Bennett
- Davide Schiavone
- Florian Zaruba
- Duncan Bees

## Agenda

1. Status update on core-v-mcu FPGA
2. Status update on core-v-mcu SOC
3. Discussion on new CORE-V MCU proposal


## Discussion:

 1. CORE-V-MCU FPGA/SOC update
- Need more clarity in the README where the pre-generated bitstreams are located; in the README, highlight for users who just want to use a pre-built bitstream of a stable release (as well as an active development release)
- It would be useful to have a CSR in the bitstream that would unambiguously let the user know what version they are running
- Bitstreams/binaries should not be hosted in the repo, but in an artifact repository (Google Drive, Git LFS); Github allows attaching binary files to each release without hosting within the repo (done for Ariane)
- SW developers will want to use a stable build; however, often SW engineers want to start development on FPGA before HW is stable

 2. CORE-V-MCU SOC update
- CV32 is partially integrated into PULPissimo; still working on the interrupts, and need stable runtime
-- Regressions tests on NexysA7 run daily
-- Once that’s done with FPGA, will start to hardening for silicon
- Verification/validation plan
-- We need to have a plan of record how we will verify/validate core-v-mcu
-- What level of verification do we need before we release a bitstream on FPGA, and before we release a piece of silicon?
-- Can be done in FPGA emulation, or in simulation or combination; need to capture our approach and publish that document
-- Draw a box around what is verified and supported; augment over time
-- Activity will be resource constrained
- TWG meeting on Monday: put some planning into a rough time sequence as a stake in the ground

 3. New CORE-V-MCU proposal  
- Starting with a clean state design as opposed to PULPissimo
- Use standardized interfaces
- Best start is to take IPs and peripherals that are verified on their own; all peripherals in the diagram have test benches
- Current uDMA is non-standard and complex to program/use
-- Replacing uDMA in core-v-mcu now will affect SOC schedule
-- Is there a “conventional” mode where uDMA can operate? Beyond this mode is use-at-your-own-risk
-- In the longer term, we want to move away from uDMA, but we need to make a near-term decision
- Blocks to be identified/sourced are standard DMA and high-speed peripherals
-- Simple DMA with double-buffering is what’s used most of the time
-- Camera interface and AXI IP may be difficult to find open source
- Goal of OpenHW is not to build the mcu; we don’t need to have the best MCU, just a demonstrator; however, if something is not working, users may not distinguish between the mcu and the core and this might impact OpenHW’s reputation
-- Schedule implications need to be understood:
-- Long-term, move away from uDMA
-- Need short-term decision for the current SOC
