Core Versions and RTL Freeze Rules
==================================

The CV32E40P is defined by the ``marchid`` and ``mimpid`` tuple.
The tuple identify which sets of parameters have been verified
by OpenHW Group, and once RTL Freeze is achieved, no further
non-logically equivalent changes are allowed on that set of parameters.

The RTL Freeze version of the core is indentified by a GitHub
tag with the format cv32e40p_vMAJOR.MINOR.PATCH (e.g. cv32e40p_v1.0.0).
In addition, the release date is reported in the documentation.

What happens after RTL Freeze?
------------------------------

A bug is found
^^^^^^^^^^^^^^

If a bug is found that affect the already frozen parameter set,
the RTL changes required to fix such bug are non-logically equivalent by definition.
Therefore, the RTL changes are applied only on a different  ``mimpid``
value and the bug and the fix must be documented.
These changes are visible by software as the ``mimpid`` has a different value.
Every bug found must be followed by another RTL Freeze release and a new GitHub tag.

RTL changes on non-verified yet parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If changes affecting the core on a non-frozen parameter set are required,
as for example, to fix bugs found in the communication to the FPU (e.g., affecting the core only if ``FPU=1``),
or to change the ISA Extensions decoding of PULP instructions (e.g., affecting the core only if ``PULP_XPULP=1``),
then such changes must be logically equivalent to the already frozen set of parameters, and they must be applied on a different ``mimpid`` value. They can be non-logically equivalent to a non-frozen set of parameters.
These changes are visible by software as the ``mimpid`` has a different value.
Once the new set of parameters is verified and achieved the sign-off for RTL freeze,
a new GitHub tag and version of the core is released.

PPA optimizations and new features
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Non-logically equivalent PPA optimizations and new features are not allowed on a given set
of RTL frozen parameters (e.g., a faster divider).
If PPA optimizations are logically-equivalent instead, they can be applied without
changing the ``mimpid`` value (as such changes are not visible in software).
However, a new GitHub tag should be release and changes documented.

:numref:`rtl_freeze_rules` shows the aforementioned rules.

.. figure:: ../images/rtl_freeze_rules.png
   :name: rtl_freeze_rules
   :align: center
   :alt:

   Versions control of CV32E40P


Released core versions
----------------------

The verified parameter sets of the core, their implementation version, GitHub tags,
and dates are reported here.

``mimpid=0``
------------

The ``mimpid=0`` refers to the CV32E40P core verified with the following parameters:

+---------------------------+-------+
| Name                      | Value |
+===========================+=======+
| ``FPU``                   |   0   |
+---------------------------+-------+
| ``NUM_MHPMCOUNTERS``      |   1   |
+---------------------------+-------+
| ``PULP_CLUSTER``          |   0   |
+---------------------------+-------+
| ``PULP_XPULP``            |   0   |
+---------------------------+-------+
| ``PULP_ZFINX``            |   0   |
+---------------------------+-------+

Following, all the GitHub tags related to ``mimpid=0``.

+--------------------+-------------------+------------+--------------------+---------+
| Git Tag            | Tagged By         | Date       | Reason for Release | Comment |
+====================+===================+============+====================+=========+
| cv32e40p_v1.0.0    |                   | yyyy-mm-dd |                    |         |
+--------------------+-------------------+------------+--------------------+---------+


At RTL Freeze Date, there are 48 WAIVED open-issues for the given parameters, and 277 closed-issues.
The open-issues are:

`#598 <https://github.com/openhwgroup/cv32e40p/issues/598>`
`#595 <https://github.com/openhwgroup/cv32e40p/issues/595>`
`#594 <https://github.com/openhwgroup/cv32e40p/issues/594>`
`#593 <https://github.com/openhwgroup/cv32e40p/issues/593>`
`#592 <https://github.com/openhwgroup/cv32e40p/issues/592>`
`#591 <https://github.com/openhwgroup/cv32e40p/issues/591>`
`#590 <https://github.com/openhwgroup/cv32e40p/issues/590>`
`#586 <https://github.com/openhwgroup/cv32e40p/issues/586>`
`#585 <https://github.com/openhwgroup/cv32e40p/issues/585>`
`#584 <https://github.com/openhwgroup/cv32e40p/issues/584>`
`#583 <https://github.com/openhwgroup/cv32e40p/issues/583>`
`#571 <https://github.com/openhwgroup/cv32e40p/issues/571>`
`#566 <https://github.com/openhwgroup/cv32e40p/issues/566>`
`#549 <https://github.com/openhwgroup/cv32e40p/issues/549>`
`#548 <https://github.com/openhwgroup/cv32e40p/issues/548>`
`#526 <https://github.com/openhwgroup/cv32e40p/issues/526>`
`#462 <https://github.com/openhwgroup/cv32e40p/issues/462>`
`#452 <https://github.com/openhwgroup/cv32e40p/issues/452>`
`#428 <https://github.com/openhwgroup/cv32e40p/issues/428>`
`#427 <https://github.com/openhwgroup/cv32e40p/issues/427>`
`#392 <https://github.com/openhwgroup/cv32e40p/issues/392>`
`#386 <https://github.com/openhwgroup/cv32e40p/issues/386>`
`#366 <https://github.com/openhwgroup/cv32e40p/issues/366>`
`#343 <https://github.com/openhwgroup/cv32e40p/issues/343>`
`#308 <https://github.com/openhwgroup/cv32e40p/issues/308>`
`#306 <https://github.com/openhwgroup/cv32e40p/issues/306>`
`#301 <https://github.com/openhwgroup/cv32e40p/issues/301>`
`#293 <https://github.com/openhwgroup/cv32e40p/issues/293>`
`#270 <https://github.com/openhwgroup/cv32e40p/issues/270>`
`#258 <https://github.com/openhwgroup/cv32e40p/issues/258>`
`#252 <https://github.com/openhwgroup/cv32e40p/issues/252>`
`#247 <https://github.com/openhwgroup/cv32e40p/issues/247>`
`#239 <https://github.com/openhwgroup/cv32e40p/issues/239>`
`#223 <https://github.com/openhwgroup/cv32e40p/issues/223>`
`#197 <https://github.com/openhwgroup/cv32e40p/issues/197>`
`#183 <https://github.com/openhwgroup/cv32e40p/issues/183>`
`#182 <https://github.com/openhwgroup/cv32e40p/issues/182>`
`#175 <https://github.com/openhwgroup/cv32e40p/issues/175>`
`#174 <https://github.com/openhwgroup/cv32e40p/issues/174>`
`#170 <https://github.com/openhwgroup/cv32e40p/issues/170>`
`#169 <https://github.com/openhwgroup/cv32e40p/issues/169>`
`#161 <https://github.com/openhwgroup/cv32e40p/issues/161>`
`#159 <https://github.com/openhwgroup/cv32e40p/issues/159>`
`#157 <https://github.com/openhwgroup/cv32e40p/issues/157>`
`#140 <https://github.com/openhwgroup/cv32e40p/issues/140>`
`#132 <https://github.com/openhwgroup/cv32e40p/issues/132>`
`#124 <https://github.com/openhwgroup/cv32e40p/issues/124>`
`#122 <https://github.com/openhwgroup/cv32e40p/issues/122>`
