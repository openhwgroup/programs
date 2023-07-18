# OpenHW  Project: FreeRTOS

| Gate                                 | Status                                                     |
| ------------------------------------ | ---------------------------------------------------------- |
| PC gate: Project Concept             | Approved on 2020-09-28 as Preliminary Project Launch (PPL) |
| PL gate: Project Launch              | Approved on 2021-01-25                                     |
| PA gate: Plan Approved               | Presented on 2023-06-26                                    |


<hr/>

## Title of Project 
*FreeRTOS for CVA6 core*

# OpenHW CVA6 FReeRTOS Plan Approve (PA) Proposal

The CVA6 requires running FreeRTOS on FPGA including FreeRTOS kernel, peripheral driver library and sample demos.  This is the subproject Plan Approve proposal for getting FreeRTOS working and up-stream onto https://github.com/FreeRTOS/FreeRTOS. 

git repo: FreeRTOS/FreeRTOS/Demo/<> 
This folder has multiple RISCV_sifve/microchip folder, which have demo for respective target. We will have an entry for cva6 as well. 

FreeRTOS need for CVA6 in addition to Linux.
FreeRTOS is a real-time operating system for embedded system, IoT, Automotive, Industrial automation, Defence, Robotics, etc.
Addition of FreeRTOS support on CVA6 would widen end-usage scenario.

## Outputs
This subproject will generate a FreeRTOS project that ensures the latest kernel version behaves as expected on the CVA6.  The project will only use the CVA6 peripherals necessary to run the kernel and view test results.

On completion of this subproject the CVA6 git repository https://github.com/AnjaliGedam/FreeRTOS will be upstreamed (public repo will have CVA6 demo application) as a part of FreeRTOS Git repository that contains CVA6 example projects and tests here: https://github.com/FreeRTOS/FreeRTOS.

## Date of proposal
26 June, 2023

## Author(s)
Anjali Gedam, Thales India, ECC

## (*For SW Projects*) Target Platform
*CVA6 32-bit APU*

## (*For Cores Projects*) Part Numbers
*Write down the CORE-V part number assigned for each of the output cores produced/verified by this project plan*

| Core produced/verified in this project		    | Part Number			| Comment				| 
| --------------------- 							| --------------------- | ---------------------	| 
| Core CV...								        |						|	

NOT APPLICABLE					| 

## (*For Cores Projects*) TRL target

*Write down the TRL target for each of the output cores produced/verified by this project plan*

| Core produced/verified in this project		    | TRL Target			| Comment				| 
| --------------------- 							| --------------------- | ---------------------	| 
| Core CV...										|						|						| 
NOT APPLICABLE


## Release plan


| Release number	| Planned date				| Description			                                | 
| ------------------| --------------------- 	| ---------------------		                            |    
| 1.0.0				| 2024-09-01				| Initial fully verified TRL5 release including X,Y,Z	|



## Project deliverables (high level)

| Deliverable		    | Description			| Technical Leader		| 
| --------------------- | --------------------- | ---------------------	| 
| Code	    			| Kernel modifications	|	Anjali Gedam, Thales India, ECC		|
| Code	    			| Basic drivers     	|	Anjali Gedam, Thales India, ECC		|
| Code	    			| Sample demos and application development template	|	Anjali Gedam, Thales India, ECC	|
| Document	    		| Documentation			|	Anjali Gedam, Thales India, ECC		|



## Feature List 

1. A reference implementation of kernel and drivers for CVA6
   - set of basic drivers including the UART
2. A demonstration application to show FreeRTOS in use
3. A minimal "starter" project, which CORE-V users can use as the starting point for their own projects
4. Up-stream changes to FreeRTOS.org repo

 
## Resources/ Resource Plan


| Organization					| Person							| Project deliverable focus 	|      
| --------------------    		| --------------------    			| -------------------- 			|
| Thales India, ECC	    		| Anjali Gedam					  	|	SW							|
 
### TGs impacted/resource requirements

- **CORE-V Software Task Group.**  The group which owns and manages this project.
- **CORE-V Hardware Task Group.**  As developers of the CVA6 APU, this group is the immediate customer.


## OpenHW Members/Participants committed to participate

The following have committed to the project

- **Amazon:** guidance for upstreaming
- **Thales:** technical leadership, implementation of drivers/kernel and bring up application on target 

## Project Leadership Roles

| Role					         | Person			| Organization				| Committer Status     |       
| ------------------------------ | ----------------	| -------------------- 	    | -------------------- | 
| Project Manager(s) (if applicable) |  			|				            |					   | 
| Technical Project Leader(s)        | Anjali Gedam	|	Thales India ECC	    |                      |
| Committer1 on project repo		 | Anjali Gedam	|	Thales India ECC		|        			   | 



## Work Breakdown Structure

- Kernel support, with board specific ISR and clock (Genesys-2)
- C runtime setup & board initialization
- Blinky application with Kernel
- Create and integrate UART driver
- Hello World application 
- Main full application with Kernel
- Upstream the project to FreeRTOS Git repository



## Schedule

| Related TG  | Milestone                                                                         | Target        | Contributor          |
| ----------- | --------------------------------------------------------------------------------- | ------------- | -------------------- |
| SW          | Create a FreeRTOS project that runs on a CVA6 core emulated on the Genesys-2 FPGA board.| March 2022 | Anjali Gedam, Thales India (ECC) |
| SW          | Update the project to create a "[simple blinky demo]" that uses a FreeRTOS queue to periodically send a message between two tasks| June 2022 | Anjali Gedam, Thales India (ECC) |
| SW          | Enable UART support and print message over UART | July 2022 | Anjali Gedam, Thales India (ECC) |
| SW          | Merge with Latest Kernel source files to the head revision from the upstream repository, update the project as necessary to compile and run the simply blinky project again. (Multiple sub-tasks) | March 2023 | Anjali Gedam, Thales India (ECC) |
| SW          | Update the project as necessary to compile and run the simply blinky project again. (Multiple sub-tasks) |June  2023 | Anjali Gedam, Thales India (ECC) |
| SW          | Update the project as necessary to compile and run the main_full project again. (Multiple sub-tasks) | July 2023 | Anjali Gedam, Thales India (ECC) |
| SW          | Push the project to the upstream Git repository that contains example FreeRTOS projects and tests.| September 2023 | Anjali Gedam, Thales India (ECC) |
| SW          | Build more comprehensive demo involving queue, semaphore, mutex, message-passing, multiple priorities etc. | September 2023 | Anjali Gedam, Thales India (ECC) |


## Project Repo 

- **Project Repo:** https://github.com/FreeRTOS
- **Development Repo:** https://github.com/AnjaliGedam/FreeRTOS

## Regular Project Meeting 

The progress will be tracked in CVA6 meetings.
The CVA6 meetings usually happens every week, the agenda contains progress and technical topics.

## Regular Project Report

The progress will be tracked in CVA6 meetings.
The progress towards the milestones will be tracked during CVA6 meetings, usually once a month and we keep track of task on CVA6 Kanban board.

## Future Enhancements

1. Support within the Verilator environment

## Risk Register


| Risk							| Description						| Plan to Mitigate Risk					|      
| --------------------    		| --------------------    			| -------------------- 					|
| Identifying dedicated Project Manager (PM)| 					  	|Socialize around OpenHW members to identify committed Project Manager.|
| ASM updated / debug can be tricky at time| 					  	|Get expert support. Account for additional time.|
| Debug on HW board / FPGA can get overwhelming| 					|Get expert support. Account for additional time.|



## Checklists to pass the Project Finished/Project Release Gate
*The checklists which will be used to gate the completion of the project should be listed. The checklists themselves don’t need to be presented at the PA gate. Steps to create them should be described.*

| Checklist						| Description						| Plan to Develop Checklist				|      
| --------------------    		| --------------------    			| -------------------- 					|
| RTL Freeze	    			| 					  				|		NA								|
| Verification Complete	    	| 					  				|		NA								|
| Documentation Complete    	| 					  				|		NA								|
| IP Checklist complete    	    | 					  				|		NA								|
| main_blinky demo 				|Standard demo application from FreeRTOS.org|          Passing              |
| main_full demo         	    |Standard demo application from FreeRTOS.org|          Passing              | 
| Pull request accepted by AWS  | 					  				|										|


## PA Checklist

*Confirm in the table below that each listed item is completed, or explain the exception/waiver*

| Item							| Completion (Y/N/In progress/NA)	| Comment							|      
| --------------------    		| --------------------    			| -------------------- 					|
| Project Concept Complete	    | 		Y			  				|										|
| Project Launch Complete	    | 		Y			  				|										|
| SW Target platform identified	| 		Y			  				|										|
| Cores Part Number identified	| 					  				|										|
| Cores TRL Target identified	| 					  				|										|
| Project release plan identified | 					  			|										|
| HL Project deliverables identified| 	Y				  			|										|
| Feature list available|		| 	Y			  				|										|
| Resource plan available|		| 	Y			  				|										|
| Repo setup|					| 	Y			  				|										|
| License.md file in place		| 		N			  				|										|
| Project Manager identified	| 		N			  				|										|
| Technical Project Leader per deliverable identified| 		Y			  			|										|
| At least 1 project committer elected| 					  		|										|
| Work Breakdown Structure available | 		Y			  			|										|
| Baseline schedule available	| 		Y			  				|										|
| Ongoing schedule tracking identified 	|     Y 				    |Regular updates in the cva6 meeting	|
| Regular project meeting setup	| 		Y			  				|						SW TWG			|
| Project Monthly report format agreed	| 		N			  				|										|
| Risk Register available       | 		Y			  			    |										|
| Set of Project Freeze/Release Checklists identified | 	Y				  		|							|
