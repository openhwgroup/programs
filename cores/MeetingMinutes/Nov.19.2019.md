Date: November 19, 2019

Attendees:

Mike Thompson : (OpenHW)       : mike@openhwgroup.org

Davide Schiavone (OpenHW)     : davide@openhwgroup.org

Steve Richmond (Silicon Labs)  : Steve.Richmond@silabs.com

Paul Zavalney (Silicon Labs)   : Paul.Zavalney@silabs.com

## Forking or moving the IPs?

Forking the core IPs into the OpenHW GitHub account.
The pulp ones would have explicitly declared “UNMAINTAINED” in the README file and a link and a description 
would explain the users where to find the maintained core etc. 
Differently from LowRISC, where zero-riscy has been moved to lbex with re-direction. 
This implies that the zero-riscy page under the pulp-platform does not exist anymore.

Moving the core IPs into the OpenHW GitHub account.
A second chat with the PULP team actually made up few weak points of the forking option: although having an explicit 
description of what happened makes sense to me and let the users understand what is going on, 
it will probably happen that (unaware) users will still pull the core from the pulp platform, 
raise issues, propose pull requests etc. 
We must avoid at all costs duplication and thus, 
we think the safest and cleanest option is to do like we have done with Ibex.

**Participants agree in doing the lowRISC/Ibex way**

Another concern from the PULP team is: is there a person/group of people that will actively work on 
the cores (technically speaking) to solve bugs etc 100%?
It happened to LowRISC, so the PULP team is very concerned of knowing this before proceeding with the GitHub transfer.


Mike: 
Is the PULP team looking for a commitment? Personally, I am completely committed to a complete verification 
of the CV32 and CV64 cores. But who the heck is "Mike Thompson" and what does "complete verification" actually mean?
These are legitement questions and we need to find a way to make the PULP team confident that OpenHW Group 
can and will do what we say we will do.

Davide:
Well, Mike is doing verification :) yes, but one person alone is probably not enough 
(at least that is what I have seen looking at LowRISC). Plus, once Mike finds the bug, who is going to fix it?

Rick O'Connor:
we now have 20+ members in OpenHW Group with FTE commitments (some as many as 3 FTEs) - 
this is where the resources come from. No change here, this has been the model all along.


Davide suggests to set a technical team as soon as possible. 
Mike will report it to Rick this afternoon. Sebastian (SiLabs) is in charge for allocating 
people in this team for SiLabs. We do not know about the others members. 
Rule of thumb estimation of RI5CY complexity is 3x Ibex and Ariane is 4x Ibex.
Ibex needed 3.5FTE working 9 months on codestyle, compliance, verification, bug fixes, 
system integration and documentation. 

**Top priority ACTION: set a technical team as soon as possible to start working on the cores to meet the BHAG2020 deadline.**



## Credits, Authors

The PULP team would require that the list of authors/contributors that work on the cores remains in the 
HEADER files together with the licence. 
In addition, papers written about those cores should appear for citations in the README file (as for Ibex)


Paul suggests to do like Ibex with contributors listed in an .md file.
So far we are not aware of any HEADER from OpenHW. Currently the PULP IPs have the Solderpad (Apache 2 HW version) licence. 

**TODO: Find HEADER from OpenHW and make the contribution file.**

## Marketing name

It is fine to refer to the 2 cores with the name proposed (CV*) and to have the repositories called accordingly but, 
shouldn’t we leverage the “marketing”/”visibility” that the names RI5CY and Ariane gained along these years? 
After all, people know about them with those 2 names. 
Do we agree to have another name next to the technical ones ? (as for instance Android does with its releases). 
If so, how ? just in README?

Paul, Rick and Davide agree on renaming the database of those 2 IPs to CV* but to reference RI5CY and Ariane on README, 
slides, etc, for Marketing reasons.
Credits and Reference should be like in Ibex (with page of contributors and references to papers)

## Other topics:

Adding extra MIE,MPI,MTVEC for extending the fast interrupt pins on the CLINT.

Paul likes the idea of extending the CLINT to have an extra 32bits FAST INTERRUPTS. 
**ACTION:** Let’s discuss it again but the idea looks good as long as we are compatible and verify them. 

**PAUL Question:** having a meeting on Debug SPEC and integration on this IP into the CV* IPs.
DAVIDE ACTION: ask LowRISC if they are using the same debug IP. → LowRISC replied: yes, we use it!






