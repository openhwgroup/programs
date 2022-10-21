# FORCE-RISCV ISG Feature Descriptions

## Basic instructions sets RV32IMAFDC, RV64IMAFDC
Able to generate all these instructions either fully randomly or with flexible constraints applied on all operands.
 
## Vector extension 0.9
The complicated Vector extension will be support, able to randomly generate all vector instructions, also flexible constraints can be applied on all operands.

The vector extension 1.0 will be planned and supported once the specification is released.

## Application registers and CSR registers
Support all integer, floating point, vector registers and CSR registers.  CSR access instructions can be used to target CSR read/writes.

## Interactive generation mode
Generated instructions are simulated in the linked ISS shared object and enable the ISG to have full knowledge of the architecture states and memory states at all time, thus improve test generation quality.

The work involved is mainly getting 32-bit to work in this mode.

## Python scriptable test template
Powerful and extensible Python scriptable test template writing framework.

The work involved is mainly adjusting the framework to work properly for 32-bit mode.

## On-demand paging system with user exception control
Page descriptors are created on the fly, on demand.  The user will be able to control whether to have certain exceptions or not, page descriptor attribute distributions, page size etc.

The work involved is mainly support SV32 paging mode.

## Exceptions and interrupt handling
Exception and interrupt handlers will be supplied to handle all exceptions/interrupts.  There is also capability to allow users to specify their own handler if so desire using the hooks provided by the front-end Python framework.

## MP/MT support for both 32-bit and 64-bit
Implement support for MP/MT test generation.

## Advanced resource dependency for both 32-bit and 64-bit
Implement support for advanced resource dependency for both 32-bit and 64-bit modes.

# FORCE-RISCV ISG Project Plan

## The following features will be finished by end of November 2020.
- Basic instructions sets RV32IMAFDC, RV64IMAFDC
- Vector extension 0.9
- Application registers and CSR registers

## The following features will be finished by end of 2020 and reach milestone of a baseline usable 32-bit RISC-V ISG implementation
- The baseline 32-bit mode ISG does not have full virtual memory and exception handling support.  But can generate all 32-bit instructions and all registers available.
- Interactive generation mode
- Python scriptable test template

## The following features will be finished by end of Q1 2021 and reach milestone of a fully functional single core 32-bit RISC-V ISG implementation
- On-demand paging system with user exception control
- Exceptions and interrupt handling

## The following features will be finished by end of Q2 2021
- MP/MT support for both 32-bit and 64-bit
- Advanced resource dependency for both 32-bit and 64-bit


## On-going feature additions as requested by OpenHW Group members and broader open source community
New features will be requested by the open source community and implemented in an on-going fashion.

## On-going feature additions as call-for due to RISC-V new extensions and/or extension version upgrades.
New features will be needed as RISC-V bring in new extensions and/or upgrade extensions.
