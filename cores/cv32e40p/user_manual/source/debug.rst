.. _debug-support:

Debug
=====

CV32E40P offers support for execution-based debug according to the `RISC-V Debug Specification <https://riscv.org/specifications/debug-specification/>`_, version 0.13.2. The main requirements for the core are described in Chapter 4: RISC-V Debug, Chapter 5: Trigger Module, and Appendix A.2: Execution Based.

The following list shows the simplified overview of events that occur in the core when debug is requested:

 #. Enters Debug Mode
 #. Saves the PC to DPC
 #. Updates the cause in the DCSR
 #. Points the PC to the location determined by the input port dm_haltaddr_i
 #. Begins executing debug control code.


Debug Mode can be entered by one of the following conditions:

 - External debug event using the debug_req_i signal
 - Trigger Module match event
 - ebreak instruction when dcsr.ebreakm == 1

A user wishing to perform an abstract access, whereby the user can observe or control a core’s GPR or CSR register from the hart, is done by invoking debug control code to move values to and from internal registers to an externally addressable Debug Module (DM). Using this execution-based debug allows for the reduction of the overall number of debug interface signals.

.. note::

   Debug support in CV32E40P is only one of the components needed to build a System on Chip design with run-control debug support (think "the ability to attach GDB to a core over JTAG").
   Additionally, a Debug Module and a Debug Transport Module, compliant with the RISC-V Debug Specification, are needed.

   A supported open source implementation of these building blocks can be found in the `RISC-V Debug Support for PULP Cores IP block <https://github.com/pulp-platform/riscv-dbg/>`_.


The CV3240P also supports a Trigger Module to enable entry into debug mode on a trigger event with the following features:

 - Number of trigger register(s) : 1
 - Supported trigger types: instruction address match (Match Control)


Interface
---------

+-------------------------------+-----------+--------------------------------------------+
| Signal                        | Direction | Description                                |
+===============================+===========+============================================+
| ``debug_req_i``               | input     | Request to enter Debug Mode                |
+-------------------------------+-----------+--------------------------------------------+
| ``dm_halt_addr_i[31:0]``      | input     | Address for debugger entry                 |
+-------------------------------+-----------+--------------------------------------------+
| ``dm_exception_addr_i[31:0]`` | input     | Address for debugger exception entry       |
+-------------------------------+-----------+--------------------------------------------+

``debug_req_i`` is the "debug interrupt", issued by the debug module when the core should enter Debug Mode.

``dm_halt_addr_i`` is the address where the PC jumps to for a debug entry event. When in Debug Mode, an ebreak instruction will also cause the PC to jump back to this address without affecting status registers. This must be word aligned

``dm_exception_addr_i`` is the address where the PC jumps to when an exception occurs during Debug Mode. When in Debug Mode, an mret or uret instruction will also cause the PC to jump back to this address without affecting status registers. This address must be word aligned. A typical usage may be to tie this addess to be the same address as the dm_halt_addr_i.



Core Debug Registers
--------------------

CV32E40P implements four core debug registers, namely :ref:`csr-dcsr`, :ref:`csr-dpc`, and two debug scratch registers. Access to these registers in non debug_mode results in an illegal instruction.

Several trigger registers are required to adhere to specification. The following are the most relevant:
:ref:`csr-tselect`, :ref:`csr-tdata1`, :ref:`csr-tdata2` and :ref:`csr-tinfo`

The csr-tdata1.dmode is hardwired to a value of 1 which limits access to the trigger registers when the processor is in Debug Mode only. If software tries to access any of the trigger registers without the core being in Debug Mode, an illegal instruction exception is triggered.
