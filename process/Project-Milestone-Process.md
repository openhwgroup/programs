## OpenHW Group Project Milestone Process
The /milestone subdirectory contains the templates and checklist for OpenHW Group projects. 

The Project Milestone process described here is used by OpenHW members and staff to associate Github-tagged milestones with a set of checklists. 
The checklist(s) when signed off, confirms that the established task list for the milestone has been completed.



## Technical Milestones

As per the OpenHW Project Management Framework, the set of project milestones is decided on a per-project basis at the Project Launch gate.
Each Project Milestone is associated with a Checklist(s).

A Project Milestone typically signifies the completion of a project. 
However, a Project Milestone could be used for intermediate checkpoints or releases as well.

A core development would likely include an RTL Freeze milestone as a minimum.


## Process

### Opening Github Issue

At Project Launch, a Github issue is opened for each Project Milestone.
This issue(s) is closed when the Milestone(s) is reached.

### Establishing the Checklist

The checklist must be established either at Project Plan Approved Gate or early in the project. 
Templates are available in the /program/milestones/templates subdirectory.
The templates should be reviewed and adapted as seen fit for a particular project.

Project specific checklists are then stored in the project repository.

### Checklist Description

Each checklist has a series of rows and columns, with rows containing checklist item to be reviewed, and columns for:

Category	
Item	
Sign-off Criteria	
Signed-off By	
Sign-off Date	
Exceptions/Waivers/Comments

This format may be adapted for a project as required.


### Signing Off the Checklist

Updating the Checklist can be done by any project member or OpenHW Staff member, who should coordinate with the Technical Project Leader or Project Manager.

The "Signed-off By" field should be filled in the email address of the person verifying that the task has been done.
There is no quality metric associated with the sign-off.

The "Signed-off Date", when filled in together with the "Signed-off By", verifies that the item has been signed off.

The Checklist is updated by pull request.


### Establishing the Github Tag

When a project has reached a satisfactory point, the Technical Project Leader or Project Manager for the project verifies that the Checklist(s) 
have all been signed off or waived. He or she then creates a tag on the repository, which will also tag the Checklist. 



## Closing the Github Issue

The tag should then be copied into the Project Milestone Issue and the Issue closed.
