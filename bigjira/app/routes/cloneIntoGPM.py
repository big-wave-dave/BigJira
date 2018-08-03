from sys import argv

# Import the JIRA module
from jira import JIRA
import json
# Grab JIRA credentials
with open('jiraconfig.json') as f:
    credentials = json.load(f)
# Create the JIRA object
jira = JIRA(("https://" + credentials['host']), basic_auth=(credentials['username'], credentials['password']))

# Find the original jira issue using the issue number passed in as an arg to this script
original = jira.issue(argv[1])

cloneSummary = "Clone of " + original.key + ": " + original.fields.summary
clone = jira.create_issue(project="GPM", summary=cloneSummary, description=original.fields.description, issuetype={"name": "Task"})

# Create a link between 
jira.create_issue_link(
    type="clones",
    inwardIssue=clone.key,
    outwardIssue=original.key
)


# This is the part where I need to write the attachments script. The attachments need to be enumerated from the original,
# held in memory (they could also be cached but I'd have to remember to delete each at the end), then attached to the
# clone issue. I also need to find a trivial way of the nontrivial task of copying the correct fields. 

# I also need the wonderland scripts to run. It's at this point that the wonderland scripts need to be able 
# to intereact with the user and for the user to be able to set flags to decide whether or not they're going to do 
# a dry restore or a wet restore. The Dry restore wipes out everything that wasn't there on the day of the flashback,
# a wet restore restores everything to how it was while preserving issues that currently exist.


#logMessage = "%s incremented to %d" % (argv[1], )



# Log that the issue's field has been incremented
#import logging
#logging.basicConfig(filename="logs/cloneIntoGPM.log", format="%(asctime)s -- %(message)s", datefmt='%m/%d/%Y %H:%M:%S', level=logging.INFO)
#logging.info(logMessage)
