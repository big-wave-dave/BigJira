from sys import argv

# Import the JIRA module
from jira import JIRA
import json
# Grab JIRA credentials
with open('jiraconfig.json') as f:
    credentials = json.load(f)
# Create the JIRA object
jira = JIRA(("https://" + credentials['host']), basic_auth=(credentials['username'], credentials['password']))

# Find the jira issue using the issue number passed in as an arg to this script
issue = jira.issue(argv[1])
# Increment the "Number of QA Cycles" field
incrementedField = issue.fields.customfield_16322+1
issue.update(customfield_16322=(incrementedField))
# Create the log message
#from datetime import datetime
#timeOfAction = datetime.now().strftime('%m-%d-%Y %H:%M:%S')
logMessage = "%s incremented to %d" % (argv[1], incrementedField)
#print(timeOfAction, " ", logMessage)



# Log that the issue's field has been incremented
import logging
logging.basicConfig(filename="logs/qaCycleRoutes.log", format="%(asctime)s -- %(message)s", datefmt='%m/%d/%Y %H:%M:%S', level=logging.INFO)
logging.info(logMessage)
