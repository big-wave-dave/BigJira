// Handles the web hooks fired from JIRA in the context of number of times an issue has been in the QA cycle

var FetchJiraApi = require('jira-client');
var jiraconfig  = require('../../jiraconfig.json');
var fs = require("fs");

module.exports = function(app, jira) {
    app.post('/qaCycleRoutes/:issueKey', (req,res) => {
        // Get the issue key from the URL
        //console.log(`Debug: Params: ${req.params.issueKey}\n`);



        // Call a python module to handle the heavy lifting
        //////////////////////////////
        const {spawn} = require("child_process");
        const child = spawn("python3", ["app/routes/qaCycleRoutes.py", req.params.issueKey]);

        // Catch and report errors
        child.stderr.on('data', (data) => {
            console.error(`child stderr:\n${data}`);
        });
        //////////////////////////////
    });
};
























// Annoying Atom formatting
