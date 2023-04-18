# OpenHW  Plan Approved Template: Instructions


*This template is for the OpenHW Group Plan Approved (PA) gate. The PA gate follows the PL gate in the OpenHW project gate sequence. To recap, the gate sequence is:*

- *Project Concept (PC)*
- *Project Launch (PL)*
- *Plan Approved (PA)*
- *Project Freeze (PF)*


*The Project Concept and Project Launch document templates are described [here](https://github.com/openhwgroup/programs/blob/master/process/PC_PL_Template_Markdown.md)*

*At the PA gate a full feature list and project plan is presented by the OpenHW project team to the TWG for review and comment.*

*Most CORE-V software projects have a single Project Concept/Project Launch covering a family of cores or platforms.  The PA will normally provide the project plan for a specific CORE-V target within that family.* 

*Copy and modify the template below*

<hr/>



## Title of Project 
*Insert title of the project*

## Date of proposal

## Author(s)


## (*For SW Projects*) Target Platform
*Specify the specific target platform from within the target family for this project. The target family is specified in the PC/PL document. For example, the PC/PL might address CV32E4 family of embedded processors, while the PA might target the CV32E40P MCU*

## (*For Cores Projects*) Part Numbers
*Write down the CORE-V part number assigned for each of the output cores produced/verified by this project plan*

| Core produced/verified in this project		    | Part Number			| Comment				| 
| --------------------- 							| --------------------- | ---------------------	| 
| Core CV...												  |						|						| 

## (*For Cores Projects*) TRL target

*Write down the TRL target for each of the output cores produced/verified by this project plan*

| Core produced/verified in this project		    | TRL Target			| Comment				| 
| --------------------- 							| --------------------- | ---------------------	| 
| Core CV...										|						|						| 

## Release plan

*Write down the anticipated release number and release schedule for the work covered by this project plan. For example, Release 1.0.0 in 2024-12-01*

| Release number		    | Planned date						| Description															| 
| --------------------- 	| --------------------- 			| ---------------------													| 
| 1.0.0						| 2024-12-01						| Initial fully verified TRL5 release including X,Y,Z					|

*Add any comment about release strategy or timing such as follow-on releases *
 



## Project deliverables (high level)

*The high level project deliverables (e.g. code, verification, user document, and other deliverables) should be listed. I.e. what are the open-source deliverables? Don't list detailed features here.*
*The following table is provided as an example*

| Deliverable		    | Description			| Technical Leader		| 
| --------------------- | --------------------- | ---------------------	| 
| Item1	    			| RTL code				|						|
| Item2	    			| Verification of RTL	|						|
| Item3	    			| User Manual			|						|

*All major deliverables require a Technical Project Leader.*

## Feature List 


*This section provides the detailed feature list of the project.*
*If the features are outlined in detail in the PL, or within a User Manual or other document, refer to that document. If not, the feature list should be provided here*


 
## Resources/ Resource Plan
*Members (organizations) and individuals committed to work on the project should be listed in this section*
*The following table is provided as an example*

| Organization					| Person							| Project deliverable focus 			|      
| --------------------    		| --------------------    			| -------------------- 					|
| Organization1	    			| Person1					  		|	RTL									|
| Organization2	    			| Person2					  		|	RTL									|
| Organization2	    			| Person3					  		|	Verification						|
 
*Every project deliverable must have at least one resource assigned at PA*.
*View of resources needed/available to be added*
 
 
 ## Project Leadership Roles
*The person or persons responsible for project planning/ management should be listed* 
 - *Project Manager(s)*
 - *Technical Project Leader(s)*
 - *Committers on project repos*
* Often these roles would be taken the same person(s).*

| Role									| Person							| Organization							| Committer Status						|       
| --------------------    				| --------------------    			| -------------------- 					|										| 
| Project Manager(s) (if applicable)	| 					  				|										|										| 
| Technical Project Leader(s)	    	| 					  				|										|										| 
| Committer1 on project repo			|									|										| Elected								| 
| Committer2 on project repo			|									|										| Election to be held					| 


*There needs to be at least one CORE-V CORES committer already elected who can review and merge pull requests on the project repos. 



## Work Breakdown Structure


*The project work is broken down starting from high level to low level.*
- *At high level, work can be broken down by technical component, project phase, area of focus or other method.*
- *At low level, specific tasks are enumerated with estimated time durations (e.g. 1 person for 2 weeks)* 
- *If appropriate, tasks are assigned to individuals*
- *For agile projects, tasks can be assigned to individuals during project execution. If so, initial task backlog without assignment to individual can be created.*
- *Format of the WBS can be github project board, spreadsheet, or other*.

- *Examples to be provided in a future version*


## Schedule
*A timeline view is created by considering the WBS breakdown, dependencies among tasks, resource availability, and schedule requirements. The format of the timeline view can be github project board with milestones, a spreadsheet, or gantt chart.*

- *The schedule should indicate the planned date of major milestones and the first release for the project*
- *Remaining uncertainties or issues to be resolved should be described*
- *How the schedule will be maintained following PA should be described*

- *Examples to be provided in a future version*

## Project Repo 
*The project repo(s) should be setup and listed here*
*The repos should have README.MD and LICENSE.MD created*
*The LICENSE.MD file should specify the project license*

## Regular Project Meeting 
*The project should have a regular project meeting established and included on the OpenHW calendar. Send a recurring meeting request to meetings@openhwgroup.org*

## Regular Project Report
*The project should have a regular project meeting report agreed. The format of the report should follow the suggestion in the programs/template repo. Consult OpenHW staff as meeting report location*.



## Risk Register
*Risks towards completion of the project for the given target should be listed and risk mitigation plan should be stated*


| Risk							| Description						| Plan to Mitigate Risk					|      
| --------------------    		| --------------------    			| -------------------- 					|
| Risk1	    					| 					  				|										|
| Risk2	    					| 					  				|										|
| Risk3	    					| 									|										|



## Checklists to pass the Project Finished/Project Release Gate
*The checklists which will be used to gate the completion of the project should be listed. The checklists themselves don’t need to be presented at the PA gate. Steps to create them should be described.*

| Checklist						| Description						| Plan to Develop Checklist					|      
| --------------------    		| --------------------    			| -------------------- 					|
| RTL Freeze	    			| 					  				|										|
| Verification Complete	    	| 					  				|										|
| Documentation Complete    	| 					  				|										|
| IP Checklist complete    	    | 					  				|										|


## PA Checklist

*Confirm in the table below that each listed item is completed, or explain the exception/waiver*

| Item							| Completion (Y/N/In progress/NA)	| Comment							|      
| --------------------    		| --------------------    			| -------------------- 					|
| Project Concept Complete	    | 					  				|										|
| Project Launch Complete	    | 					  				|										|
| SW Target platform identified	| 					  				|										|
| Cores Part Number identified	| 					  				|										|
| Cores TRL Target identified	| 					  				|										|
| Project release plan identified | 					  			|										|
| HL Project deliverables identified| 					  			|										|
| Feature list available|		| 					  				|										|
| Resource plan available|		| 					  				|										|
| Repo setup|					| 					  				|										|
| License.md file in place		| 					  				|										|
| Project Manager identified	| 					  				|										|
| Technical Project Leader per deliverable identified| 					  			|										|
| At least 1 project committer elected| 					  		|										|
| Work Breakdown Structure available | 					  			|										|
| Baseline schedule available	| 					  				|										|
| Ongoing schedule tracking identified 	| 				|		e.g. Github project board							|
| Regular project meeting setup	| 					  				|										|
| Project Monthly report format agreed	| 					  				|										|
| Risk Register available | 					  			|										|
| Set of Project Freeze/Release Checklists identified | 					  		|							|
