Date: May 31, 2021

Attendees:

Davide Schiavonne (OpenHW Group)  : davide@openhwgroup.org
Rick O'Connor (OpenHW Group)      : rickoco@openhwgroup.org
Duncan Bees (OpenHW Group)        : duncan@openhwgroup.org
Jean Roch Coulon (Thales)         : jean-roch.coulon@invia.fr
Matteo Perotti (ETH Zurich)       : mperotti@iis.ee.ethz.ch
Mortiz Imfeld (ETH Zurich)        : moimfeld@student.ethz.ch
Gianna Paulin (ETH Zurich)        : pauling@iis.ee.ethz.ch
Omar Al Sherbini (UniBO)          : omar.alsherbini@studio.unibo.it
Arjan Bink (SiLabs)               : arjan.bink@silabs.com


Updates:

1. Jean-Roch on 64bit: Thales will try to implement the interface on CV64A6. At the moment the current spec will be implemented, in 2 or 4 weeks they should have the RTL implementation of the spec to evaluate the Custom Security Spec ISA extensions.
They need to modify the co-processor interface as well to be compliant with the cv-x-if spec. What won’t be easy is to cope with speculative execution on the cva6 pipeline. If needed, probably the cv-x-if spec will be extended.

2. Mortiz on cv32e40p.rv32f: CMEM interface is almost completed. The encoding of the Cmem_q.reg_type is not completed for READ/WRITE/EXECUTE. A proposal will be submitted via PRs.

3. Omar cv32e40p.xpulpnn: modifying the decoder of the cv32e40p core to recognize illegal instructions that belong to the XPULPNN ISA. A script to generate automatic tests starting from the ISA has been made and tested on the cv32e40p. Issues will be open on the cv32e40p github repository to report that some of the PULPNN instructions are not recognized as illegal by the XPULP ISA (too little restrictive decoder). PRs will be submitted to fix the decoder.

