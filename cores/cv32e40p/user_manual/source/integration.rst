.. _core-integration:

Core Integration
================

The main module is named ``cv32e40p_core`` and can be found in ``cv32e40p_core.sv``.
Below, the instantiation template is given and the parameters and interfaces are described.

Instantiation Template
----------------------

.. code-block:: verilog

  cv32e40p_core #(
      .FPU                      ( 0 ),
      .NUM_MHPMCOUNTERS         ( 1 ),
      .PULP_CLUSTER             ( 0 ),
      .PULP_HWLP                ( 0 ),
      .PULP_ZFINX               ( 0 )
  ) u_core (
      // Clock and reset
      .clk_i                    (),
      .rst_ni                   (),
      .scan_cg_en_i             (),

      // Configuration
      .boot_addr_i              (),
      .dm_halt_addr_i           (),
      .dm_exception_addr_i      (),
      .hart_id_i                (),

      // Instruction memory interface
      .instr_req_o              (),
      .instr_gnt_i              (),
      .instr_rvalid_i           (),
      .instr_addr_o             (),
      .instr_rdata_i            (),

      // Data memory interface
      .data_req_o               (),
      .data_gnt_i               (),
      .data_rvalid_i            (),
      .data_addr_o              (),
      .data_be_o                (),
      .data_wdata_o             (),
      .data_we_o                (),
      .data_rdata_i             (),

      // Auxiliary Processing Unit (APU) interface
      .apu_master_req_o         (),
      .apu_master_ready_o       (),
      .apu_master_gnt_i         (),
      .apu_master_operands_o    (),
      .apu_master_op_o          (),
      .apu_master_type_o        (),
      .apu_master_flags_o       (),
      .apu_master_valid_i       (),
      .apu_master_result_i      (),
      .apu_master_flags_i       (),

       // Interrupt interface
      .irq_software_i           (),
      .irq_timer_i              (),
      .irq_external_i           (),
      .irq_fast_i               (),
      .irq_ack_o                (),
      .irq_id_o                 (),

      // Debug interface
      .debug_req_i              (),

      // Special control signals
      .fetch_enable_i           (),
      .core_sleep_o             (),
      .clock_en_i               (),
      .core_busy_o              ()
  );

Parameters
----------

+------------------------------+-------------+------------+-----------------------------------------------------------------+
| Name                         | Type/Range  | Default    | Description                                                     |
+==============================+=============+============+=================================================================+
| ``FPU``                      | bit         | 0          | Enable Floating Point Unit (FPU) support, see :ref:`fpu`        |
+------------------------------+-------------+------------+-----------------------------------------------------------------+
| ``NUM_MHPMCOUNTERS``         | int (1..29) | 1          | Number of MHPMCOUNTER performance counters, see                 |
|                              |             |            | :ref:`performance-counters`                                     |
+------------------------------+-------------+------------+-----------------------------------------------------------------+
| ``PULP_CLUSTER``             | bit         | 0          | Enable PULP Cluster support, see :ref:`pulp_cluster`            |
+------------------------------+-------------+------------+-----------------------------------------------------------------+
| ``PULP_HWLP``                | bit         | 0          | Enable PULP Hardware Loop support, see :ref:`pulp_hardware_loop`|
|                              |             |            | ``PULP_HWLP`` = 1 IS NOT SUPPORTED YET (IT IS UNDER DESIGN)     |
+------------------------------+-------------+------------+-----------------------------------------------------------------+
| ``PULP_ZFINX``               | bit         | 0          | Enable Floating Point instructions to use the General Purpose   |
|                              |             |            | register file instead of requiring a dedicated Floating Point   |
|                              |             |            | register file, see :ref:`fpu`. Only allowed to be set to 1      |
|                              |             |            | if ``FPU`` = 1                                                  |
+------------------------------+-------------+------------+-----------------------------------------------------------------+

Interfaces
----------

+-------------------------+-------------------------+-----+--------------------------------------------+
| Signal(s)               | Width                   | Dir | Description                                |
+=========================+=========================+=====+============================================+
| ``clk_i``               | 1                       | in  | Clock signal                               |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``rst_ni``              | 1                       | in  | Active-low asynchronous reset              |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``scan_cg_en_i``        | 1                       | in  | Scan clock gate enable                     |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``boot_addr_i``         | 32                      | in  | Boot address. First program counter after  |
|                         |                         |     | reset = ``boot_addr_i``. Must be half-word |
|                         |                         |     | aligned. Do not change after enabling core |
|                         |                         |     | via ``fetch_enable_i``                     |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``dm_halt_addr_i``      | 32                      | in  | Address to jump to when entering Debug     |
|                         |                         |     | Mode, see :ref:`debug-support`. Must be    |
|                         |                         |     | word-aligned. Do not change after enabling |
|                         |                         |     | core via ``fetch_enable_i``                |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``dm_exception_addr_i`` | 32                      | in  | Address to jump to when an exception       |
|                         |                         |     | occurs when executing code during Debug    |
|                         |                         |     | Mode, see :ref:`debug-support`. Must be    |
|                         |                         |     | word-aligned. Do not change after enabling |
|                         |                         |     | core via ``fetch_enable_i``                |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``hart_id_i``           | 32                      | in  | Hart ID, usually static, can be read from  |
|                         |                         |     | :ref:`csr-mhartid` CSR                     |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``instr_*``             | Instruction fetch interface, see :ref:`instruction-fetch`                  |
+-------------------------+----------------------------------------------------------------------------+
| ``data_*``              | Load-store unit interface, see :ref:`load-store-unit`                      |
+-------------------------+----------------------------------------------------------------------------+
| ``apu_*``               | Auxiliary Processing Unit (APU) interface, see :ref:`apu`                  |
+-------------------------+----------------------------------------------------------------------------+
| ``irq_*``               | Interrupt inputs, see :ref:`exceptions-interrupts`                         |
+-------------------------+----------------------------------------------------------------------------+
| ``debug_*``             | Debug interface, see :ref:`debug-support`                                  |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``fetch_enable_i``      | 1                       | in  | Enable the instruction fetch of CV32E40P.  |
|                         |                         |     | The first instruction fetch after reset    |
|                         |                         |     | de-assertion will not happen as long as    |
|                         |                         |     | this signal is 0. ``fetch_enable_i`` needs |
|                         |                         |     | to be set to 1 for at least one cycle      |
|                         |                         |     | while not in reset to enable fetching.     |
|                         |                         |     | Once fetching has been enabled the value   |
|                         |                         |     | ``fetch_enable_i`` is ignored.             |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``core_sleep_o``        | 1                       | out | Core blocked on WFI with no outstanding    |
|                         |                         |     | data or instruction accesses. Deasserts    |
|                         |                         |     | if an external event (``irq_*`` or         |
|                         |                         |     | ``debug_*`` ) wakes the core up. The       |
|                         |                         |     | ``core_sleep_o`` signal can be used as an  |
|                         |                         |     | indication for whether ``clk_i`` is        |
|                         |                         |     | required                                   |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``clock_en_i``          | 1                       | in  | Clock enable (only used when               |
|                         |                         |     | ``PULP_CLUSTER`` = 1), see                 |
|                         |                         |     | :ref:`pulp_cluster`                        |
+-------------------------+-------------------------+-----+--------------------------------------------+
| ``core_busy_o``         | 1                       | out | Core busy, see :ref:`pulp_cluster`         |  
+-------------------------+-------------------------+-----+--------------------------------------------+
