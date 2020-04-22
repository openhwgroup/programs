Instruction Fetch
=================

The instruction fetcher of the core is able to supply one instruction to
the ID stage per cycle if the instruction cache or the instruction
memory is able to serve one instruction per cycle. The instruction
address must be half-word-aligned due to the support of compressed
instructions. It is not possible to jump to instruction addresses that
have the LSB bit set.

For optimal performance and timing closure reasons, a prefetcher is used
which fetches instruction from the instruction memory, or instruction
cache.

There are two prefetch flavors available:

-  32-Bit word prefetcher. It stores the fetched words in a FIFO with
   three entries.

-  128-Bit cache line prefetcher. It stores one 128-bit wide cache line
   plus 32-bit to allow for cross-cache line misaligned instructions.

Table 1 describes the signals that are used to fetch instructions. This
interface is a simplified version that is used by the LSU that is
described in Chapter 3. The difference is that no writes are possible
and thus it needs less signals.

+-------------------------+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| **Signal**              | **Direction**   | **Description**                                                                                                                |
+-------------------------+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| instr\_req\_o           | output          | Request ready, must stay high until instr\_gnt\_i is high for one cycle                                                        |
+-------------------------+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| instr\_addr\_o[31:0]    | output          | Address                                                                                                                        |
+-------------------------+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| instr\_rdata\_i[31:0]   | input           | Data read from memory                                                                                                          |
+-------------------------+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| instr\_rvalid\_i        | input           | instr\_rdata\_is holds valid data when instr\_rvalid\_i is high. This signal will be high for exactly one cycle per request.   |
+-------------------------+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| instr\_gnt\_i           | input           | The other side accepted the request. instr\_addr\_o may change in the next cycle                                               |
+-------------------------+-----------------+--------------------------------------------------------------------------------------------------------------------------------+

Table 1: Instruction Fetch Signals

Protocol
--------

The protocol used to communicate with the instruction cache or the
instruction memory is the same as the protocol used by the LSU. See the
description of the LSU in Chapter 3.2 for details about the protocol.
