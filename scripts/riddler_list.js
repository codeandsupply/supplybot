_ = require('lodash/fp');

module.exports = function(robot) {
    var titleOf              = function(e) { return e.title || "(title undecided)" };
    var dateOf               = function(e) { return e.date };
    var locationOf           = function(e) { return e.location || "(location not set)" };
    var firstFiveOf          = _.take(5);
    var dateSorted           = _.sortBy(function(e) { return e.date });
    var titleDateLocationIn  = _.map(function(e) { return [titleOf(e), formatDate(dateOf(e)), locationOf(e)] });
    var regexDate            = function(date) { return /(\d+).(\d+).(\d+).(\d+).(\d+)/.exec(date) };
    var formatDate           = function(date) {
	var regexed = regexDate(date);
	return regexed[2] + "/" + regexed[3] + "/" + regexed[1] + " at " + formatTime(regexed[4], regexed[5]);
    };
    var formatTime           = function(hour, minute) {
	var parsedHour = parseInt(hour);
	if ( parsedHour > 12 ) {
	    parsedHour -= 12;
	    return parsedHour.toString(10) + ":" + minute + "pm";
	} else {
	    return hour + ":" + minute + "am";
	};
    };
    var joinedNextFiveEvents = _.map(_.join(', '));
    var nextFiveEvents       = _.flow(dateSorted, firstFiveOf, titleDateLocationIn, joinedNextFiveEvents);
    
    return robot.respond(/list/i, function(msg) { // returns next 5 events
	return msg.http("http://jim.booleanparty.pagekite.me/api/v1/events.json").get()(function(err, res, body) {
	    var json = JSON.parse(body);

            return msg.send("Next five C&S events:\n" + nextFiveEvents(json).join('\n'));
	});
    });
};
