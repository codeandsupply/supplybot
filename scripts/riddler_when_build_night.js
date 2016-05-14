_ = require('lodash/fp');

module.exports = function(robot) {
    var eventsUrl            = process.env.EVENTS_URL;
    var titleOf              = function(e) { return e.title };
    var dateOf               = function(e) { return e.date };
    var locationOf           = function(e) { return e.location || "(location not set)" };
    var dateSorted           = _.sortBy(dateOf);
    var dateFilter           = _.filter(function(event) { return ( event.date !== null ) } );
    var findBuildNight       = _.find( { 'title': 'Build Night' } );
    var ensureFindBuildNight = function(e) {
	if (findBuildNight(e) === undefined) {
	    return "Build Night has not been scheduled.";
	} else {
	    return concatBuildNight(findBuildNight(e));
	}
    };
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
    var concatBuildNight     = function(e) { return "Build Night is on " + formatDate(dateOf(e)) + ", " + locationOf(e) };
    var nextBuildNight       = _.flow(dateFilter, dateSorted, ensureFindBuildNight);

    return robot.hear(/build night/i, function(msg) { // returns when/where of build night
	return msg.http("http://jim.booleanparty.pagekite.me/api/v1/events.json").get()(function(err, res, body) {
	    var json = JSON.parse(body);

            return msg.send(nextBuildNight(json));
	});
    });
};
