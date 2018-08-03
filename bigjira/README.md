# README #

Welcome to Big JIRA! This repo is for all the code and project files that make up the bigjira webhook system. This catches webhooks from JIRA and acts upon them while also housing scripts that gather various stats and data to report to the STAT project in our JIRA instance (these are expected to be run with cron jobs).

### What is this repository for? ###

* A node express server that catches webhooks from jira
* Acts upon those webhooks (logging them and/or calling the jira api)
* Housing scripts that gather jira stats
* Housing scripts that call the jira api to report those stats to the STAT project

### How do I get set up? ###

* There are several expectations to make this server and its auxiliaries function as intended. 
* You need to make a config file named jiraconfig.json based on the example.jiraconfig.json file. In here you need to place your host, username, and password for your jira instance. This file is protected by the .gitignore, so don't worry about accidentally committing your credentials.
* Navigate to the folder in your terminal and run the `npm install` command.
* If you don't have node.js installed, download it [here](https://nodejs.org/en/download/). NPM is the official package manager; in any directory that has a "package.json" file, running the command `npm install` will install all package dependencies.
* The server uses my DemoTunneler package to catch webhooks. By default, I've set it to catch webhooks fired at enexpreprodftw:7331 because that's where our webhooks on our jira instance fire. If you need to do testing or anything like that, you can change the "port" and "customsub" variables located in the bigjira.js file.
* The best way to ensure the server stays up is to use pm2 to daemonize the server. Here is the process for doing that in the terminal in the project's root folder:

1. > `pm2 startup`

2. > Perform the command suggested in that output.

3. > `pm2 start bigjira.js`

4. > `pm2 startup`

5. > `pm2 save`

Ta da, it's now a daemonized process that will restart everytime the server crashes and everytime the machine itself restarts. It is suggested to restart this server once a day _IF_ using DemoTunneler.

### Cron Modules

* Cron modules are standalone scripts that were created 100% with the intent to be run as cron jobs. These scripts should be run in a certain order: this order being a "gather data" script must be run before the accompanying "send data" script.
* If using DemoTunneler, add a crontab entry to run "sh restartServer.sh" each night.

### Logs

* Logs can be found in bigjira/logs. Several cron modules call on these logs in the SEND scripts.

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact