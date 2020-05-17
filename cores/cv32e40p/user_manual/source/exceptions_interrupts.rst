Exceptions and Interrupts
=========================

CV32E40P implements trap handling for interrupts and exceptions according to the RISC-V Privileged Specification, version 1.11 with custom extentions to support 64 interrupts.

When entering an interrupt/exception handler, the core sets the ``mepc`` CSR to the current program counter
and saves ``mstatus``.MIE to ``mstatus``.MPIE.

All exceptions cause the core to jump to the base address of the vector table in the ``mtvec`` CSR.

Interrupts are handled in vectored mode, i.e., the core jumps to the base address plus four times the interrupt ID.

The base address is held in the ``mtvec`` CSR for the first CLINT 32 interrupts.
Each interrupt request is masked by the ``mie`` CSR exepct for the ``non maskable (nm) interrupt``.

The base address is held in the ``mtvecx`` CSR for the last ``CLINTx`` 32 interrupts.
Each interrupt request is masked by the ``miex`` CSR.

Upon executing an MRET instruction, the core jumps to the program counter previously saved in the ``mepc`` CSR and restores ``mstatus``.MPIE to ``mstatus``.MIE.


Multiple interrupts requests are handled by priorities.
When an interrupt is taken, the core gives an acknowledge signal to the event/interrupt
controller as well as the interrupt id taken (from 0 to 63).


Interrupts
-------------------

CV32E40P supports the following interrupts sorted by priority (``irq_nm_i`` has the highest priority).

+-------------------------+-------+--------------+--------------------------------------------------+
| Interrupt Input Signal  | ID    | Base Address | Description                                      |
+=========================+=======+==============+==================================================+
| ``irq_nm_i``            | 31    | mtvec        | Non-maskable interrupt (NMI)                     |
+-------------------------+-------+--------------+--------------------------------------------------+
| ``irq_fastx_i[31:0]``   | 63:32 | mtvecx       | 32 fast, local interrupts                        |
+-------------------------+-------+--------------+--------------------------------------------------+
| ``irq_fast_i[14:0]``    | 30:16 | mtvec        | 15 fast, local interrupts                        |
+-------------------------+-------+--------------+--------------------------------------------------+
| ``irq_external_i``      | 11    | mtvec        | Connected to platform-level interrupt controller |
+-------------------------+-------+--------------+--------------------------------------------------+
| ``irq_software_i``      | 3     | mtvec        | Connected to memory-mapped (inter-processor)     |
|                         |       |              | interrupt register                               |
+-------------------------+-------+--------------+--------------------------------------------------+
| ``irq_timer_i``         | 7     | mtvec        | Connected to timer module                        |
+-------------------------+-------+--------------+--------------------------------------------------+

After reset, all interrupts are disabled.
To enable interrupts, both the global interrupt enable (MIE) bit in the ``mstatus`` CSR and the corresponding individual interrupt enable bit in the ``mie`` CSR need to be set.

The NMI is enabled independent of the values in the ``mstatus`` and ``mie`` CSRs, and it is not visible through the ``mip`` CSR.
It has interrupt ID 31, i.e., it has the highest priority of all interrupts and the core jumps to the trap-handler base address (in ``mtvec``) plus 0x7C to handle the NMI.
When handling the NMI, all interrupts including the NMI are ignored.
Nested NMIs are not supported.

All interrupt lines are level-sensitive.
It is assumed that the interrupt handler signals completion of the handling routine to the interrupt source, e.g., through a memory-mapped register, which then deasserts the corresponding interrupt line.

In Debug Mode, all interrupts including the NMI are ignored independent of ``mstatus``.MIE and the content of the ``mie`` CSR.


Exceptions
----------

CV32E40P can trigger an exception due to the following exception causes:

+----------------+---------------------------------------------------------------+
| Exception Code | Description                                                   |
+----------------+---------------------------------------------------------------+
|              2 | Illegal instruction                                           |
+----------------+---------------------------------------------------------------+
|              3 | Breakpoint                                                    |
+----------------+---------------------------------------------------------------+
|             11 | Environment call from M-Mode (ECALL)                          |
+----------------+---------------------------------------------------------------+

All the exceptions are always active.



Nested Interrupt/Exception Handling
-----------------------------------

CV32E40P supports SW-assisted nested interrupt/exception handling.
Exceptions inside interrupt/exception handlers cause another exception,
thus exceptions during the critical part of your exception handlers,
i.e. before having saved the MEPC and MESTATUS registers, will cause
those register to be overwritten.

Interrupts during interrupt/exception handlers are disabled by default,
but can be explicitly enabled if desired.

Upon executing an mret instruction, the core jumps to the program
counter saved in the CSR register MEPC and restores the MPIE value of
the register MSTATUS to IE. When entering an interrupt/exception
handler, the core sets MEPC to the current program counter and saves the
current value of MIE in MPIE of the MSTATUS register.