var JiraApi = require('jira-client');
var jiraconfig  = require('../jiraconfig.json');
var fs = require('fs');

var jira = new JiraApi({
  protocol: 'https',
  host: jiraconfig.host,
  username: jiraconfig.username,
  password: jiraconfig.password,
  apiVersion: '2',
  strictSSL: true
});

// Define the columns
var csvData = "Issue Key, Issue Summary, Current Status, Assignee, SLA Name, SLA Total Time Elapsed, Issue Link\n";

// Which JQL filter to use
var filter = "EHD_QAHandleTimeStats_StartOfWeek";

// Search our JQL query and set the max results to 1000 (which is the absolute max for On Demand sites via api) instead of 50.
jira.searchJira("filter = " + filter, {maxResults: 1000})
  .then(function(issues) {

	// Iterate over the internals of the js object so we can work with the parts that we care about.
	for(var iter = 0, len = issues.issues.length; iter < len; iter++) {
      var item = issues.issues[iter];
      var slaField = item.fields.customfield_16319;
      var itemUrl = "https://enexsolutions.atlassian.net/browse/" + item.key;
      var data = item.key + "," + item.fields.summary.replace(/,/gi, '') + "," + item.fields.status.name.replace(/,/gi, '') + "," + item.fields.assignee.name.replace(/,/gi, '') + "," + slaField.name.replace(/,/gi, '') + "," + slaField.ongoingCycle.elapsedTime.friendly.replace(/,/gi, '') + "," + itemUrl.replace(/,/gi, '') + "\n";
      csvData += data;
    };
    // Now write everything to a csv
    writeToCsv(csvData);
  })
  .catch(function(err) {
    console.error(err);
  });


// Dimension a function that writes data to a csv file.
function writeToCsv(dataToWrite) {
  fs.writeFile('../logs/QAHandleStats.csv', dataToWrite, 'utf8', function(err){
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    }
    else {
      console.log('It\'s saved!');
    }
  });
}



















// Atom whitespace formatting
