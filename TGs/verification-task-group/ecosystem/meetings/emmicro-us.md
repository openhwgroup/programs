July 8, 2020
============

Attendees:
----------
**OpenHW:** Mike Thompson<br>
**em-microelectronics:** Greg Tumush, John Martin, David McConnell<br>

Actions:
--------
**Mike**: Create a spot in the Verification Strategy for Greg's "Step-and-Compare" document.<br>
**Greg**: Integrate the "Step-and-Compare" document as a chapter/section in the Verification Strategy.<br>
**Mike**: send an email to david with pointers to the Virtual Peripheral documentation.

Agenda:
-------
Mike's goal for the meeting was to explore areas for em-micro's continued involvement in CV32E40P.  Proposals include (but not limited to):
1. RTL Debug. This doesn't necessarily need to be a planned activity on the Gannt chart, but its important to ensure that OpenHW recognizes it for the valuable contribution that it is.
2. Vplan reviews.
3. Vplan capture.
4. Xpulp verification.
5. Exceptions. Next to Interrupts, this is Mike's biggest worry.
6. ISS Requirements: we need to provide a definitive list of required to Imperas.

Discussion:
-----------
1. John will continue to support debug.  This would be happening regardless of any other involvement.
2. Greg indicated that Vplan capture and review would be something em-micro could support.  The state of the Xpulp Vplan wrt to the User Manual is unknown
at this point as those Vplans were captured some time ago and the UM has matured considerably since then.  Also, they almost certainly are using a slightly
out of date Vplan template.
3. Greg volunteered to update the Xpulp Vplans.  Mike will add this to the "Sprint #3" list of deliverables with a tenative delivery date of Friday, July 31.
4. David offered to integrate the Xpulp tests developed by em-micro into the CV32E40P environment.
5. Mike is generating a requirements list for the Imperas ISS and Greg/John agreed to review before OpenHW presents it to Imperas.
6. Exception verification is off the table at this time.
