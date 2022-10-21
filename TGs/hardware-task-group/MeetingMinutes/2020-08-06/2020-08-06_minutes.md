# HW TG August 4 notes:

## Attendees: 
- Joe Stoy (Bluespec)
- Charlie Hauck (Bluespec)
- Davide Schiavone (OpenHW Group)
- Hugh Pollitt-Smith (CMC Microsystems) 
- Olive Zhao (CMC Microsystems) 
- Jeremy Bennett (Embecosm)
- Jerry Zeng (NXP)
-  Duncan Bees (OpenHW Group)

## Notes:
- Bluespec is also implementing the CV32E40P core on an FPGA
    - First target is VCU118 board but plan to move RISC-V work onto smaller/lower-cost board (Digilent Arty-7, which shares same FPGA as NexysA7)
    - Plan to port FreeRTOS as well
    - The intent is to provide a common platform for comparisons of various RISC-V cores
    - Bluespec and OpenHW Group activities for FPGA porting are parallel but can both benefit from sharing
- Olive confirmed that the CV32E40P in the pulpissimo platform on the Digilent board is alive and the debugger can connect to it, although the output of the UART is strange (baud rate issue?)
    - Update: UART output is fine (prints “Hello!”) but processor hangs after first printf
- It would be good to have an overall project schedule for the activity


