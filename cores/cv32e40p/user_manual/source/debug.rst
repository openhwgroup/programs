.. _debug-support:

Debug & Trigger
===============

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
 - ebreak instruction when not in Debug Mode and when DCSR.EBREAKM == 1 (see :ref:`ebreak_behavior` below)

A user wishing to perform an abstract access, whereby the user can observe or control a core’s GPR or CSR register from the hart, is done by invoking debug control code to move values to and from internal registers to an externally addressable Debug Module (DM). Using this execution-based debug allows for the reduction of the overall number of debug interface signals.

.. note::

   Debug support in CV32E40P is only one of the components needed to build a System on Chip design with run-control debug support (think "the ability to attach GDB to a core over JTAG").
   Additionally, a Debug Module and a Debug Transport Module, compliant with the RISC-V Debug Specification, are needed.

   A supported open source implementation of these building blocks can be found in the `RISC-V Debug Support for PULP Cores IP block <https://github.com/pulp-platform/riscv-dbg/>`_.


The CV3240P also supports a Trigger Module to enable entry into Debug Mode on a trigger event with the following features:

 - Number of trigger register(s) : 1
 - Supported trigger types: instruction address match (Match Control)

The CV32E40P will not support the optional debug features 10, 11, & 12 listed in Section 4.1 of the `RISC-V Debug Specification <https://riscv.org/specifications/debug-specification/>`_. Specifically, a control transfer instruction's destination location being in or out of the Program Buffer and instructions depending on PC value shall **not** cause an illegal instruction.

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

``debug_req_i`` is the "debug interrupt", issued by the debug module when the core should enter Debug Mode. The ``debug_req_i`` is synchronous to ``clk_i`` and requires a minimum assertion of one clock period to enter Debug Mode. The instruction being decoded during the same cycle that ``debug_req_i`` is first asserted shall not be executed before entering Debug Mode.

``dm_halt_addr_i`` is the address where the PC jumps to for a debug entry event. When in Debug Mode, an ebreak instruction will also cause the PC to jump back to this address without affecting status registers. (see :ref:`ebreak_behavior` below)

``dm_exception_addr_i`` is the address where the PC jumps to when an exception occurs during Debug Mode. When in Debug Mode, the mret or uret instruction will also cause the PC to jump back to this address without affecting status registers.

Both ``dm_halt_addr_i`` and ``dm_exception_addr_i`` must be word aligned.



Core Debug Registers
--------------------

CV32E40P implements four core debug registers, namely :ref:`csr-dcsr`, :ref:`csr-dpc`, and two debug scratch registers. Access to these registers in non Debug Mode results in an illegal instruction.

Several trigger registers are required to adhere to specification. The following are the most relevant: :ref:`csr-tselect`, :ref:`csr-tdata1`,  :ref:`csr-tdata2` and :ref:`csr-tinfo`

The TDATA1.DMODE is hardwired to a value of 1 which limits access to the trigger registers when the processor is in Debug Mode only. Access to the trigger registers outside of Debug Mode results in an illegal instruction exception.

.. _ebreak_behavior:

EBREAK Behavior
--------------------

The EBREAK instruction description is distributed across several RISC-V specifications:  `RISC-V Debug Specification <https://riscv.org/specifications/debug-specification/>`_, `RISC-V Priveleged Specification <https://riscv.org/specifications/privileged-isa/>`_, `RISC-V ISA <https://riscv.org/specifications/isa-spec-pdf/>`_. The following is a summary of the behavior for three common scenarios.



Scenario 1 : Enter Exception
""""""""""""""""""""""""""""

Executing the EBREAK instruction when the core is **not** in Debug Mode and the DCSR.EBREAKM == 0 shall result in the following actions:

 - The core enters the exception handler routine located at MTVEC (Debug Mode is not entered)
 - MEPC & MCAUSE are updated

To properly return from the exception, the ebreak handler will need to increment the MEPC to the next instruction. This requires querying the size of the ebreak instruction that was used to enter the exception (16 bit c.ebreak or 32 bit ebreak). 

*Note: The CV32E40P does not support MTVAL CSR register which would have saved the value of the instruction for exceptions. This may be supported on a future core.*

Scenario 2 : Enter Debug Mode
"""""""""""""""""""""""""""""

Executing the EBREAK instruction when the core is **not** in Debug Mode and the DCSR.EBREAKM == 1 shall result in the following actions:

- The core enters Debug Mode and starts executing debug code located at ``dm_halt_addr_i`` (exception routine not called)
- DPC & DCSR are updated

Similar to the exception scenario above, the debugger will need to increment the DPC to the next instruction before returning from Debug Mode.

*Note: The default value of DCSR.EBREAKM is 0 and the DCSR is only accessible in Debug Mode. To enter Debug Mode from EBREAK, the user will first need to enter Debug Mode through some other means, such as from the external ``debug_req_i``, and set DCSR.EBREAKM.*

Scenario 3 : Exit Program Buffer & Restart Debug Code
"""""""""""""""""""""""""""""""""""""""""""""""""""""

Execuitng the EBREAK instruction when the core is in Debug Mode shall result in the following actions:

- The core remains in Debug Mode and execution jumps back to the beginning of the debug code located at ``dm_halt_addr_i``
- none of the CSRs are modified

