.. _pulp_cluster:

PULP Cluster Extension
======================

CV32E40P has an optional extension to enable its usage in a PULP Cluster in the PULP (Parallel Ultra Low Power) platform.
This extension is enabled by setting the ``PULP_CLUSTER`` parameter to 1. The PULP platform is organized as clusters of
multiple (4 or 8 usually) CV32E40P cores that share a tightly-coupled data memory, aimed at running digital signal processing
applications efficiently.

The mechanism via which CV32E40P cores in a PULP Cluster synchronize with each other is implemented via custom instructions (p.elw)
that perform load operations on an external Event Unit (which implements barriers, semaphores, etc. in an efficient manner). This
special load to the Event Unit together with the ``core_busy_o`` signal inform the Event Unit that the CV32E40P is not busy and 
ready to go to sleep. Only in that case the Event Unit sets ``clock_en_i`` to 0, lowering the dynamic power as this signal is used
internal to CV32E40P to gate most of its clock tree. Once the CV32E40P core is ready to start again (e.g. when the last core meets
the barrier), ``clock_en_i`` is set to 1 thereby enabling the CV32E40P to run again.

If the PULP Cluster extension is not used (``PULP_CLUSTER`` = 0), the ``clock_en_i`` signal is not used (and should be tied to 0) and
the ``core_busy_o`` signal should be ignored.

PULP Cluster Interface
----------------------

The following table describes the signals of the Auxiliary Processing Unit interface.

.. tabularcolumns:: |p{4cm}|l|p{9cm}|

+--------------------+-----------+-----------------------------------------------+
| Signal             | Direction | Description                                   |
+====================+===========+===============================================+
| ``clock_en_i``     | input     | Clock enable. Disable is only allowed after   |
|                    |           | hitting a barrier via p.elw when              |
|                    |           | ``core_busy_o`` = 0.                          |
+--------------------+-----------+-----------------------------------------------+
| ``core_busy_o``    | output    | Core busy. If ``core_busy_o`` = 1 the core    |
|                    |           | is busy (e.g. with instruction or data        |
|                    |           | fetches) and ``clock_en_i`` should not be     |
|                    |           | set to 0.                                     |
+--------------------+-----------+-----------------------------------------------+
