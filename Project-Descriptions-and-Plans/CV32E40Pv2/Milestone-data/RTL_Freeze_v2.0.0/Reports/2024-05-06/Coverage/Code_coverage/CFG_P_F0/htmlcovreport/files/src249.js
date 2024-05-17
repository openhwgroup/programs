var g_data = {"name":"/shark0/processing/cv32e40p/users/processing/PRODUCTS_DIGITAL_DESIGN/PANTHER/PANTHER_1.0/CV32/NR/CFG_P_F0/NR_QUESTA_INT_DEBUG_LONG/workdir/core-v-cores/cv32e40p/rtl/cv32e40p_ff_one.sv","src":"// Copyright 2018 ETH Zurich and University of Bologna.\n// Copyright and related rights are licensed under the Solderpad Hardware\n// License, Version 0.51 (the \"License\"); you may not use this file except in\n// compliance with the License.  You may obtain a copy of the License at\n// http://solderpad.org/licenses/SHL-0.51. Unless required by applicable law\n// or agreed to in writing, software, hardware and materials distributed under\n// this License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR\n// CONDITIONS OF ANY KIND, either express or implied. See the License for the\n// specific language governing permissions and limitations under the License.\n\n////////////////////////////////////////////////////////////////////////////////\n// Engineer:       Andreas Traber - atraber@student.ethz.ch                   //\n//                                                                            //\n// Additional contributions by:                                               //\n//                 Davide Schiavone - pschiavo@iis.ee.ethz.ch                 //\n//                                                                            //\n// Design Name:    cv32e40p_ff_one                                               //\n// Project Name:   RI5CY                                                      //\n// Language:       SystemVerilog                                              //\n//                                                                            //\n// Description:    Find First One                                             //\n//                                                                            //\n////////////////////////////////////////////////////////////////////////////////\n\nmodule cv32e40p_ff_one #(\n    parameter LEN = 32\n) (\n    input logic [LEN-1:0] in_i,\n\n    output logic [$clog2(LEN)-1:0] first_one_o,\n    output logic                   no_ones_o\n);\n\n  localparam NUM_LEVELS = $clog2(LEN);\n\n  logic [          LEN-1:0][NUM_LEVELS-1:0] index_lut;\n  logic [2**NUM_LEVELS-1:0]                 sel_nodes;\n  logic [2**NUM_LEVELS-1:0][NUM_LEVELS-1:0] index_nodes;\n\n\n  //////////////////////////////////////////////////////////////////////////////\n  // generate tree structure\n  //////////////////////////////////////////////////////////////////////////////\n\n  generate\n    genvar j;\n    for (j = 0; j < LEN; j++) begin : gen_index_lut\n      assign index_lut[j] = $unsigned(j);\n    end\n  endgenerate\n\n  generate\n    genvar k;\n    genvar l;\n    genvar level;\n\n    assign sel_nodes[2**NUM_LEVELS-1] = 1'b0;\n\n    for (level = 0; level < NUM_LEVELS; level++) begin : gen_tree\n      //------------------------------------------------------------\n      if (level < NUM_LEVELS - 1) begin : gen_non_root_level\n        for (l = 0; l < 2 ** level; l++) begin : gen_node\n          assign sel_nodes[2**level-1+l]   = sel_nodes[2**(level+1)-1+l*2] | sel_nodes[2**(level+1)-1+l*2+1];\n          assign index_nodes[2**level-1+l] = (sel_nodes[2**(level+1)-1+l*2] == 1'b1) ?\n                                           index_nodes[2**(level+1)-1+l*2] : index_nodes[2**(level+1)-1+l*2+1];\n        end\n      end\n      //------------------------------------------------------------\n      if (level == NUM_LEVELS - 1) begin : gen_root_level\n        for (k = 0; k < 2 ** level; k++) begin : gen_node\n          // if two successive indices are still in the vector...\n          if (k * 2 < LEN - 1) begin : gen_two\n            assign sel_nodes[2**level-1+k] = in_i[k*2] | in_i[k*2+1];\n            assign index_nodes[2**level-1+k] = (in_i[k*2] == 1'b1) ? index_lut[k*2] : index_lut[k*2+1];\n          end\n          // if only the first index is still in the vector...\n          if (k * 2 == LEN - 1) begin : gen_one\n            assign sel_nodes[2**level-1+k]   = in_i[k*2];\n            assign index_nodes[2**level-1+k] = index_lut[k*2];\n          end\n          // if index is out of range\n          if (k * 2 > LEN - 1) begin : gen_out_of_range\n            assign sel_nodes[2**level-1+k]   = 1'b0;\n            assign index_nodes[2**level-1+k] = '0;\n          end\n        end\n      end\n      //------------------------------------------------------------\n    end\n  endgenerate\n\n  //////////////////////////////////////////////////////////////////////////////\n  // connect output\n  //////////////////////////////////////////////////////////////////////////////\n\n  assign first_one_o = index_nodes[0];\n  assign no_ones_o   = ~sel_nodes[0];\n\nendmodule\n","lang":"verilog"};
processSrcData(g_data);