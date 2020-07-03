.. _apu:

Auxiliary Processing Unit (APU)
===============================

Auxiliary Processing Unit Interface
-----------------------------------

The following table describes the signals of the Auxiliary Processing Unit interface.

.. tabularcolumns:: |p{4cm}|l|p{9cm}|

+--------------------------------------+-----------+-----------------------------------------------+
| Signal                               | Direction | Description                                   |
+======================================+===========+===============================================+
| ``apu_master_req_o``                 | output    |                                               |
+--------------------------------------+-----------+-----------------------------------------------+
| ``apu_master_ready_o``               | output    |                                               |
+--------------------------------------+-----------+-----------------------------------------------+
| ``apu_master_gnt_i``                 | input     |                                               |
+--------------------------------------+-----------+-----------------------------------------------+
| ``apu_master_operands_o[2:0][31:0]`` | output    | (Request channel)                             |
+--------------------------------------+-----------+-----------------------------------------------+
| ``apu_master_op_o[5:0]``             | output    | (Request channel)                             |
+--------------------------------------+-----------+-----------------------------------------------+
| ``apu_master_type_o[-1:0]``          | output    | (Request channel)                             |
+--------------------------------------+-----------+-----------------------------------------------+
| ``apu_master_flags_o[14:0]``         | output    | (Request channel)                             |
+--------------------------------------+-----------+-----------------------------------------------+
| ``apu_master_valid_i``               | input     | (Response channel)                            |
+--------------------------------------+-----------+-----------------------------------------------+
| ``apu_master_result_i[31:0]``        | input     | (Response channel)                            |
+--------------------------------------+-----------+-----------------------------------------------+
| ``apu_master_flags_i[4:0]``          | input     | (Response channel)                            |
+--------------------------------------+-----------+-----------------------------------------------+

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
