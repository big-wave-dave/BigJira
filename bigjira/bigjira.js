var express = require("express");
var JiraApi = require('jira-client');
var DemoTunneler = require("DemoTunneler");
var jiraconfig  = require('./jiraconfig.json');

// Call the express constructor
var app = express();
var port = 7331;
var customsub = "enexsolutionsftw2";
var jira = new JiraApi({
  protocol: 'https',
  host: jiraconfig.host,
  username: jiraconfig.username,
  password: jiraconfig.password,
  apiVersion: '2',
  strictSSL: true
});

// Find all the routes our server can handle
require('./app/routes/')(app, jira, {});

// Start our server
app.listen(port, () => {
    DemoTunneler.drill(port, customsub);
    console.log(`Server listening on port ${port}.\n`);
});
