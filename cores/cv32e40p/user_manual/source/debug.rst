.. _debug-support:

Debug
=====

CV32E40P supports the RISC-V debug specification 0.13 and it implementes
the execution based to reuse the existing core pipeline.
CV32E40P has a **debug_req_i** input port that is sent by the system
Debug Module. Such request makes the core jumps to the a specific
address location where the Debug Rom is mapped. Such address location
is referred as to the parameter DM_HaltAddress. CV32E40P implements the
debug sets of registers as dpc, dcsr, dscratch0, dscratch1.
