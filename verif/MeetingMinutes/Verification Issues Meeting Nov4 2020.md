Meeting report - core-v-verif issues
Attendees: Duncan Bees, Mike Thompson, Steve Richmond, Arjan Bink, Greg Tumbush, John Martin, Lee Moore
The purpose of the meeting was to review open issues on core-v-verif and attempt to resolve them
Scribe: Duncan Bees


Issue #47
-	Issue: Update the XPULP compliance testsuite into the uvmt_cv32 CV32E40P verification environment
-	Waived for RTL Freeze obvious reason - PULP features not supported in this release.
-	General discussion about labeling strategy for Github issues. Are the labels associated with a tag, i.e. will labels made at the time of a tagged 
-       release stay as they are?  
-	(In cores repo, a different label system was used. A "PULP" label is used for "PULP" features. This is potentially more permanent.
-	AI: Mike will find out what happens to issues on a tag
-	AI: Mike, when we do tag for RTL Freeze, we should have a document to describe issues


#48
-	Similar to 47, this one is functional coverage – same waiving strategy as 47

#50 – 	Task: ensure 100% coverage of ISA instructions
-	This issue will be closed once functional coverage is 100% complete
	
-	Note, the goal is not 100% functinoal coverage in a single run. We would however like to get as close to 100% as possible in a single run.


#51 - 
	similar to #48 - Waived



#65 – Integrating existing tests in CV32 repo
- 	when we took over RI5CY repo there was a small example testbench. Basically a hello world testbench
-	Arjan: remains value to designers.
- 	This specific issue is for integration of these tests into core-v-verif.
-	This will NOT be done
Issue is now closed

#84 Need single-point-of-control for simulation timescale
-	This is gating RTL Freeze
-	This is a System Verilog enhancement 
-	May already be done - MT needs to check on this to see if it is done
- 	Would need to be run against every simulator to see if it is working properly
	(needs assistance from several people)
-	Chose option 1 Add simulator-specific timescale control to each simular-specific Makefile.
-	MT to report back by end of this week


#221 – ci_check does not correctly detect tool errors
-	the python script for ci_check doesn’t correctly look at passes and failures and can erroneously report a pass
-	We want this fixed
-	Not a gating item – but maybe it should be - prefer not to Waive it
-	MT will ask for help on python scripting to get this done
-	input is YAML 
-	coding with python dictionaries involved

#248 – Compare failures due to stalls
-	this is not gating 
-	we don’t want to lose the information
-	will be WAIVED – we have a workaround in place


#253 - Compliance test cases have mismatches in signature check
-	This is gating RTL Freeze
-	Make files compile the code, runs through the ISS, then looks for a second signature for an RTL simulation – which we don’t do at this stage. The make files from the compliance test suites don’t understand that. They are looking for a signature – we don’t produce that. 
-	MT will work with Lee to get the signature check working

	 

#268 – CSR step and compare mistiming with random stalls
- 	similar to 248 – will be waived – not gating

#294 – Verilog compile fails on uvmt_cv32_tb.sv on commit 1e77175 using vcs simulator
-	This is related to a bug in the Synopsis simulator
-	Opened by mtvaden 
-	this will be closed due to non-response on questions

#319 – Counters test-program fails in the presense of memory stalls
-	prediction of the value in the counter falls apart in presence of memory stalls
-	Solution will be that Arjan will split the test in two. 
-	Counter test case will be removed
-	HPM counter will be relaxed to not fail on jump hazards
-	Then, dedicated jump hazard test that will be run without wait states
-	This can’t be WAIVED for completeness
-	Arjan to modify test cases
-	MT to integrate the test cases in regression

cv32e40p – no gating issues
docs – gating issues

