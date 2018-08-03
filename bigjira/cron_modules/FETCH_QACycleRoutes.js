var fs = require("fs");

module.exports = function() {
    fs.readFile('../logs/qaCycleRoutes.log', function (err, data) {
        if (err) {
            return console.error(err);
        }
        let to_string = data.toString();
        let split_lines = to_string.split("\n");
        console.log(split_lines.length);
    });
}