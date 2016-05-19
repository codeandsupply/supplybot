_ = require('lodash/fp');

module.exports = function(robot) {

    var helpOptions = "\nsupplybot list  -  Lists the next 5 C&S events\n" +
                      "supplybot next up  -  Lists the next C&S event\n" +
                      "build night  -  Lists the location and date of the next Build Night\n"

    return robot.respond(/help/i, function(msg) { // returns optional commands
	return msg.send(helpOptions);
    });
};
