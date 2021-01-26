# Cores TG: Relocation XPULP instructions into custom space

## Attendees

* Jeremy Bennett, Embecosm
* Davide Schiavone, OpenHW Group
* John Martin, EM Microelectronic
* Mike Thompson, OpenHW Group
* Giuseppe Tagliavini, University of Bologna
* Jessica Mills, Embecosm
* Matteor Perotti, ETH Zürich
* Philipp Krones, Embecosm
* Duncan Bees, OpenHW Group

## Relocating XPULP instructions

See slides from John Martin

Propose moving all instructions into custom-0 through custom-3

* custom-1 split into plan A and plane B, when have lots of instructions, but don't need many bits

* tool chain development today uses current encoding

  * expectation to move to new encoding is part of tool chain project plan
  * flexibility to iterate the encodings because tool chain is still under development.

* HW loop has a custom linker relocation. This may need changing if the field changes in the instruction, but this is not a difficult task.

**ACTION:**

* Core team will start developing RTL from John Martin's proposal
* Core team will iterate to improve and the document
* Then SW team get green light to go ahead

## HW Loop ISA changes

### HW Loop constraints

More constraints on contents of HW Loop. See core-v-docs issue 265.

* minimum size
* no compressed instructions
* no flow control instructions (except nested HW loop)

SW team confirms this is not a problem.

### Redundancy in ISA

Can set up HW loops by CSRs or using start/end/count instructions.

* start/end operations are PC relative, CSRW are not
* start/end operations with register soure are missing. We propose to add them.

Might affect how `interrupt` attribute is implemented.

### Extend maximum PC-relative loop size

Since compressed instructions cannot be used, the branch offset must be a full
word, so we can save a word and do a 2 bit shift in the offset field.

More demanding for SW teams, but not a major issue.

### Change definition of HWLoop end-target

Currently end point is the last instruction. This is a big issue for the
compiler teams making the compiler team's job hard.

Also good for hardware.

**ACTION:** Philipp to raise issue to change documentation.


## AOB

### Merit of nested HW loops

Note that nested HW loops are of less benefit. Much of the win comes from the
inner loop, so reducing to just a single hardware loop is of modest
application.

There are applications of hand-written kernels that use nested loops.