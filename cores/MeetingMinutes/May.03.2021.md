# Cores TG Meeting, May 3, 2021

## Attendees

* Davide Schiavonne (OpenHW)
* Rick O'Connor (OpenHW)
* Mike Thompson (OpenHW)
* Duncan Bees (OpenHW)
* Jérôme Quevremont (Thales)
* Arjan Bink (Silicon Labs)
* Steve Richmond (Silicon Labs)
* Oystein Knauserud (Silicon Labs)
* Oivind Ekelund (Silicon Labs)
* Michael Wong
* Peter Militello (Intrinsix)
* Lee Hoff (Intrinsix)
* Pranay

## CV32E40P update

Davide presented updates on the CV32E40P. Work is ongoing on adding a CV-X-IF interface for adding an FPU external to the CV32E40P. Verible Formatter was used to achieve a consistent style on the RTL. Papers related to Ibex vs. CV32E40P benchmarking was introduced as well as paper on low cost FPU.

## CV32E40X update

Øystein Knauserud presented the status of the CV32E40X. Work continued on adding PMU and bus errors. The RVFI addition is well underway. Global modules have been moved to the core's top level scope. Work has started on the new (simplified) controller (very early stage; 'Hello World' passing).

## CVA6 update

Jérôme Quevremont gave an update on the CVA6 with focus on the schedule of upcoming project meetings and 
status of the specification and related schedule for TWG approval.

## CV32E20

Peter Militello (Intrinsix) gave a presentation made by Intrinsix together with NXP. Goal was to assess interest in a CV32E20 project. NXP would contribute architectural resources and Intrinsix would contribute verification resources. Compared to a CV32E20 proposal presented by Silicon Labs in January the new proposal is lacking Zce and CLIC (both of which were critical components in the earlier proposal), and is including 'a minimal user mode implementation'. 
