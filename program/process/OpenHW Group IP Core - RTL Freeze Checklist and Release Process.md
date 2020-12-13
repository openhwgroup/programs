# OpenHW Group IP Core - RTL Freeze Checklist and Release Process


This document describes the release process used by OpenHW Group for IP cores projects.

In this process, OpenHW validates that a set of RTL Freeze checklist tasks have been completed prior to release.
Checklist completion enables the creation and publishing of one or more "tags" on the project repositories. A consumer of the release accesses the tagged code associated with the release via the tags. OpenHW publishes the release name and description along with the release tags.


The following aspects of the release process are described in this document: 
* Naming the RTL Freeze release
* Agree on RTL Freeze checklists, contents, and signoff criteria for a project
* Open a Github issue for the checklist signoff
* Complete (signoff) of all checklists associated
* Create a Github tag on each repo included in the release
* Close Github issue
* Publish the release description and the Github tag(s)






## Naming the release

The RTL Freeze release is named with an alphanumberic string incorporating the version number. This name is used in release documentation, tag creation, checklist subdirectory name, and user documentation.
For example, the first RTL Freeze for cv32e40p is named  cv32e40p_v1.0.0. 

## RTL Freeze Checklist Creation

### Establishing and Storing the Checklist

The checklist is established either at Project Plan Approved (PPA) Gate or at another early stage of the project. 
Templates are available in the /program/milestones/templates subdirectory.

To create a set of checklists for a project, the templates are reviewed and adapted for a particular project.

Project specific checklists are created and stored in a project-specific subdirectory of the the /program/milestones directory.
The name of the project release is used as the checklist subdirectory name, e.g. cv32e40p_v1.0.0

### Checklist(s) Description

Each checklist has a series of rows and columns, with rows containing checklist item to be reviewed, and columns for:

Category	
Item	
Sign-off Criteria	
Signed-off By	
Sign-off Date	
Exceptions/Waivers/Comments

When created, the "Sign-off Date" column is left blank. When both "Signed-off By" and "Sign-off Date" are filled in, that row has been signed off.

### Meaning of Sign-off
The sign-off each row item means that the person who has signed it off verifies that the task for that row has been done. There is no specific quality metric associated with sign-off. 



## Using Github Issues to track the Milestone

### RTL Freeze Milestone Issue

At Project Launch, a single Github issue is opened for the RTL Freeze Milestone, in the RTL repository for the release.

The RTL Freeze Milestone Issue text inlcludes 
* The release name
* A pointer to a Checklist File Issue (see below) for each specific checklist file
* The tag name for all the repositories associated with the release

The RTL Freeze Milestone Issue is assigned to the Technical Project Leader (TPL) or Project Manager (PM).

### Checklist File Issues

In addition to the RTL Freeze Milestone Issue, one Github issue per Checklist File is opened.
Each Checklist File Issue is assigned to a project member by the TPL or PM. 
The 


### Sign-Off the Checklist(s)

Updating the Checklist is done by any project member or OpenHW Staff member, in coordination with the Technical Project Leader or Project Manager.

The "Signed-off By" field is filled in the email address of the person verifying that the task has been done.
There is no quality metric associated with the sign-off.

The "Signed-off Date", when filled in together with the "Signed-off By", verifies that the item has been signed off.

The Checklist is updated by pull request.


### Create the Github Tag(s)

The Technical Project Leader or Project Manager for the project verifies that the checklist(s) 
have all been signed off. He or she then creates a tag on each repository associated with the release.
Therefore , in a multiple repository project, multiple tags are required. 

For example, the following three repositories tagged for cv32e40p:

https://github.com/openhwgroup/cv32e40p. This is the repository containing the cv32e40p RTL code
https://github.com/openhwgroup/core-v-verif. This is the resository containing the cv32e40p testbench.
https://github.com/openhwgroup/core-v-docs. This is the repository containing the checklists themselves, as well as user docs.


The name of the tag on each repo should include the name of the release.



## Close the Github Issues

### Closing the Checklist File Issues
When the person assigned each Checklist File Issue has verified that that checklist row in that file has been signed off, he or she closes the issue.

### Closing the RTL Freeze Milestone Issue
When the person assigned the RTL Freeze Issue has verified that 
* each Checklist File Issue is closed
* the release tags are created and the tag names are written in the RTL Freeze issue

he or she closes the RTL Freeze issue.




## Publish the Project Release

The project release is published on the OpenHW website. The following information is published to enable users of the release to access the appropriate code

* Release Name
* Release Description
* Associated Github tags on project repository(ies)

