Copyright [2024] [OpenHW Group]

SPDX Apache-2.0
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License


# OpenHW Group Process Document: Specification Process, States and Format

## Revision History of This Document

This document describes OpenHW Group's specification process and format.

The overall approach was adopted by consensus in the TWG meeting of July 2023 based on power point presentations and other documents.
The V1.0 of this document reflects the agreements made at that meeting and adds additional details. 

| Date        | Revision | Notes                                                     |
| :---------- | :------ | :-------------------------------------------------------- |
| 24 Jan 2024 | 1.0.0     | Reflecting July 2023 TWG meeting materials	and subsequent review on Github|
| 26 Feb 2024 | 1.1.0     | Version made available for TWG meeting of Feb 26 2024 |
                                  
## Specification Process

### Overview

OpenHW uses a lightweight specification development process to produce specification documents (which are similar to standards documents). Such "specifications" convey, for instance: 
 - Protocol/functionality of an interface to ensure interoperability across the interface
 - Naming convention such as mnemonic for an instruction class
 
This type of specification is developed and frozen in a Task Group designated by the Technical Working Group (TWG) to this task, then ratified and released (published) by TWG.

Note that this process does not refer to a "requirements specification" for an OpenHW Group project such as an open-source Core or Hardware or Software project. In that context, "requirements specification" is a list of the required features of the open-source project.  

### Characteristics of the OpenHW Group Specification Process

This section describes the characteristics of the Specification Process. This is background information that explains how the process was designed. Those looking to use the process are free to skip reading this section.

#### Basics

| Number 	| Issue 									| Comment                                               							|
| :---		| :------ 									| :-------------------------------------------------------------------------------- |
| 1 		| Nature of an OpenHW Group specification	| A  joint work or collective derivative work from the individual member contributions, together with staff contributions	|																			
| 2 		| Editors of the specification				| OpenHW Group via its members and staff													|
| 3 		| Contributions by non-members				| For further study				|
| 4 		| Eclipse Specification Process				| Not used				|

#### Contributions into an OpenHW Specification

| Number 	| Issue 									| Comment                                               							|
| :---		| :------ 									| :-------------------------------------------------------------------------------- |
| 1			| OpenHW Member Agreement					| Member agreement Section 3.4 details the license granted on contributions to OpenHW Group allowing OpenHW Group to copy, create and publish derivative works, and other related rights |
| 2    		| Licenses accepted for contributions to OpenHW Group Specifications 		|																	|
| 2.1		| Apache 2.0								| As per OpenHW Group Member Agreement, contributions can be made using this license 		|
| 2.2		| Solderpad 2.1								| As per OpenHW Group Member Agreement, contributions can be made using this license  	|
| 2.3		| Creative Commons Attribution Share Alike 4.0 International license | Agreed by OpenHW Group CEO April 2023									| 
| 3			| Patent Grant included in contribution license:  | 																			|
| 3.1		| Apache 2.0								| Yes, patent grant included in contributions 										|
| 3.2		| Solderpad 2.1								| Yes, patent grant included in contributions										|
| 3.3		| Creative Commons Attribution Share Alike 4.0 International | No patent grant included													| 
| 4			| Essential patents must be disclosed by contributor | No, Contributors are not required to disclose essential patents 			| 
| 5			| Copyright Grant included in contribution license:  | 																			|
| 5.1		| Apache 2.0								| Yes, copyright license grant included in contributions 									|
| 5.2		| Solderpad 2.1								| Yes, copyright license grant included in contributions 									|
| 5.3		| Creative Commons Attribution Share Alike 4.0 International | Yes, copyright grant included	in contributions							| 
| 6			| Contribution Process 						| Follows Eclipse Development Process (EDP) / Committers merging pull requests	/ Contributors sign Eclipse Contributor Agreement (ECA) or Member Committer and Contributor Agreement (MCCA)		| 			 


#### Publication of a Specification by OpenHW

| Number 	| Issue 									| Comment                                               							|
| :---		| :------ 									| :-------------------------------------------------------------------------------- |
| 1 		| Specification published by				| OpenHW Group on Github and/or ReadtheDocs and/or website								|
| 2 		| Copyright holder on specification			| OpenHW Group on behalf of contributors (members), who retain the copyright on their individual contributions 	|
| 3			| License used for publication 				| Same license as used for contributions 											|
| 4			| Copyright Grant included in specification publication 	 | As per publication license:										|	
| 5.1		| Apache 2.0								| Yes, copyright grant included with OpenHW Group publication 							|
| 5.2		| Solderpad 2.1								| Yes, copyright grant included with OpenHW Group publication 							|
| 5.3		| Creative Commons Attribution Share Alike 4.0 International license | Yes, copyright grant included with OpenHW Group publication 			|								
| 6			| Patent Grant included in specification publication 	|	As per publication license											|
| 6.1		| Apache 2.0								| Patents rights granted by contributors under Apache 2.0	|
| 6.2		| Solderpad 2.1								| Patents rights granted by contributors under Solderpad 2.1	|
| 6.3		| Commons Attribution Share Alike 4.0 International license | No patent grant included with OpenHW publication					|								
| 7			| Essential patents disclosed by OpenHW		| No																				|
| 8 		| License text included within the specification text |  No - referral only 													|
| 9			| "No-warranty" or disclaimer				| Required																|


### Specification Revision Numbers

OpenHW Group Specifications shall use semantic versioning https://semver.org/ with the Revision in the form vX.Y.Z-postfix
The Revision number is combined with the Specification State (below), for example "v1.0.0-rel1" to indicate both the Revision number and State.



### Specification States and postfix

The ratification or completion State is meant to be written together with the Title and Revision in each OpenHW Group specification so that a reader will be aware of the state of completion of the Specification.
These are the OpenHW Group Specification States and corresponding postfixes:

- “In Development". The version postfix is -devW, for example -dev1, -dev2 
- "In Review" (optional). The version postfix is -reviewW, for example -review1, -review2 
- "Release Candidate". The version postfix is -rcW, for example -rc1, -rc2 
- "Released". The version postfix is -relW, for example -re11, -rel2 

#### "OpenHW Group Specification - In Development"

When the specification is initiated, all drafts will be entitled  "OpenHW Group Specification: Title : vX.Y.Z-devW".
(During initial development of the spec before first release, the Revision number is of the form X.Y.Z with X=0). 

NOTE: if the specific template used for publication would repeat the version number if vX.Y.Z is included as part of the title, it may be omitted, as long as the version number is prominently visible in the specification front matter. 


This state is also used when a released spec is subsequently revised. 

During revision of a released specification, the Revision number increments as appropriate depending on whether the revision is a major or minor update. 

#### "OpenHW Group Specification - In Review"

This state is optional; see the note below.

When the specification is frozen for technical review by a Task Group, all drafts will be entitled "OpenHW Group Specification: Title : vX.Y.Z-reviewW". 
When the TG(s) has completed its review, the reviewed and stable Revision will be relabelled as "rc" - see next section.

See note above about version numbering as part of the title. 

NOTE: This state can be bypassed if a Task Group does not require a review stage. That is, the TG can move the spec from "In Development" to "Release Candidate".


#### "OpenHW Group Specification - Release Candidate"

When the specification is proposed as a candidate for release, drafts will be entitled "OpenHW Group Specification: Title : vX.Y.Z-rcW",

See note above about version numbering as part of the title. 

The Revision number used at this stage would normally be same as the proposed Revision to be released. 

The Release Candidate specification will be notified as open for review to the OpenHW TWG.  
Although technical comments are expected to have been resolved by the TG, comments may still be accepted at this stage.
After a suitable review period, the TWG Chair/Co-Chair will determine that the Specification is ready for ballot. 


#### "OpenHW Group Specification - Released"

When a Release Candidate specification has completed ratification (through a TWG vote), the released copy will be entitled "OpenHW Group Specification: Title : VX.Y.Z-relW".
Revision numbers should be of the form X.Y.Z, normally starting with X=1 as the initially released version.

See note above about version numbering as part of the title. 

The Github commit corresponding to the Released spec will be listed on the Github page of the specification repo together with the "OpenHW Group Specification: Title : VX.Y.Z-relW" string


## File Name for specification

The following file name should be used for the PDF version of the specification file

OpenHW_Group_Specification{title_with_underscores}_vX.Y.Z-postfix.pdf

An example is as follows:

OpenHW_Group_Specification_Core-V_eXtension_interface_(CV-X-IF)v1.0.0-rel1.pdf


## Specification Format

The following sections must be included in the OpenHW Group Specification

### Title

The Title should be of the form "OpenHW Group Specification: Title : vX.Y.Z-postfix"

### Revision History

Prior to release a table of draft revisions should be included, which can include description of content in each draft

Upon release, the Revision History should list only released specification Revisions. That is, intermediate revisions used during development and review don't need to be listed.
The table should include Revision, State, Date, and Description. The Description should include a high level description of the content.


### License

The Publication License is listed, together with a URL link to the source of the license. 

The following are examples of appropriate license statement. 

#### Solderpad 0.51


Include "SPDX SHL-0.51"
Include the following license statement taken from https://spdx.org/licenses/SHL-0.51.html:


Copyright [yyyy] [OpenHW Group] Copyright and related rights are licensed under the Solderpad Hardware License, Version 0.51 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://solderpad.org/licenses/SHL-0.51. Unless required by applicable law or agreed to in writing, software, hardware and materials distributed under this License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.


#### Apache 2.0

Include "SPDX Apache-2.0"
Include the following license statement taken from https://spdx.org/licenses/Apache-2.0.html:


Copyright [yyyy] [OpenHW Group]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License."


#### Creative Commons Attribution Share Alike 4.0 International 

Include "SPDX CC-BY-SA-4.0"
Include the following license statement (note that no standard license header is provided by https://spdx.org/licenses/CC-BY-SA-4.0.html):

Copyright [yyyy] [OpenHW Group]

Licensed under the Creative Commons Attribution Share Alike 4.0 International, (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

https://spdx.org/licenses/CC-BY-SA-4.0.html

As stated in the License: Disclaimer of Warranties and Limitation of Liability.

a. Unless otherwise separately undertaken by the Licensor, to the extent possible, the Licensor offers the Licensed Material as-is and as-available, and makes no representations or warranties of any kind concerning the Licensed Material, whether express, implied, statutory, or other. This includes, without limitation, warranties of title, merchantability, fitness for a particular purpose, non-infringement, absence of latent or other defects, accuracy, or the presence or absence of errors, whether or not known or discoverable. Where disclaimers of warranties are not allowed in full or in part, this disclaimer may not apply to You.
b. To the extent possible, in no event will the Licensor be liable to You on any legal theory (including, without limitation, negligence) or otherwise for any direct, special, indirect, incidental, consequential, punitive, exemplary, or other losses, costs, expenses, or damages arising out of this Public License or use of the Licensed Material, even if the Licensor has been advised of the possibility of such losses, costs, expenses, or damages. Where a limitation of liability is not allowed in full or in part, this limitation may not apply to You.
c. The disclaimer of warranties and limitation of liability provided above shall be interpreted in a manner that, to the extent possible, most closely approximates an absolute disclaimer and waiver of all liability.


### Copyright
The following copyright text is included:

"Copyright ©  YEAR OF PUBLICATION OpenHW Group. You may use, copy, modify, and distribute this work under the terms of the License, subject to the conditions specified in the License."

### Footer

In cases where the specification is rendered in PDF format, a footer should be included, if practical in the documentation template used, on each page, including "OpenHW Group Specification: Title : VX.Y.Z-postfix", and "Copyright © YEAR OF PUBLICATION OpenHW Group"		






