.. _cv32_env:

CV32E40P Simulation Testbench and Environment
=============================================

As stated in the :ref:`pulp-verif` chapter (in the :ref:`exec_summary`),
CV32E40P verification will
follow a two-pronged approach using an updated RI5CY testbench,
hereafter referred to as the core testbench in parallel with the
development of a UVM environment. The UVM environment will be developed
in a step-wise fashion adding ever more capabilities, and will always
maintain the ability to run testcases and regressions.

The UVM environment will be based on the verification environment
developed for the Ibex core, using the Google random-instruction
generator for stimulus creation, the Imperas ISS for results prediction
and will also be able to run hand-coded code-segments (programs) such as
those developed by the RISC-V Compliance Task Group.

The end-goal is to have a single UVM-based verification environment
capable of complete CV32E40P and CV32E40 verification. This environment
will be rolled out in three phases as detailed below.

Core Testbench
--------------

The “core” testbench, shown in , on page , is essentially the RI5CY
testbench with some slight modifications. It is named after the
directory is it located in. This testbench has the ability to run the
directed, self-checking RISC-V Compliance and XPULP test programs
(mostly written in Assembler) used by RISC-V and will be used to update
the RISC-V Compliance and add XPULP Compliance testing for the CV32E40P.
These tests are the foundation of the `Base Instruction
Set <https://github.com/openhwgroup/core-v-docs/tree/master/verif/CV32E40P/VerificationPlan/base_instruction_set>`__
and `XPULP Instruction
Extensions <https://github.com/openhwgroup/core-v-docs/tree/master/verif/CV32E40P/VerificationPlan/xpulp_instruction_extensions>`__
captured in the CV32E40P verification plan.

The testbench has been (or will be) modified in the following ways:

1. Fix several Lint errors (Metrics dsim strictly enforces the IEEE-1800
   type-checking rules).
2. Update parameters as appropriate.
3. Some RTL files were placed in the core director – these have been
   moved out.
4. Support UVM error messages.
5. (TBD) Updates to the end-of-simulation flags in the Virtual
   Peripherals.

The CV32E40\* UVM Verification Environment
------------------------------------------

This sub-section discusses the structure and development of the UVM
verification environment under development for CV32E40\*. This
environment is intended to be able to verify the CV32E40P and CV32E40
devices with only minimal modification to the environment itself.

Phase 1 Environment
~~~~~~~~~~~~~~~~~~~

The goal of the phase 1 environment are to able to execute all of the
compliance tests from the RISC-V Foundation, PULP-Platform and OpenHW
Group, plus a set of manually written C and assembler testcases in a
minimal UVM environment. Essentially, it will have the same
functionality as the core testbench, but will all the overhead of the
UVM.

Recall from the structure of the core testbench. Swapping out the RI5CY
RTL model for the CV32E40P RTL model, and adding SystemVerilog
interfaces yields the testbench components for the phase 1 environment.
Rounding out the environment is a minimal UVM environment and UVM base
test. This is shown in Illustration 4.

.. figure:: ../images/CV32E_VE_phase1.png
   :name: cv32_env_phase1
   :align: center
   :alt: 

   Illustration 4: Phase 1 CV32E40P UVM Environment

The testbench components of the phase 1 environment are the so-called
“DUT wrapper” (module uvmt\_cv32\_dut\_wrap) which is a modification of
the riscv\_wrapper in core testbench, and the “testbench” (module
uvmt\_cv32\_tb) which is a replacement of the tb\_top module from the
core testbench. This structure provides the UVM environment with access
to all of the CV32E40P top-level control and status ports via
SystemVerilog interfaces. Note that for phase 1, most of the control
inputs are static, just as they are in the core testbench. The phase 2
environment will have dedicated UVM agents for each of the interfaces
shown in , allowing testcases to control these interfaces using UVM test
sequences.

The phase 1 environment will also control the function of the riscv-gcc
toolchain directly as part of the UVM run-flow, simplifying the
Makefiles used to control compilation and execution of testcases.

Phase 2 Environment
~~~~~~~~~~~~~~~~~~~

The phase two environment is shown in Illustration 5. Phase 2 introduces the `Google
Random Instruction Generator <https://github.com/google/riscv-dv>`__ and
the `Imperas
ISS <http://www.imperas.com/articles/imperas-empowers-riscv-community-with-riscvovpsim>`__
as a stand-alone components. The most significant capabilities of the
phase 2 environment are:

-  Ability to use SystemVerilog class constraints to automatically
   generate testcases.
-  Results checking is built into the environment, so that testcases do
   not need to determine and check their own pass/fail criteria.
-  Simple UVM Agents for both the Interrupt and Debug interfaces. ToDo:
   show this in the Illustration.
-  Ability to run any/all testcases developed for the Phase 1
   environment.
-  Support either of the CV32E40P or CV32E40 with only minor
   modifications.

.. figure:: ../images/CV32E_VE_phase2.png
   :name: CV32_VE_Phase2
   :align: center
   :alt: 

   Illustration 5: Phase 2 Verification Environment for CV32E

As shown in the Illustration, the environment is not a single entity.
Rather, it is a collection of disjoint components, held together by
script-ware to make it appear as a single environment. When the user
invokes a command to run a testcase, for example, make
xrun-firmware [10]_, a set of scripts and/or Makefile rules are
invoked to compile the environment and test(s), run the simulation(s)
and check results. The illustration shows the most
significant of these:

-  **make gen**: this is an optional step for those tests that run
   stimulus generated by the Google random instruction generator. Tests
   that use manually generated or externally sourced tests will skip
   this test. The generator produces an assembly-language file which is
   used as input to *asm2hex*.
-  **make asm2hex**: this step invokes the SDK (riscv-gcc
   tool-chain) to compile/assemble/link the input program into an ELF
   file. The input program is either from the *make gen* step
   or a previously written assembler program. The ELF is translated
   to a hexfile, in verilog “memh” format, that can be loaded into a
   SystemVerilog memory.
-  **make sv-sim**: this step runs a SystemVerilog simulator that
   compiles the CV32E and its associated testbench. As with the RI5CY
   testbench, the asm2hex generated hexfile is loaded into Instruction
   memory and the core starts to execute the code it finds there.
   Results are written to an *actual* results output file.
-  **make iss-sim**: this step compiles and runs the
   Instruction Set Simulator, using the same ELF
   produced in the *make asm2hex step*. The ISS thereby runs
   the same program as the RTL model of the core and produces an
   *expected* result output file.
-  **make cmp**: here a simple compare script is run that
   matches the actual results produced by the RTL with the expected
   results produced by the ISS. Any mismatch results in a testcase
   failure.

Phase 2 Development Strategy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The disjoint-component nature of the phase two environment simplifies
its development, as almost any component of the environment can be
developed, unit-tested and deployed separately, without a significant
impact on the other components or on the phase one environment. In
addition, the Ibex environment provides a working example for much of
the phase two work.

The first step will be to introduce the random-instruction generator
into the script-ware. This is seen as a relatively simple task as the
generator has been developed as a stand-alone UVM component and has
previously been vetted by OpenHW. Once the generator is integrated,
user’s of the environment will have the ability to run existing or new
testcases for the phase one environment, as well has run generated
programs on the RTL. The programs generated by the Google
random-instruction generator are not self-checking, so tests run with
the generator will not produce a useful pass/fail indication, although
they may be used to measure coverage.

In order to get a self-checking environment, the ISS needs to be
integrated into the flow. This is explicitly supported by the Google
generator, so this is seen as low-risk work. An open issue is to extract
execution trace information both the RTL simulation and ISS simulation
in such a way as to make the comparison script simple. Ideally, the
comparison script would be implemented using ***diff***. This is a
significant ToDo.

Phase 3 Environment
~~~~~~~~~~~~~~~~~~~

ToDo

Phase 3 Development Strategy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ToDo

File Structure and Organization
-------------------------------

ToDo

Naming Convention
~~~~~~~~~~~~~~~~~

Directory and File Structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Compiling the Environment
~~~~~~~~~~~~~~~~~~~~~~~~~


.. [10]
   See the README at
   https://github.com/openhwgroup/core-v-verif/tree/master/cv32/tests/core
   to see what this does. Note that the User Manual for the Verification
   Environment, which explains how to write and run testcases, will be
   maintained there, not in the
   `core-v-docs <https://github.com/openhwgroup/core-v-docs/tree/master/verif>`__\ project
   which is home for this document.

