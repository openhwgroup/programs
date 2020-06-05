.. _exceptions-interrupts:

Exceptions and Interrupts
=========================

CV32E40P implements trap handling for interrupts and exceptions according to the RISC-V Privileged Specification, version 1.11.
The ``irq_fast_i[47:0]`` interrupts and the ``mie1`` and ``mip1`` CSRs are custom extensions.

When entering an interrupt/exception handler, the core sets the ``mepc`` CSR to the current program counter and saves ``mstatus``.MIE to ``mstatus``.MPIE.
All exceptions cause the core to jump to the base address of the vector table in the ``mtvec`` CSR.
Interrupts are handled in either direct mode or vectored mode depending on the value of ``mtvec``.MODE. In direct mode the core
jumps to the base address of the vector table in the ``mtvec`` CSR. In vectored mode the core jumps to the base address
plus four times the interrupt ID. Upon executing an MRET instruction, the core jumps to the program counter previously saved in the
``mepc`` CSR and restores ``mstatus``.MPIE to ``mstatus``.MIE. 

The base address of the vector table must be aligned to 256 bytes (i.e., its least significant byte must be 0x00) and can be programmed
by writing to the ``mtvec`` CSR. For more information, see the :ref:`cs-registers` documentation.

The core starts fetching at the address defined by ``boot_addr_i``. It is assumed that the boot address is supplied via a register
to avoid long paths to the instruction fetch unit.

Interrupt Interface
-------------------

The following table describes the interrupt interface.

.. tabularcolumns:: |p{4cm}|l|p{9cm}|

+-------------------------+-----------+--------------------------------------------------+
| Signal                  | Direction | Description                                      |
+=========================+===========+==================================================+
| ``irq_fast_i[47:0]``    | input     | 48 fast, local interrupts                        |
+-------------------------+-----------+--------------------------------------------------+
| ``irq_external_i``      | input     | External interrupt. Connect to platform-level    |
|                         |           | interrupt controller                             |
+-------------------------+-----------+--------------------------------------------------+
| ``irq_timer_i``         | input     | Timer interrupt. Connected to timer module       |
+-------------------------+-----------+--------------------------------------------------+
| ``irq_software_i``      | input     | Software interrupt. Connect to memory-mapped     |
|                         |           | (inter-processor) interrupt register             |
+-------------------------+-----------+--------------------------------------------------+
| ``irq_ack_o``           | output    | Interrupt acknowledge.  Set to 1 for one cycle   |
|                         |           | when the interrupt with ID ``irq_id_o[5:0]`` is  |
|                         |           | taken                                            |
+-------------------------+-----------+--------------------------------------------------+
| ``irq_id_o[5:0]``       | output    | Interrupt ID for taken interrupt. Only valid     |
|                         |           | when ``irq_ack_o`` = 1                           |
+-------------------------+-----------+--------------------------------------------------+

Interrupts
----------

The following table describes the interrupt IDs.

+-------------------------+-------+
| Interrupt Input Signal  | ID    |
+=========================+=======+
| ``irq_fast_i[47:0]``    | 63:16 |
+-------------------------+-------+
| ``irq_external_i``      | 11    |
+-------------------------+-------+
| ``irq_timer_i``         | 7     |
+-------------------------+-------+
| ``irq_software_i``      | 3     |
|                         |       |
+-------------------------+-------+

The ``irq_software_i``, ``irq_timer_i``, ``irq_external_i`` as well as the ``irq_fast_i[15:0]`` interrupts are controlled via the ``mstatus``, ``mie`` and ``mip`` CSRs.
The ``irq_fast_i[47:16]`` interrupts are controlled via the ``mstatus``, ``mie1`` and ``mip1`` CSRs.
After reset, all interrupts are disabled.
To enable interrupts, both the global interrupt enable (MIE) bit in the ``mstatus`` CSR and the corresponding individual interrupt enable bit in the ``mie`` or ``mie1`` CSR need to be set.
For more information, see the :ref:`cs-registers` documentation.

If multiple interrupts are pending, they are handled in the priority order defined by the RISC-V Privileged Specification, version 1.11 (see Machine Interrupt Registers, Section 3.1.9).
The highest priority is given to the interrupt with the highest ID, except for timer interrupt, which has the lowest priority.

All interrupt lines are level-sensitive. There are two supported mechanisms by which interrupts can be cleared at the external source.

* A software-based mechanism in which the interrupt handler signals completion of the handling routine to the interrupt source, e.g., through a memory-mapped register, which then deasserts the corresponding interrupt line.
* A hardware-based mechanism in which the ``irq_ack_o`` and ``irq_id_o[5:0]`` signals are used to clear the interrupt sourcee, e.g. by an external interrupt controller.

In Debug Mode, all interrupts are ignored independent of ``mstatus``.MIE and the content of the ``mie`` and ``mie1`` CSRs.

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

The illegal instruction exception and M-Mode ECALL instruction exceptions cannot be disabled and are always active.

.. only:: PMP

  +----------------+---------------------------------------------------------------+
  | Exception Code | Description                                                   |
  +----------------+---------------------------------------------------------------+
  |              1 | Instruction access fault                                      |
  +----------------+---------------------------------------------------------------+
  |              5 | Load access fault                                             |
  +----------------+---------------------------------------------------------------+
  |              7 | Store access fault                                            |
  +----------------+---------------------------------------------------------------+

  The instruction access fault and load-store access faults cannot be disabled and are always active. The PMP
  itself can be disabled.

.. only:: USER

  +----------------+---------------------------------------------------------------+
  | Exception Code | Description                                                   |
  +----------------+---------------------------------------------------------------+
  |              8 | Environment call from U-Mode (ECALL)                          |
  +----------------+---------------------------------------------------------------+

  The U-Mode ECALL instruction exception cannot be disabled and is always active.

Nested Interrupt/Exception Handling
-----------------------------------

CV32E40P does support nested interrupt/exception handling in software.
The hardware automatically disables interrupts upon entering an interrupt/exception handler.
Otherwise, interrupts/exceptions during the critical part of the handler, i.e. before software has saved the ``mepc`` and ``mstatus`` CSRs, would cause those CSRs to be overwritten.
If desired, software can explicitly enable interrupts by setting ``mstatus``.MIE to 1 from within the handler.
However, software should only do this after saving ``mepc`` and ``mstatus``.
There is no limit on the maximum number of nested interrupts.
Note that, after enabling interrupts by setting ``mstatus``.MIE to 1, the current handler will be interrupted also by lower priority interrupts.
To allow higher priority interrupts only, the handler must configure ``mie`` and ``mie1`` accordingly.

The following pseudo-code snippet visualizes how to perform nested interrupt handling in software.

.. code-block:: c
   :linenos:

   isr_handle_nested_interrupts(id) {
     // Save mpec and mstatus to stack
     mepc_bak = mepc;
     mstatus_bak = mstatus;

     // Save mie, mie1 to stack (optional)
     mie_bak = mie;
     mie1_bak = mie1;

     // Keep lower-priority interrupts disabled (optional)
     mie = mie & ~((1 << (id + 1)) - 1);
     mie1 = mie1 & (~((1 << (id + 1)) - 1) >> 32);

     // Re-enable interrupts
     mstatus.MIE = 1;

     // Handle interrupt
     // This code block can be interrupted by other interrupts.
     // ...

     // Restore mstatus (this disables interrupts) and mepc
     mstatus = mstatus_bak;
     mepc = mepc_bak;

     // Restore mie, mie1 (optional)
     mie = mie_bak;
     mie1 = mie1_bak;
   }

Nesting of interrupts/exceptions in hardware is not supported.
