//////////////////////////////////////////////////////////////////////////////
//
// Copyright 2024 OpenHW Group
//
// Licensed under the Solderpad Hardware Licence, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://solderpad.org/licenses/
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0 WITH SHL-2.0
//
///////////////////////////////////////////////////////////////////////////////

# This document provides guidelines on use of Github Project boards to track OpenHW projects

## Accessing OpenHW Github project boards

One can access the OpenHW project boards either from the https://github.com/openhwgroup/ level, or see projects associated with individual repos from the repo level.

### From the organization level
From the organization level, navigate to 
https://github.com/orgs/openhwgroup/projects. You will see a list of projects boards associated with https://github.com/openhwgroup/
To see the entire list of projects, select Projects in the side menu

### From the repo level
Navigate to the repo, e.g. https://github.com/openhwgroup/cve2

From the top menu, select Projects.



## Creating a new project board

### Who can create a new project board

To create a new project board, you will need owner, admin, or write-access to the organization, or to a specific repo.

Write access to repos under the CORE-V project is available to CORE-V committers. 
Write access to non-CORE-V OpenHW projects is assigned by OpenHW staff.

If you need to create a project board and you do not have the needed permission, talk to an OpenHW staff member.

### How to create the project board

You can create a new project board either from scratch or from a template. 
Navigate to https://github.com/orgs/openhwgroup/projects

To create from an existing OpenHW project template, 

Click New Project
Under Templates, click From Your organization

You should see a list of OpenHW project templates. Select the one you like. You'll see a list of fields and views that have been created for that template. 


### Link the project to one or more repos

You probably want to associate the project board with a specific repo. You can do that by navigating to the repo, select Projects, then Link a project. You should see a list of OpenHW projects that have been created, and you can select one (or more) to link to.

Linking allows you to import issues from the repo into the project board.

### Make the project board Public and other settings. 

After the project board is created, open the project. Cick setting from the 3-dots menu. Fill in the Project Name, Short description, and README fields.
In the Danger zone, change the visibility to Public. 

Under the Manage access settings, normally base role should be set to Read. That is because normally only those involved with the project should have write permission. 

The CORE-V Committer team should have write access. If a specific person involved with the project needs to invited to have write access, they can be invited under Invite collaborators. 



## Using the CVE2 project board template

The CVE2 project board was updated in 2024 and saved as a template for other OpenHW projects to utilize. Here's how it works


### All Tasks-list view
This view list all the tasks that have been imported into the project board. It is a spreadsheet style list of tasks.

Note, the project board can contain any type of issue. The focus on the project board is to present "tasks" that need to be undertaken but there is nothing to stop you from importing any type of Github issue. 

#### Creating a new issue (task)

In the All Tasks-list hit the + at the bottom of the list of tasks. You can then create a new issue, or import an issue from the repo. You can fill in all the fields of the issue from this view. 

#### Task Type

This field has been added to the CVE2 project board, and allows one to categorize tasks by task-type (RTL Design, Verification, Documentation, etc.) Those task-types are used to filter views in the project board.



#### Milestone

This field uses the "Milestone" pre-defined field. One can view and edit the Milestones associated with a Github repo by going to the Issue Menu of the repo and editing the Milestones.

In the CVE2 project, the Milestones are used to simulate "Sprints" in the sense that they are timeboxed activity buckets. The 4 milestones are MS1-2024Q2, MS2-2024Q4, MS3-2025Q2, and MS4-2025Q4. 

These Milestones were actually created in the CVE2 Plan Approved document to plan the scope of work. 

Tasks have been assigned into milestone buckets so that the project team can focus attention on close-in tasks and see at a glance progress towards the milestones. 
Each Milestone has a corresponding Project Board view showing the status of tasks within it.

Tasks can be moved between milestones as appropriate.


#### Assignees
 
The intent here is to start tasks as unassigned, so as to allow project team members to self-assign, or allow the project manager to assign tasks as appropriate. 

When tasks are assigned, the status should be moved to assigned.

#### YearOpened

Because OpenHW projects can take a long time, we found that tasks may grow stale. This field was created as drop down to indicate the year the task was opened and is used to filter stale tasks from current tasks. 

This field may not be relevant for other projects; if not it can be removed when the project board is created.

#### Labels

This field chooses between the label field associated with the Issues menu in the associated repo. For issues that are intended to be tasks, they would normally be assigned the task label.

#### DueDate
This field is intended to be used to indicate the intended or required completion date. 

#### Person days
This field is intended to be used to indicate the estimate of the person-days of work required to implement the task. Normally it would be completed at the time the task is assigned by the assignee. 

The idea here is to provide the team a way to assess the volume of required work to reach an indicated milestone. 

#### CompletionDate 
This field is intended to track the actual completion date.  


### Project board views

The Project board views provide the main value of the Github project board. In the CVE2 template, besides the All-task board, a project board view is provided for each Milestone.

The Milestone project board views have proven useful in the CVE2 project. They form the basis of discussion around a weekly project meeting.



 










