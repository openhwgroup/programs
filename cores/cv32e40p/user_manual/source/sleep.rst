.. _sleep_unit:

Sleep Unit
==========

Sleep Interface
---------------

The following table describes the signals of the Sleep Unit.

.. tabularcolumns:: |p{4cm}|l|p{9cm}|

+--------------------------------------+-----------+-----------------------------------------------+
| Signal                               | Direction | Description                                   |
+======================================+===========+===============================================+
| ``core_sleep_o``                     | output    | Core is blocked on WFI with no outstanding    |
|                                      |           | data or instruction accesses. Deasserts       |
|                                      |           | if an external event (``irq_*`` or            |
|                                      |           | ``debug_*`` ) wakes the core up. The          |
|                                      |           | ``core_sleep_o`` signal can be used as an     |
|                                      |           | indication for whether ``clk_i`` is           |
|                                      |           | required.                                     |
+--------------------------------------+-----------+-----------------------------------------------+
