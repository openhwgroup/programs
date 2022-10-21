Cores TG Meeting
----------------

Date: October 2, 2020

Attendees:

  Davide Schiavonne (OpenHW)
  Duncan Bees (OpenHW)
  Rick O'Connor (OpenHW)
  Mike Thompson (OpenHW)
  Jérôme Quevremont (Thales)
  Arjan Bink (Silicon Labs)
  Steve Richmond (Silicon Labs)
  Paul Zavalney (Silicon Labs)
  David McConnell
  John Martin (EM Micro)

- CV32E40P status

An overview of the github issues in the CV32E40P repos was presented. The 16 open RTL bugs can be split into 8 FPU related bugs, 6 PULP extension related bugs and two other ones. RTL freeze is targeted in October for the default parameter configuration of CV32E40P. The intention is to complete the work on the non-default parameter functionality after RTL freeze.

- CV32E40P roadmap

Four decision points related to the CV32E40P roadmap were presented and discussed:

-> Encoding of CV32E40P of instructions that will conflict with RISC-V
-> Verification of PULP extensions
-> RVF Extensions verification, ownership of FPNEW
-> Instruction and Data Bus-Error pins

There was unclarity for some people about what 'RTL freeze' means and how versioning will be done. Not-yet-implemented-but-originally-agreed functionality is intended to be completed in CV32E40P (and this work is unrelated to CV32E40). We can increase the mimpid CSR after for example finishing the PULP_XPULP parameter related fixes. With respect to above 'bus error pin' feature: This would be a new feature and therefore cannot / will not be part of CV32E40P (it is aimed at CV32E40). On the other points no decisions were made other than to start the discussion about them on Mattermost. With respect to the completion of CV32E40P after RTL freeze Rick proposed to go through the PPL gate to see who is interested in participating and John Martin (EM Micro) volunteered to drive that progress.

(The CV32E40 slide was not discussed due to lack of time)

A request was made by Rick O'Connor to have monthly Cores TG meetings.

- CVA6

  Continuous Integration is currently broken (in the move to OpenHW) and requires fixing. Agreement that the documentation flow will be moved to RTD (just like CV32E40P) (Florian will do the initial conversion). Similarly both CV32E40P and CVA6 want to move to FuseSoc (in favor of Bender and other mechanisms).

- CV32A6 Preliminary Project Launch (PPL)

Jérôme went through the CV32A6 Preliminary Project Launch (PPL) material that earlier was presented to the TWG.

  
