Exceptions and Interrupts
=========================

CV32E40P supports interrupts and exceptions on illegal instructions.

.. only:: PMP

  If enabled, CV32E40P supports exceptions on PMP filtered requests on
  the data and instruction bus.

The base address of the interrupt vector table is given by the mtvec
address. As CV32E40P supports only vectorized interrupts, the interrupt 0
is reserved for exceptions as illegal instructions or ecall.

.. only:: PMP

  Exceptions for prohibited instruction or data accesses use the address
  for interrupt 0 as well.

Interrupts
----------

Interrupts can only be enabled/disabled on a global basis and not
individually. It is assumed that there is an event/interrupt controller
outside of the core that performs masking and buffering of the interrupt
lines. The global interrupt enable is done via the CSR register MSTATUS.

Multiple interrupts requests are assumed to be handled by
event/interrupt controller. When an interrupt is taken, the core gives
an acknowledge signal to the event/interrupt controller as well as the
interrupt id taken.

Exceptions
----------

| The illegal instruction exception, ecall instruction exceptions cannot
  be disabled and are always active.

.. only:: PMP

  | For PMP exceptions when enabled, every instruction or data requests is
    filtered by the PMP which can possibly generated LOAD, STORE or FETCH
    exceptions.

Handling
--------

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
