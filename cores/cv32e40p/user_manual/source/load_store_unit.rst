Load-Store-Unit (LSU)
=====================

The LSU of the core takes care of accessing the data memory. Load and
stores on words (32 bit), half words (16 bit) and bytes (8 bit) are
supported.

Table 2 describes the signals that are used by the LSU.

+------------------------+-----------------+------------------------------------------------------------------------------------------------------------------------------+
| **Signal**             | **Direction**   | **Description**                                                                                                              |
+------------------------+-----------------+------------------------------------------------------------------------------------------------------------------------------+
| data\_req\_o           | output          | Request ready, must stay high until data\_gnt\_i is high for one cycle                                                       |
+------------------------+-----------------+------------------------------------------------------------------------------------------------------------------------------+
| data\_addr\_o[31:0]    | output          | Address                                                                                                                      |
+------------------------+-----------------+------------------------------------------------------------------------------------------------------------------------------+
| data\_we\_o            | output          | Write Enable, high for writes, low for reads. Sent together with data\_req\_o                                                |
+------------------------+-----------------+------------------------------------------------------------------------------------------------------------------------------+
| data\_be\_o[3:0]       | output          | Byte Enable. Is set for the bytes to write/read, sent together with data\_req\_o                                             |
+------------------------+-----------------+------------------------------------------------------------------------------------------------------------------------------+
| data\_wdata\_o[31:0]   | output          | Data to be written to memory, sent together with data\_req\_o                                                                |
+------------------------+-----------------+------------------------------------------------------------------------------------------------------------------------------+
| data\_rdata\_i[31:0]   | input           | Data read from memory                                                                                                        |
+------------------------+-----------------+------------------------------------------------------------------------------------------------------------------------------+
| data\_rvalid\_i        | input           | data\_rdata\_is holds valid data when data\_rvalid\_i is high. This signal will be high for exactly one cycle per request.   |
+------------------------+-----------------+------------------------------------------------------------------------------------------------------------------------------+
| data\_gnt\_i           | input           | The other side accepted the request. data\_addr\_o may change in the next cycle                                              |
+------------------------+-----------------+------------------------------------------------------------------------------------------------------------------------------+

Table 2: LSU Signals

Misaligned Accesses
-------------------

The LSU is able to perform misaligned accesses, meaning accesses that
are not aligned on natural word boundaries. However, it needs to perform
two separate word-aligned accesses internally. This means that at least
two cycles are needed for misaligned loads and stores.

Protocol
--------

The protocol that is used by the LSU to communicate with a memory works
as follows:

The LSU provides a valid address in data\_addr\_o and sets data\_req\_o
high. The memory then answers with a data\_gnt\_i set high as soon as it
is ready to serve the request. This may happen in the same cycle as the
request was sent or any number of cycles later. After a grant was
received, the address may be changed in the next cycle by the LSU. In
addition, the data\_wdata\_o, data\_we\_o and data\_be\_o signals may be
changed as it is assumed that the memory has already processed and
stored that information. After receiving a grant, the memory answers
with a data\_rvalid\_i set high if data\_rdata\_i is valid. This may
happen one or more cycles after the grant has been received. Note that
data\_rvalid\_i must also be set when a write was performed, although
the data\_rdata\_i has no meaning in this case.

Figure 2, Figure 3 and Figure 4 show example-timing diagrams of the
protocol.

.. figure:: ../images/Basic_Memory_Transaction.png
   :name: basic memory transaction
   :align: center
   :alt: 

   Figure 2: Basic Memory Transaction

.. figure:: ../images/Back_to_Back_Memory_Transaction.png
   :name: back to back memory transaction 
   :align: center
   :alt: 

   Figure 3: Back-to-back Memory Transaction

.. figure:: ../images/Slow_Response_Memory_Transaction.png
   :name: slow response memory transaction 
   :align: center
   :alt: 

   Figure 4: Slow Response Memory Transaction

Post-Incrementing Load and Store Instructions
---------------------------------------------

Post-incrementing load and store instructions perform a load/store
operation from/to the data memory while at the same time increasing the
base address by the specified offset. For the memory access, the base
address without offset is used.

Post-incrementing load and stores reduce the number of required
instructions to execute code with regular data access patterns, which
can typically be found in loops. These post-incrementing load/store
instructions allow the address increment to be embedded in the memory
access instructions and get rid of separate instructions to handle
pointers. Coupled with hardware loop extension, this instructions allow
to reduce the loop overhead significantly.

.. only:: PMP

  Physical Memory Protection (PMP) Unit
  -------------------------------------

  The CV32E40P core has a PMP module which can be enabled by setting the
  parameter PULP_SECURE=1 which also enabled the core to possibly run in
  USER MODE. Such unit has a configurable number of entries (up to 16) and
  supports all the modes as TOR, NAPOT and NA4. Every fetch, load and
  store access executed in USER MODE are first filtered by the PMP unit
  which can possibly generated exceptions. For the moment, the MPRV bit in
  MSTATUS as well as the LOCK mechanism in the PMP are not supported.
