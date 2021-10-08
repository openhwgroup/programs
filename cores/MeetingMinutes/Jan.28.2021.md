# Cores TG Meeting, January 28, 2021

## Attendees

* Davide Schiavonne (OpenHW)
* Rick O'Connor (OpenHW)
* Mike Thompson (OpenHW)
* Florian Zaruba (OpenHW)
* Jérôme Quevremont (Thales)
* Arjan Bink (Silicon Labs)
* Steve Richmond (Silicon Labs)
* Paul Zavalney (Silicon Labs)
* Sebastian Ahmed (Silicon Labs)
* John Martin (EM Micro)
* Stamatis
* Michael Wong
* Jeremy Bennett (Embecosm)
* Jessica Mils (Embecosm)
* Joe Circello (NXP)


## CV32E40P

RTL freeze has been achieved for the default parameter configuration of CV32E40P. Thanks you to everybody who contributed. Next step is to complete and verify the XPULP instructions. TBD whether RISC-V debug mdule will be adaopted by OpenHW.

## CV32E40S/CV32E40X/CV32E20

Arjan Bink presented the Silicon Labs view of Core priorities and related Silicon Labs view on the Core-V roadmap:

* CV32E40S

  * 4-stage RISC-V core aimed at security
  * Key features: ePMP, Machine + User mode, anti-tampering features

* CV32E40X

  * 4-stage RISC-V core aimed at compute intensive applications
  * Key features: P, B, F, general purpose accelerator interface

* CV32E20

  * 2-stage RISC-V core aimed at control applications
  * Key features: Low cost, low interrupt latency, Zce

Work is already ongoing within Silicon Labs and Silicon Labs aims to donate / convert their work into OpenHW projects a.s.a.p. Contributors are welcome in all areas (tools, verification, RTL, documentation, etc.)

## CVA6

Jérôme Quevremont repeated the presentation of the CVA6 Project Launch (PL) material. The PL gate had already been approved in the earlier TWG.
