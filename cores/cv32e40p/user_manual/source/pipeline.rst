Pipeline
========

CV32E40P has a fully independent pipeline, meaning that whenever possible
data will propagate through the pipeline and therefor does not suffer
from any unneeded stalls.

The pipeline design is easily extendable to incorporate out-of-order
completion. E.g., it would be possible to complete an instruction that
only needs the EX stage before the WB stage, that is currently blocked
waiting for an rvalid, is ready. Currently this is not done in CV32E40P,
but might be added in the future.

Figure 8 shows the relevant control signals for the pipeline operation.
The main control signals, the ready signals of each pipeline stage, are
propagating from right to left. Each pipeline stage has two control
inputs: an enable and a clear. The enable activates the pipeline stage
and the core moves forward by one instruction. The clear removes the
instruction from the pipeline stage as it is completed. Every pipeline
stage is cleared if the ready coming from the stage to the right is
high, and the valid signal of the stage is low. If the valid signal is
high, it is enabled.

Every pipeline stage is independent of its left neighbor, meaning that
it can finish its execution no matter if a stage to its left is
currently stalled or not. On the other hand, an instruction can only
propagate to the next stage if the stage to its right is ready to
receive a new instruction. This means that in order to process an
instruction in a stage, its own stage needs to be ready and so does its
right neighbor.

.. figure:: ../images/CV32E40P_Pipeline.png
   :name: cv32e40p pipeline
   :align: center
   :alt: 

   Figure 8: CV32E40P Pipeline
