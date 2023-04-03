Cores TG Meeting
----------------

Date: November 9, 2020

Attendees:

  Davide Schiavonne (OpenHW)
  Duncan Bees (OpenHW)
  Rick O'Connor (OpenHW)
  Mike Thompson (OpenHW)
  Jérôme Quevremont (Thales)
  Arjan Bink (Silicon Labs)
  Steve Richmond (Silicon Labs)
  Sebastian Ahmed (Silicon Labs)
  Paul Zavalney (Silicon Labs)
  Oystein Knauserud (Silicon Labs)
  David McConnell
  John Martin (EM Micro)
  Axiomisse Limited
  Hugh Pollitt-Smith
  Jeremy Bennett

- CV32E40P status

An overview of the github issues in the CV32E40P repos was presented. The 14 open RTL bugs can be split into 8 FPU related bugs and 6 PULP extension related bugs. There are currently no known bugs which will gate RTL freeze.

- Versioning of CORE-V cores

The way of working with respect to versioning of CORE-V cores was discussed. What type of changes are allowed after RTL freeze, when will mimpid be increased, when will marchid be increased, when will a new PPL/PL be required?

- CV32E40P after RTL freeze

John Martin (EM Micro) presented the work to be done on the CV32E40P after RTL freeze. The propsal was to finish the PULP instructions (with new opcodes). Bit manipulation and SIMD instructions might be left out (depending on tool support). Additional debug features were proposed. The continuation project for CV32E40P will go through the PPL/PL process. Davide presented a more generic APU interface that can be used as the FPU interface. This interface can possibly also be used for the CV32E40X.

Some discussion on whether OpenHW should adopt the FPNEW and RISCV-DBG repos from PULP. Both these repos would be useful as they are used in both the CV32E and CVA6 projects. Mike Thompson prefers verification to be done in the context of a specific core (first core to use such a module) as opposed to pure block level verification. 

- CV32E40X

Arjan Bink presented a Silicon Laboratories proposal for the CV32E40X. CV32E40X is a extendable 4-stage CPU with SIMD supporting RV32I[A][P]MC[X]. (M-mode only, PMP, CLINT, OBI). The most notable feature it the addition of a general purpose eXtension interface which is a generic, tightly integrated, low latency interface that can be used to add custom instructions external to the CPU.

- CV32A6 Preliminary Project Launch (PPL)

Jérôme Quevremont gave an update on the CV32A6. PPL was held; moving towards PL (need more participants, especially on verification). Progress inside Thales was discussed.

  
