Cores TG Meeting
----------------

Date: July 23, 2020

Attendees:

  Davide Schiavonne (OpenHW)
  Mike Thompson (OpenHW)
  Florian Zaruba (OpenHW)
  Jérôme Quevremont (Thales)
  Sebastien Jacq (Thales)
  Emeric Poulin (Thales)
  Massimiliano 
  Arjan Bink (Silicon Labs)
  Sebastian RAhmed (Silicon Labs)
  Paul Zavalney (Silicon Labs)

- CV32E40P status

  An overview of the github issues in the cv32e40p repos was presented. Open issues are now labeled and filters can be applied to determine the status of the RTL. Currently there are 57 open issues of which 9 have already been resolved. Of the other 48 issues 16 represent RTL bugs. The bug label is conservatively applied; i.e. reality the reported issue might not represent an actual bug. The 16 RTL bugs can be split into 8 FPU related bugs, 7 PULP extension related bugs and one other (fence.i) bug.

  A call for participation was made, specifically asking for contributors who can fix the 8 FPU related bugs or the 7 PULP extension related bugs (and as said above, after further study these might not be actual bugs, e.g. because the FPU architecture has been changed after the filing of the FPU related bugs).

  No volunteers emerged. The call will be made in the OpenHW Mattermost Cores TG channel as well. 

  Please volunteer to help addressing these bugs. If no volunteers appear within 2 weeks, then either people will get volunteered (which is not preferred at all and therefore quite unlikely to happen) or the topic will be transferred to the TWG with the likely recommendation to completely drop support (and related RTL parameters) on CV32E40P for features that have no member willing to support them.

- CV32E40P Verification Plan reviews

  On behalf of Mike a call for participation was done for people to review (some of) the verification plans. Deadline for revire is July 31. Several verification plans do not have any reviewer assigned yet.

- CV32E20

  Initial ideas were presented with resepct to a low cost RISC-V core, similar to PULP's original [zero|micro]riscy. The presented idea is take a for kof Ibex and to simplify the design (aiming at low cost). Dropped features would e.g. be branch prediction, NMI, caches. Added feature would be CLIC. The security features were proposed to be dropped, but are on the TBD list again after remarks from Thales. Except for the 'E' extension the proposed CV32E20 can be thought of as a cheaper implementation of CV32E40 with fewer options/extensions. This core is not on the roadmap yet; it will have to be proposed to the TWG first.

- CVA6 parameters

   Florian Zaruba gave a detailed overview of the CVA6's current parameters / configuration options. The possible state space of parameter configurations is huge and it was discussed to possibly restrict the allowed combinations of parameter settings (to reduce the verification scope). CLIC is not currently an option, but it could be an interesting option for this core as well. The 'B' extension and Hypervision mode are not supported yet, but are being considered as well.

- Critical task for CVA6

  Continuous Integration is currently broken (in the move to OpenHW) and requires fixing. Agreement that the documentation flow will be moved to RTD (just like CV32E40P) (Florian will do the initial conversion). Similarly both CV32E40P and CVA6 want to move to FuseSoc (in favor of Bender and other mechanisms).

- CV32A6

  Discussion on the CV32A6 status and the project flow as proposed in this week's TWG meeting.
