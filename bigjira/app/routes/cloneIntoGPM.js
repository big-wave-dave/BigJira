// Handles the web hooks fired from JIRA in the context of number of times an issue has been in the QA cycle

var FetchJiraApi = require('jira-client');
var jiraconfig  = require('../../jiraconfig.json');
var fs = require("fs");

module.exports = function(app, jira) {
    app.post('/cloneIntoGPM/:issueKey', (req,res) => {
        // Get the issue key from the URL



        // Call a python module to handle the heavy lifting
        //////////////////////////////
        const {spawn} = require("child_process");
        // Set a secondary child process here
        const child = spawn("python3", ["app/routes/cloneIntoGPM.py", req.params.issueKey]);

        // Set a tertiary child process here. This one needs to spawn the script the gives attachments.

        // Catch and report errors
        child.stderr.on('data', (data) => {
            console.error(`child stderr:\n${data}`);
        });
        //////////////////////////////
    });
};
























// Annoying Atom formatting
