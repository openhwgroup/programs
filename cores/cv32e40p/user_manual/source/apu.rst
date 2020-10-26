.. _apu:

Auxiliary Processing Unit (APU)
===============================

Auxiliary Processing Unit Interface
-----------------------------------

:numref:`Auxiliary Processing Unit interface signals` describes the signals of the Auxiliary Processing Unit interface.

.. table:: Auxiliary Processing Unit interface signals
  :name: Auxiliary Processing Unit interface signals

  +---------------------------------+---------------+------------------------------------------------------------------------------------------------------------------------------+
  | **Signal**                      | **Direction** | **Description**                                                                                                              |
  +=================================+===============+==============================================================================================================================+
  | ``apu\_req\_o``                 | output        | Request valid, will stay high until apu\_gnt\_i is high for one cycle                                                        |
  +---------------------------------+---------------+------------------------------------------------------------------------------------------------------------------------------+
  | ``apu\_gnt\_i``                 | input         | The other side accepted the request.  apu\\_operands\_o, apu\_op\_o, apu\_flags\_o may change in the next cycle.             |
  +---------------------------------+---------------+------------------------------------------------------------------------------------------------------------------------------+
  | ``apu\_operands\_o[2:0][31:0]`` | output        | APU's operands                                                                                                               |
  +---------------------------------+---------------+------------------------------------------------------------------------------------------------------------------------------+
  | ``apu\_op\_o[5:0]``             | output        | APU's operation                                                                                                              |
  +---------------------------------+---------------+------------------------------------------------------------------------------------------------------------------------------+
  | ``apu\_flags\_o[14:0]``         | output        | APU's flags                                                                                                                  |
  +---------------------------------+---------------+------------------------------------------------------------------------------------------------------------------------------+
  | ``apu\_rvalid\_i``              | input         | apu\_result\_i holds valid data when apu\_valid\_i is high. This signal will be high for exactly one cycle per request       |
  +---------------------------------+---------------+------------------------------------------------------------------------------------------------------------------------------+
  | ``apu\_result\_i[31:0]``        | input         | APU's result                                                                                                                 |
  +---------------------------------+---------------+------------------------------------------------------------------------------------------------------------------------------+
  | ``apu\_flags\_i[4:0]``          | input         | APU's flag result                                                                                                            |
  +---------------------------------+---------------+------------------------------------------------------------------------------------------------------------------------------+


Protocol
--------

The apu bus interface is derived from to the OBI (Open Bus Interface) protocol.
See https://github.com/openhwgroup/core-v-docs/blob/master/cores/cv32e40p/OBI-v1.0.pdf
for details about the protocol.
The CV32E40P apu interface uses the apu\_operands\_o, apu\_op\_o, and apu\_flags\_o as the address signal during the Address phase, indicating its validity with the `apu\_req\_o signal. It uses the apu\_result\_i and apu\_flags\_i as the rdata of the response phase. It does not implement the OBI signals: we, be, wdata, auser, wuser, aid,
rready, err, ruser, rid. These signals can be thought of as being tied off as
specified in the OBI specification.
The CV32E40P apu interface can cause up to two outstanding transactions.

Connection with the FPU
-----------------------

The CV32E40P sends FP operands over the apu\_operands\_o bus; the decoded RV32F operation as ADD, SUB, MUL, etc through the apu\_op\_o bus; the cast, destination and source formats as well as rounding mode through the apu\_flags\_o bus. The respose is the FPU result and relative output flags as Overflow, Underflow, etc.


APU Tracer
----------

The module ``cv32e40p_apu_tracer`` can be used to create a log of the APU interface.
It is a behavioral, non-synthesizable, module instantiated in the example testbench that is provided for
the ``cv32e40p_core``. It can be enabled during simulation by defining **CV32E40P_APU_TRACE**.

Output file
-----------

The APU trace is written to a log file which is named ``apu_trace_core_<HARTID>.log``, with ``<HARTID>`` being
the 32 digit hart ID of the core being traced.

Trace output format
-------------------

The trace output is in tab-separated columns.

1. **Time**: The current simulation time.
2. **Register**: The register file write address.
3. **Result**: The register file write data.
