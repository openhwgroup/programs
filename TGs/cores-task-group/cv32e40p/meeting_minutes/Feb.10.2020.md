Date: February 10, 2020

Attendees:

Mike Thompson : (OpenHW)       : mike@openhwgroup.org

Davide Schiavonne (OpenHW)     : davide@openhwgroup.org

Silicon Labs
Thales
BlueSpec


Meeting about:

1. awarnesess about what the opensource world expects from an maintained IP;
2. how to contribute to the Core-V IP of OHW
3. discussions about tasks assigned to FTEs (coretile, documentation, hwloop parameters and new specs, parameters

## Replying to emails and GitHub issues questions

Needs to be done to help core users (open source needs support), everyone should contribute.  Label issues, provide information, etc.
Example: Ibex https://github.com/lowrisc/ibex/

## Way of contributing to RTL:

Make your own fork on your github account. Make modifications, then make pull requests to the original repository (openHW one)

a. we should have a CI suite that runs Mike’s verification tools to be sure that the tests are still passing. 
This will run automatically on PRs.

b. At least 2 people should have a look at the PR’s code (assigned to PRs). 
This makes easier to understand what is changed and find potential issues the CI may not catch.
This will be made automatic, 2 people accept PRs before merging to master.

CI: https://github.com/openhwgroup/core-v-verif


TODO: add in a .md file CONTRIBUTION guide

## FTEs and Active Contributions:

### Documentation/Specification as a must

While everyone should get familiar with the RTL of the CORE 
(currently Davide Schiavone is the only the expert, we should become a team of experts), 
we need to write Documentation.
Most of the documentation today is the RTL per se, there is no person that knows everything on the core (not even Davide!). 
So, what happens if xyz? the answer is probably in the RTL.
Specifications are not industry level, so we need also to make them that way. 
We can start from the Ibex documentation and then extend it with all of our features.
https://github.com/lowRISC/ibex/tree/master/doc


### Who does what? 

There may be overlapping tasks. We should avoid this to keep productivity high. 
We can discuss it as a team. For instance the core tile. We can discuss this now.
Verification will also test interrupts and debug requests. Is the DUT the Tile or the Core?
Mike: both. we start with the core but we will have a tile level testbench as well.
Tile discussion on going.

## HWloop parametrizable and new spec. 

A draft of new spec is in the current document, 
still we want to extend to support a sort of reaction if those specs are not supported. 

See on mattermost:

```
@agrasset

12:04 PM
Hi all @channel,
My name is Arnaud Grasset (from Thales). I am working on the verification plan of the HWloop extension of the core CV32E40P. This extension comes with a set of rules that the programmer has to follow:
** HWloop begin address must be ALIGNED
** No compressed instructions allowed in the HWLoop body
** [Minimum 3 instructions]
If these rules are not followed, behavior is undefined. And the verification will ignore this scenario (assuming that it cannot happens).
But it is unreasonable to assume that the software will be free of any bugs.
We have discussed of this point with Davide and Mike, and we think that the specification should evolve.
We see two approaches to handle this issue:
Ignore the stimulus (e.g. does not jump back if counter is 0, hardwire the LSBs of some registers to 0s to actually force the alignment)
Invoke an error response (e.g. rise an exception).
We would like to have the feedbacks from the design team as it will impact the design of the core.
```

SiLabs: we should also extend the core with more debug features (as HW breakpoint)
They will provide what is missing to create a task on it.

### Bugs fixing:

There are open issues on GitHub that PULP did not close due to lack of resources(menpower). 
We should do it. In addition, Mike’s team will find documentation, specs, and RTL bugs. 
We should address them quickly to make the verification proceed. This goes into the bug fixing group.

Use GitHub for Milestones, current activities, issues, actions, etc
We will grow using GitHub properly to make things automatic (like 2 people to accept the PRs, etc)

https://github.com/lowrisc/ibex/blob/master/CONTRIBUTING.md
https://github.com/lowRISC/style-guides/blob/master/VerilogCodingStyle.md


### To be discuss next: 

We should also add in the CI suite a synthesis script that checks that RTL changes are synthesizable, no comb. loops are created,
and no strange paths appear. Linting, Code Style (based on Ibex)
















