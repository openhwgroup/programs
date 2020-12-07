
# OpenHW Project Dashboard

Last Update Dec 2, 2020

## Status Key
PPL = Preliminary Project Launch  
&nbsp; &#8595;  
PL = Project Launch  
&nbsp; &#8595;  
PPA = Project Plan Approved  
&nbsp; &#8595;  
PC = Project Closed



## Active Projects (have passed PPL)

| Name     	  | Status 	| Task Group                          | Technical Project Leader(s)                   | Project Manager 	| OpenHW repo(s)  | EF Project 		| ECLIPSE CQ   	|  PPL 		| PL 		|PPA 		| Project Proposal (or Readme File) 						|
|----------	  |--------	|-----------------------------	|----------------------------------------------	|--------------------	|--------------	  | -----------------  	|-------------- |------------ 	|-------------- |-------------- |---------------------------------------------------------------------- |
| CV32E40P 	  | PPA     	| Verification,  Cores 		| [Mike Thompson](https://github.com/orgs/openhwgroup/people/MikeOpenHWGroup),  [Davide Schiavone](https://github.com/orgs/openhwgroup/people/davideschiavone), [Arjan Binks](https://github.com/orgs/openhwgroup/people/Silabs-ArjanB)  	| [Mike Thompson](https://github.com/orgs/openhwgroup/people/MikeOpenHWGroup) (verif) | [cv32e40p](https://github.com/openhwgroup/cv32e40p)        | CORE-V Cores      	| [22444](https://dev.eclipse.org/ipzilla/show_bug.cgi?id=22444), [22415](https://dev.eclipse.org/ipzilla/show_bug.cgi?id=22415) 	| grandfathered | grandfathered	| grandfathered	| [core-v cv32e40p readme](https://github.com/openhwgroup/cv32e40p/blob/master/README.md)		|
| CORE-V MCU FPGA | PPA         | HW    	                | [Hugh Pollitt Smith](https://github.com/orgs/openhwgroup/people/hpollittsmith)                             | 			| [core-v-mcu](https://github.com/openhwgroup/core-v-mcu)      | CORE-V Cores      	| NONE 		| grandfathered | grandfathered	| grandfathered	| [core-v mcu readme](https://github.com/openhwgroup/core-v-mcu/blob/master/README.md)  	|                
| CORE-V-IDE-CDT  | PPL       	| SW                            | [Alexander Fedorov](https://github.com/orgs/openhwgroup/people/ruspl-afed) 				| TBD      	| [core-v-ide-cdt](https://github.com/openhwgroup/core-v-ide-cdt)  | CORE-V Cores 	| [22867](http://dev.eclipse.org/ipzilla/show_bug.cgi?id=22867)     	| 20.08.31(A) 	| TBD 	| TBD		| [core-v-ide-cdt ppl](https://github.com/openhwgroup/core-v-docs/blob/master/program/CORE-V%20IDE%20prelminary%20project%20proposal.md)			|
| FORCE-RISCV  		|  PL | Verification                  | [Jingliang Wang](https://github.com/Leo-Wang-JL) 					| TBD     		| [force-riscv](https://github.com/openhwgroup/force-riscv)     | CORE-V Cores 	| NONE       	| 20.09.28 (A)	| 20.10.26 (A) 		| TBD		| [force-riscv ppl](https://github.com/openhwgroup/core-v-docs/blob/master/program/FORCE-RISCV%20ISG%20project%20proposal.md)								|
| CVA6  		|  PPL | Verification, Cores           | [Jérôme Quévremont](https://github.com/orgs/openhwgroup/people/jquevremont) 				| TBD     		| [cva6](https://github.com/openhwgroup/cva6)       	  | CORE-V Cores 	| [22416](https://dev.eclipse.org/ipzilla/show_bug.cgi?id=22416)       	| 20.09.28 (A)	| TBD 		| TBD		| [cva6 ppl](https://github.com/openhwgroup/core-v-docs/blob/master/program/CVA6%20preliminary%20project%20proposal.md) |
| CORE-V GNU GCC TOOLS  |  PPL | SW                            | [Jessica Mills](https://github.com/jessicamills) 				| [Jessica Mills](https://github.com/jessicamills)  		| [corev-gcc](https://github.com/openhwgroup/corev-gcc)       | not under EF 	| n/a       	| 20.10.05 (A)	| TBD	 	| TBD 		|  [core-v gnu gcc tools ppl](https://github.com/jeremybennett/core-v-docs/blob/jpb-gnu-tools-ppl/program/core-v-gnu-tools-ppl.md) 	|							 	|
| CORE-V MCU SOC   	|  PPL | HW, Verification              | [Tim Saxe](https://github.com/timsaxe), [Davide Schiavone](https://github.com/orgs/openhwgroup/people/davideschiavone), 	[Hugh Pollitt-Smith](https://github.com/orgs/openhwgroup/people/hpollittsmith)   |  TBD     		| TBD       	  | CORE-V Cores 	| NONE       	| 20.10.05 (A)	| TBD 		| TBD		| [core-v-mcu-soc ppl](https://github.com/openhwgroup/core-v-docs/blob/master/program/Preliminary%20project%20proposal%20for%20MCU%20SoC.md)						 	|	
| CORE-V LLVM TOOLS  	|  PPL | SW              | [Zbigniew Chamski](https://github.com/PicoPET)    |  TBD     		| [corev-llvm-project](https://github.com/openhwgroup/corev-llvm-project)     	  | not under EF (tentative) 	| n/a       	| 20.11.30 (A)	| TBD 		| TBD		| [llvm-toolchain-ppl](https://github.com/openhwgroup/core-v-docs/blob/master/program/llvm-toolchain-ppl.md)	
| CORE-V FREERTOS  	|  PPL | SW              | [Robert Balas](https://github.com/bluewww), [Shteryana Shopova](https://github.com/shteryana), [Olive Chao](https://github.com/olivetreezhao)    |  [Jeremy Bennett](https://github.com/jeremybennett) (temporary PM)     		| TBD       	  | not under EF (tentative) 	| n/a       	| 20.11.30 (A)	| TBD 		| TBD		| [core-v-free-rtos-ppl](https://github.com/openhwgroup/core-v-docs/blob/master/program/core-v-free-rtos-ppl.md)	
| CORE-V VEC RESEARCH  |  PPL | University Outreach (UOTG)              | [Frank Gurkaynak](https://github.com/gurkaynak), [Mickael Fiorentino](https://github.com/mickaelfiorentino) |  [Hugh Pollitt Smith](https://github.com/orgs/openhwgroup/people/hpollittsmith)     		| TBD       	  | CORE-V Cores 	| NONE       	| 20.11.30 (A)	| TBD 		| TBD		| [core-v-VEC research ppl](https://github.com/openhwgroup/core-v-docs/blob/master/program/PPL%20proposal%20for%20Core-V-VEC%20Research%20Project.md)	



## Potential Projects (have not passed PPL)
| Name     	  | Status 	| Task Group                     | Technical Project Leader(s)                   | Project Manager 	| OpenHW repo(s)  | EF Project 		| ECLIPSE CQ   	|  PPL 		| PL 		|PPA 		| Project Proposal (or Readme File) 						|
|----------	  |--------	|-----------------------------	|----------------------------------------------	|--------------------	|--------------	  | -----------------  	|-------------- |------------ 	|-------------- |-------------- |---------------------------------------------------------------------- |
| cv32e40pv2  	|  NONE | Cores, Verification              | [John Martin](https://github.com/orgs/openhwgroup/people/jm4rtin)   |  TBD     		| TBD       	  | CORE-V Cores 	| NONE       	| TBD	| TBD 		| TBD		| [cv32e40pv2 ppl](https://github.com/openhwgroup/core-v-docs/blob/master/program/CV32E40Pv2%20preliminary%20project%20proposal.md)						 	|
| cve2  	|  NONE | Cores, Verification              | Joe Circello  |  Joe Circello    		| TBD       	  | CORE-V Cores 	| NONE       	| TBD	| TBD 		| TBD		| 					 	|
