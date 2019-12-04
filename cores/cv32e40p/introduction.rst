.. _cv32e40p-introduction:

Introduction
============

.. figure:: images/blockdiagram.svg
   :name: blockdiagram

   Block Diagram

CV32E40P is a 4-stage in-order 32b RISC-V processor core implementing the RV32IMCXpulp ISA.
It has been designed to be energy-efficient while operating in near-threshold in a cluster of multicores.
:numref:`blockdiagram` shows a block diagram of the core.

Standards Compliance
--------------------

CV32E40P is a standards-compliant 32b RISC-V processor.
It follows these specifications:

* `RISC-V Instruction Set Manual, Volume I: User-Level ISA, document version 20190608-Base-Ratified (June 8, 2019) <https://github.com/riscv/riscv-isa-manual/releases/download/Ratified-IMFDQC-and-Priv-v1.11/riscv-spec-20190608.pdf>`_
* `RISC-V Instruction Set Manual, Volume II: Privileged Architecture, document version 20190608-Base-Ratified (June 8, 2019) <https://github.com/riscv/riscv-isa-manual/releases/download/Ratified-IMFDQC-and-Priv-v1.11/riscv-privileged-20190608.pdf>`_.
  It implements the Machine ISA version 1.11.
* `RISC-V External Debug Support, version 0.13.2 <https://content.riscv.org/wp-content/uploads/2019/03/riscv-debug-release.pdf>`_

PULP Specific User Manual
-------------------------

This document acts as a datasheet and as the Xpulp Instruction Set Extensions specifications.
* `PULP Document, <https://github.com/pulp-platform/riscv/blob/master/doc/user_manual.doc>`_


History
-------

CV32E40P development started in 2015 under the name "RI5CY" as part of the `PULP platformI <https://pulp-platform.org>`_ for energy-efficient computing.
It has been extended with custom extensions to minimize the energy consumption while running data analytics applications in the context of internet-of-things on-the-edge computing devices `[1] <https://doi.org/10.1109/TVLSI.2017.2654506>`_.

References
----------

1. `M. Gautschi et al., "Near-Threshold RISC-V Core With DSP Extensions for Scalable IoT Endpoint Devices," in IEEE Transactions on Very Large Scale Integration (VLSI) Systems, vol. 25, no. 10, pp. 2700-2713, Oct. 2017. <https://doi.org/10.1109/TVLSI.2017.2654506>`_
