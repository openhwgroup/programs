# OpenHW Process Document: Specification Process, States and Format

## Revision History

This document desbribes OpenHW's specification process and format.
The overall approach was adopted by consensus in the TWG meeting of July 2023 based on power point presentations and other documents.

The V1.0 of this document reflects the agreements made at that meeting and adds additional details. 

| Date        | Version | Notes                                                     |
| :---------- | :------ | :-------------------------------------------------------- |
| 22 Jan 2024 | 1.0     | Formal draft reflecting July 2023 TWG meeting materials	|
                                  
## Specification Process

### Overview

OpenHW uses a lightweight specification development process to produce specification documents (which are similar to standards documents). Such "specifications" convey, for instance: 
 - Protocol/functionality of an interface to ensure interopability across the interface
 - Naming convention such as mmemonic for an instruction class
 
This type of specification is developed and frozen in a Task Group designated by the Techinical Working Group (TWG) to this task, then ratified and released (published) by TWG.

Note that this process does not refer to a requirements specification for an OpenHW project such as an open-source Core or Hardware or Software project. In that context, requirements specification is a list of the required features of the open-source project.  

### Characteristics of the OpenHW Specification Process

This section describes the characteristics of the Specification Process. This is background information that explains how the process was designed. Those looking to use the process are free to skip reading this section.

#### Basics

| Number 	| Issue 									| Comment                                               							|
| :---		| :------ 									| :-------------------------------------------------------------------------------- |
| 1 		| Nature of an OpenHW Group specification	| A collective derivative work from the individual member contributions, together with staff contributions	|																			
| 2 		| Editors of the specification				| OpenHW via its members and staff													|
| 3 		| Contributions by non-members				| For further study				|
| 4 		| Eclipse Specification Process				| Not used				|

#### Contributions into the Specification

| Number 	| Issue 									| Comment                                               							|
| :---		| :------ 									| :-------------------------------------------------------------------------------- |
| 1    		| Licenses accepted for contributions to OpenHW Specs 		|																	|
| 1.1		| Apache 2.0								| As per OpenHW Member Agreement, contributions can be made using this license 		|
| 1.2		| Solderpad 2.1								| As per OpenHW Member Agreement, contributions can be made using this license  	|
| 1.3		| Commons Attribution Share Alike 4.0 International license | Agreed by OpenHW CEO April 2023									| 
| 2			| Patent Grant included in contribution license:  | 																			|
| 2.1		| Apache 2.0								| Yes, patent grant included in contributions 										|
| 2.2		| Solderpad 2.1								| Yes, patent grant included in contributions										|
| 2.3		| Commons Attribution Share Alike 4.0 International | No patent grant included													| 
| 3			| Essential patents must be disclosed by contributor | No, Contributors are not required to disclose essential patents 			| 
| 4			| Copyright Grant included in contribution license:  | 																			|
| 4.1		| Apache 2.0								| Yes, copyright grant included in contributions 									|
| 4.2		| Solderpad 2.1								| Yes, copyright grant included in contributions 									|
| 4.3		| Commons Attribution Share Alike 4.0 International | Yes, copyright grant included	in contributions							| 
| 4			| Contribution Process 						| Follows EDP/ Committers merging pull requests	/ Contributors sign ECA or MCCA		| 			 


#### Publication of the Specification

| Number 	| Issue 									| Comment                                               							|
| :---		| :------ 									| :-------------------------------------------------------------------------------- |
| 1 		| Specification published by				| OpenHW on Github and/or ReadtheDocs and/or website								|
| 2 		| Copyright holder on specification			| OpenHW on behalf of contributors (member), who hold the copyright jointly. 		|
| 3			| License used for publication 				| Same license as used for contributions 											|
| 4			| Copyright Grant included in specification publication 	 | As per publication license:										|	
| 5.1		| Apache 2.0								| Yes, copyright grant included with OpenHW publication 							|
| 5.2		| Solderpad 2.1								| Yes, copyright grant included with OpenHW publication 							|
| 5.3		| Commons Attribution Share Alike 4.0 International license | Yes, copyright grant included with OpenHW publication 			|								
| 6			| Patent Grant included in specification publication 	|	As per publication license											|
| 6.1		| Apache 2.0								| No patent grant provided by OpenHW but patents rights granted under contribution	|
| 6.2		| Solderpad 2.1								| No patent grant provided by OpenHW but patents rights granted under contribution	|
| 6.3		| Commons Attribution Share Alike 4.0 International license | No patent grant included with OpenHW publication					|								
| 7			| Essential patents disclosed by OpenHW		| No																				|
| 8 		| License text included within the specification text |  No - referall only 													|
| 0			| "No-warranty" or disclaimer				| Required																|


### Specification Version numbers

OpenHW Specifications shall use semantic versioning https://semver.org/ with the version in the form X.Y.Z.
The version number is combined with the Specification State (below), for example "1.0.0 - Released" to indicate both the version number and state.



### Specification States

The ratification or completion state is meant to be written in each OpenHW specification so that a reader will be aware of the state of completion of the Specification
These are the OpenHW Specification States:

- “OpenHW Specification - In Development"
- "OpenHW Specification - In Review"
- "OpenHW Specification - Release Candidate"
- "OpenHW Specification - Released"

#### "OpenHW Specification - In Development"

When the specification is initiated, all drafts will be labelled as “OpenHW Specification - In Development"
(During initial development of the spec before first release, the version number is of the form X.Y.Z with X=0.) 

This state is also used when a released spec is subsequently revised. 

During revision of a released specifiation, the version number increments as appropriate depending on whether the revision is a major or minor update. 

#### "OpenHW Specification - In Review"

When the specification is frozen for technical review by a Task Group, all drafts will be labelled as "OpenHW Specification - In Review"

When the TG(s) has completed its review, the reviewed and stable version will be relabelled as "Release Candidate" - see next section.

#### "OpenHW Specification - Release Candidate"

When the specification is proposed as a candidate for release, drafts will be labelled as "OpenHW Specification - Release Candidate"

The complete descriptor of the spec at this stage will be "X.Y.Z - Release Candidate", where X.Y.Z is the proposed release number.


#### "OpenHW Specification - Released"

When a Release Candidate specification has completed ratification (through a TWG vote), the released copy will be labelled as "OpenHW Specification - Released"
Revision numbers should be of the form X.Y.Z, normally starting with X=1 as the initially released version.



## Specification Format

The following sections must be included in the OpenHW Specification

### Title

The Title should be of the form "OpenHW Specifciation: Title"

### Revision History

Prior to release a table of draft revisions should be included, which can included description of content in each draft

Upon release, the Revision History should list only released specification versions. That is, intermediate revisisions used during development and review don't need to be listed.
The table should include Revision, Date, and Description. The Description should include a high level description of the content.

### Specification States

The specification state must be listed, e.g. 

'The state of this specification is "OpenHW Specification - Released"'


### License

The Publication License is listed, together with a URL link to the source of the license. 


The following is an example of an appropriate license statement:

"
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

### No-warranty
The following no-warranty text is included:

"Unless required by applicable law or agreed to in writing, this Specification and any accompanying software or hardware distributed under the License are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License."

### Copyright
The following opyright text is included:

"Copyright ©  YEAR OF PUBLICATION OpenHW Group. You may use, copy, modify, and distribute this work under the terms of the License, subject to the conditions specified in the License."

### Footer

In cases where the specification is rendered in PDF format, a footer should be included on each page, including OpenHW “Specification Title”, Revision Number/State, and "Copyright © YEAR OF PUBLICATION OpenHW Group"		






