++ Issues Review - continuation meeting
Meeting on Nov 11, 2020

++ core-v-docs issues

General discussions: 
1) Do docs related issues gate RTL Freeze. Some debate, but current answer is yes. Some noted that processor companies may deal with this by having an alpha and beta RTL Freeze, where the first gate has open documentation issues.
2) Who has permission to apply labels on issues, close and resolve? Answer, committers with write access.

Discussed: 16, 40, 78, 128

Issue 16 - Vplan for Custom Circuitry
Gating for RTL Freeze
Of several custom features in CV32e40p for which documentation was not available, one (Sleep interface) still gates RTL Freeze as a Vplan is not available.

Issue 40 - The table formatting in the Verification Strategy is hard to read. This is a read the docs issue. A solution was identified and the issue is moving to closure.

Issue 78 - Cycle counts for multiply and divide not correct in documentation
Gating for RTL Freeze. However this has been resolved after the meeting

Issue 128- Update Debug Vplan to consider timing of debug_req_i assertion and de-assertion
Gates RTL Freeze. Oystein is adding some lines in the debug Vplan to the describe the timing of this signal.

Not discussed as not related to verified components on CV32E40P - 48, 103, 122

++ core-v-cv32e40p

Issue 550 - Implementations does not raise illegal instruction exceptions on machine-mode access to debug registers
This was transferred to core-v-docs as new issue 259
Take discussion offline for resolution with protagonists

Specific issue by issue discussion not undertaken, as it is believed that all the issues are open because of labelling strategy and not because they are open bugs.
For example, an issue with a label such as PULP_XPULP is implicitly WAIVED

Concern that the CV32E40P issue label method is difficult to understand to repository "visitor"
Actions to deal with this:
1) create a pinned issue with issue labeling and filtering explained
2) document in user manual and in readme a record of issues list at time of the commit for RTL Freeze 
These refer to (Architecture ID (marchid == machine archid in RISC-V specification), Implementation ID (mimpid, also defined by RISC-V CSR))





