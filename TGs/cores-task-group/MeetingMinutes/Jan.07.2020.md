Date: January 07, 2020

Attendees:

Mike Thompson : (OpenHW)       : mike@openhwgroup.org

Davide Schiavonne (OpenHW)     : davide@openhwgroup.org

Arjan Bink (Silicon Labs)      : Arjan.Bink@silabs.com

Sebastian Ahmed (Silicon Labs) : Sebastian.Ahmed@silabs.com

Steve Richmond (Silicon Labs)  : Steve.Richmond@silabs.com


## CV32E40P Features:

WE DO NOT REMOVE FROM RTL THE MODULEs THAT IMPLEMENT THOSE FEATUREs
(WE MAY MOVE PARAMETERS FROM GLOBAL TO LOCAL) → “NO” col

RELEVANT COMBINATION OF GLOBAL PARAMETERs WILL BE ALL VERIFIED IN A LONG TERM PLAN

IN THIS MEETING WE FIX THE GLOBAL PARAMETERs (so the ones that will be on Silicon) AND THE CORE WILL BE VERIFIED FOR BHAG2020

## BHAG2020:

WHAT WE MOVE FROM GLOBAL TO LOCAL

“NO” col for existing global parameters

HWLoop should be a GLOBAL PARAMETER, OPTIONAL

RVF AND Zfinx GLOBAL BUT NOT ON SILICON, change name of Zfinx to OHW_Zfinx
TENTATIVE, after BHAG2020 to OPTIONAL

LOCAL PARAMETERS ARE NOT AND WILL NOT BE VERIFIED (SHORT AND LONG TERMS) WE LEAVE THEM ONLY FOR RTL REUSE FOR THE FUTURE

We want to fix it to INCLUDED for the BHAG2020 (so on silicon)

We should move INSTR_RDATA_WIDTH from GLOBAL to LOCAL and fix it to 32
We should move N_EXT_PERF_COUNTERS  from GLOBAL to LOCAL
We should move PULP_SECURE    from GLOBAL to LOCAL 
We should move N_PMP_ENTRIES  from GLOBAL to LOCAL
We should move USE_PMP  from GLOBAL to LOCAL 

Check with PULP team if they use these parameters in the CLUSTER
and then         
We should move  parameter FP_DIVSQRT  from GLOBAL to LOCAL      
We should move parameter SHARED_FP      from GLOBAL to LOCAL    
We should move  parameter SHARED_DSP_MULT  from GLOBAL to LOCAL 
We should move  parameter SHARED_INT_MULT    from GLOBAL to LOCAL 
We should move  parameter SHARED_INT_DIV     from GLOBAL to LOCAL  
We should move  parameter SHARED_FP_DIVSQRT  from GLOBAL to LOCAL 
We should move  parameter WAPUTYPE            from GLOBAL to LOCAL 
We should move  parameter APU_NARGS_CPU     from GLOBAL to LOCAL 
We should move  parameter APU_WOP_CPU       from GLOBAL to LOCAL   
We should move  parameter APU_NDSFLAGS_CPU   from GLOBAL to LOCAL 
We should move parameter APU_NUSFLAGS_CPU    from GLOBAL to LOCAL 



**OPTIONAL:**
GLOBAL PARAMETER, VERIFIED (all OPTIONS) and we implement ON SILICON a fixed value of the parameter

**TENTATIVE:**
    GLOBAL PARAMETER, NOT VERIFIED for BHAG2020, NOT ON SILICON

PULP_CLUSTER parameter is used by ETH, so move it to TENTATIVE

CLINT EXTENSION YES without any parameter

ACTION: debug link and lowRISC interrupt controller

