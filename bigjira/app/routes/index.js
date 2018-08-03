// An index file to keep track of all the routes.

const qaCycleRoutes = require('./qaCycleRoutes');
const cloneIntoGPM = require('./cloneIntoGPM');


module.exports = function(app, jira) {
    qaCycleRoutes(app, jira);
    cloneIntoGPM(app, jira);

    // Other routes can go here in the future
}
