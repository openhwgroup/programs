# Cores TG Meeting, April 12, 2021

## Attendees

* Davide Schiavonne (OpenHW)
* Rick O'Connor (OpenHW)
* Mike Thompson (OpenHW)
* Duncan Bees (OpenHW)
* Jérôme Quevremont (Thales)
* Arjan Bink (Silicon Labs)
* Steve Richmond (Silicon Labs)
* Oystein Knauserud (Silicon Labs)
* Trefor Southwell (Imagination Technologies)
* Michael Wong
* Greg Tumbush (EM Microelectronic)
* John Martin (EM Microelectronic)
* Simon Davidmann (Imperas)

## CV32E40P update

Davide presented the status on RVFI, LEC, and X interface.
RVFI work has been blocked for weeks due to lacking Imperas licenses, but otherwise progressing nicely.
The LEC script for CV32E40P is being reviewed (PR #633).
X interface was briefly introduced and people were encourage to join weekly calls about its definition. Agreed
to replace the APU interface in CV32E40P by the X interface (technically speaking this is against the rules
with respect to changes after RTL freeze).

## CV32E40X update

Øystein Knauserud presented the status of the CV32E40X (mostly RTL clean up as well as area and performance improvements). There was some discussion about Verilator support for CV32E40X. Anybody is welcome to ensure that,
but it is not part of the project definition of the CV32E40X and will therefore not actively be worked on.

## CVA6 update

Jérôme Quevremont gave a status update on the CVA6 project and pointed out the related meetings and MatterMost channel.

## Gates and TRLs

Jérôme Quevremont gave an update on the new project gate names and introduced the TRL scale.
